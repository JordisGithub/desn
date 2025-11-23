# Domain Migration Checklist: desnepal.com → desnepal.org

This checklist tracks tasks required to make `desnepal.org` the canonical domain and safely redirect legacy traffic from `desnepal.com`.

## 1. DNS
- [x] A record `desnepal.org` → 98.81.50.37
- [x] A record `www.desnepal.org` → 98.81.50.37
- [ ] (Optional) A record `desnepal.com` (leave pointing to same IP for redirect) ✓
- [ ] (Optional) A record `www.desnepal.com` ✓
- [ ] (Optional) CAA records for Let’s Encrypt
- [ ] TTL raised to 3600 after stabilization

## 2. Certificates
- [ ] Issue cert: `sudo certbot --nginx -d desnepal.org -d www.desnepal.org --agree-tos -m admin@desnepal.org --redirect --no-eff-email`
- [ ] (Optional) Issue separate cert for legacy .com if serving HTTPS before redirect
- [ ] Verify: `curl -I https://desnepal.org` (status 200) & `curl -I https://desnepal.com` (301 to .org)
- [ ] Dry run renew: `sudo certbot renew --dry-run`

## 3. Nginx
- [ ] Deploy updated `nginx-recommended.conf` with .com → .org redirect
- [ ] Remove any old conflicting configs (`default`, older site files)
- [ ] Test config: `sudo nginx -t`
- [ ] Reload: `sudo systemctl reload nginx`
- [ ] Validate headers (HSTS, X-Frame-Options etc.)

## 4. Frontend
- [ ] Rebuild with `VITE_API_BASE_URL=https://desnepal.org`
- [ ] Replace hardcoded `desnepal.com` URLs
- [ ] Update canonical `<link rel="canonical" href="https://desnepal.org/...">`
- [ ] Update sitemap & robots.txt
- [ ] Deploy new `dist/` to `/var/www/desnepal`

## 5. Backend
- [ ] CORS allowed origins updated (include https://desnepal.org, optionally legacy during transition)
- [ ] Any emails / links updated to .org
- [ ] Environment variable `PUBLIC_BASE_URL=https://desnepal.org` (if used)
- [ ] Restart backend service

## 6. SEO / Analytics
- [ ] New property added to Google Search Console (desnepal.org)
- [ ] Sitemap submitted (https://desnepal.org/sitemap.xml)
- [ ] Update Analytics property base URL / annotations
- [ ] Monitor 404 logs for 2 weeks
- [ ] Set preferred domain to .org in Search Console

## 7. Security / Policies
- [ ] Update any CSP to include new domain (if present)
- [ ] Update SPF/DMARC records if using email from @desnepal.org
- [ ] Confirm HSTS covers new domain

## 8. Monitoring
- [ ] Run smoke test script: `./scripts/smoke-test.sh`
- [ ] Log review: `tail -f /var/log/nginx/error.log`
- [ ] Check 404s: `grep ' 404 ' /var/log/nginx/access.log | awk '{print $7}' | sort | uniq -c | sort -nr | head`
- [ ] Cert expiration check: `sudo certbot certificates`

## 9. Rollback Plan
- Keep previous nginx config as backup: `/etc/nginx/sites-available/desn-prev.conf`
- Revert symlink and reload if major issue.
- Maintain both certs for 30 days after migration.

## 10. Completion Criteria
- All HTTP(S) traffic to .com results in 301 → https://desnepal.org
- No mixed content warnings
- No significant spike in 404 errors (>5% of requests)
- Cert renew test passes
- Analytics tracking stable

---
Last Updated: $(date -u +%Y-%m-%d) (update manually if needed)
