# AWS Deployment Setup Guide

## 🚀 Automated Deployment Configuration

This guide walks you through setting up automated deployment to your AWS server using GitHub Actions.

## Server Information

- **Public Domain**: https://desnepal.com (points to the EC2 instance via DNS)
- **Fallback IP Address**: 13.204.228.199
- **Username**: ubuntu
- **SSH Key**: /Users/jordi/Downloads/private_key.pem

---

## 📋 Setup Steps

### 1. Initial Server Setup (One-time)

First, prepare your AWS server by running the setup script:

```bash
# From your local machine, copy the setup script to the server
scp -i /Users/jordi/Downloads/private_key.pem scripts/setup-aws-server.sh ubuntu@13.204.228.199:/tmp/

# SSH into the server
ssh -i /Users/jordi/Downloads/private_key.pem ubuntu@13.204.228.199

# Run the setup script
bash /tmp/setup-aws-server.sh
```

This script will:

- Install Java 21, Nginx, and required dependencies
- Configure the firewall (UFW)
- Create application directories
- Setup log rotation
- Create health monitoring scripts

### 2. Configure GitHub Secrets

Add the following secrets to your GitHub repository:

**Go to: Repository → Settings → Secrets and variables → Actions → New repository secret**

#### Required Secrets:

1. **SSH_PRIVATE_KEY**

   - The contents of your private key file
   - Get it by running on your local machine:

   ```bash
   cat /Users/jordi/Downloads/private_key.pem
   ```

   - Copy the entire output including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`

2. **SERVER_HOST**

   - Value: `13.204.228.199`

3. **SERVER_USER**
   - Value: `ubuntu`

### 3. Configure Backend Application Properties

Ensure your `backend/src/main/resources/application-prod.properties` has production settings:

```properties
# Server Configuration
server.port=8080
server.address=0.0.0.0

# Logging
logging.level.root=INFO
logging.level.com.example=INFO
logging.file.name=/home/ubuntu/desn-app/logs/backend.log

# CORS (adjust domain after setting up your domain)
cors.allowed.origins=http://13.204.228.199,http://localhost:3000

# Database (configure your production database)
spring.datasource.url=jdbc:postgresql://localhost:5432/desn_db
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

# JPA
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Email (configure production email settings)
spring.mail.host=${MAIL_HOST}
spring.mail.port=${MAIL_PORT}
spring.mail.username=${MAIL_USERNAME}
spring.mail.password=${MAIL_PASSWORD}
```

### 4. Update Frontend API Configuration

The frontend services already prefix endpoints with `/api` (for example: `ApiService.get("/api/resources")`). Set the base URL to your server origin in production so requests resolve to `http://<server>/api/...` and are proxied by Nginx.

Recommended:

```bash
# The workflow sets this automatically during build
VITE_API_BASE_URL=https://desnepal.com
```

Local development example:

```bash
# When running vite locally, you can point to your local backend
VITE_API_BASE_URL=http://localhost:8080
```

### 5. Enable push-to-deploy from `master`

As soon as DNS for `desnepal.com` points to the EC2 box and the secrets above are present, no manual steps are needed to publish updates. The workflow defined in `.github/workflows/deploy.yml` automatically:

1. Runs on every push to `master` (or when triggered manually from the _Actions → Deploy to AWS_ workflow UI).
2. Builds the Vite frontend and Spring Boot backend.
3. Copies the compiled assets and JAR to `/home/ubuntu/desn-app/` over SSH.
4. Executes `scripts/deploy-server.sh` on the server, which restarts the systemd service and Nginx with the latest bits.
5. Performs a health check before marking the job successful.

💡 **Tip:** For HTTPS visitors at `https://desnepal.com`, set the `SERVER_HOST` secret to `desnepal.com` so the action copies files and verifies against the same hostname that end users hit. Keep the fallback IP handy in case SSH access is ever limited by DNS issues.

---

## 🔄 Deployment Workflow

### Automatic Deployment

Every time you push to the `master` branch, GitHub Actions will automatically:

1. ✅ Checkout your code
2. ✅ Build the frontend (React + Vite)
3. ✅ Build the backend (Spring Boot + Maven)
4. ✅ Deploy both to your AWS server
5. ✅ Restart services
6. ✅ Verify deployment health

Note: This repository also contains alternative workflows for S3/CloudFront (`deploy-frontend.yml`) and Elastic Beanstalk (`deploy-backend.yml`). If you're using the single EC2 server approach described here, consider disabling those workflows or restricting their trigger branches to avoid unexpected runs.

