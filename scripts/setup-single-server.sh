#!/bin/bash
# Complete server setup script for DESN on single EC2 instance
# This installs Java, PostgreSQL, Nginx, and configures everything

set -e
echo "🚀 Starting DESN server setup..."

# Update system
echo "📦 Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install Java 21
echo "☕ Installing Java 21..."
sudo apt-get install -y openjdk-21-jre-headless

# Install PostgreSQL 16
echo "🐘 Installing PostgreSQL 16..."
sudo apt-get install -y postgresql postgresql-contrib

# Install Nginx
echo "🌐 Installing Nginx..."
sudo apt-get install -y nginx

# Configure PostgreSQL
echo "🔧 Configuring PostgreSQL..."
sudo -u postgres psql <<EOF
CREATE DATABASE desn;
CREATE USER desn_user WITH PASSWORD 'desn_password_2025';
GRANT ALL PRIVILEGES ON DATABASE desn TO desn_user;
\c desn
GRANT ALL ON SCHEMA public TO desn_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO desn_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO desn_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO desn_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO desn_user;
EOF

# Configure PostgreSQL to accept local connections
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = 'localhost'/" /etc/postgresql/*/main/postgresql.conf

# Restart PostgreSQL
sudo systemctl restart postgresql
sudo systemctl enable postgresql

# Create application directories
echo "📁 Creating application directories..."
sudo mkdir -p /home/ubuntu/desn-app/{frontend,backend,logs,data,backups}
sudo chown -R ubuntu:ubuntu /home/ubuntu/desn-app

# Configure firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 8080/tcp
sudo ufw --force enable

# Create backup script
echo "💾 Creating backup script..."
cat > /home/ubuntu/desn-app/backup-db.sh <<'BACKUP_SCRIPT'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/ubuntu/desn-app/backups"
sudo -u postgres pg_dump desn > $BACKUP_DIR/desn_backup_$DATE.sql
# Keep only last 7 days of backups
find $BACKUP_DIR -name "desn_backup_*.sql" -mtime +7 -delete
echo "Backup completed: desn_backup_$DATE.sql"
BACKUP_SCRIPT

chmod +x /home/ubuntu/desn-app/backup-db.sh

# Setup daily backup cron job
(crontab -l 2>/dev/null; echo "0 2 * * * /home/ubuntu/desn-app/backup-db.sh") | crontab -

# Verify installations
echo "✅ Verifying installations..."
java -version
psql --version
nginx -v

echo ""
echo "✅ Server setup complete!"
echo ""
echo "📊 Installed services:"
echo "  - Java 21: ✓"
echo "  - PostgreSQL: ✓"
echo "  - Nginx: ✓"
echo ""
echo "🗄️  Database info:"
echo "  - Database: desn"
echo "  - User: desn_user"
echo "  - Password: desn_password_2025"
echo "  - Host: localhost"
echo ""
echo "💾 Automated daily backups: Enabled (2 AM)"
echo ""
echo "🎉 Ready for deployment!"
