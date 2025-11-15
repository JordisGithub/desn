#!/bin/bash
# Simple deployment script for AWS (no AWS CLI needed)
# Edit the variables below with your EC2 IP and run: ./scripts/deploy-simple.sh

set -e

# ============================================
# CONFIGURATION - UPDATE THESE VALUES
# ============================================
EC2_IP="15.206.210.71"  # EC2 server IP
RDS_ENDPOINT="localhost"  # Use "localhost" for single-server setup
RDS_PASSWORD="desn_password_2025"  # Database password
KEY_PATH="$HOME/.ssh/desn-app-key.pem"  # Path to your SSH key

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if variables are set
if [ "$EC2_IP" = "YOUR_EC2_IP_HERE" ]; then
    echo -e "${RED}❌ Error: Please edit this script and set EC2_IP${NC}"
    echo "Find your EC2 IP in AWS Console → EC2 → Instances → DESN-App-Server"
    exit 1
fi

if [ "$RDS_ENDPOINT" = "YOUR_RDS_ENDPOINT_HERE" ]; then
    echo -e "${RED}❌ Error: Please edit this script and set RDS_ENDPOINT${NC}"
    echo "Find your RDS endpoint in AWS Console → RDS → Databases → desn-db"
    exit 1
fi

if [ "$RDS_PASSWORD" = "YOUR_RDS_PASSWORD_HERE" ]; then
    echo -e "${RED}❌ Error: Please edit this script and set RDS_PASSWORD${NC}"
    exit 1
fi

# Check if SSH key exists
if [ ! -f "$KEY_PATH" ]; then
    echo -e "${RED}❌ Error: SSH key not found at $KEY_PATH${NC}"
    echo "Make sure you've downloaded the key from AWS and moved it to ~/.ssh/"
    exit 1
fi

echo -e "${GREEN}🚀 Starting deployment to $EC2_IP${NC}"

# Test SSH connection
echo -e "${YELLOW}📡 Testing SSH connection...${NC}"
if ! ssh -i "$KEY_PATH" -o ConnectTimeout=5 -o StrictHostKeyChecking=no ubuntu@$EC2_IP "echo 'SSH connection successful'" 2>/dev/null; then
    echo -e "${RED}❌ Cannot connect to server${NC}"
    echo "Make sure:"
    echo "  1. EC2 instance is running"
    echo "  2. Security group allows SSH from your IP"
    echo "  3. SSH key has correct permissions: chmod 400 $KEY_PATH"
    exit 1
fi

# Build frontend
echo -e "${YELLOW}📦 Building frontend...${NC}"
npm ci
npm run build

# Build backend
echo -e "${YELLOW}📦 Building backend...${NC}"
cd backend
./mvnw clean package -DskipTests
cd ..

# Deploy frontend
echo -e "${YELLOW}📤 Uploading frontend...${NC}"
scp -i "$KEY_PATH" -o StrictHostKeyChecking=no -r dist/* ubuntu@$EC2_IP:/home/ubuntu/desn-app/frontend/

# Deploy backend
echo -e "${YELLOW}📤 Uploading backend...${NC}"
scp -i "$KEY_PATH" -o StrictHostKeyChecking=no backend/target/*.jar ubuntu@$EC2_IP:/home/ubuntu/desn-app/backend/app.jar

# Create .env file on server
echo -e "${YELLOW}⚙️  Configuring environment...${NC}"
ssh -i "$KEY_PATH" -o StrictHostKeyChecking=no ubuntu@$EC2_IP "cat > /home/ubuntu/desn-app/backend/.env" <<EOF
DATABASE_URL=jdbc:postgresql://$RDS_ENDPOINT:5432/desn
DATABASE_USERNAME=desn_user
DATABASE_PASSWORD=$RDS_PASSWORD
CORS_ALLOWED_ORIGINS=http://$EC2_IP,https://desnepal.com
EMAIL_NOTIFICATIONS_ENABLED=false
JWT_SECRET=$(openssl rand -base64 32)
KHALTI_PUBLIC_KEY=your_khalti_public_key
KHALTI_SECRET_KEY=your_khalti_secret_key
EOF

# Copy deployment script
echo -e "${YELLOW}📤 Uploading deployment script...${NC}"
scp -i "$KEY_PATH" -o StrictHostKeyChecking=no scripts/deploy-server.sh ubuntu@$EC2_IP:/home/ubuntu/desn-app/

# Execute deployment on server
echo -e "${YELLOW}🔄 Restarting services...${NC}"
ssh -i "$KEY_PATH" -o StrictHostKeyChecking=no ubuntu@$EC2_IP "cd /home/ubuntu/desn-app && bash deploy-server.sh"

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}🌐 Application URL: http://$EC2_IP${NC}"
echo ""
echo "Next steps:"
echo "  1. Test the app: curl http://$EC2_IP"
echo "  2. Check backend: curl http://$EC2_IP:8080/actuator/health"
echo "  3. View logs: ssh -i $KEY_PATH ubuntu@$EC2_IP 'sudo journalctl -u desn-backend -n 50'"
