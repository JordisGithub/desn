# AWS Deployment Guide for DESN Application

## Issues Found & Solutions

### 1. **CORS Configuration Issues**

#### Problem: Multiple CORS Configurations
Your tech lead is correct - there are multiple CORS setups:
1. Global CORS config in `CorsConfig.java`
2. Controller-level `@CrossOrigin` in `PaymentController.java`

#### Solution:

**Step 1: Update Production Properties**
The production CORS configuration needs to include `https://desnepal.com`:

```properties
# In application-prod.properties
app.cors.allowed-origins=https://desnepal.com,https://www.desnepal.com,https://desn.org.np,https://www.desn.org.np
```

**Step 2: Set Environment Variable on AWS**
When deploying to AWS, set this environment variable:
```bash
CORS_ALLOWED_ORIGINS=https://desnepal.com,https://www.desnepal.com
```

**Step 3: Remove Redundant CORS Config**
The `@CrossOrigin(origins = "*")` in `PaymentController.java` should be removed as it conflicts with the global config.

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
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://desnepal.com';
```

---

## Deployment Architecture Options

### **Option A: Same Domain (Recommended for simplicity)**
```
Frontend: https://desnepal.com (S3 + CloudFront)
Backend:  https://desnepal.com/api (Elastic Beanstalk/ECS/EC2)
```

Setup:
1. Frontend served from S3 + CloudFront
2. CloudFront routes `/api/*` to backend
3. CORS: `https://desnepal.com`

### **Option B: Separate Subdomains**
```
Frontend: https://desnepal.com (S3 + CloudFront)
Backend:  https://api.desnepal.com (Elastic Beanstalk/ECS/EC2)
```

Setup:
1. Frontend on S3 + CloudFront
2. Backend on separate service
3. CORS: `https://desnepal.com,https://www.desnepal.com`
4. Update frontend to call `https://api.desnepal.com`

---

## Step-by-Step Deployment Instructions

### **For Tech Lead:**

1. **Backend Deployment (Elastic Beanstalk example):**
```bash
# Build the JAR
cd backend
mvn clean package -DskipTests

# The JAR will be in: target/proxy-backend-0.0.1-SNAPSHOT.jar

# Deploy to Elastic Beanstalk
eb init -p java-17 desn-backend --region us-east-1
eb create desn-backend-prod
eb setenv SPRING_PROFILES_ACTIVE=prod \
  CORS_ALLOWED_ORIGINS=https://desnepal.com,https://www.desnepal.com \
  DATABASE_URL=... \
  DATABASE_USERNAME=... \
  DATABASE_PASSWORD=... \
  JWT_SECRET=...
eb deploy
```

2. **Frontend Deployment (S3 + CloudFront):**
```bash
# Build the frontend
cd /path/to/frontend
npm run build

# Upload to S3
aws s3 sync dist/ s3://desnepal.com-bucket --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

3. **Verify CORS is working:**
```bash
# Test from browser console on https://desnepal.com
fetch('https://desnepal.com/api/forms/health')
  .then(r => r.json())
  .then(console.log)
```

---

## Quick Fix for Current Issue

**Immediate action for your tech lead:**

1. SSH into the AWS backend instance
2. Set the environment variable:
```bash
export CORS_ALLOWED_ORIGINS="https://desnepal.com,https://www.desnepal.com"
export SPRING_PROFILES_ACTIVE=prod
```

3. Restart the Spring Boot application:
```bash
# Find the process
ps aux | grep java

# Kill it
kill -9 <PID>

# Restart (adjust path to your JAR)
nohup java -jar /path/to/proxy-backend-0.0.1-SNAPSHOT.jar > app.log 2>&1 &
```

---

## Monitoring & Logs

Check application logs:
```bash
# If using systemd
journalctl -u desn-backend -f

# If using Elastic Beanstalk
eb logs

# If using Docker/ECS
docker logs <container-id>
```

---

## Security Checklist

- [ ] HTTPS enabled (SSL/TLS certificate)
- [ ] JWT_SECRET is strong and unique
- [ ] Database credentials are secure
- [ ] H2 console disabled in production
- [ ] Khalti keys are production keys (not test keys)
- [ ] CORS only allows trusted domains
- [ ] Security groups properly configured
- [ ] Email credentials secured

---

## Contact Information

If issues persist, provide these details:
1. AWS service being used (EC2, Elastic Beanstalk, ECS, etc.)
2. Backend URL (where Spring Boot is hosted)
3. Error messages from browser console (F12 > Network tab)
4. Backend logs showing CORS errors
5. Output of health check: `curl https://desnepal.com/api/forms/health`
