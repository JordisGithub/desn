#!/bin/bash

# HTTPS Fix Script for desnepal.com
# This script fixes the Nginx configuration to properly handle HTTPS traffic

set -e

SERVER_IP="13.204.228.199"
SERVER_USER="ubuntu"

echo "🔧 Fixing HTTPS configuration for desnepal.com..."
echo "Server: $SERVER_IP"
echo ""

# Check if we can connect
if ! ssh -o ConnectTimeout=5 $SERVER_USER@$SERVER_IP "echo 'Connected'" &>/dev/null; then
    echo "❌ Cannot connect to server. Please ensure:"
    echo "   1. Your SSH key is properly configured"
    echo "   2. The server is running"
    echo "   3. Security groups allow SSH access"
    exit 1
fi

echo "✅ Connected to server"
echo ""

# Backup current Nginx config
echo "📦 Backing up current Nginx configuration..."
ssh $SERVER_USER@$SERVER_IP "sudo cp /etc/nginx/sites-available/desn /etc/nginx/sites-available/desn.backup.\$(date +%Y%m%d_%H%M%S)"

# Create the corrected Nginx configuration
echo "📝 Creating new Nginx configuration..."
ssh $SERVER_USER@$SERVER_IP "sudo tee /etc/nginx/sites-available/desn > /dev/null" <<'NGINX_CONFIG'
# HTTP server - redirect all traffic to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name desnepal.com www.desnepal.com;

    # Redirect all HTTP requests to HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS server - main configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name desnepal.com www.desnepal.com;

    # SSL Certificate Configuration
    ssl_certificate /etc/letsencrypt/live/desnepal.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/desnepal.com/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/desnepal.com/chain.pem;

    # SSL Security Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Logging
    access_log /var/log/nginx/desn-access.log;
    error_log /var/log/nginx/desn-error.log;

    # Root directory for frontend
    root /home/ubuntu/desn-app/frontend;
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    # API proxy to backend
    location /api/ {
        proxy_pass http://localhost:8080/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Frontend - SPA routing
    location / {
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
NGINX_CONFIG

echo "✅ Nginx configuration updated"
echo ""

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
if ssh $SERVER_USER@$SERVER_IP "sudo nginx -t"; then
    echo "✅ Nginx configuration is valid"
else
    echo "❌ Nginx configuration test failed. Restoring backup..."
    ssh $SERVER_USER@$SERVER_IP "sudo cp /etc/nginx/sites-available/desn.backup.* /etc/nginx/sites-available/desn"
    exit 1
fi

echo ""

# Reload Nginx
echo "🔄 Reloading Nginx..."
ssh $SERVER_USER@$SERVER_IP "sudo systemctl reload nginx"

echo "✅ Nginx reloaded successfully"
echo ""

# Verify services are running
echo "🔍 Verifying services..."
ssh $SERVER_USER@$SERVER_IP "sudo systemctl is-active nginx && echo '✅ Nginx is running'"
ssh $SERVER_USER@$SERVER_IP "sudo systemctl is-active desn-backend && echo '✅ Backend is running'"

echo ""
echo "🎉 HTTPS configuration fix complete!"
echo ""
echo "Testing connectivity..."
sleep 2

# Test HTTPS
if curl -sS -o /dev/null -w "%{http_code}" https://desnepal.com/ | grep -q "200"; then
    echo "✅ https://desnepal.com is responding"
else
    echo "⚠️  https://desnepal.com may need a moment to propagate"
fi

echo ""
echo "🔗 Your site should now be accessible at:"
echo "   https://desnepal.com"
echo ""
