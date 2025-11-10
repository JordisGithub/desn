# DESN API & Routes Documentation

**Last Updated:** November 9, 2025

---

## Table of Contents

1. [Backend API Routes (Port 8081)](#backend-api-routes-port-8081)
2. [Frontend Routes (Port 5174)](#frontend-routes-port-5174)
3. [Testing Quick Links](#testing-quick-links)

---

## Backend API Routes (Port 8081)

### Base URL: `http://localhost:8081`

---

### **Authentication** (`/api/auth`)

| Method | Endpoint             | Description           | Auth Required |
| ------ | -------------------- | --------------------- | ------------- |
| POST   | `/api/auth/register` | Register new user     | ❌            |
| POST   | `/api/auth/login`    | Login user            | ❌            |
| GET    | `/api/auth/me`       | Get current user info | ✅            |

**Example:**

```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"pass"}'
```

---

### **Events** (`/api/events`)

| Method | Endpoint                                    | Description               | Auth Required |
| ------ | ------------------------------------------- | ------------------------- | ------------- |
| GET    | `/api/events`                               | Get all events            | ❌            |
| GET    | `/api/events/featured`                      | Get featured events       | ❌            |
| GET    | `/api/events/upcoming`                      | Get upcoming events       | ❌            |
| GET    | `/api/events/past`                          | Get past events           | ❌            |
| GET    | `/api/events/{id}`                          | Get single event by ID    | ❌            |
| POST   | `/api/events`                               | Create event              | ✅ (Admin)    |
| PUT    | `/api/events/{id}`                          | Update event              | ✅ (Admin)    |
| DELETE | `/api/events/{id}`                          | Delete event              | ✅ (Admin)    |
| POST   | `/api/events/{id}/register`                 | Register for event        | ✅            |
| DELETE | `/api/events/{id}/register`                 | Unregister from event     | ✅            |
| GET    | `/api/events/user/{username}/registrations` | Get user's registrations  | ✅            |
| GET    | `/api/events/{id}/registrations`            | Get event registrations   | ✅ (Admin)    |
| GET    | `/api/events/{id}/registration-status`      | Check registration status | ❌            |
| GET    | `/api/events/all/registrations`             | Get all registrations     | ✅ (Admin)    |

**Example:**

```bash
# Get all events
curl http://localhost:8081/api/events

# Get upcoming events
curl http://localhost:8081/api/events/upcoming

# Register for event (requires auth token)
curl -X POST http://localhost:8081/api/events/1/register \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

---

### **Resources** (`/api/resources`)

| Method | Endpoint                                   | Description                    | Auth Required |
| ------ | ------------------------------------------ | ------------------------------ | ------------- |
| GET    | `/api/resources`                           | Get all resources              | ❌            |
| GET    | `/api/resources/featured`                  | Get featured resources         | ❌            |
| GET    | `/api/resources/{id}`                      | Get single resource by ID      | ❌            |
| POST   | `/api/resources`                           | Create resource                | ✅ (Admin)    |
| PUT    | `/api/resources/{id}`                      | Update resource                | ✅ (Admin)    |
| DELETE | `/api/resources/{id}`                      | Delete resource                | ✅ (Admin)    |
| POST   | `/api/resources/{id}/favorite`             | Toggle favorite                | ✅            |
| POST   | `/api/resources/{id}/click`                | Track resource click           | ❌            |
| GET    | `/api/resources/user/{username}/favorites` | Get user's favorites           | ✅            |
| GET    | `/api/resources/{id}/favorite-status`      | Check if favorited             | ✅            |
| GET    | `/api/resources/admin/all`                 | Get all resources (admin view) | ✅ (Admin)    |

**Example:**

```bash
# Get all resources
curl http://localhost:8081/api/resources

# Get featured resources
curl http://localhost:8081/api/resources/featured

# Track a click
curl -X POST http://localhost:8081/api/resources/1/click

# Toggle favorite (requires auth)
curl -X POST http://localhost:8081/api/resources/1/favorite \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"username":"your_username"}'
```

---

### **File Upload & Management** (`/api/files`)

| Method | Endpoint                                    | Description              | Auth Required |
| ------ | ------------------------------------------- | ------------------------ | ------------- |
| POST   | `/api/files/upload`                         | Upload file              | ✅ (Admin)    |
| GET    | `/api/files/download/{category}/{filename}` | Download file            | ❌            |
| DELETE | `/api/files/{category}/{filename}`          | Delete file              | ✅ (Admin)    |
| GET    | `/api/files/config`                         | Get upload configuration | ❌            |

**Upload Configuration Response:**

```json
{
  "maxFileSize": 52428800,
  "maxFileSizeMB": 50
}
```

**Example:**

```bash
# Get upload config
curl http://localhost:8081/api/files/config

# Download a resource PDF
curl http://localhost:8081/api/files/download/guidelines/krishna-cv.pdf \
  -o krishna-cv.pdf

# Upload file (requires admin auth)
curl -X POST http://localhost:8081/api/files/upload \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -F "file=@your-file.pdf" \
  -F "category=guidelines"
```

---

### **Forms** (`/api/forms`)

| Method | Endpoint                | Description            | Auth Required |
| ------ | ----------------------- | ---------------------- | ------------- |
| POST   | `/api/forms/membership` | Submit membership form | ❌            |
| POST   | `/api/forms/volunteer`  | Submit volunteer form  | ❌            |
| GET    | `/api/forms/membership` | Get membership forms   | ✅ (Admin)    |
| GET    | `/api/forms/volunteer`  | Get volunteer forms    | ✅ (Admin)    |

**Example:**

```bash
# Submit membership form
curl -X POST http://localhost:8081/api/forms/membership \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+977-9841234567"
  }'

# Submit volunteer form
curl -X POST http://localhost:8081/api/forms/volunteer \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "skills": "Web Development"
  }'
```

---

### **Payment** (`/api/payment`)

| Method | Endpoint                              | Description              | Auth Required |
| ------ | ------------------------------------- | ------------------------ | ------------- |
| POST   | `/api/payment/initiate`               | Initiate Khalti payment  | ❌            |
| GET    | `/api/payment/verify`                 | Verify payment           | ❌            |
| GET    | `/api/payment/status/{transactionId}` | Get payment status       | ❌            |
| POST   | `/api/payment/webhook`                | Payment webhook callback | ❌            |
| GET    | `/api/payment/transactions`           | Get all transactions     | ✅ (Admin)    |

**Example:**

```bash
# Initiate payment
curl -X POST http://localhost:8081/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "description": "Donation"
  }'

