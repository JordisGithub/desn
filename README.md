# DESN - Disabled Environment Service Nepal

Website for Disabled Environment Service Nepal, a non-profit organization supporting individuals with disabilities through education, employment, and advocacy programs.

## 🌐 Live Application

- **Canonical Domain**: https://desnepal.org
- **Legacy Domain Redirect**: https://desnepal.com → https://desnepal.org
- **API Base**: https://desnepal.org/api
- **Health Check**: https://desnepal.org/actuator/health

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

### 3. PostgreSQL Setup

```bash
# Install PostgreSQL 16 (macOS)
brew install postgresql@16
brew services start postgresql@16

# Create database and user
createdb desn
psql desn -c "CREATE USER desn_user WITH PASSWORD 'desn_password';"
psql desn -c "GRANT ALL PRIVILEGES ON DATABASE desn TO desn_user;"
psql desn -c "GRANT ALL ON SCHEMA public TO desn_user;"
```

### 4. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create .env file with database credentials
cat > .env << EOF
DATABASE_URL=jdbc:postgresql://localhost:5432/desn
DATABASE_USERNAME=desn_user
DATABASE_PASSWORD=desn_password
EOF

# Make mvnw executable (on Mac/Linux)
chmod +x ./mvnw

# Start Spring Boot application
./mvnw spring-boot:run
```

Backend API will be available at: **http://localhost:8080**

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **Health Check**: http://localhost:8080/actuator/health

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
VITE_API_BASE_URL=https://desnepal.org

# Build command example:
VITE_API_BASE_URL=https://desnepal.org npm run build
```

### Backend (Environment Variables)

The backend uses environment variables from a `.env` file:

#### Development (backend/.env)

```bash
# PostgreSQL Database
DATABASE_URL=jdbc:postgresql://localhost:5432/desn
DATABASE_USERNAME=desn_user
DATABASE_PASSWORD=desn_password

# JWT Configuration
JWT_SECRET=your-secure-secret-here
JWT_EXPIRATION=86400000

# Optional: Email notifications (set to false for development)
EMAIL_NOTIFICATIONS_ENABLED=false
```

#### Production (/home/ubuntu/desn-app/backend/.env)

Set these on your production server:

```bash
# PostgreSQL Database
DATABASE_URL=jdbc:postgresql://localhost:5432/desn
DATABASE_USERNAME=desn_user
DATABASE_PASSWORD=desn_password_2025

# JWT Security
JWT_SECRET=<secure-base64-secret>
JWT_EXPIRATION=86400000

# Khalti Payment Gateway (update with production keys)
KHALTI_PUBLIC_KEY=test_public_key
KHALTI_SECRET_KEY=test_secret_key

# Email Notifications (currently disabled)
EMAIL_NOTIFICATIONS_ENABLED=false

# Optional: Email Configuration
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=your-email@gmail.com
SPRING_MAIL_PASSWORD=your-app-password
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

- **Server**: Ubuntu 24.04.3 LTS on AWS EC2 t3.small (98.81.50.37)
- **Region**: ap-south-1 (Mumbai)
- **Instance**: Free tier eligible (750 hours/month free for 12 months)
- **Web Server**: Nginx 1.24.0 (reverse proxy)
- **Frontend**: React app served by Nginx from `/home/ubuntu/desn-app/frontend/`
- **Backend**: Spring Boot JAR running on port 8080
- **Database**: PostgreSQL 16 (localhost:5432/desn)
- **Cost**: Free (first year), then ~$15/month
- **SSH Access**: `ssh -i ~/.ssh/desn-app-key.pem ubuntu@98.81.50.37`

### Quick Deploy (Recommended)

```bash
# One-command deployment
./scripts/deploy-simple.sh
```

This script automatically:

1. Builds frontend with Vite
2. Builds backend with Maven
3. Uploads both to EC2 server
4. Restarts services

### Manual Deployment

See [scripts/README.md](scripts/README.md) for detailed deployment instructions.

#### Quick Manual Steps

```bash
# Build frontend
npm ci && npm run build

# Build backend
cd backend && ./mvnw clean package -DskipTests && cd ..

# Upload to server
scp -i ~/.ssh/desn-app-key.pem -r dist/* ubuntu@98.81.50.37:/home/ubuntu/desn-app/frontend/
scp -i ~/.ssh/desn-app-key.pem backend/target/proxy-backend-*.jar ubuntu@98.81.50.37:/home/ubuntu/desn-app/backend/app.jar

# Restart services
ssh -i ~/.ssh/desn-app-key.pem ubuntu@15.206.210.71 "sudo systemctl restart desn-backend && sudo systemctl reload nginx"
```

### Verify Deployment

```bash
# Check frontend
curl -I http://15.206.210.71

# Check backend health
curl http://15.206.210.71/actuator/health

# Check API
curl http://15.206.210.71/api/resources
```

### Production Checklist (Domain Migration Updated)

- [x] PostgreSQL database configured and running
- [x] JWT secret set to secure base64 value
- [x] Environment variables configured
- [x] Automated daily backups (2 AM UTC)
- [x] Firewall configured (UFW)
- [x] SSH key-based authentication
- [x] DNS A records desnepal.org / www.desnepal.org → 98.81.50.37
- [ ] SSL certificate (Let’s Encrypt) for desnepal.org + www
- [ ] Legacy desnepal.com permanent 301 redirect in Nginx
### Domain Migration Notes

- All public links should now reference `https://desnepal.org`.
- Configure Nginx to 301 redirect `desnepal.com` and `www.desnepal.com` to `https://desnepal.org`.
- After issuing new cert, submit updated sitemap to search engines.
- Monitor 404s and traffic for 2 weeks after cutover.

- [ ] Khalti credentials updated to production keys
- [ ] Default user passwords changed
- [ ] Email notifications configured (currently disabled)

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
