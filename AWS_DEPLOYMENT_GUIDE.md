# AWS Deployment Guide for DESN Application

## Current Production Architecture

The DESN application is deployed on AWS EC2 with the following setup:

- **Server**: Ubuntu 24.04.3 LTS on AWS EC2 t3.small (free tier eligible)
- **Region**: ap-south-1 (Mumbai)
- **Public IP**: 15.206.210.71
- **SSH Key**: desn-app-key.pem
- **Web Server**: Nginx 1.24.0 (reverse proxy)
- **Frontend**: React app served by Nginx from `/home/ubuntu/desn-app/frontend/`
- **Backend**: Spring Boot JAR running on port 8080
- **Database**: PostgreSQL 16 (localhost:5432/desn)
- **Cost**: Free tier eligible (750 hours/month free for first 12 months)
- **Proxy Setup**: Nginx forwards `/api/*` and `/actuator/*` requests to `localhost:8080`

## Quick Deployment Steps

### 1. Deploy with Automated Script

```bash
# From local machine, run the deployment script
cd /Users/jordi/git/desn
./scripts/deploy-simple.sh
```

This script will:

- Build the frontend with Vite
- Build the backend with Maven
- Upload both to the EC2 server
- Restart services automatically

### 2. Manual Deployment (if needed)

```bash
# Build frontend
npm ci && npm run build

# Build backend
cd backend && mvn clean package -DskipTests

# Upload to server
scp -i ~/.ssh/desn-app-key.pem -r dist/* ubuntu@15.206.210.71:/home/ubuntu/desn-app/frontend/
scp -i ~/.ssh/desn-app-key.pem backend/target/proxy-backend-*.jar ubuntu@15.206.210.71:/home/ubuntu/desn-app/backend/app.jar

# Restart services on server
ssh -i ~/.ssh/desn-app-key.pem ubuntu@15.206.210.71
sudo systemctl restart desn-backend
sudo systemctl reload nginx
```

### 3. Verify Deployment

```bash
# Check frontend loads
curl -I http://15.206.210.71

# Check backend health
curl http://15.206.210.71/api/actuator/health

# Check API is working
curl http://15.206.210.71/api/resources

# Check service status
ssh -i ~/.ssh/desn-app-key.pem ubuntu@15.206.210.71 "sudo systemctl status desn-backend nginx"
```

## Environment Variables on Server

The server's environment variables are configured in `/home/ubuntu/desn-app/backend/.env`:

```bash
# Database Configuration
DATABASE_URL=jdbc:postgresql://localhost:5432/desn
DATABASE_USERNAME=desn_user
DATABASE_PASSWORD=desn_password_2025

# JWT Security
JWT_SECRET=<secure-base64-secret>
JWT_EXPIRATION=86400000

# Email Configuration (currently disabled)
EMAIL_NOTIFICATIONS_ENABLED=false

# Khalti Payment Gateway (update with production keys)
KHALTI_PUBLIC_KEY=test_public_key
KHALTI_SECRET_KEY=test_secret_key

# Server Configuration
PORT=8080
```

### Updating Environment Variables

```bash
# SSH into server
ssh -i ~/.ssh/desn-app-key.pem ubuntu@15.206.210.71

# Edit environment file
nano /home/ubuntu/desn-app/backend/.env

# Restart backend to apply changes
sudo systemctl restart desn-backend
```

---

## Troubleshooting

### Backend Not Loading

1. **Check Backend Health**

```bash
curl http://15.206.210.71:8080/actuator/health
# or via nginx proxy
curl http://15.206.210.71/actuator/health
```

2. **Check Service Status**

```bash
ssh -i ~/.ssh/desn-app-key.pem ubuntu@15.206.210.71
sudo systemctl status desn-backend
sudo journalctl -u desn-backend -n 50 --no-pager
```

3. **Check Database Connection**

```bash
# Test PostgreSQL connection
sudo -u postgres psql -d desn -c "SELECT version();"

# Check backend logs for database errors
sudo journalctl -u desn-backend | grep -i "database\|postgresql"
```

### Security Group Settings

Ensure AWS Security Groups allow:

- **Inbound Rules:**
  - Port 22 (SSH) - Your IP only
  - Port 80 (HTTP) - 0.0.0.0/0
  - Port 443 (HTTPS) - 0.0.0.0/0 (when SSL is configured)
