# Railway Environment Variables Configuration

This file documents all environment variables needed for Railway.app deployment.

## For Backend Service

Set these in Railway → Backend Service → Variables:

```
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=prod
SPRING_JPA_HIBERNATE_DDL_AUTO=create-drop
```

### Explanation:
- `SERVER_PORT=8080` - Port the backend runs on
- `SPRING_PROFILES_ACTIVE=prod` - Use production profile (loads sample data on startup)
- `SPRING_JPA_HIBERNATE_DDL_AUTO=create-drop` - Recreate database on startup (for demo purposes)

**For persistence:** Change `create-drop` to `update` to keep data between deployments.

---

## For Frontend Service

Set these in Railway → Frontend Service → Variables:

```
VITE_API_BASE_URL=https://your-backend-railway-url.up.railway.app
```

### Example:
```
VITE_API_BASE_URL=https://desn-api-prod.up.railway.app
```

Replace with your actual backend URL from Railway.

---

## Where to Set Variables in Railway

1. Log in to [railway.app](https://railway.app)
2. Select your project
3. Select the service (Backend or Frontend)
4. Click the **"Variables"** tab
5. Click **"+ Add Variable"**
6. Enter `KEY=VALUE` pairs
7. Click **"Save"** and the service will automatically redeploy

---

## Optional Variables

### Backend (Optional)
```
JAVA_OPTS=-Xmx512m
```
Sets max memory for JVM (useful if you hit memory limits)

### Frontend (Optional)
```
VITE_ENABLE_DEVTOOLS=false
```
Disables dev tools in production

---

## After Setting Variables

1. The service will automatically redeploy with the new variables
2. Wait for deployment to complete (green checkmark)
3. Test your app to verify everything works
4. Variables are securely stored - they won't be logged or visible in git