### Manual Deployment

If you need to deploy manually:

```bash
# Push to master branch
git push origin master

# Or trigger workflow manually from GitHub
# Go to: Actions → Deploy to AWS → Run workflow
```

---

## 📊 Monitoring & Management

### Check Application Status

SSH into your server and run:

```bash
ssh -i /Users/jordi/Downloads/private_key.pem ubuntu@13.204.228.199

# Run health check
/home/ubuntu/desn-app/health-check.sh
```

### View Logs

```bash
# Backend logs
tail -f /home/ubuntu/desn-app/logs/backend.log

# Backend error logs
tail -f /home/ubuntu/desn-app/logs/backend-error.log

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Systemd service logs
sudo journalctl -u desn-backend -f
sudo journalctl -u nginx -f
```

### Restart Services

```bash
# Restart backend
sudo systemctl restart desn-backend

# Restart nginx
sudo systemctl restart nginx

# Check status
sudo systemctl status desn-backend
sudo systemctl status nginx
```

---

## 🌐 Accessing Your Application

After deployment, your application will be available at:

- **Frontend**: http://13.204.228.199
- **Backend API**: http://13.204.228.199/api
- **Health Check**: http://13.204.228.199/api/actuator/health

---

## 🔧 Troubleshooting

### Deployment Failed

1. Check GitHub Actions logs for errors
2. Verify all secrets are correctly set
3. Ensure server is accessible: `ssh -i /Users/jordi/Downloads/private_key.pem ubuntu@13.204.228.199`

### Backend Not Starting

```bash
# Check logs
sudo journalctl -u desn-backend -n 100

# Verify Java installation
java -version

# Check if port 8080 is available
sudo lsof -i :8080

# Manually test the JAR
cd /home/ubuntu/desn-app/backend
java -jar app.jar
```

### Nginx Issues

```bash
# Test configuration
sudo nginx -t

# Check error logs
sudo tail -100 /var/log/nginx/error.log

# Verify nginx is running
sudo systemctl status nginx
```

### Port Already in Use

```bash
# Find process using port 8080
sudo lsof -i :8080

# Kill the process
sudo kill -9 <PID>

# Restart service
sudo systemctl restart desn-backend
```

---

## 🔐 Security Recommendations

### 1. Setup SSL/HTTPS with Let's Encrypt

```bash
# Install certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 2. Setup Database (PostgreSQL)

```bash
# Install PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
CREATE DATABASE desn_db;
CREATE USER desn_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE desn_db TO desn_user;
\q
```

### 3. Environment Variables

Add sensitive configuration to systemd service:

```bash
sudo systemctl edit desn-backend
```

Add:

```ini
[Service]
Environment="DB_PASSWORD=your_db_password"
Environment="JWT_SECRET=your_jwt_secret"
Environment="MAIL_PASSWORD=your_mail_password"
```

---

## 📦 Project Structure on Server

```
/home/ubuntu/desn-app/
├── frontend/          # React build files (served by Nginx)
├── backend/
│   └── app.jar       # Spring Boot JAR
├── logs/
│   ├── backend.log
│   └── backend-error.log
├── deploy-server.sh  # Deployment script
└── health-check.sh   # Health monitoring script
```

---

## 🔄 Updating the Deployment

If you need to modify the deployment process:

1. Update scripts in `scripts/` directory
2. Update GitHub workflow in `.github/workflows/deploy.yml`
3. Push changes to trigger new deployment

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] Frontend loads at http://13.204.228.199
- [ ] Backend API responds at http://13.204.228.199/api/actuator/health
- [ ] Backend service is running: `sudo systemctl status desn-backend`
- [ ] Nginx is running: `sudo systemctl status nginx`
- [ ] No errors in logs
- [ ] Application functions correctly (test key features)

---

## 📞 Support

If you encounter issues:

1. Check the logs on the server
2. Review GitHub Actions logs
3. Verify all configuration files
4. Ensure secrets are correctly set in GitHub

---

## 🎯 Quick Commands Reference

```bash
# SSH into server
ssh -i /Users/jordi/Downloads/private_key.pem ubuntu@13.204.228.199

# Health check
/home/ubuntu/desn-app/health-check.sh

# View backend logs
tail -f /home/ubuntu/desn-app/logs/backend.log

# Restart services
sudo systemctl restart desn-backend nginx

# Check service status
sudo systemctl status desn-backend nginx

# Manual deployment (from local machine)
git push origin master
```

---

Last Updated: November 13, 2025
