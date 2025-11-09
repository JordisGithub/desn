# Production Deployment Guide

## Security Enhancements Implemented

### 1. CORS Configuration ✅

- **Environment-based origins**: Configurable via `CORS_ALLOWED_ORIGINS` environment variable
- **Default Development**: `http://localhost:5173,http://localhost:5174`
- **Production Example**: `https://desn.org.np,https://www.desn.org.np`
- **Location**: `CorsConfig.java`

### 2. Rate Limiting ✅

- **Implementation**: Bucket4j with in-memory buckets
- **Limit**: 5 requests per minute per IP address
- **Applied to**: `/api/forms/membership` and `/api/forms/volunteer` endpoints
- **Response**: HTTP 429 (Too Many Requests) with retry-after header
- **Location**: `RateLimitInterceptor.java`, `RateLimitConfig.java`

### 3. Input Sanitization ✅

- **XSS Prevention**: OWASP Encoder for HTML escaping
- **Validation**: Length limits, character filtering, format validation
- **Applied to**: All form input fields (name, email, phone, address, message)
- **Location**: `InputSanitizer.java`

### 4. Database Storage ✅

- **Production**: PostgreSQL with JPA/Hibernate
- **Development**: H2 in-memory database
- **Features**: Indexed queries, connection pooling, transaction management
- **Entities**: `MembershipApplication`, `VolunteerApplication`
- **Repositories**: Spring Data JPA repositories with custom queries

### 5. Email Notifications ✅

- **Feature**: Automatic email to admins on new submissions
- **Configuration**: Configurable via environment variables
- **Format**: Plain text email with all application details
- **Non-blocking**: Email failures don't prevent form submission
- **Location**: `EmailNotificationService.java`

### 6. Environment Profiles ✅

- **Development** (`dev`): H2 database, verbose logging, file storage
- **Production** (`prod`): PostgreSQL, minimal logging, database storage, secure cookies
- **Default**: Configurable storage mode, H2 database, moderate logging

## Environment Variables

### Required for Production

```bash
# Database Configuration
DATABASE_URL=jdbc:postgresql://localhost:5432/desn
DATABASE_USERNAME=desn_user
DATABASE_PASSWORD=your_secure_password

# CORS Configuration
CORS_ALLOWED_ORIGINS=https://desn.org.np,https://www.desn.org.np

# Email Configuration (if notifications enabled)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
EMAIL_NOTIFICATIONS_ENABLED=true
ADMIN_EMAIL=admin@desn.org.np
FROM_EMAIL=noreply@desn.org.np

# Storage Mode
STORAGE_MODE=database
```

### Optional

```bash
# Server Port
PORT=8080

# Upstream API (if using proxy features)
UPSTREAM_BASE_URL=https://api.example.com
SERVER_API_KEY=your-api-key

# H2 Console (disable in production)
H2_CONSOLE_ENABLED=false
```

## Deployment Steps

### 1. Database Setup

#### PostgreSQL Installation

```bash
# Install PostgreSQL
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Create database and user
sudo -u postgres psql
```

```sql
CREATE DATABASE desn;
CREATE USER desn_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE desn TO desn_user;
\q
```

### 2. Build the Application

```bash
cd backend
./mvnw clean package -DskipTests
```

The JAR file will be in `target/proxy-backend-0.0.1-SNAPSHOT.jar`

### 3. Run with Production Profile

```bash
# Set environment variables
export DATABASE_URL=jdbc:postgresql://localhost:5432/desn
export DATABASE_USERNAME=desn_user
export DATABASE_PASSWORD=your_secure_password
export CORS_ALLOWED_ORIGINS=https://desn.org.np,https://www.desn.org.np
export EMAIL_NOTIFICATIONS_ENABLED=true
export ADMIN_EMAIL=admin@desn.org.np
export MAIL_HOST=smtp.gmail.com
export MAIL_PORT=587
export MAIL_USERNAME=your-email@gmail.com
export MAIL_PASSWORD=your-app-password

# Run with production profile
java -jar target/proxy-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

### 4. Using Docker (Recommended)

Update the `backend/Dockerfile` if needed, then:

```bash
cd backend
docker build -t desn-backend .
docker run -d \
  -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e DATABASE_URL=jdbc:postgresql://db:5432/desn \
  -e DATABASE_USERNAME=desn_user \
  -e DATABASE_PASSWORD=your_secure_password \
  -e CORS_ALLOWED_ORIGINS=https://desn.org.np,https://www.desn.org.np \
  -e EMAIL_NOTIFICATIONS_ENABLED=true \
  -e ADMIN_EMAIL=admin@desn.org.np \
  --name desn-backend \
  desn-backend
