# Nginx Configuration Maintenance Guide

## Overview

This document explains how to maintain the Nginx HTTPS configuration for desnepal.com to prevent configuration loss.

## Problem

The HTTPS configuration for desnepal.com has been lost multiple times, causing the site to become inaccessible via HTTPS. This happens when:
- Server configurations are manually edited without proper backup
- Nginx config files are overwritten during deployments
- System updates or restarts lose uncommitted changes

## Solution

We've implemented a permanent configuration management system:

### 1. Version-Controlled Configuration

The official Nginx configuration is stored in version control:
- **Location**: `backend/nginx-desn.conf`
- **Purpose**: Single source of truth for the production Nginx configuration

### 2. Automated Deployment Script

A deployment script ensures consistent configuration deployment:
- **Location**: `scripts/deploy-nginx-config.sh`
- **Features**:
  - Automatic backups before changes
  - Configuration validation before applying
  - Rollback on failure
  - Creates symbolic links properly
  - Reloads Nginx safely

### 3. Configuration Backup System

All configuration changes are automatically backed up:
- **Backup Location**: `/home/ubuntu/nginx-backups/` on the server
- **Format**: `desn_YYYYMMDD_HHMMSS.conf`
- **Retention**: Manual cleanup (keep at least last 5 backups)

## How to Deploy Nginx Configuration

### From Your Local Machine

```bash
# 1. Navigate to the project directory
cd /Users/jordi/git/desn

# 2. Make the script executable (first time only)
chmod +x scripts/deploy-nginx-config.sh

# 3. Copy the script to the server
scp -i /Users/jordi/Downloads/private_key.pem \
    scripts/deploy-nginx-config.sh \
    ubuntu@13.204.228.199:/tmp/

# 4. Run the script on the server
ssh -i /Users/jordi/Downloads/private_key.pem ubuntu@13.204.228.199 \
    "sudo bash /tmp/deploy-nginx-config.sh"
```

### Directly on the Server

```bash
# 1. SSH into the server
ssh -i /Users/jordi/Downloads/private_key.pem ubuntu@13.204.228.199

# 2. If you have the script on the server, run it
sudo bash /path/to/deploy-nginx-config.sh

# 3. Or manually apply the configuration from the repository
cd /home/ubuntu/desn-app
git pull
sudo cp backend/nginx-desn.conf /etc/nginx/sites-available/desn
sudo nginx -t
sudo systemctl reload nginx
```

## Verifying the Configuration

### Check HTTPS is Working

```bash
# Test HTTPS connection
curl -I https://desnepal.com

# Should return HTTP/2 200 and show security headers
```

### Check HTTP to HTTPS Redirect

```bash
# Test HTTP redirect
curl -I http://desnepal.com

# Should return HTTP/1.1 301 with Location: https://desnepal.com
```

### Check Nginx Status

```bash
ssh -i /Users/jordi/Downloads/private_key.pem ubuntu@13.204.228.199 \
    "sudo systemctl status nginx"
```

### View Current Configuration

```bash
ssh -i /Users/jordi/Downloads/private_key.pem ubuntu@13.204.228.199 \
    "sudo cat /etc/nginx/sites-available/desn"
```

## Troubleshooting

### Site Not Loading via HTTPS

1. **Check if Nginx is running:**
   ```bash
   sudo systemctl status nginx
   ```

2. **Check if SSL certificates exist:**
   ```bash
   sudo ls -la /etc/letsencrypt/live/desnepal.com/
   ```

3. **Check Nginx configuration:**
   ```bash
   sudo nginx -t
   ```

4. **Check Nginx error logs:**
   ```bash
   sudo tail -50 /var/log/nginx/error.log
   ```

5. **Re-deploy the configuration:**
   ```bash
   bash /tmp/deploy-nginx-config.sh
   ```

### Configuration Test Fails

1. **View the error:**
   ```bash
   sudo nginx -t
   ```

2. **Restore from backup:**
   ```bash
   # List available backups
   ls -lh /home/ubuntu/nginx-backups/
   
   # Restore a specific backup
   sudo cp /home/ubuntu/nginx-backups/desn_YYYYMMDD_HHMMSS.conf \
       /etc/nginx/sites-available/desn
   
   # Test and reload
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### SSL Certificate Issues

If SSL certificates are expired or missing:

```bash
# Renew Let's Encrypt certificates
sudo certbot renew

# Test certificate renewal
sudo certbot renew --dry-run

# After renewal, reload Nginx
sudo systemctl reload nginx
```

## Preventing Future Issues

### Always Use the Deployment Script

- ✅ **DO**: Use `deploy-nginx-config.sh` for configuration changes
- ❌ **DON'T**: Manually edit `/etc/nginx/sites-available/desn` on the server

### Keep Configuration in Version Control

- ✅ **DO**: Update `backend/nginx-desn.conf` in Git
- ✅ **DO**: Commit configuration changes with clear messages
- ❌ **DON'T**: Make server-side changes without updating the repository

### Regular Verification

Set up a monitoring check to verify HTTPS is working:

```bash
# Add to crontab for hourly checks
*/60 * * * * curl -sf https://desnepal.com > /dev/null || echo "Site down!" | mail -s "desnepal.com Alert" admin@example.com
```

## Configuration Details

### Current Setup

- **HTTP Port**: 80 (redirects to HTTPS)
- **HTTPS Port**: 443 (SSL/TLS with HTTP/2)
- **SSL Certificate**: Let's Encrypt (auto-renews)
- **Frontend**: `/home/ubuntu/desn-app/frontend`
- **Backend API**: Proxied to `localhost:8080`

### Key Features

- ✅ Automatic HTTP to HTTPS redirect
- ✅ HTTP/2 support
- ✅ HSTS (HTTP Strict Transport Security)
- ✅ Security headers (XSS, frame options, content type)
- ✅ Gzip compression
- ✅ Static asset caching (1 year)
- ✅ SPA routing support (fallback to index.html)

## Files Reference

| File | Purpose |
|------|---------|
| `backend/nginx-desn.conf` | Master Nginx configuration (version controlled) |
| `scripts/deploy-nginx-config.sh` | Automated deployment script |
| `/etc/nginx/sites-available/desn` | Active configuration on server |
| `/etc/nginx/sites-enabled/desn` | Symbolic link to sites-available |
| `/home/ubuntu/nginx-backups/` | Backup directory on server |
| `/etc/letsencrypt/live/desnepal.com/` | SSL certificates |

## Contact

If the HTTPS configuration is lost again:

1. Don't panic - we have backups and deployment scripts
2. Run the deployment script: `scripts/deploy-nginx-config.sh`
3. If that doesn't work, restore from backup in `/home/ubuntu/nginx-backups/`
4. Check this documentation for troubleshooting steps

---

**Last Updated**: November 14, 2025  
**Configuration Version**: 2.0 (with HTTPS persistence)
