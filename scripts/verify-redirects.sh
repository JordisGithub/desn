#!/usr/bin/env bash
set -euo pipefail

# verify-redirects.sh
# Quick checks for domain redirect & header hardening after cutover.
# Run from local machine or server (requires curl, grep).

CANONICAL="https://desnepal.org"
LEGACY_HOSTS=(desnepal.com www.desnepal.com)

log() { printf "[verify] %s\n" "$*"; }
check_legacy() {
  local host="$1"
  local url="https://$host"
  local status
  status=$(curl -s -o /dev/null -w "%{http_code}" -I "$url" || true)
  local location
  location=$(curl -s -I "$url" | awk -F': ' '/^Location:/ {print $2}' | tr -d '\r')
  if [[ "$status" != "301" || "$location" != "$CANONICAL/" && "$location" != "$CANONICAL"* ]]; then
    log "FAIL redirect $host -> ($status) $location"; return 1
  fi
  log "OK   redirect $host -> $location"
}

check_security_headers() {
  local missing=0
  local headers="Strict-Transport-Security X-Frame-Options X-Content-Type-Options Referrer-Policy Permissions-Policy"
  local response
  response=$(curl -s -D - "$CANONICAL" -o /dev/null)
  for h in $headers; do
    if ! grep -qi "^$h:" <<<"$response"; then
      log "MISSING header: $h"; missing=$((missing+1))
    else
      log "HEADER $h present"
    fi
  done
  return $missing
}

main() {
  log "Verifying legacy redirects";
  local fail=0
  for host in "${LEGACY_HOSTS[@]}"; do
    check_legacy "$host" || fail=1
  done
  log "Checking security headers on canonical";
  if ! check_security_headers; then
    log "One or more security headers missing."; fail=1
  fi
  if [[ $fail -eq 0 ]]; then
    log "All redirect + header checks passed."; exit 0
  else
    log "Redirect/header verification FAILED."; exit 2
  fi
}

main "$@"
