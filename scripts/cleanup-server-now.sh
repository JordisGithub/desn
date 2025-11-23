#!/bin/bash
# Emergency cleanup script for AWS server
# Run this directly on ubuntu@ip-172-31-9-188

echo "=== DESN Server Cleanup ==="
echo "Current asset count: $(sudo ls /var/www/html/assets/*.js 2>/dev/null | wc -l)"
echo ""

# Backup current state (just in case)
echo "Creating backup..."
sudo tar -czf /home/ubuntu/html-backup-$(date +%Y%m%d-%H%M%S).tar.gz /var/www/html/
echo "✅ Backup created in /home/ubuntu/"
echo ""

# Clean old assets
echo "Removing old asset files..."
sudo rm -rf /var/www/html/assets
sudo rm -f /var/www/html/index.html /var/www/html/*.js /var/www/html/*.css
echo "✅ Old files removed"
echo ""

# Update nginx config to prevent index.html caching
echo "Updating nginx configuration..."
sudo tee /etc/nginx/sites-enabled/default > /dev/null << 'NGINX_CONFIG'
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    # Correct domains (.org) and legacy .com for any stray traffic
    server_name 98.81.50.37 desnepal.org www.desnepal.org desnepal.com www.desnepal.com;
    
    # Frontend - Serve React app
    root /var/www/html;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
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
        # Tighter timeouts to fail fast if backend hangs
        proxy_connect_timeout 10s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
        # Prevent very long buffering delays
        proxy_buffering on;
        proxy_buffers 8 16k;
        proxy_busy_buffers_size 32k;
    }
    
    # Resource files proxy (PDFs, documents, etc.)
    location /resources/ {
        proxy_pass http://localhost:8080/resources/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Cache resource files for better performance
        proxy_cache_valid 200 1h;
        add_header X-Cache-Status $upstream_cache_status;
        proxy_read_timeout 30s;
    }
    
    # Static assets caching (hash-based filenames can be cached aggressively)
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # index.html should never be cached (contains references to hashed assets)
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
        try_files $uri =404;
    }
    
    # Frontend routes - SPA fallback (must be last)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    # Basic performance tuning
    keepalive_timeout 15s;
    sendfile on;
    tcp_nodelay on;
    tcp_nopush on;
}
NGINX_CONFIG
echo "✅ Nginx config updated"
echo ""

# Test nginx config
echo "Testing nginx configuration..."
sudo nginx -t
if [ $? -eq 0 ]; then
    echo "✅ Nginx config is valid"
    echo ""
    echo "Restarting nginx..."
    sudo systemctl restart nginx
    echo "✅ Nginx restarted"
else
    echo "❌ Nginx config has errors - not restarting"
    exit 1
fi
echo ""

echo "=== Now trigger a fresh deployment ==="
echo "The next GitHub Actions deployment will populate the files."
echo ""
echo "OR manually redeploy the latest build:"
echo "  cd /home/ubuntu"
echo "  # Download latest build from GitHub Actions artifacts"
echo ""
