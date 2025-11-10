#!/bin/bash
# Backend Server Startup Script with Environment Variables
# This script loads environment variables from .env file and starts the backend

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting DESN Backend Server...${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Warning: .env file not found!${NC}"
    echo -e "${YELLOW}Creating .env from .env.example...${NC}"
    cp .env.example .env
    echo -e "${RED}Please edit .env and add your Khalti API keys!${NC}"
    echo -e "${RED}Then run this script again.${NC}"
    exit 1
fi

# Load environment variables from .env file
echo -e "${GREEN}Loading environment variables from .env...${NC}"
export $(cat .env | grep -v '^#' | grep -v '^$' | xargs)

# Check if Khalti keys are set
if [ -z "$KHALTI_SECRET_KEY" ] || [ "$KHALTI_SECRET_KEY" = "your_khalti_secret_key_here" ]; then
    echo -e "${YELLOW}Warning: KHALTI_SECRET_KEY is not configured!${NC}"
    echo -e "${YELLOW}Payment features will not work until you add your Khalti API keys.${NC}"
    echo -e "${YELLOW}Get your keys from: https://khalti.com/${NC}"
    echo ""
    echo -e "${GREEN}Starting backend anyway (payment features disabled)...${NC}"
    echo ""
fi

# Start the backend
echo -e "${GREEN}Starting Spring Boot application...${NC}"
./mvnw spring-boot:run
