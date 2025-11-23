#!/usr/bin/env bash
set -euo pipefail

# issue-certs.sh
# Idempotent Let's Encrypt certificate issuance / renewal for DESN domains.
# Focus: obtain/renew SSL certs BEFORE full deployment steps.
# Usage:
#   1. Ensure DNS A records point to this server for all domains.
#   2. Upload this script to the server or run via SSH.
#   3. Run: sudo bash issue-certs.sh
#   4. Verify: curl -I https://desnepal.org
# Domains covered:
#   - desnepal.org, www.desnepal.org (canonical)
#   - desnepal.com, www.desnepal.com (legacy redirect)

CANONICAL_DOMAINS=(desnepal.org www.desnepal.org)
LEGACY_DOMAINS=(desnepal.com www.desnepal.com)
EMAIL="admin@desnepal.org"
NGINX_CONF="/etc/nginx/sites-available/desn.conf"
WEBROOT="/var/www/desnepal"  # used for HTTP-01 fallback if needed

log() { printf "\n[certs] %s\n" "$*"; }
err() { printf "\n[error] %s\n" "$*" >&2; }

require_root() {
  if [[ $EUID -ne 0 ]]; then
    err "Run as root (sudo)."; exit 1; fi
}

install_certbot() {
  if command -v certbot >/dev/null 2>&1; then
    log "certbot already installed."; return; fi
  log "Installing certbot (snap method recommended).";
  if command -v snap >/dev/null 2>&1; then
    snap install core; snap refresh core
    snap install --classic certbot
    ln -sf /snap/bin/certbot /usr/bin/certbot
  else
    apt-get update -y
    apt-get install -y certbot python3-certbot-nginx
  fi
}

disable_lighttpd() {
  if systemctl is-active --quiet lighttpd; then
    log "Disabling conflicting lighttpd service.";
    systemctl stop lighttpd || true
    systemctl disable lighttpd || true
  fi
}

ensure_nginx() {
  if ! command -v nginx >/dev/null 2>&1; then
    apt-get update -y
    apt-get install -y nginx
  fi
  systemctl enable nginx || true
  systemctl start nginx || true
}

test_dns() {
  local fail=0
  for d in "${CANONICAL_DOMAINS[@]}" "${LEGACY_DOMAINS[@]}"; do
    local ip
    ip=$(dig +short A "$d" | head -n1 || true)
    if [[ -z "$ip" ]]; then
      err "No A record resolved for $d"; fail=1; continue
    fi
    log "DNS $d -> $ip"
  done
  if [[ $fail -eq 1 ]]; then
    err "Fix DNS before issuing certs."; exit 1; fi
}

issue_group_cert() {
  local group_name="$1"; shift
  local domains=("$@")
  local first="${domains[0]}"
  if [[ -d "/etc/letsencrypt/live/${first}" ]]; then
    log "Existing cert directory for ${first}. Attempting renewal instead.";
    certbot renew --no-random-sleep-on-renew --deploy-hook "systemctl reload nginx" || err "Renew attempt finished (non-zero exit acceptable if no renewal needed)."
    return
  fi
  local args=()
  for d in "${domains[@]}"; do args+=( -d "$d" ); done
  log "Issuing new ${group_name} certificate for: ${domains[*]}";
  # Prefer nginx plugin; fallback to webroot if nginx test fails
  if nginx -t >/dev/null 2>&1; then
    certbot --nginx "${args[@]}" --agree-tos -m "$EMAIL" --redirect --no-eff-email --deploy-hook "systemctl reload nginx" || err "Certbot returned non-zero"
  else
    log "Nginx config test failed; using webroot method.";
    mkdir -p "$WEBROOT" || true
    certbot certonly --webroot -w "$WEBROOT" "${args[@]}" --agree-tos -m "$EMAIL" --no-eff-email || err "Webroot issuance returned non-zero"
  fi
}

post_checks() {
  log "Verifying HTTPS responses (status + cert)."
  for d in "${CANONICAL_DOMAINS[@]}"; do
    curl -k -I "https://${d}" | head -n1 || true
    openssl s_client -servername "$d" -connect "$d:443" </dev/null 2>/dev/null | openssl x509 -noout -dates | sed "s/^/[certs] $d /"
  done
}

main() {
  require_root
  log "Starting certificate issuance flow."
  disable_lighttpd
  ensure_nginx
  install_certbot
  test_dns
  # Ensure canonical redirect server blocks exist (user should have deployed config beforehand)
  if [[ ! -f "$NGINX_CONF" ]]; then
    log "Warning: $NGINX_CONF not found. You should deploy nginx-recommended.conf before running --nginx method.";
  fi
  systemctl reload nginx || true

  issue_group_cert "canonical" "${CANONICAL_DOMAINS[@]}"
  issue_group_cert "legacy" "${LEGACY_DOMAINS[@]}"

  post_checks
  log "Certificate issuance flow complete."
  log "Next: verify 301 redirects from desnepal.com to https://desnepal.org, then proceed with deployment."
}

main "$@"
