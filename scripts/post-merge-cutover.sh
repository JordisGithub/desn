#!/usr/bin/env bash
set -euo pipefail

# post-merge-cutover.sh
# End-to-end production cutover steps after merging domain migration to master.
# Performs: pull master, build frontend/backend, deploy nginx config, issue certs if missing,
# verify redirects & headers.

SERVER_IP="98.81.50.37"
SSH_USER="ubuntu"
SSH_KEY="${HOME}/.ssh/desn-app-key.pem"
CANONICAL_DOMAIN="desnepal.org"
CANONICAL_WWW="www.desnepal.org"
LEGACY_DOMAIN="desnepal.com"
REMOTE_APP_ROOT="/home/ubuntu/desn-app"
REMOTE_FRONTEND="/var/www/desnepal"
NGINX_CONF_LOCAL="nginx-recommended.conf"
NGINX_CONF_REMOTE="/etc/nginx/sites-available/desn.conf"

log() { printf "\n[cutover] %s\n" "$*"; }
err() { printf "\n[error] %s\n" "$*" >&2; }

require_files() {
  for f in "$NGINX_CONF_LOCAL" backend/pom.xml package.json; do
    [[ -f "$f" ]] || { err "Missing required file: $f"; exit 1; }
  done
}

build_artifacts() {
  log "Building frontend for $CANONICAL_DOMAIN";
  rm -rf dist
  VITE_API_BASE_URL="https://${CANONICAL_DOMAIN}" npm ci
  VITE_API_BASE_URL="https://${CANONICAL_DOMAIN}" npm run build
  log "Building backend (Spring Boot)";
  ( cd backend && ./mvnw clean package -DskipTests )
}

deploy() {
  local jar
  jar=$(ls -1 backend/target/proxy-backend-*.jar | head -n1 || true)
  [[ -n "$jar" ]] || { err "Backend JAR not found"; exit 1; }
  log "Uploading artifacts to server";
  scp -i "$SSH_KEY" -r dist/* "${SSH_USER}@${SERVER_IP}:${REMOTE_FRONTEND}/" || err "Frontend upload failed"
  scp -i "$SSH_KEY" "$jar" "${SSH_USER}@${SERVER_IP}:${REMOTE_APP_ROOT}/backend/app.jar" || err "Backend upload failed"
}

remote_steps() {
  log "Executing remote cutover steps";
  ssh -i "$SSH_KEY" "${SSH_USER}@${SERVER_IP}" bash -s <<'REMOTE'
set -euo pipefail
CANONICAL_DOMAIN="desnepal.org"
CANONICAL_WWW="www.desnepal.org"
LEGACY_DOMAIN="desnepal.com"
REMOTE_APP_ROOT="/home/ubuntu/desn-app"
REMOTE_FRONTEND="/var/www/desnepal"
NGINX_CONF_REMOTE="/etc/nginx/sites-available/desn.conf"

sudo mkdir -p "$REMOTE_FRONTEND"
sudo apt-get update -y
sudo apt-get install -y nginx certbot python3-certbot-nginx || true
sudo systemctl stop lighttpd 2>/dev/null || true
sudo systemctl disable lighttpd 2>/dev/null || true

# Push nginx config if differs
LOCAL_HASH=$(sha256sum nginx-recommended.conf | awk '{print $1}')
REMOTE_HASH=$(sudo sha256sum "$NGINX_CONF_REMOTE" 2>/dev/null | awk '{print $1}' || true)
if [ "$LOCAL_HASH" != "$REMOTE_HASH" ]; then
  sudo cp nginx-recommended.conf "$NGINX_CONF_REMOTE"
  sudo ln -sf "$NGINX_CONF_REMOTE" /etc/nginx/sites-enabled/desn.conf
  sudo rm /etc/nginx/sites-enabled/default 2>/dev/null || true
fi
sudo nginx -t && sudo systemctl reload nginx

# Issue certs if absent
if [ ! -d "/etc/letsencrypt/live/${CANONICAL_DOMAIN}" ]; then
  sudo certbot --nginx -d "$CANONICAL_DOMAIN" -d "$CANONICAL_WWW" --agree-tos -m admin@${CANONICAL_DOMAIN} --redirect --no-eff-email || true
  sudo nginx -t && sudo systemctl reload nginx
fi
if [ ! -d "/etc/letsencrypt/live/${LEGACY_DOMAIN}" ]; then
  sudo certbot --nginx -d "$LEGACY_DOMAIN" -d "www.${LEGACY_DOMAIN}" --agree-tos -m admin@${CANONICAL_DOMAIN} --redirect --no-eff-email || true
  sudo nginx -t && sudo systemctl reload nginx
fi

# Systemd backend service
sudo bash -c "cat > /etc/systemd/system/desn-backend.service <<EOF
[Unit]
Description=DESN Spring Boot Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=${REMOTE_APP_ROOT}/backend
EnvironmentFile=${REMOTE_APP_ROOT}/backend/.env
ExecStart=/usr/bin/java -jar ${REMOTE_APP_ROOT}/backend/app.jar
SuccessExitStatus=143
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF"

sudo systemctl daemon-reload
sudo systemctl enable desn-backend.service
sudo systemctl restart desn-backend.service

sudo chown -R www-data:www-data "$REMOTE_FRONTEND" || true
sudo find "$REMOTE_FRONTEND" -type f -exec chmod 644 {} +
sudo find "$REMOTE_FRONTEND" -type d -exec chmod 755 {} +

curl -I https://desnepal.org || true
curl -I https://desnepal.com || true
REMOTE
}

verify_local() {
  log "Running local verification script";
  bash scripts/verify-redirects.sh || err "Verification script reported issues"
}

main() {
  require_files
  build_artifacts
  deploy
  remote_steps
  verify_local
  log "Cutover complete. Review results and run search console updates."
}

main "$@"
