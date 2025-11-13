# CI/CD Setup Guide for Tech Lead

## Why CI/CD Instead of Manual Zip Files?

**Problems with Manual Deployment:**
- ❌ Slow (30+ minutes per deployment)
- ❌ Error-prone (manual steps can be forgotten)
- ❌ Not scalable (blocks developer productivity)
- ❌ No rollback capability
- ❌ No deployment history/audit trail

**Benefits of CI/CD:**
- ✅ Fast (5-10 minutes automatic deployment)
- ✅ Reliable (same process every time)
- ✅ Scalable (deploy 10 times a day if needed)
- ✅ Easy rollback (redeploy previous version)
- ✅ Full deployment history in GitHub

---

## Setup Instructions for Tech Lead

### Step 1: Create AWS IAM User for GitHub Actions

1. Go to AWS Console → IAM → Users → Create User
2. User name: `github-actions-deployer`
3. Attach policies:
   - `AWSElasticBeanstalkFullAccess` (for backend)
   - `CloudFrontFullAccess` (for frontend cache invalidation)
   - `AmazonS3FullAccess` (for frontend deployment)
4. Create access key → Download and save:
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY

### Step 2: Add GitHub Secrets

1. Go to: https://github.com/JordisGithub/desn/settings/secrets/actions
2. Click "New repository secret" and add these:

```
AWS_ACCESS_KEY_ID = <from Step 1>
AWS_SECRET_ACCESS_KEY = <from Step 1>
S3_BUCKET_NAME = desnepal.com (or your S3 bucket name)
CLOUDFRONT_DISTRIBUTION_ID = E1XXXXXXXXXXXXX (your CloudFront ID)
```

### Step 3: Configure AWS Elastic Beanstalk

**If not already created, create Elastic Beanstalk application:**

```bash
# Install AWS EB CLI
pip install awsebcli

# Navigate to backend folder
cd backend

# Initialize Elastic Beanstalk
eb init -p java-17 desn-backend --region us-east-1

# Create environment
eb create desn-backend-prod

# Set environment variables
eb setenv \
  SPRING_PROFILES_ACTIVE=prod \
  CORS_ALLOWED_ORIGINS=https://desnepal.com,https://www.desnepal.com \
  DATABASE_URL=<your-db-url> \
  DATABASE_USERNAME=<your-db-user> \
  DATABASE_PASSWORD=<your-db-password> \
  JWT_SECRET=<your-jwt-secret> \
  KHALTI_PUBLIC_KEY=<your-khalti-key> \
  KHALTI_SECRET_KEY=<your-khalti-secret>
```

**If already exists, just note the names:**
- Application name: `desn-backend`
- Environment name: `desn-backend-prod`
- Region: `us-east-1`

### Step 4: Configure S3 + CloudFront (if not already done)

**S3 Bucket:**
```bash
# Create S3 bucket for website hosting
aws s3 mb s3://desnepal.com --region us-east-1

# Enable static website hosting
aws s3 website s3://desnepal.com \
  --index-document index.html \
  --error-document index.html

# Set bucket policy for public access
```

**CloudFront:**
- Create CloudFront distribution pointing to S3 bucket
- Set custom domain: desnepal.com
- SSL certificate: Use ACM certificate
- Note the Distribution ID for GitHub secrets

### Step 5: Test the CI/CD Pipeline

1. Make a small change to the code
2. Commit and push to main branch:
   ```bash
   git add .
   git commit -m "Test CI/CD deployment"
   git push origin main
   ```
3. Go to GitHub → Actions tab
4. Watch the deployment run automatically
5. Verify the changes are live on https://desnepal.com

---

## How It Works

### Automatic Deployment Flow:

```
Developer pushes to main
        ↓
GitHub detects change
        ↓
GitHub Actions starts
        ↓
Backend: Maven builds JAR → Deploys to Elastic Beanstalk
Frontend: npm builds → Deploys to S3 → Invalidates CloudFront
        ↓
Site is live in 5-10 minutes
```

### Manual Deployment (if needed):

You can also trigger deployment manually:
1. Go to: https://github.com/JordisGithub/desn/actions
2. Click on "Deploy Backend to AWS" or "Deploy Frontend to AWS"
3. Click "Run workflow" → Select branch → Run

---

## Alternative: Simple EC2 Deployment

If Elastic Beanstalk is too complex, here's a simpler approach:

### Backend on EC2 with systemd:

1. SSH into EC2 instance
2. Create deployment script: `/home/ubuntu/deploy-backend.sh`

```bash
#!/bin/bash
cd /home/ubuntu/desn
git pull origin main
cd backend
mvn clean package -DskipTests
sudo systemctl restart desn-backend
```

3. Create systemd service: `/etc/systemd/system/desn-backend.service`

```ini
[Unit]
Description=DESN Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/desn/backend
ExecStart=/usr/bin/java -jar target/proxy-backend-0.0.1-SNAPSHOT.jar
Restart=always
Environment="SPRING_PROFILES_ACTIVE=prod"
Environment="CORS_ALLOWED_ORIGINS=https://desnepal.com,https://www.desnepal.com"

[Install]
WantedBy=multi-user.target
```

4. GitHub Actions just needs to SSH and run deploy script:

```yaml
- name: Deploy to EC2
  uses: appleboy/ssh-action@master
  with:
    host: ${{ secrets.EC2_HOST }}
    username: ubuntu
    key: ${{ secrets.EC2_SSH_KEY }}
    script: |
      /home/ubuntu/deploy-backend.sh
```

---

## Troubleshooting

### Pipeline fails with "Access Denied"
- Check AWS credentials in GitHub secrets
- Verify IAM user has correct permissions

### Pipeline succeeds but site not updated
- Check CloudFront cache (wait 5-10 min or invalidate manually)
- Check S3 bucket has correct files
- Check Elastic Beanstalk health (should be green)

### Need to rollback
- Go to GitHub → Actions → Find successful deployment
- Click "Re-run jobs"

---

## Cost Estimate

**GitHub Actions:**
- Free for public repos
- 2,000 minutes/month free for private repos

**AWS:**
- Elastic Beanstalk: ~$20-50/month (t3.small)
- S3: ~$1-5/month
- CloudFront: ~$1-10/month
- Total: ~$25-65/month

---

## Benefits for Team

1. **Developer**: Push to main → Changes live in 10 minutes
2. **Tech Lead**: No manual deployments, focus on architecture
3. **Organization**: Deployment history, easy rollbacks, faster iteration

---

## Next Steps

1. Tech lead sets up AWS resources (30 minutes)
2. Tech lead adds GitHub secrets (5 minutes)
3. Test deployment by pushing small change (10 minutes)
4. Document any environment-specific settings
5. Train team on CI/CD workflow

**Total setup time: ~1 hour**
**Time saved per deployment: ~25 minutes**
**Break-even: After 3 deployments**

---

## Questions?

If tech lead needs help:
1. Check GitHub Actions logs for errors
2. Check AWS CloudWatch logs
3. Verify all secrets are set correctly
4. DM me with specific error messages
