# QUICK FIX - Backend Not Loading on desnepal.com

## Immediate Actions Required

### 1. Set Environment Variable on AWS
```bash
CORS_ALLOWED_ORIGINS=https://desnepal.com,https://www.desnepal.com
SPRING_PROFILES_ACTIVE=prod
```

### 2. Where to Set (depending on your AWS setup):

**Elastic Beanstalk:**
```bash
eb setenv CORS_ALLOWED_ORIGINS=https://desnepal.com,https://www.desnepal.com SPRING_PROFILES_ACTIVE=prod
```

**EC2 (systemd service):**
Edit `/etc/systemd/system/desn-backend.service`:
```ini
[Service]
Environment="CORS_ALLOWED_ORIGINS=https://desnepal.com,https://www.desnepal.com"
Environment="SPRING_PROFILES_ACTIVE=prod"
```

**Docker/ECS:**
Add to environment variables in task definition or docker-compose:
```yaml
environment:
  - CORS_ALLOWED_ORIGINS=https://desnepal.com,https://www.desnepal.com
  - SPRING_PROFILES_ACTIVE=prod
```

### 3. Restart the Backend
```bash
# Find and restart your Java process
# Or restart your service/container
```

## Verification Steps

### Test 1: Health Check
```bash
curl https://desnepal.com/api/forms/health
```
Expected: `{"status":"ok"}` or similar

### Test 2: CORS Headers
```bash
curl -i -X OPTIONS https://desnepal.com/api/forms/health \
  -H "Origin: https://desnepal.com" \
  -H "Access-Control-Request-Method: GET"
```
Expected: Should see `Access-Control-Allow-Origin: https://desnepal.com`

### Test 3: Browser Console
Open https://desnepal.com, press F12, go to Network tab, and check:
- Are API calls going to the correct URL?
- Are they returning 200 or CORS errors?
- Check the Response Headers for `Access-Control-Allow-Origin`

## Common Issues & Solutions

### Issue 1: Backend URL not set
**Symptom:** API calls go to `localhost` or wrong domain
**Fix:** Frontend needs to know backend URL. Check if CloudFront/ALB is routing `/api/*` correctly

### Issue 2: Port not accessible
**Symptom:** Connection timeout
**Fix:** Check AWS Security Groups - allow inbound on port 8080 (or 80/443)

### Issue 3: Backend not running
**Symptom:** 502 Bad Gateway or connection refused
**Fix:** Check if Java process is running: `ps aux | grep java`

### Issue 4: Wrong CORS domain
**Symptom:** CORS error in browser: "Origin 'https://desnepal.com' has been blocked"
**Fix:** Make sure environment variable is set (Step 1 above)

## Architecture Check

What's your setup?

**Option A: Combined (recommended)**
- Frontend & Backend on same domain: `desnepal.com`
- CloudFront routes `/api/*` to backend
- CORS: `https://desnepal.com`

**Option B: Separate**
- Frontend: `desnepal.com`
- Backend: `api.desnepal.com` (or different EC2)
- CORS: `https://desnepal.com`
- Frontend needs backend URL configured

## Files Changed (already committed)

1. ✅ Removed duplicate `@CrossOrigin` from `PaymentController.java`
2. ✅ Updated `application-prod.properties` with `desnepal.com`
3. ✅ CORS config in `CorsConfig.java` (already correct)

## Need More Help?

Send me:
1. Output of: `curl https://desnepal.com/api/forms/health`
2. Browser console errors (F12 > Console tab)
3. Network tab showing failed API request (F12 > Network)
4. Your AWS architecture (EC2? ELB? CloudFront?)
