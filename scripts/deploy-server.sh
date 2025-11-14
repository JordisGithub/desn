#!/bin/bash

# DESN Application Deployment Script for AWS Server
# This script deploys the frontend and backend on the server

set -e

APP_DIR="/home/ubuntu/desn-app"
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
if ! command -v java &> /dev/null; then
    echo "📦 Installing Java 21..."
    sudo apt-get update
    sudo apt-get install -y openjdk-21-jre-headless
fi

if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    sudo apt-get update
    sudo apt-get install -y nginx
fi

# Setup backend systemd service
echo "🔧 Setting up backend service..."
sudo tee /etc/systemd/system/desn-backend.service > /dev/null <<EOF
[Unit]
Description=DESN Backend Spring Boot Application
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=$BACKEND_DIR
EnvironmentFile=$BACKEND_DIR/.env
ExecStart=/usr/bin/java -Xmx512m -Xms256m -jar $BACKEND_DIR/app.jar --spring.profiles.active=prod
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
sudo tee /etc/nginx/sites-available/desn > /dev/null <<'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    
    server_name _;
    
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
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
EOF

# Enable Nginx site
sudo ln -sf /etc/nginx/sites-available/desn /etc/nginx/sites-enabled/desn
sudo rm -f /etc/nginx/sites-enabled/default

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

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

echo "✅ Deployment completed successfully!"
echo ""
echo "📊 Service Status:"
sudo systemctl status desn-backend --no-pager | head -20
sudo systemctl status nginx --no-pager | head -10
echo ""
echo "🌐 Application URL: http://$(curl -s ifconfig.me)"
echo "🔧 Backend logs: $LOG_DIR/backend.log"