- **Outbound Rules:**
  - All traffic - 0.0.0.0/0

---

## Nginx Configuration

The application uses Nginx as a reverse proxy with the following setup:

### Configuration File Location

`/etc/nginx/sites-available/default` (or `/etc/nginx/nginx.conf`)

### Key Configuration Points

```nginx
server {
    listen 80;
    server_name _;

    # Frontend - serve static files
    location / {
        root /home/ubuntu/desn-app/frontend;
        try_files $uri $uri/ /index.html;
        index index.html;
    }

    # Backend API - proxy to Spring Boot
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend health check endpoint
    location /actuator/ {
        proxy_pass http://localhost:8080/actuator/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Note:** SSL/HTTPS can be added later using Let's Encrypt when a domain is configured.

### Managing Nginx

```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx

# View logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## SSL Certificate Setup (Future)

Currently, the application is accessible via HTTP. To add HTTPS:

### 1. Configure a Domain

- Point a domain (e.g., desnepal.com) to IP: 15.206.210.71
- Update DNS A record with your domain registrar

### 2. Install Let's Encrypt Certificate

```bash
# SSH into server
ssh -i ~/.ssh/desn-app-key.pem ubuntu@15.206.210.71

# Install Certbot
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

### 3. Verify HTTPS

```bash
curl -I https://yourdomain.com
```

## Backend Service Management

### Systemd Service

The backend runs as a systemd service: `/etc/systemd/system/desn-backend.service`

```ini
[Unit]
Description=DESN Backend Spring Boot Application
After=network.target postgresql.service

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/desn-app/backend
ExecStart=/usr/bin/java -jar /home/ubuntu/desn-app/backend/app.jar
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

# Load environment variables from .env file
EnvironmentFile=/home/ubuntu/desn-app/backend/.env

[Install]
WantedBy=multi-user.target
```

### Service Commands

```bash
# Start service
sudo systemctl start desn-backend

# Stop service
sudo systemctl stop desn-backend

# Restart service
sudo systemctl restart desn-backend

# Enable on boot
sudo systemctl enable desn-backend

# Check status
sudo systemctl status desn-backend

# View logs
sudo journalctl -u desn-backend -f
sudo journalctl -u desn-backend -n 100 --no-pager
```

## Common Issues and Solutions

### 1. Frontend Not Loading (Nginx 500 Error)

**Symptom**: Nginx returns 500 Internal Server Error

**Common Cause**: Permission issues - Nginx (www-data user) can't read files

**Solution**:

```bash
# Make home directory accessible
sudo chmod o+x /home/ubuntu

# Make application directory readable
sudo chmod -R 755 /home/ubuntu/desn-app/frontend

# Check Nginx error log
sudo tail -f /var/log/nginx/error.log
```

### 2. API Not Responding

**Symptom**: 502 Bad Gateway when accessing /api/\*

**Common Cause**: Backend not running or not on port 8080

**Solution**:

```bash
# Check if backend is running
sudo systemctl status desn-backend

# Check if port 8080 is in use
sudo ss -tlnp | grep 8080

# Check backend logs
sudo journalctl -u desn-backend -n 50 --no-pager

# Restart if needed
sudo systemctl restart desn-backend
```

### 3. Database Connection Errors

**Symptom**: Backend logs show "Connection refused" to PostgreSQL

**Common Cause**: PostgreSQL not running or incorrect credentials

**Solution**:

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Test database connection
sudo -u postgres psql -d desn -c "SELECT 1;"

# Verify environment variables
cat /home/ubuntu/desn-app/backend/.env

# Restart PostgreSQL if needed
sudo systemctl restart postgresql
```

### 4. Out of Memory

**Symptom**: Backend crashes or becomes unresponsive

**Common Cause**: Java heap size too large for t2.small instance

**Solution**:

```bash
# Edit systemd service to limit heap size
sudo systemctl edit desn-backend

# Add:
[Service]
Environment="JAVA_OPTS=-Xmx1g -Xms512m"

# Reload and restart
sudo systemctl daemon-reload
sudo systemctl restart desn-backend
```

---

## Monitoring & Logs

### Application Logs

