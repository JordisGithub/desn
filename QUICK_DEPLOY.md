# Quick Deploy Summary

Ready to get your app live for client review? Here's the TL;DR:

## What You Need

1. **GitHub Account** - Push your code there
2. **Railway Account** - Free at [railway.app](https://railway.app)
3. **5 minutes** - That's all the setup takes!

---

## The 3-Step Process

### Step 1: Push to GitHub
```bash
cd /Users/jordi/git/desn
git add .
git commit -m "Deployment ready"
git push origin feature/main-page-updates
```

### Step 2: Connect Railway to Your Repo
1. Go to [railway.app](https://railway.app)
2. Click "Create New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `desn` repository
5. Railway auto-detects both services (frontend & backend)

### Step 3: Add Environment Variables
**For Backend Service:**
- `SERVER_PORT=8080`
- `SPRING_PROFILES_ACTIVE=prod`
- `SPRING_JPA_HIBERNATE_DDL_AUTO=create-drop`

**For Frontend Service:**
- `VITE_API_BASE_URL=https://your-backend-url.up.railway.app`

---

## Your Client Gets This URL

After deployment, share this with your client:
```
https://desn-frontend-[yourcode].up.railway.app
```

That's it! 🎉

---

## What Happens Next

- ✅ Client clicks the link and reviews the app
- ✅ You make fixes locally
- ✅ You push to GitHub
- ✅ Railway auto-deploys (no manual steps!)
- ✅ Client sees updates instantly

---

## Files for Reference

| File | Purpose |
|------|---------|
| `DEPLOYMENT_CHECKLIST.md` | Step-by-step checklist to follow |
| `DEPLOYMENT_GUIDE.md` | Detailed deployment instructions |
| `RAILWAY_ENV_VARS.md` | Environment variables reference |
| `API_ROUTES.md` | All API endpoints your client can test |

---

## Still Have Questions?

- **Railway Docs:** https://docs.railway.app
- **Vite Build Guide:** https://vitejs.dev/guide/build
- **Spring Boot Docker:** https://spring.io/guides/gs/spring-boot-docker/

---

## Cost

**Railway Free Tier Includes:**
- $5 free credit per month
- DESN app will easily fit in free tier
- No credit card required initially

---

**Ready? Start with the checklist in `DEPLOYMENT_CHECKLIST.md`** ✨

