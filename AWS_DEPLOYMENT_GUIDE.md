# AWS Deployment Guide for DESN Application

## Current Production Architecture

The DESN application is deployed on AWS EC2 with the following setup:

- **Server**: Ubuntu 22.04 on AWS EC2
- **Public IP**: 13.204.228.199
- **Domain**: desnepal.com (DNS configured)
- **SSL**: Let's Encrypt certificate (expires Feb 12, 2026, auto-renewal enabled)
- **Web Server**: Nginx 1.24.0 (reverse proxy + SSL termination)
- **Frontend**: React app built with Vite, served from `/home/ubuntu/desn-app/frontend/dist`
- **Backend**: Spring Boot on port 8080
- **Proxy Setup**: Nginx forwards `/api/*` requests to `localhost:8080`

## Quick Deployment Steps

### 1. Deploy Frontend

```bash
# On local machine: Build with production API URL
VITE_API_BASE_URL=https://desnepal.com npm run build

# Copy to server
scp -r dist/* ubuntu@13.204.228.199:/home/ubuntu/desn-app/frontend/dist/

# On server: Ensure permissions
sudo chmod -R 755 /home/ubuntu/desn-app/frontend
sudo systemctl reload nginx
```

### 2. Deploy Backend

```bash
# Build JAR locally
cd backend
./mvnw clean package -DskipTests

# Copy to server
scp target/proxy-backend-*.jar ubuntu@13.204.228.199:/home/ubuntu/desn-app/backend/

# Restart backend on server
ssh ubuntu@13.204.228.199
sudo systemctl restart desn-backend
```

### 3. Verify Deployment

```bash
# Check frontend loads
curl -I https://desnepal.com

# Check API is working
curl https://desnepal.com/api/resources

# Check for errors in logs
sudo journalctl -u desn-backend -n 50 --no-pager
```

## CORS Configuration

### Current Setup

CORS is configured to allow requests from:

- https://desnepal.com
- https://www.desnepal.com

### Configuration Files

**Backend**: `backend/src/main/resources/application-prod.properties`

```properties
app.cors.allowed-origins=https://desnepal.com,https://www.desnepal.com
```

**Environment Variable** (overrides application.properties):

```bash
CORS_ALLOWED_ORIGINS=https://desnepal.com,https://www.desnepal.com
```

### Troubleshooting CORS Issues

If you see CORS errors in browser console:

1. Check backend logs for allowed origins:

```bash
sudo journalctl -u desn-backend | grep -i cors
```

2. Verify environment variable is set:

```bash
printenv | grep CORS
```

3. Update if needed and restart:

```bash
export CORS_ALLOWED_ORIGINS="https://desnepal.com,https://www.desnepal.com"
sudo systemctl restart desn-backend
```

---

## Required Environment Variables for AWS

Your tech lead needs to set these environment variables in AWS:

### **Essential Variables:**

```bash
# Production Profile
SPRING_PROFILES_ACTIVE=prod

# CORS Configuration
CORS_ALLOWED_ORIGINS=https://desnepal.com,https://www.desnepal.com

# Database (if using PostgreSQL on AWS RDS)
DATABASE_URL=jdbc:postgresql://your-rds-endpoint:5432/desn
DATABASE_USERNAME=your_db_user
DATABASE_PASSWORD=your_db_password

# JWT Security
JWT_SECRET=your-secure-random-jwt-secret-key-here-make-it-long-and-complex
JWT_EXPIRATION=86400000

# Email Configuration (for notifications)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@desnepal.com
FROM_EMAIL=noreply@desnepal.com
EMAIL_NOTIFICATIONS_ENABLED=true

# Khalti Payment Gateway
KHALTI_PUBLIC_KEY=your-khalti-public-key
KHALTI_SECRET_KEY=your-khalti-secret-key
KHALTI_API_URL=https://khalti.com/api/v2
APP_BASE_URL=https://desnepal.com

# Server Configuration
PORT=8080
```

