# Fixing Khalti Donation 500 Error

## Problem

The Khalti donation feature returns a 500 error because the Khalti API keys are not configured.

## Root Cause

The backend service needs valid Khalti API credentials to initiate payments. These are currently empty/not set.

## Solution

### Step 1: Get Khalti API Keys

1. Go to https://khalti.com/
2. Sign up for a Khalti merchant account
3. Navigate to Settings → API Keys
4. Copy your **Public Key** and **Secret Key**

### Step 2: Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your Khalti keys:

```properties
KHALTI_PUBLIC_KEY=your_actual_public_key_here
KHALTI_SECRET_KEY=your_actual_secret_key_here
KHALTI_API_URL=https://a.khalti.com/api/v2
APP_BASE_URL=http://localhost:5173
```

### Step 3: Load Environment Variables

**Option A: Using environment variables directly**

```bash
export KHALTI_PUBLIC_KEY="your_key_here"
export KHALTI_SECRET_KEY="your_secret_here"
./mvnw spring-boot:run
```

**Option B: Using application-dev.properties**

Edit `backend/src/main/resources/application-dev.properties` and add:

```properties
# Khalti Configuration for Development
khalti.public.key=your_test_public_key
khalti.secret.key=your_test_secret_key
khalti.api.url=https://a.khalti.com/api/v2
app.base.url=http://localhost:5173
```

Then run with dev profile:

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### Step 4: Restart Backend

```bash
cd backend
./mvnw spring-boot:run
```

### Step 5: Test the Donation Flow

1. Start frontend: `npm run dev`
2. Click "Donate" button
3. Fill in the donation form
4. Click "Proceed to Payment"
5. You should be redirected to Khalti's payment page

## Testing with Khalti Test Mode

Khalti provides test credentials for development:

- Use test keys from your Khalti dashboard's test environment
- Test phone numbers and cards are documented in Khalti's developer docs

## Error Messages

After the fix, if you see:

- **"Payment gateway not configured"** → Keys are still empty or not loaded
- **"Failed to initiate payment"** → Check backend logs for Khalti API errors
- **Khalti API 401** → Invalid secret key
- **Khalti API 400** → Check request format (amount, phone, etc.)

## Verification

Check backend logs for:

```
INFO: Payment initiated successfully. TransactionId: DESN-..., Pidx: ...
```

If you see:

```
ERROR: Khalti secret key is not configured
```

Then the environment variables aren't loaded properly.

## Production Deployment

For production (Railway, etc.):

1. Set environment variables in Railway dashboard
2. Never commit real keys to git
3. Use Railway's environment variable feature
4. Set `APP_BASE_URL` to your production domain
