# DESN - Disabled Environment Service Nepal

Website for Disabled Environment Service Nepal, a non-profit organization supporting individuals with disabilities through education, employment, and advocacy programs.

## 🌐 Live Application

- **Production Website**: https://desnepal.com http://13.204.228.199/
- **Production API**: https://desnepal.com/api

## 🚀 Quick Start for New Developers

### Prerequisites

- **Node.js** 18+ and npm
- **Java** 21
- **Maven** 3.6+
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/JordisGithub/desn.git
cd desn
```

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: **http://localhost:5173**

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Make mvnw executable (on Mac/Linux)
chmod +x ./mvnw

# Start Spring Boot application with development profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

Backend API will be available at: **http://localhost:8080**

### 4. Access the Application

- **Website**: http://localhost:5173
- **API**: http://localhost:8080
- **H2 Database Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: `password`

## 🏗️ Project Structure- For Create React App style environments the fallback `REACT_APP_API_KEY` will also be read if present.

```When running `npm run dev` the key will be available to the client code. Do not commit secrets to source control.

desn/

├── src/ # Frontend React applicationYou can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

│ ├── components/ # Reusable React components

│ │ ├── home/ # Homepage sections```js

│ │ ├── getinvolved/ # Get Involved page forms// eslint.config.js

│ │ ├── payment/ # Khalti payment componentsimport reactX from "eslint-plugin-react-x";

│ │ └── ...import reactDom from "eslint-plugin-react-dom";

│ ├── views/ # Page components

│ ├── contexts/ # React contexts (Auth, Language)export default defineConfig([

│ ├── i18n/ # Internationalization (EN/NE) globalIgnores(["dist"]),

│ └── services/ # API service layer {

├── backend/ # Spring Boot backend files: ["**/*.{ts,tsx}"],