```bash
# SSH into server
ssh -i ~/.ssh/desn-app-key.pem ubuntu@15.206.210.71

# Backend logs (real-time)
sudo journalctl -u desn-backend -f

# Backend logs (last 100 lines)
sudo journalctl -u desn-backend -n 100 --no-pager

# Search for specific errors
sudo journalctl -u desn-backend | grep -i error

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Health Checks

```bash
# Check frontend
curl -I http://15.206.210.71

# Check backend health
curl http://15.206.210.71/actuator/health

# Check API endpoints
curl http://15.206.210.71/api/resources
curl http://15.206.210.71/api/events
```

### System Resources

```bash
# Check disk space
df -h

# Check memory usage
free -h

# Check CPU usage
htop

# Check running processes
ps aux | grep java
ps aux | grep nginx

# Check port usage
sudo ss -tlnp | grep -E '80|8080'
```

---

## Security Checklist

- [x] SSH key-based authentication only (desn-app-key.pem)
- [x] Firewall rules configured (UFW)
- [x] AWS Security Group configured (ports 80, 22)
- [x] PostgreSQL database with secure credentials
- [x] JWT_SECRET set to secure base64 value
- [x] Database credentials in .env file (not hardcoded)
- [ ] HTTPS/SSL certificate (pending domain setup)
- [ ] Khalti keys updated to production keys
- [ ] Change default user passwords (owner/owner123, admin/admin123)
- [ ] Regular security updates: `sudo apt-get update && sudo apt-get upgrade`
- [ ] Consider fail2ban for SSH brute force protection

---

## Backup and Recovery

### Automated Backups

Daily backups are configured via cron (runs at 2 AM UTC):

```bash
# View backup script
cat /home/ubuntu/desn-app/backup.sh

# Check backup logs
sudo journalctl -t backup -n 50

# List existing backups
ls -lh /home/ubuntu/desn-app/backups/
```

### Manual Backup

```bash
# Backup database
sudo -u postgres pg_dump desn > /home/ubuntu/desn-app/backups/desn-manual-$(date +%Y%m%d).sql

# Backup uploaded files (if any)
tar -czf /home/ubuntu/desn-app/backups/files-$(date +%Y%m%d).tar.gz /home/ubuntu/desn-app/backend/data/
```

### Restore from Backup

```bash
# Restore database
sudo -u postgres psql desn < /home/ubuntu/desn-app/backups/desn-YYYYMMDD.sql

# Restore files
tar -xzf /home/ubuntu/desn-app/backups/files-YYYYMMDD.tar.gz -C /

# Restart backend after restore
sudo systemctl restart desn-backend
```

---

## Troubleshooting Checklist

When issues occur, check in this order:

```bash
# SSH into server
ssh -i ~/.ssh/desn-app-key.pem ubuntu@15.206.210.71

# 1. Check services are running
sudo systemctl status nginx desn-backend postgresql

# 2. Check ports are listening
sudo ss -tlnp | grep -E '80|8080|5432'

# 3. Check Nginx logs
sudo tail -50 /var/log/nginx/error.log

# 4. Check backend logs
sudo journalctl -u desn-backend -n 100 --no-pager

# 5. Test API directly (bypass nginx)
curl http://localhost:8080/actuator/health
curl http://localhost:8080/api/resources

# 6. Test via nginx proxy
curl http://localhost/actuator/health
curl http://localhost/api/resources

# 7. Check file permissions
ls -la /home/ubuntu/desn-app/frontend/

# 8. Check environment variables
cat /home/ubuntu/desn-app/backend/.env

# 9. Check system resources
free -h && df -h
```

---

## Server Information Summary

- **IP Address**: 15.206.210.71
- **Region**: ap-south-1 (Mumbai)
- **Instance Type**: t3.small (2 vCPU, 2 GB RAM) - Free tier eligible
- **Storage**: 30 GB gp3
- **OS**: Ubuntu 24.04.3 LTS
- **Java**: OpenJDK 21
- **PostgreSQL**: 16.10
- **Nginx**: 1.24.0
- **SSH Key**: ~/.ssh/desn-app-key.pem
- **Monthly Cost**: Free (first 12 months with AWS free tier), then ~$15/month

### Default Users

- Owner: `owner` / `owner123`
- Admin: `admin` / `admin123`
- Member: `member` / `member123`

### Database

- Database: `desn`
- User: `desn_user`
- Password: `desn_password_2025`
- Port: 5432 (localhost only)

---

Last Updated: November 15, 2025
