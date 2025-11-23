#!/bin/bash
# Setup Dev Environment for dev.desnepal.org
# Run this on your AWS server: ubuntu@ip-172-31-9-188

set -e

echo "=== Setting up Dev Environment for dev.desnepal.org ==="
echo ""

# 1. Create dev database
echo "1. Creating dev database..."
sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname='desn_dev'" | grep -q 1 || \
sudo -u postgres psql -c "CREATE DATABASE desn_dev OWNER desn_user;"
echo "✅ Dev database ready"
echo ""

# 2. Copy production database schema to dev (optional - creates empty dev db)
echo "2. Setting up dev database schema..."
sudo -u postgres pg_dump desn --schema-only | sudo -u postgres psql desn_dev
echo "✅ Dev database schema created"
echo ""

# 3. Create frontend directory
echo "3. Creating dev frontend directory..."
sudo mkdir -p /var/www/desnepal-dev
sudo chown -R ubuntu:ubuntu /var/www/desnepal-dev
echo "✅ Dev frontend directory ready"
echo ""

# 4. Create backend directory
echo "4. Creating dev backend directory..."
mkdir -p ~/desn-app/backend-dev
echo "✅ Dev backend directory ready"
echo ""

# 5. Setup nginx configuration
echo "5. Setting up nginx configuration for dev.desnepal.org..."

# Check if nginx config already exists
if [ -f "/etc/nginx/sites-available/desn-dev.conf" ]; then
    echo "   Dev nginx config already exists, backing up..."
    sudo cp /etc/nginx/sites-available/desn-dev.conf /etc/nginx/sites-available/desn-dev.conf.bak
fi

# You'll need to copy the nginx-dev.conf from your repo to the server
echo "   Please copy nginx-dev.conf to /etc/nginx/sites-available/desn-dev.conf"
echo "   Then run: sudo ln -sf /etc/nginx/sites-available/desn-dev.conf /etc/nginx/sites-enabled/"
echo ""

# 6. Test and reload nginx
echo "6. Testing nginx configuration..."
sudo nginx -t
if [ $? -eq 0 ]; then
    echo "✅ Nginx config is valid"
    sudo systemctl reload nginx
    echo "✅ Nginx reloaded"
else
    echo "❌ Nginx config has errors"
    exit 1
fi
echo ""

# 7. Setup DNS (manual step)
echo "7. DNS Configuration (MANUAL STEP):"
echo "   Add an A record in your DNS provider:"
echo "   - Hostname: dev.desnepal.org"
echo "   - Type: A"
echo "   - Value: 98.81.50.37"
echo "   - TTL: 300 (5 minutes)"
echo ""

# 8. Setup SSL (optional)
echo "8. SSL Certificate Setup (OPTIONAL):"
echo "   After DNS is configured, run:"
echo "   sudo certbot --nginx -d dev.desnepal.org"
echo ""

echo "=== Dev Environment Setup Summary ==="
echo "✅ Dev Database: desn_dev (PostgreSQL)"
echo "✅ Dev Frontend: /var/www/desnepal-dev"
echo "✅ Dev Backend: ~/desn-app/backend-dev (port 8081)"
echo "✅ Dev Nginx: /etc/nginx/sites-available/desn-dev.conf"
echo ""
echo "Next Steps:"
echo "1. Configure DNS A record for dev.desnepal.org → 98.81.50.37"
echo "2. Copy nginx-dev.conf to server and enable it"
echo "3. Run: sudo certbot --nginx -d dev.desnepal.org (optional SSL)"
echo "4. Push to develop branch to trigger auto-deployment"
echo ""
echo "==================================="
