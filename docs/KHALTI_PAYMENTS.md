# Khalti Payment Integration

Complete guide for Khalti payment gateway integration in DESN donation system.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Testing](#testing)
- [Production Deployment](#production-deployment)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)

## Overview

The Khalti payment integration enables secure online donations with:

- ✅ Complete transaction tracking
- ✅ Payment verification
- ✅ Admin dashboard for monitoring
- ✅ Status management (PENDING → INITIATED → COMPLETED/FAILED)
- ✅ Production-ready security

### Payment Flow

```
User → Donation Form → Backend → Khalti API → Payment Page
                                                     ↓
                                                User Pays
                                                     ↓
      Success Page ← Backend Verify ← Khalti Redirect
```

## Quick Start

### 1. Get Khalti Credentials

**Test Environment:**

- Visit: https://test-admin.khalti.com
- Sign up for test merchant account
- Get your test public and secret keys

**Production:**

- Apply at: https://admin.khalti.com
- Complete merchant verification
- Get production keys

### 2. Configure Environment

```bash
# Set environment variables
export KHALTI_PUBLIC_KEY="test_public_key_xxx"
export KHALTI_SECRET_KEY="test_secret_key_xxx"
export KHALTI_API_URL="https://a.khalti.com/api/v2"
export APP_BASE_URL="http://localhost:5175"
```

### 3. Start Services

```bash
# Terminal 1: Backend
cd backend
./mvnw spring-boot:run

# Terminal 2: Frontend
npm run dev
```

### 4. Test Payment

1. Navigate to http://localhost:5175/get-involved
2. Click "Donate via Khalti" button
3. Fill donation form with amount and details
4. Use test card: **5200 0000 0000 0007**, CVV: **123**, OTP: **987654**
5. Complete payment and verify success

## Architecture

### Components

#### Backend

- **PaymentTransaction** entity - Database record for transactions
- **PaymentTransactionRepository** - Data access layer
- **KhaltiPaymentService** - Khalti API integration
- **PaymentController** - REST endpoints
- **DTOs** - Request/response validation

#### Frontend

- **DonationPaymentModal** - Payment form component
- **PaymentVerify** - Verification page
- **AdminDashboard** - Transaction management

### Database Schema

```sql
payment_transaction
├── id (BIGSERIAL PRIMARY KEY)
├── transaction_id (VARCHAR UNIQUE) -- DESN-timestamp-UUID
├── payment_gateway (VARCHAR) -- KHALTI
├── amount (DECIMAL)
├── currency (VARCHAR) -- NPR
├── status (VARCHAR) -- PENDING, INITIATED, COMPLETED, FAILED, CANCELLED
├── khalti_pidx (VARCHAR) -- Khalti payment index
├── khalti_transaction_id (VARCHAR)
├── donor_name (VARCHAR)
├── donor_email (VARCHAR)
├── donor_phone (VARCHAR)
├── donor_message (TEXT)
├── created_at (TIMESTAMP)
├── verified_at (TIMESTAMP)
└── completed_at (TIMESTAMP)
```

### Payment Statuses

| Status     | Description                            |
| ---------- | -------------------------------------- |
| PENDING    | Initial state when transaction created |
| INITIATED  | Khalti payment URL generated           |
| PROCESSING | Payment in progress at Khalti          |
| COMPLETED  | Payment successful and verified        |
| FAILED     | Payment failed or rejected             |
| CANCELLED  | User cancelled payment                 |

## Testing

### Test Credentials

**Khalti Test Cards:**

```
Card Number: 5200000000000007
CVV: 123
Expiry: Any future date
OTP: 987654

Mobile: 9800000000
MPIN: 1111
OTP: 987654
```

**Admin Access:**

```
Email: admin@desn.org.np
Password: admin123
```

### Testing Workflow

#### 1. Test Successful Payment

```bash
# 1. Make donation
Open http://localhost:5175/get-involved
Click "Donate via Khalti"
Amount: NPR 1000
Fill donor details
Click "Donate"

# 2. Complete on Khalti
Use test card: 5200000000000007
CVV: 123
OTP: 987654

# 3. Verify success
Should redirect to /payment/verify
Shows: "Payment Successful!"
Displays: Transaction ID, Amount
```

#### 2. Test Failed Payment

- Use invalid card number
- Should show failure message
- Status: FAILED in database

#### 3. Test Cancelled Payment

- Start payment process
- Click "Cancel" on Khalti page
- Should return with cancelled status

#### 4. View in Admin Dashboard

```bash
# Login as admin
http://localhost:5175/login
Email: admin@desn.org.np
Password: admin123

# View transactions
Click "Admin Dashboard"
Go to "Payment Transactions" tab
See all donations with statuses
```

### API Testing

```bash
# Initiate payment
curl -X POST http://localhost:8080/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "donorName": "Test User",
    "donorEmail": "test@example.com",
    "donorPhone": "9841234567",
    "returnUrl": "http://localhost:5175/payment/verify",
    "websiteUrl": "http://localhost:5175"
  }'

# Check status
curl http://localhost:8080/api/payment/status/DESN-xxx-xxx

# Verify payment (after completing on Khalti)
curl "http://localhost:8080/api/payment/verify?pidx=khalti_pidx_xxx&txnId=DESN-xxx-xxx"
```

## Production Deployment

### Pre-Deployment Checklist

- [ ] Get Khalti production keys
- [ ] Update environment variables
- [ ] Configure PostgreSQL database
- [ ] Enable HTTPS
- [ ] Update CORS allowed origins
- [ ] Test payment flow in staging
- [ ] Set up monitoring and alerts
- [ ] Configure email notifications

### Environment Configuration

```bash
# Production environment variables
export KHALTI_PUBLIC_KEY="live_public_key_xxx"
export KHALTI_SECRET_KEY="live_secret_key_xxx"
export KHALTI_API_URL="https://khalti.com/api/v2"  # Production URL
export APP_BASE_URL="https://desn.org.np"

# Database
export SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/desn_prod"
export SPRING_DATASOURCE_USERNAME="desn_user"
export SPRING_DATASOURCE_PASSWORD="secure_password"

# Security
export JWT_SECRET="production-secure-secret-min-256-bits"
export CORS_ALLOWED_ORIGINS="https://desn.org.np"
```

### Database Migration

```sql
-- Create production database
CREATE DATABASE desn_prod;

-- Create user
CREATE USER desn_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE desn_prod TO desn_user;

-- Tables are auto-created by Spring Boot JPA
-- Or run migration script if needed
```

### CORS Configuration

Update for production domain in `SecurityConfig.java`:

```java
configuration.setAllowedOrigins(
    List.of("https://desn.org.np")
);
```

### HTTPS Setup

1. Obtain SSL certificate (Let's Encrypt, etc.)
2. Configure in application.properties:

```properties
server.ssl.enabled=true
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=your-password
server.ssl.key-store-type=PKCS12
```

### Monitoring

**Key Metrics to Track:**

- Payment initiation rate
- Payment completion rate (success %)
- Average donation amount
- Failed payment reasons
- API response times
- Error rates

**Logging:**

```properties
# Enable detailed payment logging
logging.level.com.example.proxy.service.KhaltiPaymentService=INFO
logging.level.com.example.proxy.controller.PaymentController=INFO
```

## API Reference

### POST /api/payment/initiate

Initiate a new payment transaction.

**Request:**

```json
{
  "amount": 5000.0,
  "donorName": "John Doe",
  "donorEmail": "john@example.com",
  "donorPhone": "9841234567",
  "donorMessage": "Supporting education",
  "returnUrl": "https://desn.org.np/payment/verify",
  "websiteUrl": "https://desn.org.np"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Payment initiated successfully",
  "transactionId": "DESN-1234567890-ABC12345",
  "paymentUrl": "https://test-pay.khalti.com/#/...",
  "pidx": "khalti_pidx_xxxxx"
}
```

**Validation:**

- Amount: 1 - 1,000,000 NPR
- Email: Valid email format
- Phone: Optional, valid Nepal phone number
- All string fields: Max 255 characters

### GET /api/payment/verify

Verify payment after Khalti redirect.

**Parameters:**

- `pidx` (required) - Khalti payment index
- `txnId` (required) - Our transaction ID

**Response:**

```json
{
  "success": true,
  "message": "Payment verified successfully",
  "transactionId": "DESN-1234567890-ABC12345",
  "amount": 5000.0,
  "status": "COMPLETED"
}
```

### GET /api/payment/status/{transactionId}

Check payment status.

**Response:**

```json
{
  "success": true,
  "transactionId": "DESN-1234567890-ABC12345",
  "status": "COMPLETED",
  "amount": 5000.0,
  "donorName": "John Doe",
  "createdAt": "2024-01-01T10:30:00",
  "completedAt": "2024-01-01T10:32:15"
}
```

### GET /api/payment/transactions

Get all transactions (Admin only).

**Headers:**

```
Authorization: Bearer {jwt_token}
```

**Response:**

```json
[
  {
    "transactionId": "DESN-1234567890-ABC12345",
    "paymentGateway": "KHALTI",
    "amount": 5000.0,
    "currency": "NPR",
    "status": "COMPLETED",
    "donorName": "John Doe",
    "donorEmail": "john@example.com",
    "createdAt": "2024-01-01T10:30:00",
    "completedAt": "2024-01-01T10:32:15"
  }
]
```

## Troubleshooting

### Payment Initiation Fails

**Symptoms:**

- Error message on form submission
- No redirect to Khalti

**Check:**

1. Environment variables are set correctly
2. Backend is running
3. Khalti API credentials are valid
4. Amount is within limits (1-1,000,000)

**Debug:**

```bash
# Check backend logs
cd backend
./mvnw spring-boot:run | grep -i "khalti\|payment"

# Verify environment variables
echo $KHALTI_SECRET_KEY
```

### Payment Verification Fails

**Symptoms:**

- Redirected back but shows error
- Payment succeeded on Khalti but shows failed

**Check:**

1. Transaction exists in database
2. pidx parameter is in URL
3. Backend can reach Khalti API

**Debug:**

```sql
-- Check database
SELECT * FROM PAYMENT_TRANSACTION
WHERE KHALTI_PIDX = 'your_pidx'
ORDER BY CREATED_AT DESC;
```

### Admin Dashboard Not Showing Transactions

**Check:**

1. Logged in as admin user
2. JWT token is valid
3. Backend endpoint is accessible

**Debug:**

```bash
# Test API directly
TOKEN="your_jwt_token"
curl http://localhost:8080/api/payment/transactions \
  -H "Authorization: Bearer $TOKEN"
```

### Common Errors

#### "Invalid payment verification parameters"

- Missing pidx or txnId in URL
- Check frontend return URL configuration

#### "Transaction not found"

- Transaction ID doesn't exist
- Check database for transaction

#### "Payment verification timeout"

- Khalti API not responding
- Check network connectivity
- Verify API URL is correct

#### "Amount exceeds maximum limit"

- Amount > NPR 1,000,000
- Reduce amount or split into multiple transactions

## Security Best Practices

1. **API Keys:**

   - Never commit keys to version control
   - Use environment variables
   - Different keys for test/production
   - Rotate keys periodically

2. **Input Validation:**

   - Validate amount limits
   - Sanitize all string inputs
   - Verify email format
   - Check phone number pattern

3. **Transaction Security:**

   - Verify payment with Khalti before confirming
   - Log all payment attempts
   - Implement idempotency for verify endpoint
   - Use HTTPS in production

4. **Rate Limiting:**
   - Limit payment initiation (10/min per IP)
   - Limit verification attempts (5/min per transaction)
   - Monitor for abuse

## Future Enhancements

Planned features:

- [ ] Email receipts for donors
- [ ] SMS notifications
- [ ] Recurring donations
- [ ] Payment analytics dashboard
- [ ] Refund processing UI
- [ ] Multiple currency support
- [ ] Donation campaigns

## Resources

- **Khalti Documentation:** https://docs.khalti.com
- **Test Merchant Dashboard:** https://test-admin.khalti.com
- **Live Merchant Dashboard:** https://admin.khalti.com
- **Support:** merchant@khalti.com

---

**Last Updated:** December 2024  
**Status:** Production Ready
