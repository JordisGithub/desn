# Form Submission System

Guide for the DESN form submission system handling membership and volunteer applications.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Usage](#usage)
- [Admin Management](#admin-management)
- [API Reference](#api-reference)
- [Storage](#storage)
- [Troubleshooting](#troubleshooting)

## Overview

The form submission system handles two types of applications:

1. **Membership Applications** - For individuals wanting to join DESN
2. **Volunteer Applications** - For individuals wanting to volunteer

### Features

- ✅ Input validation (frontend + backend)
- ✅ Input sanitization (XSS prevention)
- ✅ Dual storage modes (file/database)
- ✅ Email notifications to admins
- ✅ Admin dashboard for viewing submissions
- ✅ Bilingual support (English/Nepali)
- ✅ Rate limiting (5 requests/min per IP)

## Architecture

### Components

#### Backend

- **MembershipApplication** entity - JPA entity for database storage
- **VolunteerApplication** entity - JPA entity for database storage
- **DTOs** - MembershipApplicationDto, VolunteerApplicationDto
- **Service Layer** - FormSubmissionService, DatabaseFormSubmissionService
- **Controller** - FormController (REST endpoints)
- **Security** - InputSanitizer for XSS prevention

#### Frontend

- **MembershipSection.tsx** - Membership form component
- **VolunteerForm.tsx** - Volunteer form component
- **AdminDashboard.tsx** - Admin view for submissions

### Data Flow

```
User → Form Component → Validation → API Call → Backend Controller
                                                        ↓
                                                   Validation
                                                        ↓
                                                   Sanitization
                                                        ↓
                                           Storage (File/Database)
                                                        ↓
                                               Email Notification
                                                        ↓
                                                   Response
```

## Usage

### Frontend Forms

#### Membership Form

Located in the "Get Involved" page:

**Required Fields:**

- Full Name
- Email
- Phone

**Optional Fields:**

- Address
- Message

**Example:**

```tsx
// User fills form
Full Name: John Doe
Email: john@example.com
Phone: 9841234567
Address: Kathmandu, Nepal
Message: I want to support your cause

// Submit → Shows success message
// Form resets automatically
```

#### Volunteer Form

Located in the "Get Involved" page:

**Required Fields:**

- Full Name
- Email
- Phone

**Optional Fields:**

- Message

**Example:**

```tsx
// User fills form
Full Name: Jane Smith
Email: jane@example.com
Phone: 9851234567
Message: I have experience in education programs

// Submit → Shows success message
// Form resets automatically
```

### Validation Rules

#### Full Name

- Required
- 2-100 characters
- Letters, spaces, and common punctuation only

#### Email

- Required
- Valid email format
- Max 255 characters
- Example: user@example.com

#### Phone

- Required
- 10 digits
- Nepal format (starting with 98)
- Example: 9841234567

#### Address

- Optional
- Max 500 characters

#### Message

- Optional
- Max 2000 characters

## Admin Management

### Viewing Submissions

1. **Login as Admin:**

   ```
   URL: http://localhost:5175/login
   Email: admin@desn.org.np
   Password: admin123
   ```

2. **Access Dashboard:**

   - Click "Admin Dashboard" in header
   - View "Membership Applications" tab
   - View "Volunteer Applications" tab

3. **Information Displayed:**
   - Submission date/time
   - Full name
   - Email address
   - Phone number
   - Address (membership only)
   - Message
   - Language badge (EN/NE)

### Email Notifications

Admins receive email notifications for each new submission:

**Email Subject:**

- "New Membership Application"
- "New Volunteer Application"

**Email Content:**

```
New [Membership/Volunteer] Application Received

Name: John Doe
Email: john@example.com
Phone: 9841234567
Address: Kathmandu, Nepal (if provided)
Message: Supporting message (if provided)

Submitted: 2024-01-01 10:30:00
Language: English
```

### Configuration

Enable email notifications in `application.properties`:

```properties
# Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

# Admin email
admin.email=admin@desn.org.np

# Enable/disable notifications
email.notifications.enabled=true
```

## API Reference

### POST /api/forms/membership

Submit a membership application.

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9841234567",
  "address": "Kathmandu, Nepal",
  "message": "I want to support your programs",
  "language": "en"
}
```

**Response (Success):**

```json
{
  "message": "Membership application submitted successfully",
  "fullName": "John Doe",
  "submittedAt": "2024-01-01T10:30:00"
}
```

**Response (Error):**

```json
{
  "error": "Validation failed",
  "details": {
    "email": "Invalid email format",
    "phone": "Phone must be 10 digits"
  }
}
```

### POST /api/forms/volunteer

Submit a volunteer application.

**Request Body:**

```json
{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9851234567",
  "message": "I have teaching experience",
  "language": "en"
}
```

**Response (Success):**

```json
{
  "message": "Volunteer application submitted successfully",
  "fullName": "Jane Smith",
  "submittedAt": "2024-01-01T11:00:00"
}
```

### GET /api/forms/membership

Get all membership applications (Admin only).

**Headers:**

```
Authorization: Bearer {jwt_token}
```

**Response:**

```json
[
  {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9841234567",
    "address": "Kathmandu, Nepal",
    "message": "Supporting message",
    "submittedAt": "2024-01-01T10:30:00",
    "language": "en"
  }
]
```

### GET /api/forms/volunteer

Get all volunteer applications (Admin only).

**Headers:**

```
Authorization: Bearer {jwt_token}
```

**Response:**

```json
[
  {
    "id": 1,
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "phone": "9851234567",
    "message": "Teaching experience",
    "submittedAt": "2024-01-01T11:00:00",
    "language": "en"
  }
]
```

## Storage

### Storage Modes

Configure via environment variable:

```bash
export STORAGE_MODE=database  # or "file"
```

#### File Storage Mode

**Directory Structure:**

```
form-submissions/
├── membership/
│   ├── 20240101_103000_JohnDoe.json
│   └── membership_log.csv
└── volunteer/
    ├── 20240101_110000_JaneSmith.json
    └── volunteer_log.csv
```

**JSON File Format:**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9841234567",
  "address": "Kathmandu, Nepal",
  "message": "Supporting message",
  "submittedAt": "2024-01-01T10:30:00",
  "language": "en"
}
```

**CSV Log Format:**

```csv
Timestamp,Name,Email,Phone,Address,Language
2024-01-01 10:30:00,John Doe,john@example.com,9841234567,Kathmandu,en
```

#### Database Storage Mode (Recommended)

Uses PostgreSQL (production) or H2 (development).

**Membership Applications Table:**

```sql
CREATE TABLE membership_application (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address VARCHAR(500),
    message TEXT,
    submitted_at TIMESTAMP NOT NULL,
    language VARCHAR(10),
    INDEX idx_email (email),
    INDEX idx_submitted_at (submitted_at)
);
```

**Volunteer Applications Table:**

```sql
CREATE TABLE volunteer_application (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    message TEXT,
    submitted_at TIMESTAMP NOT NULL,
    language VARCHAR(10),
    INDEX idx_email (email),
    INDEX idx_submitted_at (submitted_at)
);
```

## Security Features

### Input Sanitization

All inputs are sanitized to prevent XSS attacks:

```java
// HTML encoding
String safeName = InputSanitizer.sanitize(fullName);

// Length limits
- fullName: max 100 characters
- email: max 255 characters
- phone: max 50 characters
- address: max 500 characters
- message: max 2000 characters
```

### Rate Limiting

Forms are protected by rate limiting:

- **Limit:** 5 requests per minute per IP address
- **Response:** HTTP 429 Too Many Requests
- **Headers:** `Retry-After` with seconds to wait

### CORS Protection

CORS is configured to allow only specific origins:

```properties
cors.allowed.origins=http://localhost:5175,https://desn.org.np
```

## Troubleshooting

### Form Submission Fails

**Symptoms:**

- Error message on submission
- Form doesn't reset

**Common Causes:**

1. **Validation Error**

   - Check all required fields are filled
   - Email format: user@domain.com
   - Phone: 10 digits starting with 98

2. **Backend Not Running**

   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

3. **CORS Error**

   - Check browser console
   - Verify frontend URL in CORS config
   - Check backend logs for CORS errors

4. **Rate Limit Exceeded**
   - Wait 1 minute before retrying
   - Check for automated submissions

### Admin Cannot See Submissions

**Check:**

1. **Not Logged In as Admin**

   ```
   Email: admin@desn.org.np
   Password: admin123
   ```

2. **Database Mode**

   - Ensure `STORAGE_MODE=database`
   - Check database connection

3. **File Mode**
   - Check `form-submissions/` directory exists
   - Verify file permissions

### Email Notifications Not Working

**Check:**

1. **SMTP Configuration**

   ```properties
   spring.mail.host=smtp.gmail.com
   spring.mail.port=587
   spring.mail.username=your-email@gmail.com
   spring.mail.password=your-app-password
   ```

2. **Gmail App Password**

   - Use app-specific password, not regular password
   - Enable 2FA and generate app password
   - https://myaccount.google.com/apppasswords

3. **Email Enabled**

   ```properties
   email.notifications.enabled=true
   admin.email=admin@desn.org.np
   ```

4. **Check Logs**
   ```bash
   cd backend
   ./mvnw spring-boot:run | grep -i "email\|mail"
   ```

### Database Connection Issues

**H2 Console (Development):**

```
URL: http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:testdb
Username: sa
Password: password
```

**PostgreSQL (Production):**

```bash
# Test connection
psql -h localhost -U desn_user -d desn_prod

# Check tables
\dt

# Query applications
SELECT * FROM membership_application ORDER BY submitted_at DESC;
SELECT * FROM volunteer_application ORDER BY submitted_at DESC;
```

## Testing

### Manual Testing

1. **Test Membership Form:**

   ```
   1. Open http://localhost:5175/get-involved
   2. Scroll to membership section
   3. Fill all fields
   4. Click "Apply for Membership"
   5. Verify success message
   6. Check admin dashboard
   ```

2. **Test Volunteer Form:**

   ```
   1. Open http://localhost:5175/get-involved
   2. Scroll to volunteer section
   3. Fill all fields
   4. Click "Submit Application"
   5. Verify success message
   6. Check admin dashboard
   ```

3. **Test Validation:**

   ```
   - Try invalid email: "notanemail"
   - Try short phone: "123"
   - Try empty required fields
   - Should show validation errors
   ```

4. **Test Rate Limiting:**
   ```
   - Submit form 6 times quickly
   - 6th request should fail with 429 error
   - Wait 1 minute, should work again
   ```

### API Testing with curl

```bash
# Test membership submission
curl -X POST http://localhost:8080/api/forms/membership \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "9841234567",
    "address": "Kathmandu",
    "message": "Test application",
    "language": "en"
  }'

# Test volunteer submission
curl -X POST http://localhost:8080/api/forms/volunteer \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test Volunteer",
    "email": "volunteer@example.com",
    "phone": "9851234567",
    "message": "Want to help",
    "language": "en"
  }'

# Get all submissions (as admin)
TOKEN="your_admin_jwt_token"
curl http://localhost:8080/api/forms/membership \
  -H "Authorization: Bearer $TOKEN"
```

## Future Enhancements

- [ ] Email confirmation to applicants
- [ ] Application status tracking (pending/approved/rejected)
- [ ] Export to CSV/Excel from admin dashboard
- [ ] Application search and filtering
- [ ] Bulk actions (approve/reject multiple)
- [ ] Application statistics and analytics
- [ ] Automated follow-up emails
- [ ] Integration with CRM system

---

**Last Updated:** December 2024  
**Status:** Production Ready
