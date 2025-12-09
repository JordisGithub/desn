# DESN Maintenance & Migration Plan (Corrected Version)

**Last Updated:** December 2025  
**Version:** 2.0 (Corrected)  
**Status:** Verified against actual codebase

---

## Executive Summary

This document provides an accurate maintenance and migration plan for the **Disability Empowerment Society Nepal (DESN)** website based on the actual codebase implementation. All technical specifications, routes, and features listed in this document have been verified against the current implementation.

### Key Corrections from Previous Version

- **Technology Stack:** React 19 SPA with Vite (NOT Next.js 15)
- **Routes:** Accurate listing of all 16 actual routes (removed non-existent campaign pages)
- **Donate Page:** Correctly identified as placeholder/"coming soon" (not fully implemented)
- **Payment Integration:** Khalti payment gateway confirmed and documented
- **CMS:** No CMS exists; content updates require code changes
- **Backend:** Java Spring Boot 3.5.1 with PostgreSQL database

---

## Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [Current Architecture](#2-current-architecture)
3. [Routes & Pages](#3-routes--pages)
4. [Feature Status](#4-feature-status)
5. [Migration Phases](#5-migration-phases)
6. [Maintenance Plan](#6-maintenance-plan)
7. [Timeline & Budget](#7-timeline--budget)
8. [Risk Assessment](#8-risk-assessment)

---

## 1. Technology Stack

### Frontend (Verified from package.json)

| Technology            | Version              | Purpose                         |
| --------------------- | -------------------- | ------------------------------- |
| **React**             | 19.1.1               | UI framework (SPA architecture) |
| **Vite**              | rolldown-vite 7.1.14 | Build tool and dev server       |
| **TypeScript**        | 5.9.3                | Type-safe JavaScript            |
| **React Router DOM**  | 7.9.5                | Client-side routing             |
| **Material-UI (MUI)** | 7.3.5                | Component library               |
| **react-i18next**     | 16.2.4               | Multi-language support          |
| **Fuse.js**           | 6.6.2                | Fuzzy search functionality      |
| **@emotion**          | 11.14.0              | CSS-in-JS styling               |

### Backend (Verified from pom.xml)

| Technology          | Version    | Purpose                        |
| ------------------- | ---------- | ------------------------------ |
| **Spring Boot**     | 3.5.1      | Backend framework              |
| **Java**            | 21         | Programming language           |
| **PostgreSQL**      | (runtime)  | Relational database            |
| **Spring Security** | (included) | Authentication & authorization |
| **JWT (jjwt)**      | 0.12.3     | Token-based auth               |
| **Spring Data JPA** | (included) | Database ORM                   |
| **Spring Mail**     | (included) | Email functionality            |
| **Bucket4j**        | 8.7.0      | Rate limiting                  |
| **OWASP Encoder**   | 1.2.3      | HTML sanitization              |

### Accessibility & Testing

| Technology                 | Version | Purpose                  |
| -------------------------- | ------- | ------------------------ |
| **Vitest**                 | 4.0.8   | Testing framework        |
| **@testing-library/react** | 16.3.0  | Component testing        |
| **@axe-core/react**        | 4.11.0  | A11y testing (runtime)   |
| **@axe-core/cli**          | 4.10.3  | A11y testing (CI/CD)     |
| **jest-axe**               | 10.0.0  | Accessibility assertions |
| **Lighthouse**             | 12.0.0  | Performance & SEO audits |

### Payment Integration

| Technology                     | Purpose              | Status                                  |
| ------------------------------ | -------------------- | --------------------------------------- |
| **Khalti Payment Gateway**     | Online donations     | 🚧 Code Ready - Awaiting Khalti Account |
| **Custom Backend Integration** | Payment verification | ✅ Complete                             |

### Infrastructure & DevOps

| Technology | Purpose |
|------------|---------||
| **AWS** | Cloud hosting platform |
| **PostgreSQL** | SQL database |
| **Nginx** | Reverse proxy & static file serving |
| **Docker** | Containerization (Dockerfiles present) |
| **Maven** | Java build tool |
| **npm** | JavaScript package manager |

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

---

## 2. Current Architecture

### System Architecture

```
                        ┌─────────────────┐
                        │   Client        │
                        │   Browser       │
                        └────────┬────────┘
                                 │
                                 │ HTTPS
                                 │
                        ┌────────▼────────┐
                        │     Nginx       │
                        │  (Port 80/443)  │
                        └────────┬────────┘
                                 │
                 ┌───────────────┼───────────────┐
                 │               │               │
        ┌────────▼────────┐     │      ┌────────▼────────┐
        │   React SPA     │     │      │  Spring Boot    │
        │   (Port 5173)   │◄────┘      │  (Port 8081)    │
        │   Static Files  │             │   REST API      │
        └─────────────────┘             └────────┬────────┘
                                                 │
                                        ┌────────▼────────┐
                                        │   PostgreSQL    │
                                        │    Database     │
                                        └─────────────────┘
```

### Application Flow

1. **Static Assets:** Nginx serves React SPA build files
2. **API Requests:** `/api/*` proxied to Spring Boot backend
3. **Authentication:** JWT tokens stored in localStorage, validated by backend
4. **Database:** PostgreSQL stores users, events, resources, forms, payments
5. **Payments:** Khalti API integration for secure donation processing

### Key Directories

```
/Users/jordi/git/desn/
├── src/                          # React frontend source
│   ├── components/               # Reusable UI components
│   ├── views/                    # Page components
│   ├── services/                 # API & business logic
│   ├── contexts/                 # React Context (Auth, etc.)
│   ├── i18n/                     # Translation files (en, ne, mai, new)
│   ├── hooks/                    # Custom React hooks
│   ├── types/                    # TypeScript definitions
│   └── utils/                    # Helper functions
├── backend/                      # Spring Boot backend
│   └── src/main/java/com/example/proxy/
│       ├── controller/           # REST endpoints
│       ├── service/              # Business logic
│       ├── entity/               # JPA entities
│       ├── repository/           # Data access
│       ├── dto/                  # Data transfer objects
│       └── config/               # Security, CORS, etc.
├── public/                       # Static assets
│   ├── sitemap.xml               # SEO sitemap index
│   └── sitemap-*.xml             # Category sitemaps
├── docs/                         # Documentation
└── scripts/                      # Deployment & utility scripts
```

---

## 3. Routes & Pages

### Frontend Routes (Verified from App.tsx)

All routes use lazy loading for performance optimization.

#### Public Routes (10 routes - included in sitemap)

| Route            | Component                | Description                         | Priority     |
| ---------------- | ------------------------ | ----------------------------------- | ------------ |
| `/`              | Home                     | Landing page with mission statement | High (0.9)   |
| `/about`         | AboutUs                  | Organization history & team         | High (0.9)   |
| `/contact`       | Contact                  | Contact form & information          | High (0.9)   |
| `/accessibility` | AccessibilityStatement   | WCAG 2.2 AA compliance info         | High (0.9)   |
| `/programs`      | Programs                 | Education programs overview         | Medium (0.8) |
| `/get-involved`  | GetInvolved              | Volunteer & donation options        | Medium (0.8) |
| `/donate`        | **Donate (Placeholder)** | Shows "coming soon" message         | Medium (0.8) |
| `/events`        | Events                   | Community events listing            | Medium (0.7) |
| `/resources`     | Resources                | Educational resources               | Medium (0.7) |
| `/search`        | SearchResults            | Site-wide search                    | Low (0.5)    |

#### Authentication Routes (2 routes - excluded from sitemap)

| Route       | Component | Description           |
| ----------- | --------- | --------------------- |
| `/login`    | Login     | User authentication   |
| `/register` | Register  | New user registration |

#### Protected Routes (4 routes - excluded from sitemap)

| Route               | Component       | Description                 | Access Level      |
| ------------------- | --------------- | --------------------------- | ----------------- |
| `/owner/dashboard`  | OwnerDashboard  | Owner-level admin panel     | Owner only        |
| `/admin/dashboard`  | AdminDashboard  | Admin management interface  | Admin only        |
| `/member/dashboard` | MemberDashboard | Member profile & data       | Member only       |
| `/payment/verify`   | PaymentVerify   | Khalti payment verification | Public (callback) |

### Backend API Routes (Spring Boot)

**Base URL:** `http://localhost:8081/api`

#### Payment Endpoints

| Method | Endpoint                          | Description             | Auth Required |
| ------ | --------------------------------- | ----------------------- | ------------- |
| POST   | `/payment/initiate`               | Initiate Khalti payment | ❌            |
| GET    | `/payment/verify`                 | Verify payment status   | ❌            |
| GET    | `/payment/status/{transactionId}` | Get payment details     | ❌            |
| POST   | `/payment/webhook`                | Khalti webhook callback | ❌            |
| GET    | `/payment/transactions`           | List all transactions   | ✅ (Admin)    |

#### Resources Endpoints

| Method | Endpoint          | Description        | Auth Required |
| ------ | ----------------- | ------------------ | ------------- |
| GET    | `/resources`      | List all resources | ❌            |
| POST   | `/resources`      | Create resource    | ✅ (Admin)    |
| PUT    | `/resources/{id}` | Update resource    | ✅ (Admin)    |
| DELETE | `/resources/{id}` | Delete resource    | ✅ (Admin)    |

#### Events Endpoints

| Method | Endpoint       | Description     | Auth Required |
| ------ | -------------- | --------------- | ------------- |
| GET    | `/events`      | List all events | ❌            |
| POST   | `/events`      | Create event    | ✅ (Admin)    |
| PUT    | `/events/{id}` | Update event    | ✅ (Admin)    |
| DELETE | `/events/{id}` | Delete event    | ✅ (Admin)    |

#### Forms Endpoints

| Method | Endpoint            | Description            | Auth Required |
| ------ | ------------------- | ---------------------- | ------------- |
| POST   | `/forms/membership` | Submit membership form | ❌            |
| POST   | `/forms/volunteer`  | Submit volunteer form  | ❌            |

#### Authentication Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/auth/login`    | User login        |
| POST   | `/auth/register` | User registration |
| POST   | `/auth/refresh`  | Refresh JWT token |

---

## 4. Feature Status

### ✅ Fully Implemented Features

| Feature                         | Details                                                                                                                                | Documentation                             |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **Multi-language Support**      | 4 languages: English, Nepali, Maithili, Newari                                                                                         | `src/i18n/`                               |
| **Authentication System**       | JWT-based with 3 user roles (Owner, Admin, Member)                                                                                     | `docs/AUTHENTICATION.md`                  |
| **Khalti Payment Integration**  | Code complete - requires Khalti merchant account setup                                                                                 | `docs/KHALTI_PAYMENTS.md`                 |
| **Search Functionality**        | Fuzzy search using Fuse.js across all content                                                                                          | `src/services/SearchService.ts`           |
| **Accessibility (WCAG 2.2 AA)** | axe-core audits, keyboard navigation, ARIA labels                                                                                      | Multiple docs in root                     |
| **Events Management**           | CRUD operations with admin dashboard                                                                                                   | `docs/EVENTS.md`                          |
| **Resources Management**        | Multi-language educational resources                                                                                                   | `docs/RESOURCES.md`                       |
| **Contact Form**                | Email integration with validation                                                                                                      | `docs/FORMS.md`                           |
| **Membership Forms**            | Volunteer & membership applications                                                                                                    | `docs/FORMS.md`                           |
| **SEO Optimization**            | 5 sitemaps (sitemap.xml index + 4 categories: main, programs, content, utility), robots.txt, meta tags, Google Search Console verified | `SITEMAP_GUIDE.md`, `public/sitemap*.xml` |
| **Responsive Design**           | Mobile-first with MUI Grid system                                                                                                      | Throughout codebase                       |
| **Security Features**           | Rate limiting, CORS, CSRF, input sanitization                                                                                          | `docs/SECURITY.md`                        |

### 🚧 Partially Implemented Features

| Feature | Status | Details |
|---------|--------|---------||
| **Donate Page** | Placeholder only | Shows "Donate page coming soon" message |
| **Khalti Payment Gateway** | Code complete | Requires Khalti merchant account registration and API keys |
| **Payment History** | Backend ready | Frontend dashboard UI needs enhancement |

### ❌ Not Implemented (Features Claimed in Original Document)

| Feature                   | Status          | Explanation                                              |
| ------------------------- | --------------- | -------------------------------------------------------- |
| **Campaign Pages**        | Does not exist  | No `/urmfg` or campaign-specific routes                  |
| **CMS System**            | Does not exist  | Content updates require code deployment                  |
| **Separate Admin Portal** | Integrated only | Admin features are within main app at `/admin/dashboard` |
| **Analytics Dashboard**   | Not implemented | No analytics beyond payment transactions                 |

---

## 5. Migration Phases

### Phase 1: Repository Setup & Infrastructure Assessment (Week 1-2)

**Objective:** Clone repository to client AWS account and assess infrastructure

**Tasks:**

- [ ] Clone repository from `https://github.com/JordisGithub/desn` to client's GitHub/AWS CodeCommit
- [ ] Set up client AWS account access and permissions
- [ ] Provision AWS EC2/ECS resources for application hosting
- [ ] Set up AWS RDS PostgreSQL database instance
- [ ] Configure AWS security groups and networking
- [ ] Migrate database schema to client's PostgreSQL instance
- [ ] Review and configure AWS backup procedures
- [ ] Set up SSL certificate using AWS Certificate Manager
- [ ] Configure domain DNS for **desnepal.org** (domain transfer in progress)
- [ ] Configure domain DNS for **desnepal.com**
- [ ] Review nginx configuration files
- [ ] Document environment variables and AWS secrets

**Deliverables:**

- Cloned repository in client's AWS environment
- Configured PostgreSQL database
- Infrastructure setup documentation
- AWS resource inventory

### Phase 1.5: Khalti Payment Gateway Setup (Week 2)

**Objective:** Register for Khalti merchant account and configure payment integration

**Prerequisites:** Client must complete Khalti merchant registration

**Client Action Required:**

1. **Register for Khalti Merchant Account**

   - Visit: https://khalti.com/
   - Click "Merchant" or "For Business"
   - Complete merchant application form
   - Provide required documentation:
     - Organization registration certificate
     - PAN (Permanent Account Number)
     - Bank account details
     - Authorized signatory documents
   - Wait for Khalti verification (typically 2-5 business days)

2. **Get API Credentials**

   - Once approved, log in to Khalti Merchant Dashboard
   - Navigate to: Settings → API Keys
   - Copy **Test Public Key** and **Test Secret Key** (for development)
   - Copy **Live Public Key** and **Live Secret Key** (for production)
   - Store these securely - never commit to repository

3. **Test Environment Setup** (After receiving test keys)
   - Test merchant dashboard: https://test-admin.khalti.com
   - Use test credentials provided by Khalti
   - Test payment with test card: **5200 0000 0000 0007**
   - CVV: **123**, OTP: **987654**

**Developer Tasks (After client provides keys):**

- [ ] Configure test environment variables in AWS:
  ```bash
  KHALTI_PUBLIC_KEY=test_public_key_xxx
  KHALTI_SECRET_KEY=test_secret_key_xxx
  KHALTI_API_URL=https://a.khalti.com/api/v2
  APP_BASE_URL=https://desnepal.org
  ```
- [ ] Update backend configuration with Khalti credentials
- [ ] Test payment initiation flow
- [ ] Test payment verification flow
- [ ] Verify transaction recording in database
- [ ] Test error handling scenarios
- [ ] Document payment flow for client

**Production Deployment (After successful testing):**

- [ ] Switch to Live API keys in AWS production environment
- [ ] Update `APP_BASE_URL` to production domain
- [ ] Test real payment with small amount (NPR 10)
- [ ] Monitor first 10 transactions closely
- [ ] Set up payment notification alerts

**Support Notes:**

- Client should inform developer which parts of Khalti setup they can handle independently
- Developer available to assist with technical integration steps
- Khalti documentation: https://docs.khalti.com
- See `docs/KHALTI_PAYMENTS.md` for complete integration guide

**Deliverables:**

- Active Khalti merchant account
- Test and production API keys configured
- Successful test payment transaction
- Payment integration documentation

### Phase 2: Content Audit (Week 3-4)

**Objective:** Document all content and data

**Tasks:**

- [ ] Export all database content (events, resources, users)
- [ ] Catalog translated content (4 languages)
- [ ] Document payment transaction history
- [ ] Backup form submissions (membership, volunteer)
- [ ] Export media assets (images from `src/assets/`)
- [ ] Review sitemap coverage

**Deliverables:**

- Complete data export
- Content inventory spreadsheet
- Media assets backup

### Phase 3: Donate Page Implementation (Week 4-5)

**Priority:** HIGH - User-facing feature gap
**Dependency:** Requires completed Khalti setup from Phase 1.5

**Current State:** Placeholder component showing "coming soon"

**Tasks:**

- [ ] Design donate page UI/UX (consistent with site theme)
- [ ] Implement multi-language donation form
- [ ] Integrate with existing Khalti payment service
- [ ] Add donation amount presets (NPR 500, 1000, 5000, custom)
- [ ] Create donation impact messaging
- [ ] Add recurring donation option (if needed)
- [ ] Implement thank you page with receipt
- [ ] Test payment flow end-to-end

**Technical Requirements:**

```typescript
// Component location: src/views/Donate.tsx
- Use existing KhaltiPaymentService integration
- Follow DonationPaymentModal pattern from GetInvolved page
- Implement i18n for 4 languages
- Add accessibility features (WCAG 2.2 AA)
- Include SEO meta tags
```

**Deliverables:**

- Fully functional `/donate` page
- Updated sitemap with donate page priority 0.9
- Payment testing report
- User documentation

### Phase 4: Testing & Quality Assurance (Week 5-6)

**Objective:** Ensure system stability before migration

**Tasks:**

- [ ] Run full accessibility audit (`npm run test:a11y`)
- [ ] Execute unit tests (`npm run test`)
- [ ] Test payment flows in Khalti test environment
- [ ] Verify multi-language content accuracy
- [ ] Test authentication flows (login, register, JWT refresh)
- [ ] Validate admin dashboard CRUD operations
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness testing
- [ ] Load testing for backend APIs
- [ ] Security audit (XSS, CSRF, SQL injection prevention)

**Deliverables:**

- QA test report
- Bug tracking spreadsheet
- Performance metrics (Lighthouse scores)

### Phase 5: Domain Transfer & DNS Configuration (Week 6-7)

**Objective:** Complete domain transfers and configure DNS

**Domain Information:**

- **desnepal.org** - Being transferred to client (no cost to client)
- **desnepal.com** - Existing domain (maintain current registration)

**Tasks:**

- [ ] Complete desnepal.org domain transfer to client's registrar account
- [ ] Update desnepal.org nameservers to AWS Route 53
- [ ] Configure AWS Route 53 hosted zones for both domains
- [ ] Set up DNS records:
  - A record → AWS EC2/Load Balancer IP
  - CNAME for www subdomain
  - MX records for email (if applicable)
  - TXT records for domain verification
- [ ] Update desnepal.com DNS to point to AWS infrastructure
- [ ] Configure SSL certificates in AWS Certificate Manager for both domains
- [ ] Plan zero-downtime DNS cutover strategy
- [ ] Prepare rollback procedures
- [ ] Test DNS propagation

**Deliverables:**

- Both domains configured and pointing to AWS
- SSL certificates active
- DNS cutover runbook
- Rollback plan

### Phase 6: AWS Production Environment Setup (Week 7-8)

**Objective:** Configure production AWS environment

**Tasks:**

- [ ] Set up AWS production environment (separate from staging)
- [ ] Deploy frontend build to AWS S3 + CloudFront (or EC2)
- [ ] Deploy backend Spring Boot JAR to AWS EC2/ECS
- [ ] Configure production PostgreSQL RDS instance
- [ ] Set up nginx reverse proxy on EC2
- [ ] Configure AWS Certificate Manager SSL certificates
- [ ] Set production environment variables in AWS Systems Manager Parameter Store:
  - Khalti production API keys
  - JWT secrets
  - Database credentials
  - Email configuration
- [ ] Import production database data
- [ ] Configure AWS CloudWatch monitoring and alarms
- [ ] Set up AWS backup automation
- [ ] Verify all integrations

**Deliverables:**

- Production AWS environment fully configured
- Environment documentation
- Smoke test results
- AWS resource tagging and cost allocation

### Phase 7: Production Deployment (Week 8-9)

**Objective:** Deploy to AWS production and cutover domains

**Tasks:**

- [ ] Final database backup from current environment
- [ ] Enable maintenance mode on current site
- [ ] Deploy frontend to AWS S3/CloudFront or EC2
- [ ] Deploy backend JAR to AWS EC2/ECS
- [ ] Run database migrations on AWS RDS
- [ ] Update DNS records for desnepal.org and desnepal.com to AWS
- [ ] Verify AWS Certificate Manager SSL certificates are active
- [ ] Confirm Khalti production keys are configured
- [ ] Test all critical paths on new AWS infrastructure
- [ ] Monitor DNS propagation (24-48 hours)
- [ ] Disable maintenance mode
- [ ] Monitor AWS CloudWatch logs for 48 hours

**Deliverables:**

- Production deployment on AWS complete
- Both domains live on AWS infrastructure
- Post-deployment checklist
- AWS environment documentation

### Phase 8: Post-Deployment Validation (Week 9-10)

**Objective:** Ensure successful AWS deployment

**Tasks:**

- [ ] Verify all routes are accessible
- [ ] Test payment processing with real transaction
- [ ] Validate Google Search Console sitemap submission
- [ ] Check analytics and monitoring
- [ ] Test email notifications
- [ ] Verify backup automation
- [ ] Review server logs for errors
- [ ] Performance benchmarking

**Deliverables:**

- Validation report
- Performance comparison (before/after)
- User acceptance sign-off

### Phase 9: Documentation & Training (Week 10-11)

**Objective:** Enable team to maintain system

**Tasks:**

- [ ] Create admin user guide (events, resources management)
- [ ] Document AWS deployment procedures
- [ ] Document AWS infrastructure (EC2, RDS, S3, CloudFront)
- [ ] Write troubleshooting guide for AWS environment
- [ ] Create AWS backup/restore procedures
- [ ] Document Khalti payment configuration and testing
- [ ] Train team on content updates (requires code changes)
- [ ] Create incident response playbook
- [ ] Identify client capabilities and support needs
- [ ] Document what client can handle vs. what requires developer assistance

**Client Capability Assessment:**

- [ ] Client should communicate which tasks they're comfortable managing:
  - AWS console access and basic operations?
  - Database management and SQL queries?
  - Domain and DNS management?
  - Payment gateway configuration?
  - Content updates and deployments?
- [ ] Developer will provide ongoing support for areas client needs assistance

**Deliverables:**

- Administrator manual
- AWS operations guide
- Developer documentation
- Training session recording
- Support agreement based on client capabilities

### Phase 10: Monitoring & Optimization (Ongoing)

**Objective:** Continuous improvement

**Tasks:**

- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure error tracking (Sentry)
- [ ] Monitor payment transaction success rates
- [ ] Track Google Search Console metrics
- [ ] Review Lighthouse performance scores
- [ ] Monitor server resource usage
- [ ] Review security logs weekly
- [ ] Update dependencies quarterly

**Deliverables:**

- Monitoring dashboard
- Monthly performance reports
- Security audit schedule

---

## 6. Maintenance Plan

### Daily Maintenance

- **Monitor uptime** (automated alerts)
- **Check error logs** for backend and frontend
- **Verify payment transactions** are processing correctly

### Weekly Maintenance

- **Review security logs** for suspicious activity
- **Check form submissions** (membership, volunteer)
- **Backup database** (automated with manual verification)
- **Update content** (events, resources as needed)

### Monthly Maintenance

- **Dependency updates** (npm and Maven security patches)
- **Review Google Search Console** metrics
- **Analyze payment transaction trends**
- **Test backup restoration** procedures
- **Review accessibility compliance** (run axe audits)

### Quarterly Maintenance

- **Major dependency upgrades** (React, Spring Boot)
- **Security audit** (penetration testing)
- **Performance optimization** (Lighthouse audits)
- **Code review** and refactoring
- **Capacity planning** (server resources)

### Annual Maintenance

- **Complete system audit** (code, infrastructure, security)
- **SSL certificate renewal** (if not automated)
- **Disaster recovery drill** (full system restoration)
- **Technology stack evaluation** (consider upgrades)
- **User feedback survey** and UX improvements

### Content Management

**Important:** This site does NOT have a CMS. Content updates require code changes.

**Process for Content Updates:**

1. **Edit source files:**

   - Events: `src/data/events.json` or backend API
   - Resources: Backend database via admin dashboard
   - Translations: `src/i18n/locales/{language}/translation.json`
   - Static pages: React components in `src/views/`

2. **Test locally:**

   ```bash
   npm run dev  # Frontend
   cd backend && ./mvnw spring-boot:run  # Backend
   ```

3. **Build and deploy:**

   ```bash
   npm run build
   # Deploy dist/ to server
   ```

4. **Verify:**
   - Check all languages
   - Run accessibility tests
   - Verify sitemap regeneration

---

## 7. Timeline & Budget

### Project Timeline

| Phase | Duration | Dependencies |
|-------|----------|--------------||
| 1. Repository Setup & Infrastructure | 2 weeks | None |
| 1.5. Khalti Payment Gateway Setup | 1 week | Phase 1, Client Khalti registration |
| 2. Content Audit | 2 weeks | Phase 1 |
| 3. Donate Page Implementation | 2 weeks | Phase 1.5, Phase 2 |
| 4. Testing & QA | 2 weeks | Phase 3 |
| 5. Domain Transfer & DNS | 2 weeks | Phase 4 |
| 6. AWS Production Setup | 2 weeks | Phase 5 |
| 7. Production Deployment | 2 weeks | Phase 6 |
| 8. Post-Deployment Validation | 2 weeks | Phase 7 |
| 9. Documentation & Training | 2 weeks | Phase 8 |
| 10. Monitoring & Optimization | Ongoing | Phase 9 |

**Total Project Duration:** 14-16 weeks (3.5-4 months)

**Note:** Timeline assumes client Khalti registration completed within Phase 1.5 timeframe. Delays in Khalti merchant approval will extend overall timeline.

### Cost & Resource Model

#### Costs Covered (No Charge to Client)

| Item                    | Status                   | Notes                                               |
| ----------------------- | ------------------------ | --------------------------------------------------- |
| **desnepal.org Domain** | ✅ Transferred to client | Domain purchased and being transferred at no cost   |
| **Initial Codebase**    | ✅ Provided              | Full source code in GitHub repository               |
| **Documentation**       | ✅ Included              | Comprehensive technical documentation provided      |
| **Developer Support**   | 🤝 As needed             | Developer available to assist based on client needs |

#### Client Responsibilities (AWS Costs)

| Item                                 | Estimated Monthly Cost | Notes                                           |
| ------------------------------------ | ---------------------- | ----------------------------------------------- |
| **AWS EC2/ECS (Application Server)** | $20 - $100             | Depends on instance size (t3.small to t3.large) |
| **AWS RDS PostgreSQL**               | $15 - $75              | db.t3.micro to db.t3.small                      |
| **AWS S3 Storage**                   | $1 - $5                | For static assets and backups                   |
| **AWS CloudFront CDN**               | $0 - $20               | Optional, for better performance                |
| **AWS Certificate Manager**          | $0                     | Free SSL certificates                           |
| **AWS Route 53**                     | $1                     | DNS hosting (2 hosted zones)                    |
| **Data Transfer**                    | $5 - $20               | Bandwidth costs                                 |
| **AWS CloudWatch**                   | $0 - $10               | Monitoring and logs                             |
| **Total AWS Monthly**                | **$42 - $230**         | Depends on usage and configuration              |
| **Total AWS Annual**                 | **$504 - $2,760**      |                                                 |

#### Other Client Costs

| Item                         | Cost     | Frequency       | Notes                               |
| ---------------------------- | -------- | --------------- | ----------------------------------- |
| **desnepal.com Domain**      | ~$10-15  | Annual          | Client's existing domain            |
| **Khalti Transaction Fees**  | Variable | Per transaction | Standard Khalti merchant fees apply |
| **Email Service** (Optional) | $0 - $10 | Monthly         | If using external email service     |

### Client Capability Assessment

**The client should communicate which areas they can handle and where they need assistance:**

#### Technical Areas

- [ ] **AWS Console Management** - Can client create and manage AWS resources?
- [ ] **Database Administration** - Can client perform SQL queries and database maintenance?
- [ ] **Domain/DNS Management** - Can client configure DNS records and domain settings?
- [ ] **Server Deployment** - Can client deploy application updates?
- [ ] **Khalti Integration** - Can client complete merchant registration and API setup?
- [ ] **Git/GitHub** - Can client use version control for code updates?
- [ ] **Linux/Terminal** - Is client comfortable with command line operations?

#### Content Management

- [ ] **Code-based Updates** - Can client edit JSON/React files for content changes?
- [ ] **Admin Dashboard** - Can client use existing admin UI for events/resources?
- [ ] **Translation Management** - Can client update i18n translation files?

### Developer Support Model

**Developer (Jordi) will provide assistance in the following ways:**

1. **Technical Guidance** - Help with AWS setup, deployment, and configuration
2. **Troubleshooting** - Assist when issues arise
3. **Training** - Teach client team on aspects they want to learn
4. **Code Updates** - Help with features/changes client cannot implement themselves
5. **Emergency Support** - Available for critical issues

**Collaboration Approach:**

- Client should try tasks they feel comfortable with
- Developer will step in when needed
- Goal is to transfer knowledge and build client independence
- No fixed hourly rates - support provided as needed for this project

### Budget Notes

- **No development costs** to client for initial implementation
- **Only AWS infrastructure costs** which client controls
- **desnepal.org domain** provided at no cost
- Client has full control over AWS spending through instance sizing
- Can start with minimal AWS resources (~$50/month) and scale up as needed
- Developer support provided based on client needs assessment

---

## 8. Risk Assessment

### High Priority Risks

| Risk                         | Likelihood | Impact   | Mitigation                                                                |
| ---------------------------- | ---------- | -------- | ------------------------------------------------------------------------- |
| **Payment Gateway Downtime** | Low        | Critical | Implement health checks, fallback messaging, Khalti status monitoring     |
| **Database Corruption**      | Low        | Critical | Daily automated backups, point-in-time recovery, test restoration monthly |
| **Security Breach**          | Medium     | Critical | Regular security audits, dependency updates, WAF implementation           |
| **Domain/DNS Issues**        | Low        | High     | Document DNS settings, maintain registrar access, monitor expiration      |

### Medium Priority Risks

| Risk                           | Likelihood | Impact | Mitigation                                                   |
| ------------------------------ | ---------- | ------ | ------------------------------------------------------------ |
| **Server Overload**            | Medium     | High   | Implement rate limiting, CDN for static assets, load testing |
| **Dependency Vulnerabilities** | High       | Medium | Automated security scanning (Dependabot), monthly updates    |
| **Content Loss**               | Low        | Medium | Version control, database backups, CMS alternative planning  |
| **Translation Accuracy**       | Medium     | Medium | Native speaker review, community feedback mechanism          |

### Low Priority Risks

| Risk                       | Likelihood | Impact | Mitigation                                           |
| -------------------------- | ---------- | ------ | ---------------------------------------------------- |
| **SSL Certificate Expiry** | Low        | Medium | Let's Encrypt auto-renewal, monitoring alerts        |
| **Search Indexing Issues** | Medium     | Low    | Google Search Console monitoring, sitemap validation |
| **Browser Compatibility**  | Low        | Low    | Cross-browser testing, polyfills for older browsers  |

### Contingency Plans

#### Payment System Failure

1. Display maintenance message on donate page
2. Provide alternative payment methods (bank details)
3. Contact Khalti support immediately
4. Switch to backup payment gateway (if configured)

#### Database Failure

1. Restore from most recent backup (automated daily)
2. Verify data integrity
3. Notify users of any downtime
4. Investigate root cause
5. Implement additional monitoring

#### Server Outage

1. Activate static "under maintenance" page
2. Restore from server snapshot/backup
3. Communicate via social media
4. Post-mortem analysis
5. Implement redundancy if needed

---

## 9. Technical Debt & Future Improvements

### Current Technical Debt

1. **Donate Page Placeholder** - Priority: HIGH

   - Impact: Missing core user feature
   - Effort: 2 weeks
   - Status: Planned in Phase 3

2. **No CMS for Content Management** - Priority: MEDIUM

   - Impact: Content updates require developer intervention
   - Effort: 6-8 weeks
   - Options: Strapi, Contentful, or custom admin UI enhancement

3. **Limited Admin Dashboard Analytics** - Priority: LOW
   - Impact: Manual reporting for insights
   - Effort: 3-4 weeks
   - Options: Integrate Metabase, Grafana, or custom charts

### Recommended Future Enhancements

| Feature                        | Business Value                | Technical Effort      | Priority |
| ------------------------------ | ----------------------------- | --------------------- | -------- |
| **Recurring Donations**        | High - Sustainable funding    | Medium (2-3 weeks)    | High     |
| **Blog/News Section**          | Medium - Community engagement | Medium (3-4 weeks)    | Medium   |
| **Member Portal Enhancements** | Medium - Member retention     | High (6-8 weeks)      | Medium   |
| **Mobile App**                 | High - Accessibility          | Very High (12+ weeks) | Low      |
| **Video Content Integration**  | Medium - Storytelling         | Low (1 week)          | Low      |
| **Impact Dashboard (Public)**  | High - Transparency           | Medium (4 weeks)      | Medium   |

---

## 10. Key Contacts & Resources

### Technical Resources

- **Frontend Codebase:** `/Users/jordi/git/desn/src/`
- **Backend Codebase:** `/Users/jordi/git/desn/backend/`
- **Documentation:** `/Users/jordi/git/desn/docs/`
- **Deployment Scripts:** `/Users/jordi/git/desn/scripts/`

### Critical Documentation Files

| File                      | Purpose                    |
| ------------------------- | -------------------------- |
| `docs/KHALTI_PAYMENTS.md` | Payment integration guide  |
| `docs/AUTHENTICATION.md`  | Auth system documentation  |
| `docs/EVENTS.md`          | Events management          |
| `docs/RESOURCES.md`       | Resources management       |
| `docs/FORMS.md`           | Form submission handling   |
| `docs/SECURITY.md`        | Security best practices    |
| `SITEMAP_GUIDE.md`        | SEO and sitemap management |
| `README.md`               | Project setup and overview |

### External Services

- **Khalti Payment Gateway:** https://khalti.com/
  - Test Admin: https://test-admin.khalti.com
  - Production Admin: https://admin.khalti.com
  - Documentation: https://docs.khalti.com
  - **Status:** Client needs to register for merchant account
- **Google Search Console:** https://search.google.com/search-console
  - **Status:** Currently verified for desnepal.com via DNS
  - Sitemap submitted: https://desnepal.com/sitemap.xml (16 pages indexed)
- **Domains:**
  - **desnepal.org** - Being transferred to client (no cost)
  - **desnepal.com** - Client's existing domain
- **AWS Services:**
  - AWS Console: https://console.aws.amazon.com
  - AWS Documentation: https://docs.aws.amazon.com

### Technology Documentation

- **React:** https://react.dev/
- **Vite:** https://vitejs.dev/
- **Spring Boot:** https://spring.io/projects/spring-boot
- **Material-UI:** https://mui.com/
- **PostgreSQL:** https://www.postgresql.org/docs/

---

## Appendix A: Environment Variables

### Frontend (.env)

```bash
# API Configuration
VITE_API_BASE_URL=https://desnepal.org/api

# Feature Flags
VITE_ENABLE_ANALYTICS=false

# Khalti (Public Key Only - provided after merchant registration)
VITE_KHALTI_PUBLIC_KEY=live_public_key_xxx  # Production
# VITE_KHALTI_PUBLIC_KEY=test_public_key_xxx  # Testing
```

### Backend (application.properties or .env)

**Recommended:** Store in AWS Systems Manager Parameter Store (encrypted)

```properties
# Server
server.port=8081

# Database (AWS RDS)
spring.datasource.url=jdbc:postgresql://your-db.xxxxx.us-east-1.rds.amazonaws.com:5432/desn_db
spring.datasource.username=desn_user
spring.datasource.password=SECURE_AWS_RDS_PASSWORD

# JWT
jwt.secret=SECURE_JWT_SECRET_KEY_AT_LEAST_32_CHARS
jwt.expiration=86400000

# Khalti (Obtain from https://khalti.com/ after merchant registration)
# TEST ENVIRONMENT:
# khalti.secret.key=test_secret_key_xxx
# khalti.public.key=test_public_key_xxx
# PRODUCTION ENVIRONMENT:
khalti.secret.key=live_secret_key_xxx
khalti.public.key=live_public_key_xxx
khalti.api.url=https://a.khalti.com/api/v2
app.base.url=https://desnepal.org

# Email
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=info@desnepal.org
spring.mail.password=GMAIL_APP_PASSWORD
```

### AWS Systems Manager Parameter Store (Recommended)

Store sensitive values as encrypted parameters:

```bash
# Database
/desn/production/db-url
/desn/production/db-username
/desn/production/db-password

# JWT
/desn/production/jwt-secret

# Khalti
/desn/production/khalti-secret-key
/desn/production/khalti-public-key

# Email
/desn/production/email-password
```

---

## Appendix B: Deployment Checklist

### Pre-Deployment

- [ ] Run all tests (`npm run test`, `./mvnw test`)
- [ ] Run accessibility audit (`npm run test:a11y`)
- [ ] Build production frontend (`npm run build`)
- [ ] Build backend JAR (`./mvnw clean package`)
- [ ] Update environment variables in AWS Parameter Store
- [ ] Switch Khalti to production keys (after client provides them)
- [ ] Backup current RDS database snapshot
- [ ] Tag release in Git (`git tag v1.x.x`)
- [ ] Push to client's repository

### AWS Deployment

#### Frontend Deployment (Option A: S3 + CloudFront)

- [ ] Upload frontend build to S3 bucket: `aws s3 sync dist/ s3://desn-frontend/`
- [ ] Invalidate CloudFront cache: `aws cloudfront create-invalidation --distribution-id XXX --paths "/*"`
- [ ] Verify site loads: https://desnepal.org

#### Frontend Deployment (Option B: EC2 with Nginx)

- [ ] SSH into EC2: `ssh -i desn-key.pem ec2-user@your-ec2-ip`
- [ ] Upload build: `scp -r dist/* ec2-user@your-ec2-ip:/var/www/desn/`
- [ ] Update nginx configuration: `/etc/nginx/sites-available/desn.conf`
- [ ] Test nginx config: `sudo nginx -t`
- [ ] Reload nginx: `sudo systemctl reload nginx`

#### Backend Deployment (EC2 or ECS)

- [ ] Upload backend JAR to EC2: `scp target/*.jar ec2-user@your-ec2-ip:/opt/desn/`
- [ ] Run database migrations (if any): `java -jar desn-backend.jar --migrate`
- [ ] Stop existing backend: `sudo systemctl stop desn-backend`
- [ ] Start new backend: `sudo systemctl start desn-backend`
- [ ] Verify backend health: `curl http://localhost:8081/actuator/health`
- [ ] Check logs: `sudo journalctl -u desn-backend -f`

### Post-Deployment

- [ ] Verify SSL certificate is active on both domains
- [ ] Test all critical paths (login, donate, contact form)
- [ ] Verify payment flow with test transaction (NPR 10)
- [ ] Check Google Search Console sitemap status
- [ ] Clear CDN/CloudFront cache

### Post-Deployment

- [ ] Smoke test all critical paths
- [ ] Verify payment processing
- [ ] Check error logs
- [ ] Test authentication flows
- [ ] Verify sitemap accessibility
- [ ] Monitor performance (Lighthouse)
- [ ] Update status page

---

## Appendix C: Google Search Console & SEO

### Sitemap Structure

The site uses an organized sitemap index structure for optimal SEO:

**Sitemap Index** (`public/sitemap.xml`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://desnepal.org/sitemap-main.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://desnepal.org/sitemap-programs.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://desnepal.org/sitemap-content.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://desnepal.org/sitemap-utility.xml</loc>
  </sitemap>
</sitemapindex>
```

**Category Sitemaps:**

1. **sitemap-main.xml** (Priority: 0.9, Change Frequency: daily)

   - `/` (Home)
   - `/about` (About Us)
   - `/contact` (Contact)
   - `/accessibility` (Accessibility Statement)

2. **sitemap-programs.xml** (Priority: 0.8, Change Frequency: weekly)

   - `/programs` (Programs Overview)
   - `/get-involved` (Volunteer & Donate)
   - `/donate` (Donate Page - once implemented)

3. **sitemap-content.xml** (Priority: 0.7, Change Frequency: weekly)

   - `/events` (Events Listing)
   - `/resources` (Educational Resources)

4. **sitemap-utility.xml** (Priority: 0.5, Change Frequency: monthly)
   - `/search` (Search Results)

**Excluded from Sitemap** (Authentication & Admin routes):

- `/login`
- `/register`
- `/owner/dashboard`
- `/admin/dashboard`
- `/member/dashboard`
- `/payment/verify` (Khalti callback)

### Google Search Console Setup

**Current Status:**

- ✅ Domain verified via DNS (TXT record)
- ✅ Sitemap submitted: `https://desnepal.com/sitemap.xml`
- ✅ Status: Success - 16 pages discovered

**After Domain Transfer to desnepal.org:**

1. **Add New Property:**

   - Go to: https://search.google.com/search-console
   - Click "Add Property"
   - Enter: `desnepal.org`
   - Verify via DNS TXT record (recommended)

2. **Submit Sitemaps:**

   - Submit only the index: `https://desnepal.org/sitemap.xml`
   - Do NOT submit individual category sitemaps (index handles them)

3. **Monitor Indexing:**
   - Check "Pages" report for indexing status
   - Review "Coverage" for any errors
   - Monitor "Performance" for search analytics

### Sitemap Regeneration

Sitemaps are automatically regenerated on every build:

```bash
npm run build  # Runs generate:sitemap then builds frontend
```

Manual regeneration:

```bash
npm run generate:sitemap
```

See `SITEMAP_GUIDE.md` for complete documentation.

## Appendix D: Troubleshooting Common Issues

### Issue: Payment Initiation Fails

**Symptoms:** Error message on donation form, no redirect to Khalti

**Solution:**

1. Check backend logs: `cd backend && ./mvnw spring-boot:run | grep -i payment`
2. Verify environment variables: `echo $KHALTI_SECRET_KEY`
3. Test Khalti API connectivity
4. Ensure amount is within limits (1-1,000,000 NPR)

### Issue: Site Not Loading

**Symptoms:** 502 Bad Gateway or connection refused

**Solution:**

1. Check backend is running: `curl http://localhost:8081/actuator/health`
2. Verify nginx configuration: `sudo nginx -t`
3. Check server logs: `tail -f /var/log/nginx/error.log`
4. Restart services if needed

### Issue: Translation Missing

**Symptoms:** Text shows as translation keys (e.g., `home.title`)

**Solution:**

1. Verify translation file exists: `src/i18n/locales/{language}/translation.json`
2. Check key exists in translation file
3. Rebuild frontend: `npm run build`
4. Clear browser cache

### Issue: Database Connection Failed

**Symptoms:** Backend logs show connection errors

**Solution:**

1. Verify AWS RDS instance is running in AWS Console
2. Check RDS security group allows inbound traffic from EC2 instance
3. Verify connection string in `application.properties` or AWS Parameter Store
4. Test connection from EC2: `psql -h your-db.xxxxx.rds.amazonaws.com -U desn_user -d desn_db`
5. Check RDS publicly accessible setting if connecting externally
6. Verify VPC and subnet configuration

### Issue: Khalti Payment Not Working

**Symptoms:** Error when initiating payment, or payment verification fails

**Solution:**

1. Verify Khalti merchant account is approved and active
2. Check API keys are correctly configured:
   ```bash
   # On EC2:
   echo $KHALTI_SECRET_KEY
   ```
3. Ensure using correct keys (test vs. production)
4. Verify `app.base.url` matches actual domain (https://desnepal.org)
5. Check backend logs for Khalti API responses
6. Test with Khalti test card: 5200 0000 0000 0007
7. Contact Khalti support if keys are valid but integration fails

### Issue: AWS Deployment Fails

**Symptoms:** Application not starting on EC2, or errors in CloudWatch logs

**Solution:**

1. Check EC2 instance has sufficient memory/CPU
2. Verify Java 21 is installed: `java -version`
3. Check application logs: `sudo journalctl -u desn-backend -n 100`
4. Verify all environment variables are set
5. Check security group allows inbound traffic on port 8081
6. Ensure backend JAR has execute permissions: `chmod +x desn-backend.jar`
7. Test backend directly: `curl http://localhost:8081/actuator/health`

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------||
| 1.0 | Dec 8, 2024 | Original PM | Initial draft (contained inaccuracies) |
| 2.0 | Dec 2025 | Corrected | Complete rewrite based on actual codebase verification |

---

## Approval Signatures

| Role                      | Name               | Signature          | Date       |
| ------------------------- | ------------------ | ------------------ | ---------- |
| **Technical Lead**        | **\*\***\_**\*\*** | **\*\***\_**\*\*** | **\_\_\_** |
| **Project Manager**       | **\*\***\_**\*\*** | **\*\***\_**\*\*** | **\_\_\_** |
| **Organization Director** | **\*\***\_**\*\*** | **\*\***\_**\*\*** | **\_\_\_** |

---

**End of Document**
