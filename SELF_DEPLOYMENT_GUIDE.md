# Self-Deployment Guide

## Yes! You Can Deploy Yourself with the PEM Key

Once your tech lead gives you the `.pem` file, you can deploy directly to AWS without needing them.

---

## What You Need from Tech Lead

1. **PEM key file** (e.g., `desn-aws-key.pem`)
2. **EC2 host address** (e.g., `ec2-3-87-123-456.compute-1.amazonaws.com` or IP address)
3. **Username** (usually `ubuntu` or `ec2-user`)
4. (Optional) **Environment variables** if any are needed

---

## Quick Deploy - One Command

I've created a deployment script for you. Once you have the PEM file:

```bash
# Make sure you're in the project root
cd /Users/jordi/git/desn

# Deploy in one command
./scripts/deploy-to-aws.sh ~/path/to/your-key.pem ec2-host-address.amazonaws.com
```

**Example:**
```bash
./scripts/deploy-to-aws.sh ~/Downloads/desn-key.pem ec2-3-87-123-456.compute-1.amazonaws.com
```

That's it! The script will:
1. ✅ Build backend locally
2. ✅ Build frontend locally
3. ✅ Upload both to EC2
4. ✅ Restart services
5. ✅ Test deployment

---

## Manual Deployment (Step by Step)

If you prefer to understand each step:

### Step 1: Setup PEM File
```bash
# Move PEM file to safe location
mv ~/Downloads/your-key.pem ~/.ssh/desn-aws.pem

# Set correct permissions (REQUIRED)
chmod 400 ~/.ssh/desn-aws.pem
```

### Step 2: Test SSH Connection
```bash
# Replace with your actual host
ssh -i ~/.ssh/desn-aws.pem ubuntu@ec2-YOUR-IP.amazonaws.com

# If successful, you'll be logged into the server
# Type 'exit' to logout
```

### Step 3: Build Locally
```bash
# Build backend
cd backend
mvn clean package -DskipTests
cd ..

# Build frontend
npm run build
```

### Step 4: Upload to Server
```bash
# Upload backend JAR
scp -i ~/.ssh/desn-aws.pem \
    backend/target/proxy-backend-*.jar \
    ubuntu@ec2-YOUR-IP.amazonaws.com:/home/ubuntu/desn-backend.jar

# Upload frontend build
scp -i ~/.ssh/desn-aws.pem -r \
    dist/* \
    ubuntu@ec2-YOUR-IP.amazonaws.com:/home/ubuntu/desn-frontend/
```

### Step 5: Deploy on Server
```bash
# SSH into server
ssh -i ~/.ssh/desn-aws.pem ubuntu@ec2-YOUR-IP.amazonaws.com

# Once on server, restart backend
pkill -f desn-backend.jar
nohup java -jar /home/ubuntu/desn-backend.jar --spring.profiles.active=prod > backend.log 2>&1 &

# Deploy frontend to nginx
sudo rm -rf /var/www/html/*
sudo cp -r /home/ubuntu/desn-frontend/* /var/www/html/
sudo systemctl reload nginx

# Exit server
exit
```

### Step 6: Verify Deployment
```bash
# Test backend
curl https://desnepal.com/api/forms/health

# Test frontend
curl https://desnepal.com
```

---

## Even Easier: Use VS Code Remote SSH

1. Install "Remote - SSH" extension in VS Code
2. Add SSH host:
   - Press `Cmd+Shift+P` → "Remote-SSH: Add New SSH Host"
   - Enter: `ssh -i ~/.ssh/desn-aws.pem ubuntu@ec2-YOUR-IP.amazonaws.com`
3. Connect to host
4. You now have a VS Code window connected to the server
5. Can edit files, run commands, see logs directly on server

---

## Create an Alias for Easy Deployment

Add to your `~/.zshrc`:

```bash
# DESN AWS Deployment
alias desn-deploy="cd /Users/jordi/git/desn && ./scripts/deploy-to-aws.sh ~/.ssh/desn-aws.pem ec2-YOUR-IP.amazonaws.com"
alias desn-ssh="ssh -i ~/.ssh/desn-aws.pem ubuntu@ec2-YOUR-IP.amazonaws.com"
alias desn-logs="ssh -i ~/.ssh/desn-aws.pem ubuntu@ec2-YOUR-IP.amazonaws.com 'tail -f /home/ubuntu/backend.log'"
```

Then reload:
```bash
source ~/.zshrc
```

Now you can deploy with just:
```bash
desn-deploy
```

---

## Troubleshooting

### "Permission denied (publickey)"
```bash
# Fix PEM file permissions
chmod 400 ~/.ssh/desn-aws.pem
```

### "Host key verification failed"
```bash
# Add -o StrictHostKeyChecking=no
ssh -i ~/.ssh/desn-aws.pem -o StrictHostKeyChecking=no ubuntu@ec2-YOUR-IP.amazonaws.com
```

### Backend not starting
```bash
# SSH to server and check logs
ssh -i ~/.ssh/desn-aws.pem ubuntu@ec2-YOUR-IP.amazonaws.com
tail -f /home/ubuntu/backend.log
```

### Frontend not updating
```bash
# Clear browser cache: Cmd+Shift+R
# Or check CloudFront cache invalidation is needed
```

---

## What to Ask Your Tech Lead For

**Message to send:**

> Hi, can you provide me with:
> 1. The `.pem` key file for the AWS EC2 instance
> 2. The EC2 host address (IP or DNS name)
> 3. The username (ubuntu or ec2-user?)
> 
> I've created a deployment script so I can deploy directly without needing your help each time. This will speed up our development process.
> 
> Once I have these, I can deploy in one command: `./scripts/deploy-to-aws.sh`

---

## Security Best Practices

1. **Never commit the PEM file to git**
   - Already in `.gitignore`: `*.pem`
   
2. **Store PEM file safely**
   - Keep in `~/.ssh/` directory
   - Set permissions: `chmod 400`
   
3. **Don't share PEM file**
   - It's like a password to the server
   - Only keep on your machine

---

## Bonus: Setup Automatic Deployment

Once you have the PEM key, you can also setup GitHub Actions to deploy automatically. Just add the PEM key as a GitHub secret:

```bash
# Convert PEM to base64 for GitHub secret
base64 -i ~/.ssh/desn-aws.pem | pbcopy

# Now paste this in GitHub Secrets as EC2_SSH_KEY
```

Then GitHub Actions can deploy automatically on every push to main!

---

## Time Comparison

**Current (manual zip files):**
- You create zip → Send to tech lead → Wait → He deploys → 30+ minutes

**With PEM file:**
- You run: `desn-deploy` → 5 minutes → Done

**With CI/CD (after setup):**
- You: `git push` → 5 minutes → Automatically deployed

---

## Need Help?

If you get stuck after getting the PEM file:
1. DM me the error message
2. Share the PEM file permissions: `ls -la ~/.ssh/desn-aws.pem`
3. Share SSH connection output

I'll help you debug!
