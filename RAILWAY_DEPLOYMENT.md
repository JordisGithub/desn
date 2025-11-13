# RAILWAY DEPLOYMENT GUIDE

Last updated: November 9, 2025

## Purpose

This single document explains, step-by-step, how to deploy the DESN app (frontend + backend) to Railway.app. It is written for someone who has never deployed an app before. Follow the checklist and commands exactly and you'll have a shareable URL your client can open.

## What you'll get

- A public frontend URL (share with client)
- A public backend URL (used by the frontend)
- Automatic deployments on every Git push

Estimated time: 15–30 minutes for first-time setup (depends on account linking and build times)

## Prerequisites

- A GitHub account (repo already pushed to GitHub)
- A Railway account: https://railway.app (free trial available)
- Your code is in this repository; backend is under `backend/`, frontend at repo root
- Node and npm installed (for local builds/testing)
- (Optional) Docker installed for local container tests

## Quick checklist (do these first)

- [ ] Commit and push any local changes

```bash
cd /Users/jordi/git/desn
git add .
git commit -m "Prepare for Railway deployment"
git push origin feature/main-page-updates
```

- [ ] Verify these files exist in your repo (Railway uses them to build):
  - `backend/pom.xml` (Spring Boot backend)
  - `package.json` (frontend)
  - `backend/Dockerfile` (optional; Railway can also auto-build)

## Why Railway? (short)

- Railway auto-detects services from GitHub and builds them.
- It provides a public URL you can share with the client.
- Re-deploys automatically on git push.

## Overview of the deployment

Railway will run two services for this project:

1. Backend (Spring Boot) — should be built from the `backend` directory.
2. Frontend (Vite) — built from the repository root and served as static files.

Railway assigns a dynamic port to every service using the `PORT` environment variable. Your backend must use that port. See "Make the backend bind to Railway's port" below.

## Step-by-step: Backend setup (detailed)

1. Sign in to Railway

   - Visit https://railway.app and sign up or sign in.

2. Create a new project and connect GitHub

   - Click "New Project" → "Deploy from GitHub repo"
   - Connect your GitHub account (authorize Railway) if not already connected
   - Pick the `desn` repository

3. Configure the backend service root directory

   - After selecting the repo Railway may auto-detect services. If it does not:
     - Add a new service and choose "Deploy from GitHub repo" again
     - In the service settings set **Root Directory** to:
       ```
       backend
       ```
     - This tells Railway to build using `backend/pom.xml`.

4. Make sure the app binds to Railway's `PORT`

   - Railway provides the port in the `PORT` environment variable. Update the `backend/Dockerfile` entrypoint to use `${PORT}` so Spring Boot binds to the assigned port.
   - Recommended ENTRYPOINT line (replace existing ENTRYPOINT in `backend/Dockerfile`):

     ```dockerfile
     ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT:-8080} -jar /app/app.jar"]
     ```

     This sets the server port from `PORT` when provided by Railway, or defaults to `8080` for local runs.

   - If you do not use Docker, ensure Railway's build/run command includes `--server.port=$PORT` when launching the jar.

5. Environment variables (Railway UI)

   - In the Railway project, open the backend service → "Variables"
   - Add these variables:
     - `SPRING_PROFILES_ACTIVE=prod` (or `dev` if you want the sample data loaded)
     - `SPRING_JPA_HIBERNATE_DDL_AUTO=update` (or `create-drop` for demo/test but beware it wipes data)
     - `JAVA_OPTS=-Xmx512m` (optional JVM tuning)
   - Railway automatically sets `PORT` for you; do NOT add a conflicting `PORT` variable.

6. (Optional) Add a persistent database

   - If you want data to persist between restarts, add a PostgreSQL plugin in Railway:
     - In the project, click "Add Plugin" → PostgreSQL
     - Railway will create a DB and expose connection variables (you will see the connection string)
     - Add these variables to backend service (Railway often exposes them automatically):
       - `SPRING_DATASOURCE_URL=jdbc:postgresql://<host>:<port>/<db>`
       - `SPRING_DATASOURCE_USERNAME`
       - `SPRING_DATASOURCE_PASSWORD`
     - Set `SPRING_JPA_HIBERNATE_DDL_AUTO=update` so Hibernate applies any schema changes without dropping data.
   - If you do not set up Postgres, the app will run with H2 (ephemeral) unless your `application-prod.properties` forces another DB.

7. Trigger a deploy

   - Click Deploy in Railway for that service or push a commit to GitHub to trigger automatic deploy.
   - Watch the build logs in Railway. The logs will show Maven building the project and the Spring Boot startup.

8. Confirm the backend is live
   - After successful deploy Railway lists the service public URL, e.g. `https://desn-backend-xxxxx.up.railway.app`
   - Test these endpoints:
     ```bash
     curl -I https://<backend-url>/health
     curl -s https://<backend-url>/api/files/config | jq
     curl -s https://<backend-url>/api/resources | jq '.resources | length'
     ```

## Step-by-step: Frontend setup (detailed)

1. Add a Frontend service in Railway (same project)

   - Click "+ Add Service" → "Deploy from GitHub repo"
   - Select the `desn` repo again

