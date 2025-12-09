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

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | UI framework (SPA architecture) |
| **Vite** | rolldown-vite 7.1.14 | Build tool and dev server |
| **TypeScript** | 5.9.3 | Type-safe JavaScript |
| **React Router DOM** | 7.9.5 | Client-side routing |
| **Material-UI (MUI)** | 7.3.5 | Component library |
| **react-i18next** | 16.2.4 | Multi-language support |
| **Fuse.js** | 6.6.2 | Fuzzy search functionality |
| **@emotion** | 11.14.0 | CSS-in-JS styling |

### Backend (Verified from pom.xml)

| Technology | Version | Purpose |
|------------|---------|---------|
| **Spring Boot** | 3.5.1 | Backend framework |
| **Java** | 21 | Programming language |
| **PostgreSQL** | (runtime) | Relational database |
| **Spring Security** | (included) | Authentication & authorization |
| **JWT (jjwt)** | 0.12.3 | Token-based auth |
| **Spring Data JPA** | (included) | Database ORM |
| **Spring Mail** | (included) | Email functionality |
| **Bucket4j** | 8.7.0 | Rate limiting |
| **OWASP Encoder** | 1.2.3 | HTML sanitization |

### Accessibility & Testing

| Technology | Version | Purpose |
|------------|---------|---------|
| **Vitest** | 4.0.8 | Testing framework |
| **@testing-library/react** | 16.3.0 | Component testing |
| **@axe-core/react** | 4.11.0 | A11y testing (runtime) |
| **@axe-core/cli** | 4.10.3 | A11y testing (CI/CD) |
| **jest-axe** | 10.0.0 | Accessibility assertions |
| **Lighthouse** | 12.0.0 | Performance & SEO audits |

### Payment Integration

| Technology | Purpose | Status |
|------------|---------|--------|
| **Khalti Payment Gateway** | Online donations | ✅ Implemented |
| **Custom Backend Integration** | Payment verification | ✅ Complete |

### Infrastructure & DevOps

| Technology | Purpose |
|------------|---------|
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

| Route | Component | Description | Priority |
|-------|-----------|-------------|----------|
| `/` | Home | Landing page with mission statement | High (0.9) |
| `/about` | AboutUs | Organization history & team | High (0.9) |
| `/contact` | Contact | Contact form & information | High (0.9) |
| `/accessibility` | AccessibilityStatement | WCAG 2.2 AA compliance info | High (0.9) |
| `/programs` | Programs | Education programs overview | Medium (0.8) |
| `/get-involved` | GetInvolved | Volunteer & donation options | Medium (0.8) |
| `/donate` | **Donate (Placeholder)** | Shows "coming soon" message | Medium (0.8) |
| `/events` | Events | Community events listing | Medium (0.7) |
| `/resources` | Resources | Educational resources | Medium (0.7) |
| `/search` | SearchResults | Site-wide search | Low (0.5) |

#### Authentication Routes (2 routes - excluded from sitemap)

| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | Login | User authentication |
| `/register` | Register | New user registration |

#### Protected Routes (4 routes - excluded from sitemap)

| Route | Component | Description | Access Level |
|-------|-----------|-------------|--------------|
| `/owner/dashboard` | OwnerDashboard | Owner-level admin panel | Owner only |
| `/admin/dashboard` | AdminDashboard | Admin management interface | Admin only |
| `/member/dashboard` | MemberDashboard | Member profile & data | Member only |
| `/payment/verify` | PaymentVerify | Khalti payment verification | Public (callback) |

### Backend API Routes (Spring Boot)

**Base URL:** `http://localhost:8081/api`

#### Payment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/payment/initiate` | Initiate Khalti payment | ❌ |
| GET | `/payment/verify` | Verify payment status | ❌ |
| GET | `/payment/status/{transactionId}` | Get payment details | ❌ |
| POST | `/payment/webhook` | Khalti webhook callback | ❌ |
| GET | `/payment/transactions` | List all transactions | ✅ (Admin) |

#### Resources Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/resources` | List all resources | ❌ |
| POST | `/resources` | Create resource | ✅ (Admin) |
| PUT | `/resources/{id}` | Update resource | ✅ (Admin) |
| DELETE | `/resources/{id}` | Delete resource | ✅ (Admin) |

#### Events Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/events` | List all events | ❌ |
| POST | `/events` | Create event | ✅ (Admin) |
| PUT | `/events/{id}` | Update event | ✅ (Admin) |
| DELETE | `/events/{id}` | Delete event | ✅ (Admin) |

