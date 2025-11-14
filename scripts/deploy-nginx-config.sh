#!/bin/bash

# Script to deploy and configure Nginx for desnepal.com with HTTPS
# This ensures the HTTPS configuration persists across server restarts

set -e

echo "======================================"
echo "Deploying Nginx HTTPS Configuration"
echo "======================================"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root or with sudo
if [[ $EUID -ne 0 ]]; then
   echo -e "${RED}This script must be run as root or with sudo${NC}" 
   exit 1
fi

# Define paths
NGINX_AVAILABLE="/etc/nginx/sites-available/desn"
NGINX_ENABLED="/etc/nginx/sites-enabled/desn"
BACKUP_DIR="/home/ubuntu/nginx-backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup existing configuration if it exists
if [ -f "$NGINX_AVAILABLE" ]; then
    echo -e "${YELLOW}Backing up existing configuration...${NC}"
    cp "$NGINX_AVAILABLE" "$BACKUP_DIR/desn_${TIMESTAMP}.conf"
    echo -e "${GREEN}Backup saved to: $BACKUP_DIR/desn_${TIMESTAMP}.conf${NC}"
fi

# Write the new configuration
echo -e "${YELLOW}Writing new Nginx configuration...${NC}"
cat > "$NGINX_AVAILABLE" << 'EOF'
# HTTP server - redirect to HTTPS
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    
    server_name desnepal.com www.desnepal.com;
    
    # Redirect all HTTP traffic to HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2 default_server;
    listen [::]:443 ssl http2 default_server;
    
    server_name desnepal.com www.desnepal.com;
    
    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/desnepal.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/desnepal.com/privkey.pem;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    
    # Frontend - Serve React app
    root /home/ubuntu/desn-app/frontend;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Frontend routes - SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API proxy
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
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Static assets caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
EOF

echo -e "${GREEN}Configuration written successfully${NC}"

# Create symbolic link if it doesn't exist
if [ ! -L "$NGINX_ENABLED" ]; then
    echo -e "${YELLOW}Creating symbolic link...${NC}"
    ln -sf "$NGINX_AVAILABLE" "$NGINX_ENABLED"
    echo -e "${GREEN}Symbolic link created${NC}"
fi

# Test Nginx configuration
echo -e "${YELLOW}Testing Nginx configuration...${NC}"
if nginx -t; then
    echo -e "${GREEN}Nginx configuration is valid${NC}"
    
    # Reload Nginx
    echo -e "${YELLOW}Reloading Nginx...${NC}"
    systemctl reload nginx
    echo -e "${GREEN}Nginx reloaded successfully${NC}"
    
    # Check Nginx status
    echo -e "${YELLOW}Checking Nginx status...${NC}"
    systemctl status nginx --no-pager | head -10
    
    echo ""
    echo -e "${GREEN}======================================"
    echo "Deployment completed successfully!"
    echo "======================================${NC}"
    echo ""
    echo "Your site should now be accessible at:"
    echo "  - https://desnepal.com"
    echo "  - https://www.desnepal.com"
    echo ""
    echo "HTTP traffic will automatically redirect to HTTPS"
    
else
    echo -e "${RED}Nginx configuration test failed!${NC}"
    echo -e "${YELLOW}Restoring backup...${NC}"
    if [ -f "$BACKUP_DIR/desn_${TIMESTAMP}.conf" ]; then
        cp "$BACKUP_DIR/desn_${TIMESTAMP}.conf" "$NGINX_AVAILABLE"
        echo -e "${GREEN}Backup restored${NC}"
    fi
    exit 1
fi
