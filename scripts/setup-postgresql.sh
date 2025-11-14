#!/bin/bash

# PostgreSQL Setup Script for DESN
# This script installs PostgreSQL, creates database, and configures the backend

set -e

SERVER_IP="13.204.228.199"
SERVER_USER="ubuntu"
SSH_KEY="$HOME/.ssh/desn-server.pem"

DB_NAME="desn"
DB_USER="desn_user"
DB_PASSWORD="desn_secure_$(openssl rand -hex 8)"

echo "🐘 Setting up PostgreSQL for DESN..."
echo "Server: $SERVER_IP"
echo ""

# Install PostgreSQL
echo "📦 Installing PostgreSQL..."
ssh -i "$SSH_KEY" $SERVER_USER@$SERVER_IP << 'ENDSSH'
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql
ENDSSH

echo "✅ PostgreSQL installed"
echo ""

# Create database and user
echo "📝 Creating database and user..."
ssh -i "$SSH_KEY" $SERVER_USER@$SERVER_IP << ENDSSH
sudo -u postgres psql << EOF
-- Create user
CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';

-- Create database
CREATE DATABASE $DB_NAME OWNER $DB_USER;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;

-- Connect to database and grant schema privileges
\c $DB_NAME
GRANT ALL ON SCHEMA public TO $DB_USER;

-- Show databases
\l
EOF
ENDSSH

echo "✅ Database created"
echo ""

# Update backend configuration
echo "📝 Updating backend configuration..."
ssh -i "$SSH_KEY" $SERVER_USER@$SERVER_IP << ENDSSH
# Backup current H2 database
sudo cp -r /home/ubuntu/desn-app/data /home/ubuntu/desn-app/data.backup.\$(date +%Y%m%d_%H%M%S)

# Create new application.properties for PostgreSQL
sudo tee /home/ubuntu/desn-app/backend/application.properties > /dev/null << 'EOF'
# Spring Boot Configuration
spring.application.name=proxy

# Server Configuration
server.port=8080

# PostgreSQL Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/$DB_NAME
spring.datasource.username=$DB_USER
spring.datasource.password=$DB_PASSWORD
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Connection Pool
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5

# CORS
app.cors.allowed-origins=https://desnepal.com,https://www.desnepal.com,http://13.204.228.199

# JWT
jwt.secret=${JWT_SECRET:your-secret-key-change-this-in-production-minimum-256-bits-required-for-hs256}
jwt.expiration=86400000

# File Upload
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB

# Email Configuration (disabled until configured)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=
spring.mail.password=
app.email.notifications.enabled=false

# Actuator
management.endpoints.web.exposure.include=health,info
management.endpoint.health.show-details=when-authorized

# Logging
logging.level.root=INFO
logging.level.com.example.proxy=DEBUG
EOF
ENDSSH

echo "✅ Configuration updated"
echo ""

# Restart backend
echo "🔄 Restarting backend service..."
ssh -i "$SSH_KEY" $SERVER_USER@$SERVER_IP "sudo systemctl restart desn-backend"

echo "⏳ Waiting for backend to start..."
sleep 10

# Check status
ssh -i "$SSH_KEY" $SERVER_USER@$SERVER_IP "sudo systemctl status desn-backend --no-pager | head -20"

echo ""
echo "🎉 PostgreSQL setup complete!"
echo ""
echo "📝 Database Credentials:"
echo "   Database: $DB_NAME"
echo "   User: $DB_USER"
echo "   Password: $DB_PASSWORD"
echo ""
echo "⚠️  IMPORTANT: Save these credentials securely!"
echo ""
echo "Next steps:"
echo "1. Create admin user by registering at: https://desnepal.com/register"
echo "2. Manually promote user to admin in database"
echo "3. Test login at: https://desnepal.com/login"
echo ""