#### Forms Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/forms/membership` | Submit membership form | ❌ |
| POST | `/forms/volunteer` | Submit volunteer form | ❌ |

#### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login |
| POST | `/auth/register` | User registration |
| POST | `/auth/refresh` | Refresh JWT token |

---

## 4. Feature Status

### ✅ Fully Implemented Features

| Feature | Details | Documentation |
|---------|---------|---------------|
| **Multi-language Support** | 4 languages: English, Nepali, Maithili, Newari | `src/i18n/` |
| **Authentication System** | JWT-based with 3 user roles (Owner, Admin, Member) | `docs/AUTHENTICATION.md` |
| **Khalti Payment Integration** | Complete donation flow with verification | `docs/KHALTI_PAYMENTS.md` |
| **Search Functionality** | Fuzzy search using Fuse.js across all content | `src/services/SearchService.ts` |
| **Accessibility (WCAG 2.2 AA)** | axe-core audits, keyboard navigation, ARIA labels | Multiple docs in root |
| **Events Management** | CRUD operations with admin dashboard | `docs/EVENTS.md` |
| **Resources Management** | Multi-language educational resources | `docs/RESOURCES.md` |
| **Contact Form** | Email integration with validation | `docs/FORMS.md` |
| **Membership Forms** | Volunteer & membership applications | `docs/FORMS.md` |
| **SEO Optimization** | 5 sitemaps, robots.txt, meta tags | `SITEMAP_GUIDE.md` |
| **Responsive Design** | Mobile-first with MUI Grid system | Throughout codebase |
| **Security Features** | Rate limiting, CORS, CSRF, input sanitization | `docs/SECURITY.md` |

### 🚧 Partially Implemented Features

| Feature | Status | Details |
|---------|--------|---------|
| **Donate Page** | Placeholder only | Shows "Donate page coming soon" message |
| **Payment History** | Backend ready | Frontend dashboard UI needs enhancement |

### ❌ Not Implemented (Features Claimed in Original Document)

| Feature | Status | Explanation |
|---------|--------|-------------|
| **Campaign Pages** | Does not exist | No `/urmfg` or campaign-specific routes |
| **CMS System** | Does not exist | Content updates require code deployment |
| **Separate Admin Portal** | Integrated only | Admin features are within main app at `/admin/dashboard` |
| **Analytics Dashboard** | Not implemented | No analytics beyond payment transactions |

---

## 5. Migration Phases

### Phase 1: Infrastructure Assessment (Week 1-2)

**Objective:** Evaluate current hosting and infrastructure

**Tasks:**
- [ ] Identify current hosting provider (AWS/Vercel/DigitalOcean/other)
- [ ] Document server specifications and costs
- [ ] Review database backup procedures
- [ ] Assess SSL certificate management
- [ ] Evaluate domain DNS configuration (desn.org.np)
- [ ] Review nginx configuration files
- [ ] Document environment variables and secrets

**Deliverables:**
- Infrastructure audit report
- Current hosting cost analysis
- Risk assessment document

### Phase 2: Content Audit (Week 2-3)

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

### Phase 3: Donate Page Implementation (Week 3-4)

**Priority:** HIGH - User-facing feature gap

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

### Phase 4: Testing & Quality Assurance (Week 4-5)

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

### Phase 5: Migration Planning (Week 5-6)

**Objective:** Prepare detailed migration strategy

**Tasks:**
- [ ] Select target hosting provider (if migrating)
- [ ] Design zero-downtime migration approach
- [ ] Create database migration scripts
- [ ] Plan DNS cutover strategy
- [ ] Prepare rollback procedures
- [ ] Document new environment setup
- [ ] Create deployment automation scripts

**Deliverables:**
- Migration runbook
- Rollback plan
- Cost comparison analysis

### Phase 6: Staging Environment Setup (Week 6-7)

**Objective:** Create production-like test environment

