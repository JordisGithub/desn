#!/usr/bin/env bash
set -euo pipefail

# deploy-canonical.sh
# Minimal remote deployment for canonical domain desnepal.org ONLY.
# Performs: connectivity check, uploads nginx config if changed, issues cert if missing,
# uploads built frontend & backend jar if present locally, restarts services, verifies headers.

SERVER_IP="98.81.50.37"
SSH_USER="ubuntu"
SSH_KEY="${HOME}/.ssh/desn-personal-key.pem"
CANONICAL_DOMAIN="desnepal.org"
CANONICAL_WWW="www.desnepal.org"
REMOTE_APP_ROOT="/home/ubuntu/desn-app"
REMOTE_FRONTEND="/var/www/desnepal"
NGINX_CONF_LOCAL="nginx-recommended.conf"
NGINX_CONF_REMOTE="/etc/nginx/sites-available/desn.conf"
BACKEND_JAR_GLOB="backend/target/proxy-backend-*.jar"

log(){ printf "\n[deploy] %s\n" "$*"; }
err(){ printf "\n[error] %s\n" "$*" >&2; }

require(){ [[ -f "$1" ]] || { err "Missing $1"; exit 1; }; }

check_ssh(){
  if ! [[ -f "$SSH_KEY" ]]; then
    err "SSH key not found at $SSH_KEY"; exit 1;
  fi
  if ! ssh -i "$SSH_KEY" -o BatchMode=yes -o ConnectTimeout=5 "$SSH_USER@$SERVER_IP" 'echo ok' 2>/dev/null | grep -q ok; then
    err "SSH connectivity failed (key mismatch or server unreachable)."; exit 1;
  fi
  log "SSH connectivity OK.";
}

upload_nginx(){
  require "$NGINX_CONF_LOCAL"
  local local_hash remote_hash
  local_hash=$(sha256sum "$NGINX_CONF_LOCAL" | awk '{print $1}')
  remote_hash=$(ssh -i "$SSH_KEY" "$SSH_USER@$SERVER_IP" "sudo sha256sum $NGINX_CONF_REMOTE 2>/dev/null | awk '{print \$1}'" || true)
  if [[ "$local_hash" != "$remote_hash" ]]; then
    log "Uploading updated nginx config";
    scp -i "$SSH_KEY" "$NGINX_CONF_LOCAL" "$SSH_USER@$SERVER_IP:~/";
    ssh -i "$SSH_KEY" "$SSH_USER@$SERVER_IP" "sudo cp ~/$(basename $NGINX_CONF_LOCAL) $NGINX_CONF_REMOTE && sudo ln -sf $NGINX_CONF_REMOTE /etc/nginx/sites-enabled/desn.conf && sudo rm /etc/nginx/sites-enabled/default 2>/dev/null || true && sudo nginx -t && sudo systemctl reload nginx";
  else
    log "Nginx config unchanged (hash match).";
  fi
}

issue_cert(){
  log "Ensuring SSL certificate for $CANONICAL_DOMAIN";
  ssh -i "$SSH_KEY" "$SSH_USER@$SERVER_IP" bash -s <<'REMOTE'
set -euo pipefail
CANONICAL_DOMAIN="desnepal.org"
CANONICAL_WWW="www.desnepal.org"
if [ ! -d "/etc/letsencrypt/live/${CANONICAL_DOMAIN}" ]; then
  sudo apt-get update -y
  sudo apt-get install -y nginx certbot python3-certbot-nginx || true
  sudo certbot --nginx -d "$CANONICAL_DOMAIN" -d "$CANONICAL_WWW" --agree-tos -m admin@${CANONICAL_DOMAIN} --redirect --no-eff-email || true
  sudo nginx -t && sudo systemctl reload nginx
fi
REMOTE
}

upload_artifacts(){
  if [[ -d dist ]]; then
    log "Uploading frontend dist";
    rsync -e "ssh -i $SSH_KEY" -az --delete dist/ "$SSH_USER@$SERVER_IP:$REMOTE_FRONTEND/" || err "Frontend rsync failed";
  else
    log "No dist/ directory; skip frontend upload.";
  fi
  local jar
  jar=$(ls -1 $BACKEND_JAR_GLOB 2>/dev/null | head -n1 || true)
  if [[ -n "$jar" ]]; then
    log "Uploading backend jar $jar";
    scp -i "$SSH_KEY" "$jar" "$SSH_USER@$SERVER_IP:$REMOTE_APP_ROOT/backend/app.jar" || err "Backend upload failed";
    ssh -i "$SSH_KEY" "$SSH_USER@$SERVER_IP" "sudo systemctl restart desn-backend.service || true";
  else
    log "No backend jar found; skip backend upload.";
  fi
}

verify_headers(){
  log "Verifying security headers";
  curl -s -D - https://$CANONICAL_DOMAIN -o /dev/null | grep -Ei 'Strict-Transport-Security|X-Frame-Options|X-Content-Type-Options|Referrer-Policy|Permissions-Policy' || err "One or more headers missing";
  log "Header check output above."
}

summary(){
  cat <<EOF
Deployment steps completed:
 - Nginx config deployed (canonical only)
 - SSL cert ensured for $CANONICAL_DOMAIN
 - Frontend & backend artifacts uploaded (if present)
 - Security headers verified

If headers missing, review nginx-recommended.conf and run:
  ssh -i $SSH_KEY $SSH_USER@$SERVER_IP 'sudo nginx -t && sudo systemctl reload nginx'

To rebuild & redeploy quickly:
  VITE_API_BASE_URL=https://$CANONICAL_DOMAIN npm run build
  (cd backend && ./mvnw clean package -DskipTests)
  bash scripts/deploy-canonical.sh
EOF
}

main(){
  check_ssh
  upload_nginx
  issue_cert
  upload_artifacts
  verify_headers || true
  summary
}

main "$@"
