#!/bin/bash

# DESN Application Deployment Script for AWS Server
# This script deploys the frontend and backend on the server

set -e

# Use SERVER_USER from environment or default to ubuntu
SERVER_USER=${SERVER_USER:-ubuntu}
APP_DIR="/home/$SERVER_USER/desn-app"
BACKEND_DIR="$APP_DIR/backend"
FRONTEND_DIR="$APP_DIR/frontend"
LOG_DIR="$APP_DIR/logs"

echo "🚀 Starting DESN application deployment..."

# Stop existing services
echo "⏹️  Stopping existing services..."
sudo systemctl stop desn-backend 2>/dev/null || true
sudo systemctl stop nginx 2>/dev/null || true
sudo systemctl stop caddy 2>/dev/null || true

# Stop any process using port 80
echo "🔍 Checking for processes on port 80..."
sudo fuser -k 80/tcp 2>/dev/null || true

# Install required packages if not present
echo "📦 Checking Java version..."
if ! command -v java &> /dev/null; then
    echo "Installing Java 21..."
    sudo apt-get update
    sudo apt-get install -y openjdk-21-jre-headless
elif ! java -version 2>&1 | grep -q "openjdk version \"21"; then
    echo "Updating to Java 21..."
    sudo apt-get update
    sudo apt-get install -y openjdk-21-jre-headless
    sudo update-alternatives --set java /usr/lib/jvm/java-21-openjdk-amd64/bin/java
fi

# Verify Java version
java -version

if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    sudo apt-get update
    sudo apt-get install -y nginx
fi

# Install certbot (if not present) to manage HTTPS certificates
if ! command -v certbot &> /dev/null; then
    echo "📦 Installing Certbot (letsencrypt)..."
    sudo apt-get update
    sudo apt-get install -y certbot python3-certbot-nginx
fi

# Setup backend systemd service
echo "🔧 Setting up backend service..."
sudo tee /etc/systemd/system/desn-backend.service > /dev/null <<EOF
[Unit]
Description=DESN Backend Spring Boot Application
After=network.target

[Service]
Type=simple
User=$SERVER_USER
WorkingDirectory=$BACKEND_DIR
EnvironmentFile=$BACKEND_DIR/.env
ExecStart=/usr/lib/jvm/java-21-openjdk-amd64/bin/java -Xmx512m -Xms256m -jar $BACKEND_DIR/app.jar --spring.profiles.active=prod
Restart=always
RestartSec=10
StandardOutput=append:$LOG_DIR/backend.log
StandardError=append:$LOG_DIR/backend-error.log

Environment="SERVER_PORT=8080"

[Install]
WantedBy=multi-user.target
EOF

# Setup Nginx configuration
echo "🌐 Configuring Nginx..."
# If certificates for desnepal.com already exist (managed by Certbot), avoid overwriting
# Certbot-created SSL config. Otherwise, deploy a basic HTTP site config and request certs.
if [ -f "/etc/letsencrypt/live/desnepal.com/fullchain.pem" ]; then
    echo "🔐 Found existing Let's Encrypt certificate for desnepal.com — preserving Certbot-managed nginx config."
else
    echo "⚠️ No certificate found for desnepal.com — installing HTTP-only nginx site and requesting certbot certificate."
    sudo tee /etc/nginx/sites-available/desn > /dev/null <<NGINXCONF
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    
    server_name _;
    
    # Frontend - Serve React app
    root $FRONTEND_DIR;
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
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
NGINXCONF

    # Enable Nginx site
    sudo ln -sf /etc/nginx/sites-available/desn /etc/nginx/sites-enabled/desn
    sudo rm -f /etc/nginx/sites-enabled/default
fi

# Test Nginx configuration
echo "🔍 Testing Nginx configuration..."
sudo nginx -t

# Reload systemd and start services
echo "🔄 Starting services..."
sudo systemctl daemon-reload
sudo systemctl enable desn-backend
sudo systemctl start desn-backend

# Wait for backend to be healthy
echo "⏳ Waiting for backend to start..."
for i in {1..30}; do
    if curl -f http://localhost:8080/actuator/health 2>/dev/null; then
        echo "✅ Backend is healthy!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Backend failed to start in time"
        echo ""
        echo "📋 Last 50 lines of systemd journal:"
        sudo journalctl -u desn-backend -n 50 --no-pager
        echo ""
        echo "📋 Backend error log:"
        sudo tail -n 50 $LOG_DIR/backend-error.log 2>/dev/null || echo "No error log found"
        echo ""
        echo "📋 Backend output log:"
        sudo tail -n 50 $LOG_DIR/backend.log 2>/dev/null || echo "No output log found"
        exit 1
    fi
    sleep 2
done

# Start or reload Nginx (certbot may have already started it)
echo "🌐 Starting Nginx..."
sudo systemctl enable nginx
if sudo systemctl is-active --quiet nginx; then
    echo "♻️  Nginx is already running, reloading configuration..."
    sudo systemctl reload nginx
else
    echo "▶️  Starting Nginx..."
    sudo systemctl start nginx
fi

# If no cert exists, try to obtain one with certbot (non-interactive). Use ADMIN_EMAIL env var if provided.
if [ ! -f "/etc/letsencrypt/live/desnepal.com/fullchain.pem" ]; then
    ADMIN_EMAIL=${ADMIN_EMAIL:-admin@desnepal.com}
    echo "🛡️ Attempting to obtain Let's Encrypt certificate for desnepal.com (admin: $ADMIN_EMAIL)"
    sudo certbot --nginx -d desnepal.com --non-interactive --agree-tos --email "$ADMIN_EMAIL" || {
        echo "⚠️ Certbot failed to obtain certificate automatically. You may need to run certbot manually on the server."
    }

    # Ensure certbot timer enabled for auto-renewal
    sudo systemctl enable --now certbot.timer || true
    
    # Reload nginx after certbot modifies the config
    echo "♻️  Reloading Nginx with SSL configuration..."
    sudo systemctl reload nginx
else
    # Certificate already exists, just ensure renewal timer is active
    echo "✅ SSL certificate already configured"
    sudo systemctl enable --now certbot.timer 2>/dev/null || true
fi

echo "✅ Deployment completed successfully!"
echo ""
echo "📊 Service Status:"
sudo systemctl status desn-backend --no-pager | head -20
sudo systemctl status nginx --no-pager | head -10
echo ""
echo "🌐 Application URL: http://$(curl -s ifconfig.me)"
echo "🔧 Backend logs: $LOG_DIR/backend.log"
