#!/bin/bash

# Initial AWS Server Setup Script
# Run this once on your AWS server to prepare it for deployments

set -e

echo "🔧 Setting up AWS server for DESN application..."

# Update system
echo "📦 Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install required packages
echo "📦 Installing required packages..."
sudo apt-get install -y \
    openjdk-21-jre-headless \
    nginx \
    curl \
    jq \
    git \
    ufw

# Setup firewall
echo "🔥 Configuring firewall..."
sudo ufw --force enable
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS (for future SSL)
sudo ufw status

# Create application directory
echo "📁 Creating application directories..."
sudo mkdir -p /home/ubuntu/desn-app/{frontend,backend,logs}
sudo chown -R ubuntu:ubuntu /home/ubuntu/desn-app

# Setup log rotation
echo "📝 Setting up log rotation..."
sudo tee /etc/logrotate.d/desn-app > /dev/null <<'EOF'
/home/ubuntu/desn-app/logs/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    missingok
    create 0644 ubuntu ubuntu
}
EOF

# Optimize system for Java
echo "⚙️  Optimizing system settings..."
sudo tee -a /etc/security/limits.conf > /dev/null <<'EOF'
ubuntu soft nofile 65536
ubuntu hard nofile 65536
EOF

# Create health check script
echo "🏥 Creating health check script..."
tee /home/ubuntu/desn-app/health-check.sh > /dev/null <<'EOF'
#!/bin/bash
# Health check script for monitoring

echo "=== DESN Application Health Check ==="
echo "Date: $(date)"
echo ""

echo "Backend Service:"
sudo systemctl status desn-backend --no-pager | grep "Active:"
curl -s http://localhost:8080/actuator/health | jq . 2>/dev/null || echo "Backend not responding"
echo ""

echo "Nginx Service:"
sudo systemctl status nginx --no-pager | grep "Active:"
echo ""

echo "Disk Usage:"
df -h / | tail -1
echo ""

echo "Memory Usage:"
free -h | grep Mem
echo ""

echo "Recent Backend Logs:"
tail -20 /home/ubuntu/desn-app/logs/backend.log 2>/dev/null || echo "No logs yet"
EOF

chmod +x /home/ubuntu/desn-app/health-check.sh

echo "✅ Server setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Add your GitHub Actions secrets in the repository settings"
echo "2. Push to master branch to trigger automatic deployment"
echo "3. Run '/home/ubuntu/desn-app/health-check.sh' to monitor the application"
echo ""
echo "🌐 Server IP: $(curl -s ifconfig.me)"
