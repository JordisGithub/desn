#!/bin/bash
# Deploy DESN to AWS EC2
# Usage: ./scripts/deploy-to-aws.sh <path-to-pem-file> <ec2-host>

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check arguments
if [ "$#" -ne 2 ]; then
    echo -e "${RED}Usage: $0 <pem-file> <ec2-host>${NC}"
    echo "Example: $0 ~/aws-key.pem ec2-3-87-123-456.compute-1.amazonaws.com"
    exit 1
fi

PEM_FILE=$1
EC2_HOST=$2
EC2_USER="ubuntu"  # Change if different (could be ec2-user for some AMIs)

# Validate PEM file
if [ ! -f "$PEM_FILE" ]; then
    echo -e "${RED}Error: PEM file not found: $PEM_FILE${NC}"
    exit 1
fi

# Set correct permissions on PEM file
chmod 400 "$PEM_FILE"

echo -e "${GREEN}=== DESN Deployment to AWS ===${NC}"
echo "Host: $EC2_HOST"
echo ""

# Test SSH connection
echo -e "${YELLOW}Testing SSH connection...${NC}"
if ! ssh -i "$PEM_FILE" -o StrictHostKeyChecking=no "$EC2_USER@$EC2_HOST" "echo 'Connection successful'"; then
    echo -e "${RED}Failed to connect to EC2. Check your PEM file and host.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ SSH connection successful${NC}"
echo ""

# Build backend locally
echo -e "${YELLOW}Building backend locally...${NC}"
cd backend
mvn clean package -DskipTests
cd ..
echo -e "${GREEN}✓ Backend built${NC}"
echo ""

# Build frontend locally
echo -e "${YELLOW}Building frontend locally...${NC}"
npm ci
npm run build
echo -e "${GREEN}✓ Frontend built${NC}"
echo ""

# Upload backend JAR
echo -e "${YELLOW}Uploading backend to EC2...${NC}"
scp -i "$PEM_FILE" \
    backend/target/proxy-backend-*.jar \
    "$EC2_USER@$EC2_HOST:/home/$EC2_USER/desn-backend.jar"
echo -e "${GREEN}✓ Backend uploaded${NC}"
echo ""

# Upload frontend build
echo -e "${YELLOW}Uploading frontend to EC2...${NC}"
ssh -i "$PEM_FILE" "$EC2_USER@$EC2_HOST" "mkdir -p /home/$EC2_USER/desn-frontend"
scp -i "$PEM_FILE" -r dist/* "$EC2_USER@$EC2_HOST:/home/$EC2_USER/desn-frontend/"
echo -e "${GREEN}✓ Frontend uploaded${NC}"
echo ""

# Restart backend service
echo -e "${YELLOW}Restarting backend service...${NC}"
ssh -i "$PEM_FILE" "$EC2_USER@$EC2_HOST" << 'EOF'
    # Stop existing backend
    pkill -f desn-backend.jar || true
    
    # Start new backend
    nohup java -jar /home/ubuntu/desn-backend.jar \
        --spring.profiles.active=prod \
        > /home/ubuntu/backend.log 2>&1 &
    
    echo "Backend started with PID: $!"
    
    # Wait a moment and check if it's running
    sleep 5
    if pgrep -f desn-backend.jar > /dev/null; then
        echo "Backend is running"
    else
        echo "Backend failed to start. Check /home/ubuntu/backend.log"
        exit 1
    fi
EOF

echo -e "${GREEN}✓ Backend restarted${NC}"
echo ""

# Sync frontend to web server directory (assuming nginx)
echo -e "${YELLOW}Deploying frontend to web server...${NC}"
ssh -i "$PEM_FILE" "$EC2_USER@$EC2_HOST" << 'EOF'
    sudo rm -rf /var/www/html/*
    sudo cp -r /home/ubuntu/desn-frontend/* /var/www/html/
    sudo chown -R www-data:www-data /var/www/html
    sudo systemctl reload nginx || true
EOF

echo -e "${GREEN}✓ Frontend deployed${NC}"
echo ""

# Test deployment
echo -e "${YELLOW}Testing deployment...${NC}"
sleep 3
if ssh -i "$PEM_FILE" "$EC2_USER@$EC2_HOST" "curl -s http://localhost:8080/api/forms/health" | grep -q "ok"; then
    echo -e "${GREEN}✓ Backend health check passed${NC}"
else
    echo -e "${RED}✗ Backend health check failed${NC}"
fi

echo ""
echo -e "${GREEN}=== Deployment Complete! ===${NC}"
echo "Frontend: https://desnepal.com"
echo "Backend: https://desnepal.com/api"
echo ""
echo "Check logs on server:"
echo "  Backend: ssh -i $PEM_FILE $EC2_USER@$EC2_HOST 'tail -f /home/ubuntu/backend.log'"
echo "  Nginx: ssh -i $PEM_FILE $EC2_USER@$EC2_HOST 'sudo tail -f /var/log/nginx/error.log'"
