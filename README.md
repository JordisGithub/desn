# DESN - Disabled Environment Service Nepal# React + TypeScript + Vite

Website for Disabled Environment Service Nepal, a non-profit organization supporting individuals with disabilities through education, employment, and advocacy programs.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## 🚀 Quick Start for New DevelopersCurrently, two official plugins are available:

### Prerequisites- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- **Node.js** 18+ and npm

- **Java** 17+## React Compiler

- **Maven** 3.6+

- **Git**The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

### 1. Clone the Repository## Expanding the ESLint configuration

````bashIf you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

git clone https://github.com/JordisGithub/desn.git

cd desn```js

```export default defineConfig([

  globalIgnores(["dist"]),

### 2. Frontend Setup  {

    files: ["**/*.{ts,tsx}"],

```bash    extends: [

# Install dependencies      // Other configs...

npm install

      // Remove tseslint.configs.recommended and replace with this

# Start development server      tseslint.configs.recommendedTypeChecked,

npm run dev      // Alternatively, use this for stricter rules

```      tseslint.configs.strictTypeChecked,

      // Optionally, add this for stylistic rules

Frontend will be available at: **http://localhost:5175**      tseslint.configs.stylisticTypeChecked,



### 3. Backend Setup      // Other configs...

    ],

```bash    languageOptions: {

# Navigate to backend directory      parserOptions: {

cd backend        project: ["./tsconfig.node.json", "./tsconfig.app.json"],

        tsconfigRootDir: import.meta.dirname,

# Make mvnw executable (on Mac/Linux)      },

chmod +x ./mvnw      // other options...

    },

# Start Spring Boot application  },

./mvnw spring-boot:run]);

````

Backend API will be available at: **http://localhost:8080**## Local development - API key

### 4. Access the ApplicationThis project reads a development API key for protected POST/PUT/DELETE requests from an environment variable.

- **Website**: http://localhost:5175- For Vite (recommended), set `VITE_DEV_API_KEY` in your environment or a `.env` file at the project root:

- **API**: http://localhost:8080

- **H2 Database Console**: http://localhost:8080/h2-console```bash

  - JDBC URL: `jdbc:h2:mem:testdb`# .env

  - Username: `sa`VITE_DEV_API_KEY=your_dev_key_here

  - Password: `password````

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

### Frontend (.env)

```bash
# Optional: Development API key
VITE_DEV_API_KEY=your_dev_key_here
```

### Backend (Environment Variables)

```bash
# Database (for PostgreSQL in production)
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/desn_prod
SPRING_DATASOURCE_USERNAME=desn_user
SPRING_DATASOURCE_PASSWORD=secure_password

# Khalti Payment Gateway
KHALTI_PUBLIC_KEY=test_public_key_xxx
KHALTI_SECRET_KEY=test_secret_key_xxx
KHALTI_API_URL=https://a.khalti.com/api/v2

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:5175,https://desn.org.np

# Email Notifications (Optional)
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=your-email@gmail.com
SPRING_MAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@desn.org.np

# JWT Secret (Production)
JWT_SECRET=your-secure-secret-key-min-256-bits

# Storage Mode
STORAGE_MODE=database  # or "file" for development
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

## 🚀 Deployment

### Production Checklist

- [ ] Update Khalti credentials to production keys
- [ ] Configure PostgreSQL database
- [ ] Set secure JWT secret
- [ ] Update CORS allowed origins
- [ ] Enable HTTPS
- [ ] Change default admin password
- [ ] Set up email notifications
- [ ] Configure monitoring and logging
- [ ] Set up automated backups

See [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md) for detailed instructions.

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
