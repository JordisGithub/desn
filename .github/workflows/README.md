# GitHub Actions Workflows

## Current Status

The DESN application currently uses **manual deployment** via SSH to AWS EC2. An automated GitHub Actions workflow (`deploy.yml`) is available but requires GitHub Secrets configuration to be enabled.

## Available Workflows

### 1. `deploy.yml` - EC2 SSH Deployment (Ready to Use)

**Status**: ✅ Configured and ready - requires GitHub Secrets

This workflow is designed for the current EC2-based deployment:

- Builds frontend with Vite (configured for HTTPS: `https://desnepal.com`)
- Builds backend JAR with Maven
- Copies files to EC2 via SSH
- Executes deployment script on server
- Verifies backend health after deployment

**To enable this workflow:**

1. Configure GitHub Secrets in repository settings:
   - `SSH_PRIVATE_KEY` - Private SSH key for EC2 access
   - `SERVER_HOST` - Server IP or domain (`13.204.228.199` or `desnepal.com`)
   - `SERVER_USER` - SSH user (default: `ubuntu`)
2. Push to `master` branch to trigger automatic deployment

### 2. `deploy-frontend.yml.disabled` - S3/CloudFront Deployment

**Status**: ❌ Disabled - not compatible with current setup

This workflow deploys frontend to AWS S3 and CloudFront, which is **not the current setup**.

**Current setup uses**: Nginx serving static files from EC2

Renamed to `.disabled` to prevent accidental triggering.

### 3. `deploy-backend.yml.disabled` - Elastic Beanstalk Deployment

**Status**: ❌ Disabled - not compatible with current setup

This workflow deploys backend to AWS Elastic Beanstalk, which is **not the current setup**.

**Current setup uses**: Spring Boot JAR running directly on EC2 via systemd

Renamed to `.disabled` to prevent accidental triggering.

## Current Deployment Process (Manual)

The production deployment currently follows these manual steps:

### Frontend Deployment

```bash
# Build locally
VITE_API_BASE_URL=https://desnepal.com npm run build

# Copy to server
scp -r dist/* ubuntu@13.204.228.199:/home/ubuntu/desn-app/frontend/dist/

# Set permissions
ssh ubuntu@13.204.228.199 "sudo chmod -R 755 /home/ubuntu/desn-app/frontend"
ssh ubuntu@13.204.228.199 "sudo systemctl reload nginx"
```

### Backend Deployment

```bash
# Build JAR locally
cd backend
./mvnw clean package -DskipTests

# Copy to server
scp target/proxy-backend-*.jar ubuntu@13.204.228.199:/home/ubuntu/desn-app/backend/

# Restart service
ssh ubuntu@13.204.228.199 "sudo systemctl restart desn-backend"
```

## Recommendations

### Option 1: Update `deploy.yml` for Current Setup (Recommended)

Modify `deploy.yml` to work with the current EC2 + Nginx setup:

1. Update `VITE_API_BASE_URL` to `https://desnepal.com`
2. Configure the required GitHub Secrets
3. Ensure the deployment script handles systemd service restart
4. Test on a feature branch before enabling on main

### Option 2: Disable Unused Workflows

If automation is not needed:

1. Delete or rename `.yml` files to `.yml.disabled`
2. Keep workflows as reference documentation only
3. Continue with manual deployment process

### Option 3: Migrate to S3/CloudFront + Elastic Beanstalk

For a more scalable AWS architecture:

1. Set up S3 + CloudFront for frontend
2. Set up Elastic Beanstalk for backend
3. Configure the appropriate workflows (`deploy-frontend.yml`, `deploy-backend.yml`)
4. Update DNS and SSL certificates accordingly

## Notes

- The `deploy.yml` workflow is closest to the current architecture
- S3/CloudFront workflows would require infrastructure changes
- Manual deployment is currently stable and working
- Consider automation only if frequent deployments are needed

## Last Updated

January 2025 - Documented current manual deployment process