# Verify payment
curl http://localhost:8081/api/payment/verify?pidx=payment_id&transaction_id=trans_id

# Get transaction status
curl http://localhost:8081/api/payment/status/trans_12345
```

---

### **Static Resources & Test Pages**

| URL                     | Description           |
| ----------------------- | --------------------- |
| `GET /upload-test.html` | File upload test page |
| `GET /health`           | Health check endpoint |

---

### **Available Resource PDFs** (Downloadable via `/api/files/download/`)

#### Annual Reports

- `annual-reports/annual-progress-report-2078-79.pdf`
- `annual-reports/annual-progress-report-2080-81.pdf`

#### Guidelines

- `guidelines/chairperson_tek-nath-neopane-cv.pdf`
- `guidelines/copy-of-desn-board-and-staff.pdf`
- `guidelines/copy-of-district-adminstration-office-registration_translation.pdf`
- `guidelines/copy-of-ird-registration_translation.pdf`
- `guidelines/copy-of-municipality-registration_translation.pdf`
- `guidelines/copy-of-social-welfare-council-registrationl_translation.pdf`
- `guidelines/district-administration-office-registration.pdf`
- `guidelines/executive-member_gopal-prasad-ghimire-cv.pdf`
- `guidelines/inland-revenue-certificate-(pan).pdf`
- `guidelines/krishna-cv.pdf`
- `guidelines/municipality-registration.pdf`
- `guidelines/nfdn-registration.pdf`
- `guidelines/social-welfare-council-registration.pdf`
- `guidelines/tika_bajgain_cv.pdf`

#### Policy Briefs

- `policy-briefs/communication-policy_disability-empowerment-society-nepal-signed.pdf`
- `policy-briefs/communication-policy_disability-empowerment-society-nepal.pdf`
- `policy-briefs/computer-policy_disability-empowerment-society-nepal-signed.pdf`
- `policy-briefs/computer-policy_disability-empowerment-society-nepal.pdf`
- `policy-briefs/psea-policy_disability-empowerment-society-nepal-signed.pdf`

#### Newsletters

- `newsletters/digital-literacy_training-manual.pdf`
- `newsletters/local-handicraft_training-manual.pdf`
- `newsletters/samadristi-magazine-15th-edition.pdf`

---

## Frontend Routes (Port 5174)

### Base URL: `http://localhost:5174`