---

## Backend Not Loading - Troubleshooting Steps

### 1. **Check Backend Health**

First, verify the backend is running:

```bash
curl https://desnepal.com/api/forms/health
# or
curl https://your-backend-domain.com/api/forms/health
```

### 2. **Common AWS Deployment Issues:**

#### A. **Separate Backend URL**

If backend is on a different domain (e.g., `api.desnepal.com`):

- Update frontend API calls to use full backend URL
- Update CORS to allow requests from `https://desnepal.com`

#### B. **Security Group Settings**

Ensure AWS Security Groups allow:

- Inbound: Port 8080 (or 80/443)
- Outbound: All traffic

#### C. **Application Load Balancer**

If using ALB:

- Health check path: `/api/forms/health`
- Health check port: 8080
- Healthy threshold: 2
- Interval: 30 seconds

#### D. **Port Configuration**

Most AWS services expect port 80 or 443. You may need to:

```bash
PORT=80  # or let AWS handle port mapping
```

---

## Frontend Configuration

### Update Frontend API Base URL

If backend is on a different domain, update the frontend:

**Option 1: Environment Variable (Recommended)**
Create `.env.production`:

```env
VITE_API_BASE_URL=https://api.desnepal.com
# or if same domain
VITE_API_BASE_URL=https://desnepal.com
```

**Option 2: Update API Service**
In `src/services/ApiService.js`:

```javascript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://desnepal.com";
```

---

## Nginx Configuration

The application uses Nginx as a reverse proxy with the following setup:

### Configuration File Location

`/etc/nginx/sites-available/desn` (symlinked to `/etc/nginx/sites-enabled/desn`)

### Key Configuration Points

```nginx
server {
    server_name desnepal.com www.desnepal.com;

    # Frontend - serve static files
    location / {
        root /home/ubuntu/desn-app/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API - proxy to Spring Boot
    location /api/ {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # SSL Configuration (managed by Certbot)
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/desnepal.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/desnepal.com/privkey.pem;
}

server {
    # HTTP to HTTPS redirect
    listen 80;
    server_name desnepal.com www.desnepal.com;
    return 301 https://$server_name$request_uri;
}
```

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

## SSL Certificate Management

### Current Certificate

- **Provider**: Let's Encrypt
- **Expires**: February 12, 2026
- **Auto-renewal**: Enabled via Certbot

### Manual Renewal

```bash
# Renew certificate
sudo certbot renew

# Reload Nginx to use new certificate
sudo systemctl reload nginx

# Check certificate expiry
sudo certbot certificates
```

### Certificate Locations

- Certificate: `/etc/letsencrypt/live/desnepal.com/fullchain.pem`
- Private Key: `/etc/letsencrypt/live/desnepal.com/privkey.pem`

## Backend Service Management

### Systemd Service (Recommended)

Create a systemd service file: `/etc/systemd/system/desn-backend.service`

```ini
[Unit]
Description=DESN Backend Spring Boot Application
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/desn-app/backend
ExecStart=/usr/bin/java -jar /home/ubuntu/desn-app/backend/proxy-backend-0.0.1-SNAPSHOT.jar
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

Environment="SPRING_PROFILES_ACTIVE=prod"
Environment="CORS_ALLOWED_ORIGINS=https://desnepal.com,https://www.desnepal.com"

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
sudo chmod 755 /home/ubuntu

# Make application directory readable
sudo chmod -R 755 /home/ubuntu/desn-app/frontend

# Check Nginx error log
sudo tail -f /var/log/nginx/error.log
```

### 2. Mixed Content Errors (HTTP/HTTPS)

**Symptom**: Browser console shows "Mixed Content" blocked errors

**Common Cause**: Frontend built with `http://localhost:8080` API URLs

**Solution**:

```bash
# Rebuild frontend with production API URL
VITE_API_BASE_URL=https://desnepal.com npm run build

# Verify .env files don't have localhost URLs
cat .env
```

