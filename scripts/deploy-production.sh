#!/usr/bin/env bash
set -euo pipefail

# deploy-production.sh
# Unified production deployment for DESN (canonical domain: desnepal.org)
# Tasks: build frontend, build backend, upload artifacts, configure nginx, issue SSL certs, restart services.

SERVER_IP="98.81.50.37"
SSH_USER="ubuntu"
SSH_KEY="${HOME}/.ssh/desn-app-key.pem" # Adjust if different
DOMAIN_ROOT="desnepal.org"
DOMAIN_WWW="www.desnepal.org"
LEGACY_DOMAIN="desnepal.com"
FRONTEND_BUILD_DIR="dist"
REMOTE_FRONTEND_ROOT="/var/www/desnepal"
REMOTE_APP_DIR="/home/ubuntu/desn-app"
REMOTE_BACKEND_DIR="${REMOTE_APP_DIR}/backend"
BACKEND_JAR_PATTERN="backend/target/proxy-backend-*.jar"
SYSTEMD_UNIT="desn-backend.service"

log() { printf "\n[deploy] %s\n" "$*"; }
err() { printf "\n[error] %s\n" "$*" >&2; }

check_file() { [[ -f "$1" ]] || { err "Missing file: $1"; exit 1; }; }
check_dir() { [[ -d "$1" ]] || { err "Missing directory: $1"; exit 1; }; }

check_file backend/pom.xml
check_file nginx-recommended.conf

log "Building frontend (Vite) for ${DOMAIN_ROOT}"
rm -rf "$FRONTEND_BUILD_DIR"
VITE_API_BASE_URL="https://${DOMAIN_ROOT}" npm ci
VITE_API_BASE_URL="https://${DOMAIN_ROOT}" npm run build

log "Building backend (Spring Boot)"
( cd backend && ./mvnw clean package -DskipTests )
BACKEND_JAR_LOCAL=$(ls -1 ${BACKEND_JAR_PATTERN} | head -n1 || true)
[[ -n "$BACKEND_JAR_LOCAL" ]] || { err "Backend JAR not found after build."; exit 1; }

log "Uploading frontend build"
scp -i "$SSH_KEY" -r "$FRONTEND_BUILD_DIR"/* "${SSH_USER}@${SERVER_IP}:${REMOTE_FRONTEND_ROOT}/"

log "Uploading backend jar"
scp -i "$SSH_KEY" "$BACKEND_JAR_LOCAL" "${SSH_USER}@${SERVER_IP}:${REMOTE_BACKEND_DIR}/app.jar"

log "Server configuration & SSL issuance"
ssh -i "$SSH_KEY" "${SSH_USER}@${SERVER_IP}" bash -s <<'REMOTE'
set -euo pipefail
DOMAIN_ROOT="desnepal.org"
DOMAIN_WWW="www.desnepal.org"
LEGACY_DOMAIN="desnepal.com"
REMOTE_APP_DIR="/home/ubuntu/desn-app"
REMOTE_FRONTEND_ROOT="/var/www/desnepal"
SYSTEMD_UNIT="desn-backend.service"
CONF_PATH="/etc/nginx/sites-available/desn.conf"

sudo mkdir -p "${REMOTE_FRONTEND_ROOT}" || true
sudo apt-get update -y
sudo apt-get install -y nginx certbot python3-certbot-nginx || true
sudo systemctl stop lighttpd 2>/dev/null || true
sudo systemctl disable lighttpd 2>/dev/null || true

# Deploy nginx config if changed
LOCAL_CONF_HASH=$(sha256sum nginx-recommended.conf | awk '{print $1}')
CURRENT_HASH=$(sudo sha256sum "$CONF_PATH" 2>/dev/null | awk '{print $1}' || true)
if [ "$LOCAL_CONF_HASH" != "$CURRENT_HASH" ]; then
  sudo cp nginx-recommended.conf "$CONF_PATH"
  sudo ln -sf "$CONF_PATH" /etc/nginx/sites-enabled/desn.conf
  sudo rm /etc/nginx/sites-enabled/default 2>/dev/null || true
fi
sudo nginx -t && sudo systemctl reload nginx

# Issue primary cert if missing
if [ ! -d "/etc/letsencrypt/live/${DOMAIN_ROOT}" ]; then
  sudo certbot --nginx -d "${DOMAIN_ROOT}" -d "${DOMAIN_WWW}" --agree-tos -m admin@${DOMAIN_ROOT} --redirect --no-eff-email || echo "Certbot primary issuance attempted"
  sudo nginx -t && sudo systemctl reload nginx
fi
# Issue legacy cert for redirect if missing
if [ ! -d "/etc/letsencrypt/live/${LEGACY_DOMAIN}" ]; then
  sudo certbot --nginx -d "${LEGACY_DOMAIN}" -d "www.${LEGACY_DOMAIN}" --agree-tos -m admin@${DOMAIN_ROOT} --redirect --no-eff-email || echo "Certbot legacy issuance attempted"
  sudo nginx -t && sudo systemctl reload nginx
fi

# Systemd backend service
sudo bash -c "cat > /etc/systemd/system/${SYSTEMD_UNIT} <<EOF
[Unit]
Description=DESN Spring Boot Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=${REMOTE_APP_DIR}/backend
EnvironmentFile=${REMOTE_APP_DIR}/backend/.env
ExecStart=/usr/bin/java -jar ${REMOTE_APP_DIR}/backend/app.jar
SuccessExitStatus=143
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF"

sudo systemctl daemon-reload
sudo systemctl enable ${SYSTEMD_UNIT}
sudo systemctl restart ${SYSTEMD_UNIT}

# Permissions
sudo chown -R www-data:www-data "${REMOTE_FRONTEND_ROOT}" || true
sudo find "${REMOTE_FRONTEND_ROOT}" -type f -exec chmod 644 {} +
sudo find "${REMOTE_FRONTEND_ROOT}" -type d -exec chmod 755 {} +

# Status outputs
systemctl status ${SYSTEMD_UNIT} --no-pager || true
sudo ss -tlnp | grep -E ':80|:443' || true
REMOTE

log "Deployment complete. Verification commands:" 
cat <<EOF
curl -I http://desnepal.org
curl -I https://desnepal.org
curl -I https://desnepal.org/api/actuator/health || curl -I https://desnepal.org/actuator/health
curl -I https://desnepal.com   # should 301 to .org
EOF