**Tasks:**
- [ ] Provision staging server infrastructure
- [ ] Deploy frontend build to staging
- [ ] Deploy backend Spring Boot application
- [ ] Configure PostgreSQL database
- [ ] Set up nginx reverse proxy
- [ ] Configure SSL certificates (Let's Encrypt)
- [ ] Set environment variables (Khalti test keys)
- [ ] Import test database snapshot
- [ ] Verify all integrations

**Deliverables:**
- Functioning staging environment
- Environment configuration documentation
- Smoke test results

### Phase 7: Migration Execution (Week 8)

**Objective:** Migrate to new infrastructure (if applicable)

**Tasks:**
- [ ] Final database backup
- [ ] Enable maintenance mode
- [ ] Deploy to production environment
- [ ] Run database migrations
- [ ] Update DNS records (if provider change)
- [ ] Verify SSL certificates
- [ ] Switch Khalti to production keys
- [ ] Test all critical paths
- [ ] Disable maintenance mode
- [ ] Monitor error logs for 24 hours

**Deliverables:**
- Migration completion report
- Production environment documentation
- Post-migration checklist

### Phase 8: Post-Migration Validation (Week 8-9)

**Objective:** Ensure successful migration

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

### Phase 9: Documentation & Training (Week 9-10)

**Objective:** Enable team to maintain system

**Tasks:**
- [ ] Create admin user guide (events, resources management)
- [ ] Document deployment procedures
- [ ] Write troubleshooting guide
- [ ] Create backup/restore procedures
- [ ] Document Khalti payment configuration
- [ ] Train team on content updates (requires code changes)
- [ ] Create incident response playbook

**Deliverables:**
- Administrator manual
- Developer documentation
- Training session recording

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
|-------|----------|--------------|
| 1. Infrastructure Assessment | 2 weeks | None |
| 2. Content Audit | 1 week | Phase 1 |
| 3. Donate Page Implementation | 2 weeks | Phase 2 |
| 4. Testing & QA | 2 weeks | Phase 3 |
| 5. Migration Planning | 1 week | Phase 4 |
| 6. Staging Setup | 1 week | Phase 5 |
| 7. Migration Execution | 1 week | Phase 6 |
| 8. Post-Migration Validation | 1 week | Phase 7 |
| 9. Documentation & Training | 2 weeks | Phase 8 |
| 10. Monitoring & Optimization | Ongoing | Phase 9 |

**Total Project Duration:** 10-12 weeks (2.5-3 months)

### Estimated Budget (USD)

#### One-Time Costs

| Item | Cost Range | Notes |
|------|------------|-------|
| **Infrastructure Migration** | $0 - $2,000 | If changing hosting providers |
| **Developer Time (Donate Page)** | $2,000 - $4,000 | 40-80 hours @ $50-100/hr |
| **QA & Testing** | $1,000 - $2,000 | Comprehensive testing |
| **Documentation & Training** | $1,000 - $1,500 | Admin guides, training sessions |
| **Security Audit** | $500 - $1,500 | Penetration testing |
| **Buffer (20%)** | $900 - $2,200 | Contingency |
| **Total One-Time** | **$5,400 - $13,200** | |

#### Monthly Recurring Costs

| Item | Cost Range | Notes |
|------|------------|-------|
| **Server Hosting** | $50 - $200 | VPS or cloud hosting |
| **Database** | $0 - $50 | PostgreSQL (often included in hosting) |
| **Domain Registration** | $1 - $2 | desn.org.np annual / 12 |
| **SSL Certificate** | $0 | Let's Encrypt (free) |
| **Email Service** | $0 - $10 | Gmail SMTP or SendGrid |
| **Backup Storage** | $5 - $20 | Database backups |
| **Monitoring Tools** | $0 - $50 | Uptime, error tracking |
| **Maintenance (Developer)** | $200 - $500 | 4-10 hours/month |
| **Total Monthly** | **$256 - $832** | |
| **Total Annual** | **$3,072 - $9,984** | |

### Budget Assumptions

- Existing hosting is maintained (no provider change)
- Developer rates: $50-100/hour
- Using open-source tools where possible
- Nepal-based developers (lower rates) could reduce costs by 40-60%

---

## 8. Risk Assessment

### High Priority Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Payment Gateway Downtime** | Low | Critical | Implement health checks, fallback messaging, Khalti status monitoring |
| **Database Corruption** | Low | Critical | Daily automated backups, point-in-time recovery, test restoration monthly |
| **Security Breach** | Medium | Critical | Regular security audits, dependency updates, WAF implementation |
| **Domain/DNS Issues** | Low | High | Document DNS settings, maintain registrar access, monitor expiration |

### Medium Priority Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **Server Overload** | Medium | High | Implement rate limiting, CDN for static assets, load testing |
| **Dependency Vulnerabilities** | High | Medium | Automated security scanning (Dependabot), monthly updates |
| **Content Loss** | Low | Medium | Version control, database backups, CMS alternative planning |
| **Translation Accuracy** | Medium | Medium | Native speaker review, community feedback mechanism |

### Low Priority Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| **SSL Certificate Expiry** | Low | Medium | Let's Encrypt auto-renewal, monitoring alerts |
| **Search Indexing Issues** | Medium | Low | Google Search Console monitoring, sitemap validation |
| **Browser Compatibility** | Low | Low | Cross-browser testing, polyfills for older browsers |

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

| Feature | Business Value | Technical Effort | Priority |
|---------|----------------|------------------|----------|
| **Recurring Donations** | High - Sustainable funding | Medium (2-3 weeks) | High |
| **Blog/News Section** | Medium - Community engagement | Medium (3-4 weeks) | Medium |
| **Member Portal Enhancements** | Medium - Member retention | High (6-8 weeks) | Medium |
| **Mobile App** | High - Accessibility | Very High (12+ weeks) | Low |
| **Video Content Integration** | Medium - Storytelling | Low (1 week) | Low |
| **Impact Dashboard (Public)** | High - Transparency | Medium (4 weeks) | Medium |

---

## 10. Key Contacts & Resources

### Technical Resources

- **Frontend Codebase:** `/Users/jordi/git/desn/src/`
- **Backend Codebase:** `/Users/jordi/git/desn/backend/`
- **Documentation:** `/Users/jordi/git/desn/docs/`
- **Deployment Scripts:** `/Users/jordi/git/desn/scripts/`

### Critical Documentation Files

| File | Purpose |
|------|---------|
| `docs/KHALTI_PAYMENTS.md` | Payment integration guide |
| `docs/AUTHENTICATION.md` | Auth system documentation |
| `docs/EVENTS.md` | Events management |
| `docs/RESOURCES.md` | Resources management |
| `docs/FORMS.md` | Form submission handling |
| `docs/SECURITY.md` | Security best practices |
| `SITEMAP_GUIDE.md` | SEO and sitemap management |
| `README.md` | Project setup and overview |

### External Services

- **Khalti Payment Gateway:** https://khalti.com/
  - Test Admin: https://test-admin.khalti.com
  - Production Admin: https://admin.khalti.com
  - Documentation: https://docs.khalti.com
- **Google Search Console:** https://search.google.com/search-console
- **Domain Registrar:** (To be documented - check DNS records)

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
VITE_API_BASE_URL=http://localhost:8081/api

# Feature Flags
VITE_ENABLE_ANALYTICS=false

# Khalti (Public Key Only)
VITE_KHALTI_PUBLIC_KEY=test_public_key_xxx
```

### Backend (application.properties or .env)

```properties
# Server
server.port=8081

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/desn_db
spring.datasource.username=desn_user
spring.datasource.password=SECURE_PASSWORD

# JWT
jwt.secret=SECURE_JWT_SECRET_KEY
jwt.expiration=86400000

# Khalti
khalti.secret.key=test_secret_key_xxx
khalti.public.key=test_public_key_xxx
khalti.api.url=https://a.khalti.com/api/v2
app.base.url=http://localhost:5173

# Email
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=desn@example.com
spring.mail.password=GMAIL_APP_PASSWORD
```

---

## Appendix B: Deployment Checklist

### Pre-Deployment

- [ ] Run all tests (`npm run test`, `./mvnw test`)
- [ ] Build production frontend (`npm run build`)
- [ ] Build backend JAR (`./mvnw clean package`)
- [ ] Update environment variables for production
- [ ] Switch Khalti to production keys
- [ ] Backup current database
- [ ] Tag release in Git (`git tag v1.x.x`)

### Deployment

- [ ] Upload frontend build to server (`dist/`)
- [ ] Deploy backend JAR to application server
- [ ] Run database migrations
- [ ] Update nginx configuration
- [ ] Reload nginx (`sudo nginx -s reload`)
- [ ] Verify SSL certificate
- [ ] Clear CDN cache (if applicable)

### Post-Deployment

- [ ] Smoke test all critical paths
- [ ] Verify payment processing
- [ ] Check error logs
- [ ] Test authentication flows
- [ ] Verify sitemap accessibility
- [ ] Monitor performance (Lighthouse)
- [ ] Update status page

---

## Appendix C: Troubleshooting Common Issues

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
1. Verify PostgreSQL is running: `sudo systemctl status postgresql`
2. Check connection string in `application.properties`
3. Test connection: `psql -U desn_user -d desn_db`
4. Verify firewall rules

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------||
| 1.0 | Dec 8, 2024 | Original PM | Initial draft (contained inaccuracies) |
| 2.0 | Dec 2025 | Corrected | Complete rewrite based on actual codebase verification |

---

## Approval Signatures

| Role | Name | Signature | Date |
|------|------|-----------|------|
| **Technical Lead** | _____________ | _____________ | _______ |
| **Project Manager** | _____________ | _____________ | _______ |
| **Organization Director** | _____________ | _____________ | _______ |

---

**End of Document**
