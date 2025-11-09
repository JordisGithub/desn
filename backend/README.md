# Proxy backend (Java / Spring Boot)

This small Spring Boot app proxies requests to an upstream API and injects a server-side API key on mutating requests (POST/PUT/DELETE).

Environment variables

- `UPSTREAM_BASE_URL` - base URL of the upstream API (e.g. `https://api.example.com`). Defaults to `http://localhost:4000` when not set.
- `SERVER_API_KEY` - the secret API key that will be sent in the `X-API-Key` header for POST/PUT/DELETE requests.

Run (with Maven)

```bash
# from repository root
cd backend
export UPSTREAM_BASE_URL=https://api.example.com
export SERVER_API_KEY=super_secret_key
mvn spring-boot:run
```

Run with the included Maven wrapper

```bash
# from repository root
cd backend
./mvnw spring-boot:run
```

Run in Docker (no Maven/Java required locally)

```bash
# build and run with docker-compose (reads environment from host or .env)
cd backend
docker compose up --build
```

Usage

- The backend exposes `/proxy/**`. Configure your frontend `BASE_URL` (or `REACT_APP_API_BASE_URL`) to point to the backend proxy, for example:

```env
# .env (Vite)
VITE_API_BASE_URL=http://localhost:8080/proxy
```

Notes

- This keeps the API key out of the client bundle. In production, run the backend on a secure server and avoid exposing secrets in version control.
- Adjust CORS settings in `src/main/resources/application.properties` as needed.
