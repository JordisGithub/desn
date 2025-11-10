# DESN Backend (Java / Spring Boot)

This Spring Boot application provides the backend API for the DESN website, including:

- Payment processing via Khalti
- User authentication and authorization
- Resource management
- Form submissions (membership, volunteer)
- Event management

## Quick Start

### Option 1: Using the Startup Script (Recommended)

The easiest way to run the backend with Khalti payment integration:

```bash
cd backend
./start-backend.sh
```

The script will:

- Check if `.env` file exists (creates from template if missing)
- Validate that Khalti API keys are configured
- Load all environment variables
- Start the Spring Boot server

### Option 2: Manual Start with Environment Variables

```bash
cd backend
# Load environment variables from .env file
export $(cat .env | grep -v '^#' | xargs)
./mvnw spring-boot:run
```

### Option 3: Maven Only (without env file)

```bash
cd backend
./mvnw spring-boot:run
```

> **Note:** Payment features will not work without Khalti API keys configured.

## Environment Configuration

### Required for Khalti Payments

Create a `.env` file in the `backend/` directory:

```bash
cp .env.example .env
```

Then edit `.env` and add your Khalti API keys:

```properties
# Get these from https://khalti.com/
KHALTI_PUBLIC_KEY=your_khalti_public_key_here
KHALTI_SECRET_KEY=your_khalti_secret_key_here
KHALTI_API_URL=https://a.khalti.com/api/v2
APP_BASE_URL=http://localhost:5173
```

### Other Environment Variables

- `UPSTREAM_BASE_URL` - base URL of the upstream API (e.g. `https://api.example.com`). Defaults to `http://localhost:4000` when not set.
- `SERVER_API_KEY` - the secret API key that will be sent in the `X-API-Key` header for POST/PUT/DELETE requests.
- `DATABASE_URL` - database connection URL (defaults to H2 file-based database)
- `CORS_ALLOWED_ORIGINS` - allowed CORS origins (defaults to `http://localhost:5173,http://localhost:5174`)
- `JWT_SECRET` - secret key for JWT token generation
- See `.env.example` for all available options

## Setting Up Khalti Payment Integration

1. **Get Khalti API Keys:**

   - Sign up at https://khalti.com/
   - Get merchant account
   - Navigate to Settings → API Keys
   - Copy both Public Key and Secret Key

2. **Configure Keys:**

   ```bash
   cd backend
   # Edit .env and add your keys
   nano .env
   ```

3. **Start Backend:**

   ```bash
   ./start-backend.sh
   ```

4. **Test Payment Flow:**
   - Start frontend: `npm run dev`
   - Click "Donate" button
   - Fill in donation form
   - Should redirect to Khalti payment page

See [KHALTI_SETUP.md](./KHALTI_SETUP.md) for detailed setup instructions.

## Database

By default, the application uses H2 (file-based) for development:

- Database file: `backend/data/desn`
- H2 Console: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:file:./data/desn`
- Username: `sa`
- Password: (empty)

For production, configure PostgreSQL via environment variables.

## Docker Support

Run in Docker (no Maven/Java required locally):

```bash
cd backend
docker compose up --build
```

> **Note:** Make sure to set environment variables in `docker-compose.yml` or use a `.env` file.

## API Endpoints

### Payment

- `POST /api/payment/initiate` - Initialize Khalti payment
- `GET /api/payment/verify` - Verify payment status
- `GET /api/payment/status/{transactionId}` - Get transaction details
- `GET /api/payment/transactions` - List all transactions (admin)

### Resources

- `GET /api/resources` - List all resources
- `POST /api/resources` - Create resource (admin)
- `PUT /api/resources/{id}` - Update resource (admin)
- `DELETE /api/resources/{id}` - Delete resource (admin)

### Events

- `GET /api/events` - List all events
- `POST /api/events` - Create event (admin)
- `PUT /api/events/{id}` - Update event (admin)

### Forms

- `POST /api/forms/membership` - Submit membership form
- `POST /api/forms/volunteer` - Submit volunteer form

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

See [API Documentation](../docs/) for detailed endpoint specifications.

## Frontend Integration

Configure your frontend `.env` to point to the backend:

```env
# .env.local (Vite)
VITE_API_BASE_URL=http://localhost:8080
```

## Troubleshooting

### Payment Returns 500 Error

- Check that Khalti keys are configured in `.env`
- Verify keys are loaded: check backend logs for "Khalti secret key is not configured"
- Make sure you're using test keys for development

### Backend Won't Start

- Check Java version: `java -version` (requires Java 21)
- Check Maven: `./mvnw -v`
- Check port 8080 is available: `lsof -i :8080`

### Database Errors

- Delete `backend/data/` folder to reset H2 database
- Check `spring.jpa.hibernate.ddl-auto` setting in application.properties

## Development

### Profiles

- `default` - Uses file-based H2 database
- `dev` - In-memory H2 with verbose logging
- `prod` - Production settings (requires PostgreSQL)

Run with specific profile:

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### Testing

```bash
./mvnw test
```

## Security Notes

- Never commit `.env` file to version control
- Keep Khalti secret keys secure
- Use test keys for development, live keys only in production
- JWT secret should be changed in production
- In production, run the backend on a secure server and avoid exposing secrets

## Additional Resources

- [KHALTI_SETUP.md](./KHALTI_SETUP.md) - Detailed Khalti integration guide
- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide for Khalti setup
- [.env.example](./.env.example) - Environment variable template
