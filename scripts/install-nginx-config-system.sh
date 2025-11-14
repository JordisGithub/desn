#!/bin/bash

# Script to install the Nginx configuration deployment system
# Run this once to set up automatic configuration restoration

set -e

echo "============================================"
echo "Installing Nginx Configuration System"
echo "============================================"

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root or with sudo" 
   exit 1
fi

# Create directories
echo "Creating directories..."
mkdir -p /home/ubuntu/nginx-backups
mkdir -p /opt/desn/scripts

# Copy deployment script
echo "Installing deployment script..."
cat > /opt/desn/scripts/deploy-nginx-config.sh << 'EOFSCRIPT'
#!/bin/bash
# Nginx HTTPS Configuration Deployment Script
# This ensures the HTTPS configuration persists

set -e

NGINX_AVAILABLE="/etc/nginx/sites-available/desn"
NGINX_ENABLED="/etc/nginx/sites-enabled/desn"
BACKUP_DIR="/home/ubuntu/nginx-backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"

if [ -f "$NGINX_AVAILABLE" ]; then
    cp "$NGINX_AVAILABLE" "$BACKUP_DIR/desn_${TIMESTAMP}.conf"
fi

cat > "$NGINX_AVAILABLE" << 'EOF'
# HTTP server - redirect to HTTPS
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    
    server_name desnepal.com www.desnepal.com;
    
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2 default_server;
    listen [::]:443 ssl http2 default_server;
    
    server_name desnepal.com www.desnepal.com;
    
    ssl_certificate /etc/letsencrypt/live/desnepal.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/desnepal.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    
    root /home/ubuntu/desn-app/frontend;
    index index.html;
    
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
EOF

if [ ! -L "$NGINX_ENABLED" ]; then
    ln -sf "$NGINX_AVAILABLE" "$NGINX_ENABLED"
fi

if nginx -t; then
    systemctl reload nginx
    exit 0
else
    if [ -f "$BACKUP_DIR/desn_${TIMESTAMP}.conf" ]; then
        cp "$BACKUP_DIR/desn_${TIMESTAMP}.conf" "$NGINX_AVAILABLE"
    fi
    exit 1
fi
EOFSCRIPT

chmod +x /opt/desn/scripts/deploy-nginx-config.sh

# Create systemd service for nginx config verification
echo "Creating systemd service for configuration verification..."
cat > /etc/systemd/system/desn-nginx-config.service << 'EOFSERVICE'
[Unit]
Description=DESN Nginx HTTPS Configuration Verifier
After=nginx.service
Wants=nginx.service

[Service]
Type=oneshot
ExecStart=/opt/desn/scripts/deploy-nginx-config.sh
RemainAfterExit=yes
StandardOutput=journal

[Install]
WantedBy=multi-user.target
EOFSERVICE

# Create a timer to check configuration daily (optional)
cat > /etc/systemd/system/desn-nginx-config.timer << 'EOFTIMER'
[Unit]
Description=Daily DESN Nginx HTTPS Configuration Check
Requires=desn-nginx-config.service

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
EOFTIMER

# Reload systemd
echo "Reloading systemd..."
systemctl daemon-reload

# Enable the service
echo "Enabling configuration service..."
systemctl enable desn-nginx-config.service

# Run the deployment script now
echo "Deploying current configuration..."
/opt/desn/scripts/deploy-nginx-config.sh

echo ""
echo "============================================"
echo "Installation Complete!"
echo "============================================"
echo ""
echo "The Nginx HTTPS configuration system is now installed."
echo ""
echo "Features:"
echo "  - Configuration stored in: /opt/desn/scripts/deploy-nginx-config.sh"
echo "  - Backups stored in: /home/ubuntu/nginx-backups/"
echo "  - Systemd service: desn-nginx-config.service"
echo "  - Daily check timer: desn-nginx-config.timer (optional)"
echo ""
echo "To manually deploy configuration:"
echo "  sudo /opt/desn/scripts/deploy-nginx-config.sh"
echo ""
echo "To enable daily automatic checks:"
echo "  sudo systemctl enable desn-nginx-config.timer"
echo "  sudo systemctl start desn-nginx-config.timer"
echo ""
