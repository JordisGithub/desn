# Dev Environment Setup Guide

This guide explains how to set up and use the dev.desnepal.org development environment.

## Architecture

### Production (desnepal.org)
- **Branch:** `master`
- **Frontend:** `/var/www/desnepal/`
- **Backend:** Port 8080, systemd service `desn-backend`
- **Database:** `desn` (PostgreSQL)
- **Deployment:** Auto-deploys on push to `master` branch

### Development (dev.desnepal.org)
- **Branch:** `develop`
- **Frontend:** `/var/www/desnepal-dev/`
- **Backend:** Port 8081, systemd service `desn-backend-dev`
- **Database:** `desn_dev` (PostgreSQL)
- **Deployment:** Auto-deploys on push to `develop` branch

## Initial Setup

### 1. Configure DNS

Add an A record in your DNS provider (AWS Route 53, Cloudflare, etc.):

```
Type: A
Name: dev.desnepal.org
Value: 98.81.50.37
TTL: 300
```

Wait 5-10 minutes for DNS propagation. Verify with:
```bash
nslookup dev.desnepal.org
```

### 2. Setup Server Environment

On your AWS server (ubuntu@ip-172-31-9-188):

```bash
# Copy the setup script to the server
scp scripts/setup-dev-environment.sh ubuntu@98.81.50.37:~/
ssh ubuntu@98.81.50.37

# Run the setup script
bash ~/setup-dev-environment.sh
```

### 3. Configure Nginx

```bash
# Copy nginx config to server
sudo cp /path/to/nginx-dev.conf /etc/nginx/sites-available/desn-dev.conf

# Enable the site
sudo ln -sf /etc/nginx/sites-available/desn-dev.conf /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

Alternatively, use the GitHub repo's nginx-dev.conf:

```bash
# On your local machine
scp nginx-dev.conf ubuntu@98.81.50.37:~/

# On the server
sudo mv ~/nginx-dev.conf /etc/nginx/sites-available/desn-dev.conf
sudo ln -sf /etc/nginx/sites-available/desn-dev.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 4. Setup SSL (Optional but Recommended)

After DNS is configured:

```bash
sudo certbot --nginx -d dev.desnepal.org
```

## Usage

### Deploying to Dev

Simply push to the `develop` branch:

```bash
git checkout develop
git add .
git commit -m "Your changes"
git push origin develop
```

GitHub Actions will automatically:
1. Run tests
2. Build frontend and backend
3. Deploy to `/var/www/desnepal-dev/`
4. Restart dev backend service (port 8081)
5. Restart nginx

### Testing on Dev

1. Visit: http://dev.desnepal.org (or https:// if SSL is configured)
2. Test your changes
3. Check logs if needed:
   ```bash
   # Dev backend logs
   sudo journalctl -u desn-backend-dev -f
   
   # Nginx logs
   sudo tail -f /var/log/nginx/error.log
   sudo tail -f /var/log/nginx/access.log
   ```

### Promoting to Production

Once you've tested on dev:

```bash
# Create PR from develop to master
gh pr create --base master --head develop --title "Release: [description]"

# Or via GitHub web interface
# Merge the PR when ready
```

The merge to `master` will automatically deploy to production (desnepal.org).

## Managing Databases

### Copy Production Data to Dev (for testing)

```bash
# On the server
sudo -u postgres pg_dump desn | sudo -u postgres psql desn_dev
```

### Reset Dev Database

```bash
# Drop and recreate
sudo -u postgres psql -c "DROP DATABASE desn_dev;"
sudo -u postgres psql -c "CREATE DATABASE desn_dev OWNER desn_user;"

# Copy schema from production
sudo -u postgres pg_dump desn --schema-only | sudo -u postgres psql desn_dev
```

## Troubleshooting

### Dev backend not starting

```bash
# Check service status
sudo systemctl status desn-backend-dev

# View logs
sudo journalctl -u desn-backend-dev -n 50

# Restart service
sudo systemctl restart desn-backend-dev
```

### Nginx errors

```bash
# Test config
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log

# Restart nginx
sudo systemctl restart nginx
```

### Port conflicts

If port 8081 is already in use:

```bash
# Check what's using port 8081
sudo netstat -tlnp | grep 8081

# Kill the process if needed
sudo kill -9 <PID>

# Restart dev backend
sudo systemctl restart desn-backend-dev
```

### DNS not resolving

```bash
# Check DNS propagation
nslookup dev.desnepal.org
dig dev.desnepal.org

# If not resolving, wait 5-10 minutes and try again
```

## Service Management

### Dev Backend Service

```bash
# Start
sudo systemctl start desn-backend-dev

# Stop
sudo systemctl stop desn-backend-dev

# Restart
sudo systemctl restart desn-backend-dev

# Status
sudo systemctl status desn-backend-dev

# Logs
sudo journalctl -u desn-backend-dev -f
```

### Production Backend Service

```bash
# Same commands, but use 'desn-backend' instead
sudo systemctl status desn-backend
```

## GitHub Actions Workflows

### Production Deployment
- **File:** `.github/workflows/deploy-personal.yml`
- **Trigger:** Push to `master` branch
- **Deploys to:** desnepal.org

### Dev Deployment
- **File:** `.github/workflows/deploy-dev.yml`
- **Trigger:** Push to `develop` branch
- **Deploys to:** dev.desnepal.org

## Environment Variables

### Production Backend (Port 8080)
- `SERVER_PORT`: 8080 (default)
- `SPRING_DATASOURCE_URL`: jdbc:postgresql://localhost:5432/desn
- `VITE_API_BASE_URL`: http://98.81.50.37

### Dev Backend (Port 8081)
- `SERVER_PORT`: 8081
- `SPRING_DATASOURCE_URL`: jdbc:postgresql://localhost:5432/desn_dev
- `VITE_API_BASE_URL`: http://dev.desnepal.org

## Best Practices

1. **Always test on dev first** before merging to master
2. **Keep dev and production databases separate** to avoid data corruption
3. **Use meaningful commit messages** for easier tracking
4. **Review GitHub Actions logs** after each deployment
5. **Monitor both environments** for errors and performance

## Quick Reference

| Environment | Domain | Branch | Frontend Path | Backend Port | Database |
|-------------|--------|--------|--------------|--------------|----------|
| Production | desnepal.org | master | /var/www/desnepal | 8080 | desn |
| Development | dev.desnepal.org | develop | /var/www/desnepal-dev | 8081 | desn_dev |
