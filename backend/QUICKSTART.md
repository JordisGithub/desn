# Quick Start Guide for Khalti Payment Integration

## You're all set up! Here's what to do next:

### Step 1: Get Your Khalti API Keys

1. Go to **https://khalti.com/**
2. Sign up for a merchant account
3. Verify your account
4. Go to **Settings → API Keys**
5. Copy both:
   - **Public Key** (starts with `live_public_key_...` or `test_public_key_...`)
   - **Secret Key** (starts with `live_secret_key_...` or `test_secret_key_...`)

> **Note:** Use test keys for development, live keys for production

### Step 2: Add Your Keys to .env

Open `backend/.env` and replace the placeholder values:

```bash
# Before (placeholder):
KHALTI_PUBLIC_KEY=your_khalti_public_key_here
KHALTI_SECRET_KEY=your_khalti_secret_key_here

# After (your actual keys):
KHALTI_PUBLIC_KEY=test_public_key_abc123...
KHALTI_SECRET_KEY=test_secret_key_xyz789...
```

### Step 3: Start the Backend

From the `backend/` directory:

```bash
./start-backend.sh
```

Or manually:

```bash
cd backend
export $(cat .env | grep -v '^#' | xargs)
./mvnw spring-boot:run
```

### Step 4: Test the Donation Flow

1. **Start frontend:**

   ```bash
   npm run dev
   ```

2. **Open browser:** http://localhost:5173

3. **Test donation:**
   - Click any "Donate" button
   - Fill in the form:
     - Amount: Any amount (e.g., 1000)
     - Name: Your name
     - Email: Your email
     - Phone: Optional
   - Click "Proceed to Payment"
   - Should redirect to Khalti payment page ✅

### Troubleshooting

**If you see "Payment gateway not configured":**

- Check that your `.env` file exists and has the keys
- Make sure you exported the variables before starting
- Check backend logs for: `Khalti secret key is not configured`

**If you see "Failed to initiate payment":**

- Check backend logs for the actual error
- Verify your Khalti keys are correct (test vs live)
- Make sure you're using the right environment (test/live)

**Backend logs location:**

- In the terminal where you ran `./start-backend.sh`

### What Happens When Working:

1. User clicks Donate → Form opens
2. User fills form and submits → Frontend calls `/api/payment/initiate`
3. Backend creates transaction → Calls Khalti API → Gets payment URL
4. User redirects to Khalti → Completes payment
5. Khalti redirects back → Backend verifies payment
6. Success message shown ✅

### Test Cards (Khalti Test Environment)

When using test keys, use these test credentials:

- Test mobile: Check Khalti docs
- Test OTP: Check Khalti docs
- Test cards: Check Khalti developer documentation

---

## Files Created for You:

- ✅ `backend/.env` - Your environment variables (add keys here)
- ✅ `backend/.env.example` - Template with all variables
- ✅ `backend/start-backend.sh` - Easy startup script
- ✅ `backend/KHALTI_SETUP.md` - Detailed setup guide

## Next Steps After Adding Keys:

```bash
cd backend
./start-backend.sh
```

That's it! The donation feature will work once you add your Khalti keys.