```

### 5. Using Docker Compose

Update `backend/docker-compose.yml`:

```yaml
version: "3.8"

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: desn
      POSTGRES_USER: desn_user
      POSTGRES_PASSWORD: your_secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_PROFILES_ACTIVE: prod
      DATABASE_URL: jdbc:postgresql://db:5432/desn
      DATABASE_USERNAME: desn_user
      DATABASE_PASSWORD: your_secure_password
      CORS_ALLOWED_ORIGINS: https://desn.org.np,https://www.desn.org.np
      EMAIL_NOTIFICATIONS_ENABLED: true
      ADMIN_EMAIL: admin@desn.org.np
      MAIL_HOST: smtp.gmail.com
      MAIL_PORT: 587
      MAIL_USERNAME: your-email@gmail.com
      MAIL_PASSWORD: your-app-password
    depends_on:
      - db

volumes:
  postgres_data:
```

Run with:

```bash
docker-compose up -d
```

## Email Configuration

### Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the generated password
3. Use the app password in `MAIL_PASSWORD` environment variable

### Other SMTP Providers

Update these environment variables:

```bash
MAIL_HOST=smtp.your-provider.com
MAIL_PORT=587
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
```

## Monitoring and Health Checks

### Health Endpoint

```bash
curl http://localhost:8080/actuator/health
```

### Metrics (Prometheus)

```bash
curl http://localhost:8080/actuator/metrics
curl http://localhost:8080/actuator/prometheus
```

### Form Submission Health

```bash
curl http://localhost:8080/api/forms/health
```

## Security Checklist

- [ ] Update `CORS_ALLOWED_ORIGINS` to production domain(s)
- [ ] Set strong `DATABASE_PASSWORD`
- [ ] Enable HTTPS/TLS in production
- [ ] Configure firewall to restrict database access
- [ ] Set up database backups
- [ ] Enable email notifications with valid SMTP credentials
- [ ] Disable H2 console (`H2_CONSOLE_ENABLED=false`)
- [ ] Use production profile (`--spring.profiles.active=prod`)
- [ ] Set up monitoring and alerting
- [ ] Review and configure rate limiting as needed
- [ ] Set up log aggregation (ELK, Splunk, etc.)
- [ ] Configure secure session cookies (already configured in prod profile)
- [ ] Set up SSL/TLS certificates for the domain
- [ ] Implement authentication for GET endpoints if needed
- [ ] Regular security updates for dependencies

## Performance Tuning

### Database Connection Pool

Adjust in production properties:

```properties
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
```

### Rate Limiting

Adjust in `RateLimitConfig.java`:

```java
private static final int CAPACITY = 5;  // requests per window
private static final Duration REFILL_DURATION = Duration.ofMinutes(1);
```

### Tomcat Threads

Adjust in properties:

```properties
server.tomcat.threads.max=200
server.tomcat.threads.min-spare=10
```

## Troubleshooting

### Database Connection Issues

```bash
# Check database is running
sudo systemctl status postgresql

# Check connection
psql -h localhost -U desn_user -d desn

# Check logs
tail -f /var/log/postgresql/postgresql-*.log
```

### Email Not Sending

```bash
# Check SMTP credentials
# Enable debug logging
logging.level.org.springframework.mail=DEBUG

# Test connection manually
telnet smtp.gmail.com 587
```

### Rate Limiting Issues

```bash
# Check X-Rate-Limit-Remaining header in response
curl -I http://localhost:8080/api/forms/health

# View rate limit logs
grep "Rate limit" logs/spring.log
```

## Backup and Recovery

### Database Backup

```bash
# Automated backup script
pg_dump -h localhost -U desn_user desn > backup_$(date +%Y%m%d).sql

# Set up cron job for daily backups
0 2 * * * /usr/bin/pg_dump -h localhost -U desn_user desn > /backups/desn_$(date +\%Y\%m\%d).sql
```

### Restore from Backup

```bash
psql -h localhost -U desn_user desn < backup_20231108.sql
```

## Logs Location

- **Application Logs**: `logs/spring.log` (if configured)
- **Access Logs**: Tomcat access logs in `logs/` directory
- **Database Logs**: `/var/log/postgresql/`

## Support and Maintenance

- Review application logs regularly
- Monitor database size and performance
- Update dependencies for security patches
- Review and analyze form submission patterns
- Back up database regularly
- Test disaster recovery procedures
