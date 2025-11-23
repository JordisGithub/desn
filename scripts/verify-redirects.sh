#!/usr/bin/env bash
set -euo pipefail

# verify-headers.sh (simplified from verify-redirects.sh)
# Checks security headers on canonical domain (legacy domain no longer managed).
# Run from local machine or server (requires curl, grep).

CANONICAL="https://desnepal.org"

log() { printf "[verify] %s\n" "$*"; }

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
  log "Checking security headers on canonical";
  if check_security_headers; then
    log "All required security headers present."; exit 0
  else
    log "Missing one or more security headers."; exit 2
  fi
}

main "$@"
