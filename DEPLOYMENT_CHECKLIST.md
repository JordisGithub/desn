# Railway Deployment Checklist

Follow this checklist to deploy your DESN app to Railway in minutes.

## Pre-Deployment ✅

- [ ] All code is committed to GitHub
- [ ] Backend `pom.xml` is in `/Users/jordi/git/desn/backend/`
- [ ] Frontend `package.json` is in `/Users/jordi/git/desn/`
- [ ] You have a Railway.app account (free signup)
- [ ] You have a GitHub account connected to Railway

---

## Backend Deployment

- [ ] Push latest code to GitHub
  ```bash
  git push origin feature/main-page-updates
  ```

- [ ] Go to [railway.app](https://railway.app)

- [ ] Click **"Create New Project"**

- [ ] Select **"Deploy from GitHub repo"**

- [ ] Select your **`desn`** repository

- [ ] Wait for auto-detection of services

- [ ] Configure Backend Service:
  - [ ] Set root directory to `backend`
  - [ ] Click "Deploy"
  
- [ ] Add Backend Environment Variables:
  - [ ] `SERVER_PORT=8080`
  - [ ] `SPRING_PROFILES_ACTIVE=prod`
  - [ ] `SPRING_JPA_HIBERNATE_DDL_AUTO=create-drop`

- [ ] Wait for deployment (check logs)
  
- [ ] Copy the **Backend Public URL** (e.g., `https://desn-backend-xxx.up.railway.app`)

---

## Frontend Deployment

- [ ] In Railway, click **"+ Add Service"**

- [ ] Select **"Deploy from GitHub repo"**

- [ ] Select **`desn`** repo again

- [ ] Configure Frontend Service:
  - [ ] Set root directory to `/` (root)
  - [ ] Set builder command: `npm run build`
  - [ ] Set start command: `npm run preview`

- [ ] Add Frontend Environment Variables:
  - [ ] `VITE_API_BASE_URL=` (paste your backend URL here)

- [ ] Wait for deployment (check logs)
  
- [ ] Copy the **Frontend Public URL** (e.g., `https://desn-frontend-xxx.up.railway.app`)

---

## Post-Deployment Testing

- [ ] Open Frontend URL in browser
- [ ] Check homepage loads
- [ ] Test language toggle (English ↔ Nepali)
- [ ] Navigate to Events page - should display data
- [ ] Navigate to Resources page - should show 24 PDFs
- [ ] Try login/register flow
- [ ] Share Frontend URL with client!

---

## Share with Client

Send your client this URL:
```
https://desn-frontend-xxx.up.railway.app
```

(Replace `xxx` with your Railway subdomain)

---

## Automatic Updates

From now on:
1. Make changes locally
2. Commit and push to GitHub
3. Railway automatically rebuilds and deploys
4. Client sees updates in minutes (no manual deploy needed!)

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Frontend shows loading spinner | Check env vars, verify backend URL is correct in `VITE_API_BASE_URL` |
| Build fails | Check Railway logs, verify file structure |
| Resources not showing | Backend needs to restart, trigger redeploy from Railway dashboard |
| API calls failing | Verify backend URL is in frontend env vars, check CORS settings |

---

## Deployment URLs Format

- **Backend:** `https://desn-backend-[RANDOM].up.railway.app`
- **Frontend:** `https://desn-frontend-[RANDOM].up.railway.app`

Both are public and shareable!

---

## Next Steps

1. ✅ Follow checklist above
2. ✅ Test everything works
3. ✅ Send client the Frontend URL
4. ✅ Client reviews and provides feedback
5. ✅ Make changes and push to GitHub
6. ✅ Changes auto-deploy to Railroad
7. ✅ Client sees updates instantly

**Estimated time:** 15-20 minutes for initial setup

