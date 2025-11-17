#!/bin/bash

# Fix backend systemd service with correct database credentials
cat > /tmp/desn-backend.service << 'EOF'
[Unit]
Description=DESN Backend Service
After=network.target postgresql.service

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/desn-app/backend
ExecStart=/usr/bin/java -jar /home/ubuntu/desn-app/backend/app.jar
Restart=always
RestartSec=10
Environment="SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/desn"
Environment="SPRING_DATASOURCE_USERNAME=desn_user"
Environment="SPRING_DATASOURCE_PASSWORD=desn2025"
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

sudo mv /tmp/desn-backend.service /etc/systemd/system/desn-backend.service
sudo systemctl daemon-reload
sudo systemctl restart desn-backend

echo "Waiting for backend to start..."
sleep 5

if sudo systemctl is-active --quiet desn-backend; then
  echo "✅ Backend is running"
  curl -s http://localhost:8080/api/resources | head -c 100
else
  echo "❌ Backend failed to start"
  sudo systemctl status desn-backend
fi
