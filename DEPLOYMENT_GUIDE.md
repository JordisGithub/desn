# Deployment Guide - Railway.app

This guide will walk you through deploying the DESN application to Railway.app with both frontend and backend.

## Prerequisites

1. **GitHub Account** - Your code should be pushed to GitHub
2. **Railway Account** - Sign up at [railway.app](https://railway.app)

---

## Step 1: Push Code to GitHub

Make sure your latest code is pushed to GitHub:

```bash
cd /Users/jordi/git/desn
git add .
git commit -m "Ready for deployment"
git push origin feature/main-page-updates
```

---

## Step 2: Deploy Backend to Railway

### 2.1 Create a New Project on Railway

1. Go to [railway.app](https://railway.app)
2. Click **"Create New Project"**
3. Select **"Deploy from GitHub repo"**
4. Connect your GitHub account if not already connected
5. Search for and select the **`desn`** repository
6. Click **"Deploy Now"**

### 2.2 Configure Backend Service

Railway should auto-detect the backend service. Configure it:

1. In your Railway project, click on the **backend service** (Spring Boot)
2. Go to the **"Settings"** tab
3. Set **Root Directory** to `backend`
4. Click **"Deploy"**

### 2.3 Add Environment Variables for Backend

1. Go to the backend service **"Variables"** tab
2. Add these environment variables:
   - `SERVER_PORT`: `8080`
   - `SPRING_PROFILES_ACTIVE`: `prod`
   - `SPRING_JPA_HIBERNATE_DDL_AUTO`: `create-drop` (for fresh data on each deploy, or `update` to persist)

3. Save and redeploy

### 2.4 Get Backend URL

Once deployed:
1. Go to the backend service **"Deployments"** tab
2. Copy the **Public URL** (will be something like `https://desn-backend-prod.up.railway.app`)
3. Save this URL - you'll need it for the frontend

---

## Step 3: Deploy Frontend to Railway

### 3.1 Create Frontend Service

1. In your Railway project, click **"+ Add Service"**
2. Select **"Deploy from GitHub repo"**
3. Select your **`desn`** repository again
4. Click **"Deploy Now"**

### 3.2 Configure Frontend Service

1. Go to the frontend service settings
2. Set **Root Directory** to `/` (root, not in a subdirectory)
3. Set **Builder Command**: `npm run build`
4. Set **Start Command**: `npm run preview` (or use `serve` if needed)

### 3.3 Add Environment Variables for Frontend

1. Go to the frontend service **"Variables"** tab
2. Add this environment variable:
   - `VITE_API_BASE_URL`: `https://your-backend-url.up.railway.app`
   
   Replace with the backend URL from Step 2.4

3. Save and redeploy

### 3.4 Get Frontend URL

Once deployed:
1. Go to the frontend service **"Deployments"** tab
2. Copy the **Public URL** (will be something like `https://desn-frontend-prod.up.railway.app`)

---

## Step 4: Test Deployment

1. Open your frontend URL in a browser
2. Test all major features:
   - Homepage loads correctly
   - Language switching works
   - Events page displays data
   - Resources page displays all 24 PDFs
   - Login/Register functionality
   - Admin dashboard (if you're admin user)

---

## Step 5: Share with Client

Your client can now access the app at the frontend URL:

```
https://desn-frontend-prod.up.railway.app
```

---

## Troubleshooting

### Backend not connecting to frontend

**Problem:** Frontend shows loading spinner, nothing displays

**Solution:**
1. Check frontend environment variables - make sure `VITE_API_BASE_URL` is set correctly
2. Verify backend is running (check backend service deployments)
3. Rebuild frontend: go to frontend service → Deployments → Click "Redeploy"

### Resources not displaying

**Problem:** Resources page is blank or shows error

**Solution:**
1. The backend uses the `dev` profile by default to load 24 sample resources
2. In production, make sure `SPRING_PROFILES_ACTIVE=prod` is set (or remove it to use default)
3. Check the `SampleDataConfig.java` is configured with `@Profile("dev")` - you may need to change this for production

### Build fails

**Problem:** Railway shows build error

**Solution:**
1. Check the build logs in Railway console
2. Verify all files are committed to git
3. Make sure `package.json` and `pom.xml` are in the correct directories
4. Try redeploying

---

## Automatic Deployments

Once set up, every time you push to GitHub:
1. Railway automatically detects the change
2. Rebuilds the Docker image
3. Deploys the new version
4. Your client sees the updates instantly

No manual intervention needed!

---

## Environment Variables Reference

### Backend (`backend/`)
```
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=prod
SPRING_JPA_HIBERNATE_DDL_AUTO=create-drop
```

### Frontend (`/`)
```
VITE_API_BASE_URL=https://your-backend-url.up.railway.app
```

---

## Database Notes

- Backend uses **H2 in-memory database**
- Data resets when backend restarts (unless you configure persistence)
- To keep data persistent between deployments, configure PostgreSQL or similar on Railway

---

## Need Help?

- Railway Documentation: https://docs.railway.app
- Check service logs in Railway dashboard for errors
- Verify both services are running (green status)