2. Configure the Frontend service

   - Set **Root Directory** to `/` (the repository root)
   - Set build command to: `npm run build`
   - Set start/preview command to: `npm run preview` or use `serve -s dist` if you installed `serve` in your Dockerfile

3. Configure environment variables for the frontend

   - Frontend needs to talk to your backend's public URL. Add to Railway variables for the frontend service:
     - `VITE_API_BASE_URL=https://<backend-public-url>`
   - For example:
     - `VITE_API_BASE_URL=https://desn-backend-xxxxx.up.railway.app`

4. Trigger a deploy and get the frontend URL
   - Deploy or push a commit to trigger automatic deploy
   - Railway gives you a public frontend URL, e.g. `https://desn-frontend-xxxxx.up.railway.app`

## Local testing before pushing (optional but recommended)

- Build and run backend locally:

```bash
cd backend
./mvnw clean package -DskipTests
java -jar target/proxy-backend-0.0.1-SNAPSHOT.jar --server.port=8081 --spring.profiles.active=dev
```

- Build frontend locally:

```bash
cd /Users/jordi/git/desn
npm ci
npm run build
npx serve -s dist -l 5174
```

- Open `http://localhost:5174` and ensure `VITE_API_BASE_URL` in `.env.local` points to your backend running locally (e.g. `http://localhost:8081`).

## Quick commands (copy/paste) to push and trigger deployment

```bash
# from repository root
git add .
git commit -m "Deploy: Prepare for Railway"
git push origin feature/main-page-updates
```

Railway will detect the push and start a build if you connected the repo.

## Common issues & troubleshooting

1. "App fails to bind port" or "Health check failed"

   - Make sure your `Dockerfile` ENTRYPOINT uses `${PORT}` as shown above. Railway assigns the port in `PORT`.
   - If not using Docker, ensure the run command includes `--server.port=$PORT`.

2. Frontend shows spinner or can't reach backend

   - Verify `VITE_API_BASE_URL` matches the backend public URL in frontend Railway variables.
   - Check browser console for CORS errors; ensure backend allows requests from your frontend domain or set CORS to allow the Railway domain during testing.

3. Missing demo data after deployment

   - The sample data loader in this project (`SampleDataConfig.java`) is annotated with `@Profile("dev")`. That means it only runs when `SPRING_PROFILES_ACTIVE=dev`.
   - Options:
     - Temporarily set `SPRING_PROFILES_ACTIVE=dev` on Railway (not recommended for production), or
     - Remove `@Profile("dev")` or add a separate initialization path for demo data in production, or
     - Manually insert demo data via a script or admin API after deploy.

4. Database connection errors

   - Check `SPRING_DATASOURCE_URL`, username and password. Confirm the DB plugin (Postgres) is added to the Railway project and connection variables are visible to the service.

5. Build failures in Railway logs
   - Check that the build step uses the correct directory (`backend` for Maven). If Railway cannot find `pom.xml` it will fail.
   - For frontend, ensure `package.json` is at the repository root.

## Useful test endpoints to verify after deploy

- Health check: `GET /health`
- Resources API: `GET /api/resources`
- Upload config: `GET /api/files/config`
- Sample static test page: `GET /upload-test.html`

## Example curl tests

```bash
# health
curl -I https://<backend-url>/health

# check upload config
curl -s https://<backend-url>/api/files/config | jq

# list resources (should return 24 if sample data loaded)
curl -s https://<backend-url>/api/resources | jq '.resources | length'
```

## Security notes

- Do not hard-code credentials in the repo. Use Railway Variables for secrets.
- For production, do not use `create-drop`. Use `update` or a managed migration strategy.

## Rollbacks & redeploys

- Railway keeps deployment history. If a deploy is bad, revert the commit in GitHub (or deploy a previous commit) and Railway will redeploy.

## Optional: Quick public sharing (instant, temporary)

If you need to share the local running app without configuring Railway, use `ngrok` to expose local ports (quick, but temporary):

```bash
brew install ngrok
# expose frontend
ngrok http 5174
# expose backend
ngrok http 8081
```

You will get temporary public URLs which you can share with the client. These expire quickly on the free tier.

## Summary checklist (one-liner steps)

- Push code to GitHub
- In Railway: Create project → Deploy from GitHub → set backend root `backend`
- Update `backend/Dockerfile` ENTRYPOINT to use `${PORT}` (or ensure run command passes `--server.port=$PORT`)
- Set backend env vars: `SPRING_PROFILES_ACTIVE`, `SPRING_JPA_HIBERNATE_DDL_AUTO` (and DB credentials if needed)
- Add frontend env var: `VITE_API_BASE_URL` (set to backend URL)
- Deploy and test `health`, `api/resources`, `api/files/config`

If you'd like, I can:

- A) Apply the ENTRYPOINT change to `backend/Dockerfile` for you now and commit it; or
- B) Generate a single click-ready Railway deployment configuration (some projects use a `railway.json` or `Dockerfile` adjustments)—I can prepare that.

Which do you want me to do next? (A or B, or I'll just wait while you follow the steps above.)
