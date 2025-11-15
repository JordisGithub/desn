# Deployment Scripts

This directory contains scripts for deploying the DESN application to AWS EC2.

## Current Server

- **IP Address:** 15.206.210.71
- **Region:** ap-south-1 (Mumbai)
- **Instance:** t2.small (Ubuntu 24.04.3 LTS)
- **SSH Key:** ~/.ssh/desn-app-key.pem

## Active Scripts

### `deploy-simple.sh` ⭐ (Recommended)

**Purpose:** Complete deployment script that builds and deploys both frontend and backend.

**Usage:**

```bash
./scripts/deploy-simple.sh
```

**What it does:**

1. Tests SSH connection to server
2. Builds frontend with npm/vite
3. Builds backend with Maven
4. Uploads frontend files to `/home/ubuntu/desn-app/frontend/`
5. Uploads backend JAR to `/home/ubuntu/desn-app/backend/app.jar`
6. Creates/updates `.env` file with database credentials
7. Restarts backend service and nginx

**Requirements:**

- Node.js and npm installed
- Java 21 and Maven installed
- SSH key at ~/.ssh/desn-app-key.pem with 400 permissions

---

### `setup-single-server.sh`

**Purpose:** Initial server setup script (one-time use).

**Usage:**

```bash
# Upload to server
scp -i ~/.ssh/desn-app-key.pem scripts/setup-single-server.sh ubuntu@15.206.210.71:/tmp/

# SSH and run
ssh -i ~/.ssh/desn-app-key.pem ubuntu@15.206.210.71
bash /tmp/setup-single-server.sh
```

**What it does:**

1. Installs Java 21 (OpenJDK)
2. Installs PostgreSQL 16
3. Creates database and user (desn/desn_user)
4. Installs and configures Nginx
5. Sets up UFW firewall (ports 22, 80, 443, 8080)
6. Creates systemd service for backend
7. Sets up automated daily database backups (2 AM)
8. Creates required directories

**Status:** ✅ Already run on current server

---

### `nginx-simple.conf`

**Purpose:** Nginx configuration file for reverse proxy setup.

**Location on server:** `/etc/nginx/sites-available/default`

**Configuration:**

- Serves frontend from `/home/ubuntu/desn-app/frontend/`
- Proxies `/api/*` to `localhost:8080`
- Proxies `/actuator/*` to `localhost:8080`

**To update:**

```bash
scp -i ~/.ssh/desn-app-key.pem scripts/nginx-simple.conf ubuntu@15.206.210.71:/tmp/
ssh -i ~/.ssh/desn-app-key.pem ubuntu@15.206.210.71
sudo cp /tmp/nginx-simple.conf /etc/nginx/sites-available/default
sudo nginx -t
sudo systemctl reload nginx
```

---

### `setup-postgresql.sh`

**Purpose:** PostgreSQL installation and configuration (included in setup-single-server.sh).

**Status:** Reference only - functionality now in setup-single-server.sh

---

## Utility Scripts

### `optimize-images.cjs` / `optimize-images.js`

**Purpose:** Image optimization for web performance.

**Usage:**

```bash
node scripts/optimize-images.cjs
```

---

### `import-resources.sql`

**Purpose:** Sample SQL data for resources and events.

**Usage:**

```bash
# On server
sudo -u postgres psql desn < /path/to/import-resources.sql
```

---

## Deprecated/Removed Scripts

The following scripts were for the old server (13.204.228.199) and have been removed:

- ❌ `deploy-manual.sh` - Old manual deployment
- ❌ `deploy-nginx-config.sh` - Old nginx setup
- ❌ `deploy-server.sh` - Old server-side deployment
- ❌ `deploy-to-aws.sh` - Old AWS deployment
- ❌ `fix-https-nginx.sh` - Old HTTPS fixes
- ❌ `install-nginx-config-system.sh` - Old nginx installer
- ❌ `setup-aws-server.sh` - Old server setup

---

## Quick Reference

### Deploy Application

```bash
./scripts/deploy-simple.sh
```

### Check Deployment Status

```bash
curl http://15.206.210.71
curl http://15.206.210.71/actuator/health
curl http://15.206.210.71/api/resources
```

### View Logs

```bash
ssh -i ~/.ssh/desn-app-key.pem ubuntu@15.206.210.71
sudo journalctl -u desn-backend -n 100 --no-pager
sudo tail -f /var/log/nginx/error.log
```

### Restart Services

```bash
ssh -i ~/.ssh/desn-app-key.pem ubuntu@15.206.210.71
sudo systemctl restart desn-backend
sudo systemctl reload nginx
```

---

## Troubleshooting

### SSH Connection Fails

```bash
# Check key permissions
chmod 400 ~/.ssh/desn-app-key.pem

# Test connection
ssh -i ~/.ssh/desn-app-key.pem ubuntu@15.206.210.71

# Verify security group allows SSH from your IP
```

### Build Fails

```bash
# Frontend build
npm ci && npm run build

# Backend build
cd backend && ./mvnw clean package -DskipTests
```

### Deployment Script Fails

```bash
# Check all requirements installed
node --version  # Should be v20+
java -version   # Should be 21
mvn --version   # Should be 3.6+

# Check SSH key exists
ls -la ~/.ssh/desn-app-key.pem
```

---

Last Updated: November 15, 2025