---

### **Main Pages**

| Route            | Page              | Description                                                 |
| ---------------- | ----------------- | ----------------------------------------------------------- |
| `/`              | Home              | Homepage with hero, programs, events, get involved sections |
| `/about`         | About Us          | Organization mission, vision, team, partners                |
| `/events`        | Events & Calendar | Upcoming events with interactive calendar                   |
| `/resources`     | Resources         | Publications, guidelines, policies, training materials      |
| `/get-involved`  | Get Involved      | Membership, volunteering, donation options                  |
| `/programs`      | Programs          | Organization programs and services                          |
| `/contact`       | Contact           | Contact form and information                                |
| `/accessibility` | Accessibility     | WCAG compliance statement                                   |

---

### **User Authentication**

| Route       | Page     | Description            |
| ----------- | -------- | ---------------------- |
| `/login`    | Login    | User login page        |
| `/register` | Register | User registration page |

---

### **Dashboards**

| Route               | Page             | Description                      | Access              |
| ------------------- | ---------------- | -------------------------------- | ------------------- |
| `/member/dashboard` | Member Dashboard | View registered events           | Authenticated users |
| `/admin/dashboard`  | Admin Dashboard  | Manage resources, uploads, forms | Admin only          |

---

### **Payment & Special Pages**

| Route             | Page                 | Description                 |
| ----------------- | -------------------- | --------------------------- |
| `/payment/verify` | Payment Verification | Payment status page         |
| `/donate`         | Donate               | Donation page (placeholder) |

---

## Testing Quick Links

### Quick Test URLs

**Backend API Tests:**

```
# Health Check
http://localhost:8081/health

# Get all events
http://localhost:8081/api/events

# Get all resources
http://localhost:8081/api/resources

# Get featured resources
http://localhost:8081/api/resources/featured

# Get upload config
http://localhost:8081/api/files/config

# Upload test page
http://localhost:8081/upload-test.html
```

**Frontend Navigation:**

```
# Home
http://localhost:5174/

# All Events
http://localhost:5174/events

# All Resources
http://localhost:5174/resources

# Admin Dashboard
http://localhost:5174/admin/dashboard

# Member Dashboard
http://localhost:5174/member/dashboard
```

---

## Authentication

Most administrative endpoints require an Authorization header with a Bearer token:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:8081/api/events
```

**To get a token:**

1. Register at `http://localhost:5174/register` or call `/api/auth/register`
2. Login at `http://localhost:5174/login` or call `/api/auth/login`
3. Use the returned JWT token in subsequent requests

---

## Environment Variables

Backend runs on: **Port 8081** with `--spring.profiles.active=dev`

Frontend runs on: **Port 5174** with `VITE_API_BASE_URL=http://localhost:8081`

**To run locally:**

```bash
# Terminal 1 - Backend
cd backend
./mvnw spring-boot:run -DskipTests -Dspring-boot.run.arguments="--server.port=8081 --spring.profiles.active=dev"

# Terminal 2 - Frontend
npm run dev
```

---

## Notes

- All timestamps are in UTC
- Resources are auto-loaded from `SampleDataConfig` on backend startup
- File uploads limited to 50MB
- PDF files only for resource uploads
- Language support: English (en) and Nepali (ne)