### 3. API Not Responding

**Symptom**: 502 Bad Gateway when accessing /api/\*

**Common Cause**: Backend not running or not on port 8080

**Solution**:

```bash
# Check if backend is running
sudo systemctl status desn-backend

# Check if port 8080 is in use
sudo netstat -tlnp | grep 8080

# Check backend logs
sudo journalctl -u desn-backend -n 50 --no-pager

# Restart if needed
sudo systemctl restart desn-backend
```

### 4. CORS Errors

**Symptom**: Browser console shows CORS policy errors

**Common Cause**: CORS_ALLOWED_ORIGINS not set or incorrect

**Solution**:

```bash
# Check current environment
printenv | grep CORS

# Set in systemd service file or export manually
export CORS_ALLOWED_ORIGINS="https://desnepal.com,https://www.desnepal.com"

# Restart backend
sudo systemctl restart desn-backend
```

### 5. SSL Certificate Issues

**Symptom**: Browser shows "Not Secure" or certificate errors

**Common Cause**: Certificate expired or not properly configured

**Solution**:

```bash
# Check certificate status
sudo certbot certificates

# Renew if needed
sudo certbot renew

# Reload Nginx
sudo systemctl reload nginx
```

---

## Monitoring & Logs

### Application Logs

```bash
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
curl -I https://desnepal.com

# Check API
curl https://desnepal.com/api/resources

# Check from external location
curl -I https://desnepal.com -H "User-Agent: Mozilla/5.0"
```

### System Resources

```bash
# Check disk space
df -h

# Check memory usage
free -h

# Check CPU usage
top

# Check running processes
ps aux | grep java
ps aux | grep nginx
```

---

## Security Checklist

- [x] HTTPS enabled (SSL/TLS certificate)
- [x] SSL certificate auto-renewal configured
- [x] CORS restricted to production domain
- [ ] JWT_SECRET set to secure random value (default needs change)
- [ ] Database credentials secured (currently using H2)
- [ ] H2 console disabled in production
- [ ] Khalti keys updated to production keys
- [ ] AWS Security Group configured (ports 80, 443, 22)
- [ ] SSH key-based authentication only
- [ ] Firewall rules configured (ufw)

---

## Backup and Recovery

### Manual Backup

```bash
# Backup uploaded files (if using file storage)
tar -czf desn-backup-$(date +%Y%m%d).tar.gz /home/ubuntu/desn-app/backend/data/

# Backup database (if using PostgreSQL)
pg_dump -U desn_user desn_prod > desn-db-backup-$(date +%Y%m%d).sql
```

### Restore from Backup

```bash
# Restore files
tar -xzf desn-backup-YYYYMMDD.tar.gz -C /

# Restore database
psql -U desn_user desn_prod < desn-db-backup-YYYYMMDD.sql
```

---

## Troubleshooting Checklist

When issues occur, check in this order:

1. ✅ Is Nginx running? `sudo systemctl status nginx`
2. ✅ Is backend running? `sudo systemctl status desn-backend`
3. ✅ Are ports open? `sudo netstat -tlnp | grep -E '80|443|8080'`
4. ✅ Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
5. ✅ Check backend logs: `sudo journalctl -u desn-backend -n 50`
6. ✅ Test API directly: `curl http://localhost:8080/api/resources`
7. ✅ Check file permissions: `ls -la /home/ubuntu/desn-app/`
8. ✅ Verify environment variables: `printenv | grep -E 'CORS|SPRING'`

---

## Contact Information

For deployment issues, provide:

1. Error messages from browser console (F12 > Network/Console tabs)
2. Backend logs: `sudo journalctl -u desn-backend -n 100 --no-pager`
3. Nginx error logs: `sudo tail -100 /var/log/nginx/error.log`
4. Output of health check: `curl -v https://desnepal.com/api/resources`
5. Server info: `uname -a`, `nginx -v`, `java -version`