│ └── src/main/java/com/example/proxy/ extends: [

│ ├── controller/ # REST API controllers // Other configs...

│ ├── service/ # Business logic // Enable lint rules for React

│ ├── entity/ # JPA entities reactX.configs["recommended-typescript"],

│ ├── repository/ # Data access layer // Enable lint rules for React DOM

│ ├── dto/ # Data transfer objects reactDom.configs.recommended,

│ └── config/ # Configuration classes ],

├── docs/ # Documentation languageOptions: {

│ ├── KHALTI_PAYMENTS.md # Payment integration guide parserOptions: {

│ ├── FORMS.md # Form submission system project: ["./tsconfig.node.json", "./tsconfig.app.json"],

│ ├── AUTHENTICATION.md # Auth system guide tsconfigRootDir: import.meta.dirname,

│ └── SECURITY.md # Security features },

└── public/ # Static assets // other options...

```},

  },

## 🎯 Key Features]);

```

- **Bilingual Support**: English and Nepali (नेपाली)
- **Online Donations**: Secure payments via Khalti
- **Form Submissions**: Membership and volunteer applications
- **Authentication**: JWT-based with Admin/Member roles
- **Admin Dashboard**: View form submissions and payment transactions
- **Responsive Design**: Mobile-friendly interface
- **Production Security**: CORS, rate limiting, input sanitization

## 📚 Documentation

### Quick Links

- **[Khalti Payments](docs/KHALTI_PAYMENTS.md)** - Payment gateway integration
- **[Forms System](docs/FORMS.md)** - Form submissions and storage
- **[Authentication](docs/AUTHENTICATION.md)** - User authentication and authorization
- **[Security](docs/SECURITY.md)** - Security features and best practices
- **[Nginx Configuration](docs/NGINX_CONFIGURATION.md)** - HTTPS configuration and maintenance

### Additional Resources

- **Frontend**: React 18 + TypeScript + Vite + Material-UI
- **Backend**: Spring Boot 3.2.5 + Spring Security + JPA
- **Database**: H2 (dev) / PostgreSQL (prod)
- **Payment**: Khalti Payment Gateway

## 🔑 Default Test Credentials

### Admin User

```
Email: admin@desn.org.np
Password: admin123
```

### Member User

```
Email: member@desn.org.np
Password: member123
```

> ⚠️ **Change these credentials in production!**

## 🛠️ Development Commands

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend

```bash
./mvnw spring-boot:run          # Start application
./mvnw clean compile            # Clean and compile
./mvnw test                     # Run tests
./mvnw package                  # Create JAR file
```

## 🌍 Environment Variables

### Frontend

#### Development (.env)

```bash
# Optional: Development API key for protected endpoints
VITE_DEV_API_KEY=your_dev_key_here
```

#### Production Build

```bash
# Required: API base URL for production builds
VITE_API_BASE_URL=https://desnepal.com

# Build command example:
# VITE_API_BASE_URL=https://desnepal.com npm run build
```

### Backend (Application Profiles)

The backend uses Spring profiles for different environments:

- **Development**: `dev` (H2 in-memory database, file storage)
- **Production**: `prod` (production database, secure settings)

#### Development (application-dev.properties)

```bash
# H2 Database (in-memory)
spring.datasource.url=jdbc:h2:mem:testdb
spring.h2.console.enabled=true

# CORS for local development
app.cors.allowed-origins=http://localhost:5173,http://localhost:5174

# File storage mode
storage.mode=file
storage.file.base-path=./data
```

#### Production (Environment Variables)

Set these on your production server:

```bash
# Spring Profile
SPRING_PROFILES_ACTIVE=prod

# Database (PostgreSQL recommended)
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/desn_prod
SPRING_DATASOURCE_USERNAME=desn_user
SPRING_DATASOURCE_PASSWORD=secure_password

# CORS Configuration
CORS_ALLOWED_ORIGINS=https://desnepal.com,https://www.desnepal.com

# JWT Security
JWT_SECRET=your-secure-secret-key-min-256-bits
JWT_EXPIRATION=86400000

# Khalti Payment Gateway
KHALTI_PUBLIC_KEY=live_public_key_xxx
KHALTI_SECRET_KEY=live_secret_key_xxx
KHALTI_API_URL=https://khalti.com/api/v2

# Email Notifications (Optional)
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=your-email@gmail.com
SPRING_MAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@desnepal.com
FROM_EMAIL=noreply@desnepal.com

# Storage Mode
STORAGE_MODE=database  # or "file" for file-based storage
```

## 🎨 Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Material-UI** - Component library
- **React Router** - Navigation
- **i18next** - Internationalization

### Backend

- **Spring Boot 3.2.5** - Application framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Data access
- **H2 / PostgreSQL** - Database
- **JWT** - Token-based auth
- **Logback** - Logging

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ CORS protection
- ✅ Rate limiting (5 req/min per IP)
- ✅ Input sanitization (XSS prevention)
- ✅ Password encryption (BCrypt)
- ✅ HTTPS support (production)
- ✅ Environment-based configuration

## 📦 API Endpoints

### Public Endpoints

- `POST /api/forms/membership` - Submit membership application
- `POST /api/forms/volunteer` - Submit volunteer application
- `POST /api/payment/initiate` - Start payment
- `GET /api/payment/verify` - Verify payment
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Protected Endpoints (Admin Only)

- `GET /api/forms/membership` - List all membership applications
- `GET /api/forms/volunteer` - List all volunteer applications
- `GET /api/payment/transactions` - List all payment transactions

## 🚀 Production Deployment

### Current Production Setup

The application is deployed on **AWS EC2** with the following architecture:

- **Server**: Ubuntu 22.04 on AWS EC2 (13.204.228.199)
- **Web Server**: Nginx 1.24.0 (reverse proxy + SSL termination)
- **SSL Certificate**: Let's Encrypt (auto-renewal enabled, expires Feb 12, 2026)
- **Domain**: desnepal.com
- **Frontend**: Built React app served by Nginx from `/home/ubuntu/desn-app/frontend/dist`
- **Backend**: Spring Boot JAR running on port 8080
- **Database**: H2 (development) / PostgreSQL (recommended for production)

### Nginx Configuration

Nginx serves as a reverse proxy:

- Serves frontend static files at root (`/`)
- Proxies API requests (`/api/*`) to backend on `localhost:8080`
- Handles SSL/TLS termination
- Redirects HTTP to HTTPS

Configuration file: `/etc/nginx/sites-available/desn`

### Deployment Steps

#### 1. Build Frontend

```bash
# Set production API URL and build
VITE_API_BASE_URL=https://desnepal.com npm run build

# Output will be in dist/ directory
```

#### 2. Deploy Frontend to Server

```bash
# Copy built files to server
scp -r dist/* ubuntu@13.204.228.199:/home/ubuntu/desn-app/frontend/dist/

# Or on the server, pull and rebuild:
cd /home/ubuntu/desn-app/frontend
git pull
VITE_API_BASE_URL=https://desnepal.com npm run build

# Ensure proper permissions
sudo chmod -R 755 /home/ubuntu/desn-app/frontend
```

#### 3. Build and Deploy Backend

```bash
# Build JAR file
cd backend
./mvnw clean package -DskipTests

# Copy to server
scp target/proxy-backend-*.jar ubuntu@13.204.228.199:/home/ubuntu/desn-app/backend/

# On server, restart the backend service
sudo systemctl restart desn-backend
# Or if running manually:
# java -jar /home/ubuntu/desn-app/backend/proxy-backend-*.jar
```

#### 4. Verify Deployment

```bash
# Check frontend
curl -I https://desnepal.com

# Check backend API
curl https://desnepal.com/api/resources

# Check SSL certificate
curl -vI https://desnepal.com 2>&1 | grep -i 'expire'
```

### Production Checklist

- [x] SSL certificate installed (Let's Encrypt)
- [x] HTTPS enabled and enforced
- [x] CORS configured for production domain
- [x] Environment variables set correctly
- [x] Frontend built with production API URL
- [ ] Khalti credentials updated to production keys
- [ ] PostgreSQL database configured (currently using H2)
- [ ] JWT secret set to secure random value
- [ ] Default admin password changed
- [ ] Email notifications configured
- [ ] Monitoring and logging set up
- [ ] Automated backups configured

### SSL Certificate Renewal

The Let's Encrypt certificate auto-renews via Certbot. To manually renew:

```bash
sudo certbot renew
sudo systemctl reload nginx
```

### Troubleshooting Production Issues

See [AWS_DEPLOYMENT_GUIDE.md](AWS_DEPLOYMENT_GUIDE.md) for detailed troubleshooting steps.

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Test thoroughly
4. Commit: `git commit -m "Add my feature"`
5. Push: `git push origin feature/my-feature`
6. Create a Pull Request

## 📄 License

[Your License Here]

## 🆘 Support

For issues or questions:

- Create an issue on GitHub
- Contact: [your-email@example.com]

---

**Built with ❤️ for DESN - Disabled Environment Service Nepal**
