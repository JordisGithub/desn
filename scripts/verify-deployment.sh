#!/bin/bash
# Deployment Verification Script
# Run this on your AWS server to diagnose caching issues

echo "=== DESN Deployment Verification ==="
echo ""

echo "1. Checking file timestamps in /var/www/html/"
ls -lh /var/www/html/index.html
echo ""
ls -lh /var/www/html/assets/*.js | head -5
echo ""

echo "2. Checking nginx configuration"
sudo nginx -t
echo ""

echo "3. Checking for nginx cache directories"
if [ -d "/var/cache/nginx" ]; then
    echo "Nginx cache exists:"
    du -sh /var/cache/nginx
else
    echo "No /var/cache/nginx directory found"
fi
echo ""

echo "4. Current nginx.conf location"
sudo nginx -V 2>&1 | grep -o 'conf-path=\S*'
echo ""

echo "5. Active nginx configuration file"
NGINX_CONF=$(sudo nginx -V 2>&1 | grep -o 'conf-path=[^ ]*' | cut -d'=' -f2)
if [ -f "$NGINX_CONF" ]; then
    echo "Main config: $NGINX_CONF"
    sudo cat "$NGINX_CONF" | grep -E "include |sites-enabled" | head -5
fi
echo ""

echo "6. Checking for site-specific config"
if [ -f "/etc/nginx/sites-enabled/default" ]; then
    echo "Site config found: /etc/nginx/sites-enabled/default"
    sudo cat /etc/nginx/sites-enabled/default | grep -E "proxy_cache|fastcgi_cache|expires|Cache-Control" || echo "No explicit cache directives"
else
    echo "No /etc/nginx/sites-enabled/default"
fi
echo ""

echo "7. Backend service status"
sudo systemctl status desn-backend --no-pager | head -10
echo ""

echo "8. Recent deployment activity"
ls -lt /home/ubuntu/ | head -10
echo ""

echo "=== Suggested Actions ==="
echo ""
echo "If files are old (timestamps before latest deployment):"
echo "  sudo rm -rf /var/www/html/*"
echo "  # Then re-run GitHub Actions deployment"
echo ""
echo "If nginx cache exists:"
echo "  sudo rm -rf /var/cache/nginx/*"
echo "  sudo systemctl restart nginx"
echo ""
echo "If you added CloudFront:"
echo "  Create a cache invalidation for /* in CloudFront console"
echo ""
