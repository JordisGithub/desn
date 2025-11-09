# Authentication System

Guide for the DESN JWT-based authentication system with role-based access control.

## Table of Contents

- [Overview](#overview)
- [User Roles](#user-roles)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Frontend Integration](#frontend-integration)
- [Security](#security)
- [Troubleshooting](#troubleshooting)

## Overview

The authentication system provides:

- ✅ JWT (JSON Web Token) based authentication
- ✅ Role-based access control (ADMIN, MEMBER)
- ✅ Secure password hashing (BCrypt)
- ✅ Token expiration (24 hours)
- ✅ Protected API endpoints
- ✅ Frontend auth context and routing

### Architecture

```
User → Login Form → POST /api/auth/login → Backend Validates
                                                  ↓
                                            Generate JWT Token
                                                  ↓
                                            Return Token + User Info
                                                  ↓
Frontend Stores Token → Include in API Requests → Backend Validates Token
```

## User Roles

### ADMIN

- Full access to admin dashboard
- View all form submissions
- View all payment transactions
- Manage users (future)

**Test Credentials:**

```
Email: admin@desn.org.np
Password: admin123
```

### MEMBER

- Regular user access
- Can use public features
- Cannot access admin dashboard
- Cannot view submissions

**Test Credentials:**

```
Email: member@desn.org.np
Password: member123
```

## Getting Started

### Default Users

Two test users are automatically created on first run:

**Admin User:**

```java
Username: admin
Email: admin@desn.org.np
Password: admin123
Role: ADMIN
```

**Member User:**

```java
Username: member
Email: member@desn.org.np
Password: member123
Role: MEMBER
```

> ⚠️ **IMPORTANT:** Change these credentials in production!

### Testing Authentication

1. **Start Backend:**

   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

2. **Start Frontend:**

   ```bash
   npm run dev
   ```

3. **Test Login:**
   - Navigate to http://localhost:5175/login
   - Use admin or member credentials
   - Should redirect to homepage
   - User name appears in header

## API Reference

### POST /api/auth/register

Register a new user.

**Request:**

```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "fullName": "New User",
  "password": "securepassword123"
}
```

**Response (Success):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 3,
  "username": "newuser",
  "email": "newuser@example.com",
  "fullName": "New User",
  "role": "MEMBER"
}
```

**Validation Rules:**

- Username: 3-50 characters, alphanumeric + underscore
- Email: Valid email format
- Password: Minimum 6 characters
- Full Name: 2-100 characters

**Default Role:** New users are assigned MEMBER role

### POST /api/auth/login

Authenticate a user.

**Request:**

```json
{
  "email": "admin@desn.org.np",
  "password": "admin123"
}
```

**Response (Success):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "admin",
  "email": "admin@desn.org.np",
  "fullName": "Admin User",
  "role": "ADMIN"
}
```

**Response (Error):**

```json
{
  "error": "Invalid credentials"
}
```

### Using the Token

Include JWT token in protected API requests:

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Example:**

```bash
TOKEN="your_jwt_token_here"

curl http://localhost:8080/api/forms/membership \
  -H "Authorization: Bearer $TOKEN"
```

## Frontend Integration

### AuthContext

The frontend uses React Context for auth state management.

**Location:** `src/contexts/AuthContext.tsx`

**Usage:**

```tsx
import { useAuth } from "../contexts/AuthContext";

function MyComponent() {
  const { user, login, logout, isAdmin } = useAuth();

  if (!user) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <p>Welcome, {user.fullName}</p>
      {isAdmin && <p>You are an admin!</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

**Available Properties:**

- `user` - Current user object or null
- `login(email, password)` - Login function
- `logout()` - Logout function
- `isAdmin` - Boolean, true if user has ADMIN role
- `loading` - Boolean, true while checking auth status

### Protected Routes

**Admin-Only Route Example:**

```tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AdminDashboard() {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <CircularProgress />;
  }

  if (!isAdmin) {
    return <Navigate to='/' />;
  }

  return <div>Admin Dashboard Content</div>;
}
```

### Login Component

**Location:** `src/views/Login.tsx`

**Features:**

- Email and password inputs
- Form validation
- Loading states
- Error messages
- Link to registration
- Redirect after successful login

### Register Component

**Location:** `src/views/Register.tsx`

**Features:**

- Full name, email, username, password inputs
- Form validation
- Password confirmation
- Loading states
- Error messages
- Link to login
- Auto-login after registration

### Header Integration

The Header component shows different options based on auth state:

**Not Logged In:**

- Login button

**Logged In (Member):**

- User dropdown menu
  - Profile (future)
  - Logout

**Logged In (Admin):**

- User dropdown menu
  - Admin Dashboard
  - Profile (future)
  - Logout

## Security

### Password Security

**Hashing:**

- Algorithm: BCrypt
- Strength: 10 rounds
- Passwords never stored in plain text

**Example:**

```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(10);
}
```

### JWT Token Security

**Token Configuration:**

```properties
# JWT Secret Key (must be at least 256 bits)
jwt.secret=${JWT_SECRET:your-secret-key-for-jwt-tokens-must-be-long-enough-256-bits}

# Token expiration: 24 hours (in milliseconds)
jwt.expiration=86400000
```

**Token Contents:**

```json
{
  "sub": "admin@desn.org.np",
  "role": "ADMIN",
  "iat": 1704096000,
  "exp": 1704182400
}
```

**Security Features:**

- Signed with HS256 algorithm
- Contains expiration timestamp
- Cannot be modified without signature
- Validated on every protected request

### Production Security

**Required for Production:**

1. **Change JWT Secret:**

```bash
# Generate a secure random key
export JWT_SECRET=$(openssl rand -base64 32)
```

2. **Change Default Passwords:**

```java
// In DatabaseInitializer.java
User admin = new User();
admin.setPassword(passwordEncoder.encode("NEW_SECURE_PASSWORD"));
```

3. **Enable HTTPS:**

```properties
server.ssl.enabled=true
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=keystore_password
```

4. **Configure CORS:**

```properties
cors.allowed.origins=https://desn.org.np
```

## Troubleshooting

### Login Fails

**Symptoms:**

- "Invalid credentials" error
- Cannot login with correct password

**Check:**

1. **User Exists in Database:**

```sql
-- H2 Console: http://localhost:8080/h2-console
SELECT * FROM users WHERE email = 'admin@desn.org.np';
```

2. **Backend is Running:**

```bash
cd backend
./mvnw spring-boot:run
```

3. **Check Backend Logs:**

```bash
# Look for authentication errors
./mvnw spring-boot:run | grep -i "auth\|login\|user"
```

4. **Password is Correct:**

- Default admin password: `admin123`
- Default member password: `member123`

### Token Expired

**Symptoms:**

- Logged out unexpectedly
- API returns 401 Unauthorized

**Solution:**

- Login again to get new token
- Tokens expire after 24 hours
- Increase expiration if needed:

```properties
jwt.expiration=604800000  # 7 days
```

### Cannot Access Admin Dashboard

**Symptoms:**

- Redirected away from /admin/dashboard
- "Access denied" message

**Check:**

1. **User Role:**

```sql
SELECT username, email, role FROM users;
```

2. **Logged In as Admin:**

- Use `admin@desn.org.np` / `admin123`
- Not `member@desn.org.np`

3. **Token is Valid:**

- Check browser localStorage for token
- Token should start with "eyJ"
- Not expired (< 24 hours old)

4. **Frontend Route Protection:**

```tsx
// Check AdminDashboard.tsx
const { isAdmin } = useAuth();
if (!isAdmin) {
  return <Navigate to='/' />;
}
```

### Registration Fails

**Common Errors:**

1. **"Username already exists"**

- Choose a different username
- Usernames must be unique

2. **"Email already exists"**

- Use a different email
- Each email can only have one account

3. **"Password too short"**

- Use at least 6 characters
- Mix letters, numbers, symbols

4. **"Invalid email format"**

- Use format: user@domain.com
- Check for typos

### JWT Errors

**"JWT signature does not match"**

- JWT_SECRET changed after token was issued
- Need to login again with new secret

**"JWT expired"**

- Token older than 24 hours
- Login again to get new token

**"Invalid JWT token"**

- Token format is incorrect
- Token was tampered with
- Login again to get valid token

## Testing

### Manual Testing

**Test Login Flow:**

```
1. Open http://localhost:5175/login
2. Email: admin@desn.org.np
3. Password: admin123
4. Click "Login"
5. Should redirect to homepage
6. Name "Admin User" appears in header
7. Dropdown shows "Admin Dashboard" option
```

**Test Registration Flow:**

```
1. Open http://localhost:5175/register
2. Full Name: Test User
3. Email: test@example.com
4. Username: testuser
5. Password: test123456
6. Confirm Password: test123456
7. Click "Register"
8. Should auto-login and redirect
9. Name "Test User" appears in header
10. No "Admin Dashboard" in dropdown (MEMBER role)
```

**Test Protected Route:**

```
1. Logout if logged in
2. Try to access http://localhost:5175/admin/dashboard
3. Should redirect to login or home
4. Login as admin
5. Navigate to admin dashboard
6. Should see content
7. Logout
8. Try to access admin dashboard again
9. Should be blocked
```

### API Testing

**Test Registration:**

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "fullName": "Test User",
    "password": "test123456"
  }'
```

**Test Login:**

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@desn.org.np",
    "password": "admin123"
  }'
```

**Test Protected Endpoint:**

```bash
TOKEN="your_token_here"

curl http://localhost:8080/api/forms/membership \
  -H "Authorization: Bearer $TOKEN"
```

## Database Schema

### Users Table

```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);
```

### Example Records

```sql
-- Admin User
INSERT INTO users (username, email, full_name, password, role)
VALUES ('admin', 'admin@desn.org.np', 'Admin User',
        '$2a$10$...bcrypt_hash...', 'ADMIN');

-- Member User
INSERT INTO users (username, email, full_name, password, role)
VALUES ('member', 'member@desn.org.np', 'Member User',
        '$2a$10$...bcrypt_hash...', 'MEMBER');
```

## Future Enhancements

- [ ] Password reset functionality
- [ ] Email verification
- [ ] Two-factor authentication (2FA)
- [ ] Remember me option
- [ ] Session management
- [ ] User profile editing
- [ ] Social login (Google, Facebook)
- [ ] Account deactivation
- [ ] Password strength meter
- [ ] Login attempt limiting
- [ ] IP-based access control

---

**Last Updated:** December 2024  
**Status:** Production Ready
