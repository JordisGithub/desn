# Security Features

Comprehensive guide to security features implemented in the DESN application.

## Table of Contents

- [Overview](#overview)
- [Security Features](#security-features)
- [Configuration](#configuration)
- [Best Practices](#best-practices)
- [Monitoring](#monitoring)
- [Compliance](#compliance)

## Overview

The DESN application implements multiple layers of security to protect against common web vulnerabilities and ensure safe operation in production environments.

### Security Layers

```
┌─────────────────────────────────────┐
│  1. Network Layer (HTTPS/TLS)       │
├─────────────────────────────────────┤
│  2. CORS Protection                  │
├─────────────────────────────────────┤
│  3. Rate Limiting                    │
├─────────────────────────────────────┤
│  4. Authentication (JWT)             │
├─────────────────────────────────────┤
│  5. Authorization (Roles)            │
├─────────────────────────────────────┤
│  6. Input Validation                 │
├─────────────────────────────────────┤
│  7. Input Sanitization (XSS)         │
├─────────────────────────────────────┤
│  8. Password Security (BCrypt)       │
├─────────────────────────────────────┤
│  9. Database Security                │
└─────────────────────────────────────┘
```

## Security Features

### 1. HTTPS/TLS

**Purpose:** Encrypt data in transit

**Implementation:**

```properties
# application-prod.properties
server.ssl.enabled=true
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=${SSL_KEYSTORE_PASSWORD}
server.ssl.key-store-type=PKCS12
server.ssl.key-alias=tomcat

# Force HTTPS
server.ssl.enabled-protocols=TLSv1.2,TLSv1.3
```

**Production Setup:**

```bash
# Generate SSL certificate with Let's Encrypt
sudo certbot certonly --standalone -d desn.org.np

# Convert to PKCS12 format
openssl pkcs12 -export \
  -in /etc/letsencrypt/live/desn.org.np/fullchain.pem \
  -inkey /etc/letsencrypt/live/desn.org.np/privkey.pem \
  -out keystore.p12 \
  -name tomcat
```

**Testing:**

```bash
# Should redirect to HTTPS
curl -I http://desn.org.np

# Should return 200 OK
curl -I https://desn.org.np
```

### 2. CORS Protection

**Purpose:** Prevent unauthorized cross-origin requests

**Implementation:**

```java
// CorsConfig.java
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Environment-based origins
        String allowedOrigins = environment.getProperty(
            "cors.allowed.origins",
            "http://localhost:5175"
        );
        configuration.setAllowedOrigins(
            Arrays.asList(allowedOrigins.split(","))
        );

        configuration.setAllowedMethods(
            Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
```

**Configuration:**

```bash
# Development
export CORS_ALLOWED_ORIGINS="http://localhost:5175"

# Production
export CORS_ALLOWED_ORIGINS="https://desn.org.np"

# Multiple origins
export CORS_ALLOWED_ORIGINS="https://desn.org.np,https://www.desn.org.np"
```

**What It Prevents:**

- ❌ Requests from untrusted domains
- ❌ CSRF attacks from malicious sites
- ❌ Data theft via XSS + CORS

### 3. Rate Limiting

**Purpose:** Prevent abuse and DoS attacks

**Implementation:**

```java
// RateLimitInterceptor.java
@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    @Override
    public boolean preHandle(HttpServletRequest request,
                            HttpServletResponse response,
                            Object handler) {
        String clientIp = getClientIP(request);
        Bucket bucket = resolveBucket(clientIp);

        if (bucket.tryConsume(1)) {
            return true;
        } else {
            response.setStatus(429); // Too Many Requests
            response.addHeader("Retry-After", "60");
            return false;
        }
    }

    private Bucket resolveBucket(String clientIp) {
        return buckets.computeIfAbsent(clientIp, k ->
            Bucket4j.builder()
                .addLimit(Bandwidth.simple(5, Duration.ofMinutes(1)))
                .build()
        );
    }
}
```

**Limits:**

- **Form Submissions:** 5 requests per minute per IP
- **Payment Initiation:** 10 requests per minute per IP
- **Login Attempts:** 5 attempts per minute per IP

**Configuration:**

```java
// WebMvcConfig.java
@Override
public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(rateLimitInterceptor)
        .addPathPatterns("/api/forms/**")
        .addPathPatterns("/api/payment/initiate")
        .addPathPatterns("/api/auth/login");
}
```

**What It Prevents:**

- ❌ Brute force attacks
- ❌ Credential stuffing
- ❌ DDoS attacks
- ❌ Form spam

### 4. Input Sanitization

**Purpose:** Prevent XSS (Cross-Site Scripting) attacks

**Implementation:**

```java
// InputSanitizer.java
public class InputSanitizer {

    private static final Encoder ENCODER =
        Encoders.forHtml();

    public static String sanitize(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }

        // HTML encode to prevent XSS
        String sanitized = ENCODER.encode(input);

        // Length limits
        if (sanitized.length() > 2000) {
            sanitized = sanitized.substring(0, 2000);
        }

        // Remove control characters
        sanitized = sanitized.replaceAll("[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]", "");

        return sanitized.trim();
    }

    public static String sanitizeEmail(String email) {
        if (email == null) return null;

        // Basic email validation
        if (!email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new IllegalArgumentException("Invalid email format");
        }

        return email.toLowerCase().trim();
    }
}
```

**Applied To:**

- ✅ All form inputs (names, messages, addresses)
- ✅ Email addresses
- ✅ Phone numbers
- ✅ Payment donor information
- ✅ User profile data

**What It Prevents:**

- ❌ XSS attacks via form inputs
- ❌ Script injection
- ❌ HTML injection
- ❌ SQL injection (via JPA parameterization)

### 5. Password Security

**Purpose:** Protect user credentials

**Implementation:**

```java
@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}

// Usage
String hashedPassword = passwordEncoder.encode(plainPassword);
boolean matches = passwordEncoder.matches(plainPassword, hashedPassword);
```

**Features:**

- **Algorithm:** BCrypt
- **Strength:** 10 rounds
- **Salt:** Automatically generated per password
- **Never stored plain:** Passwords immediately hashed

**Password Requirements:**

- Minimum 6 characters (increase to 8+ for production)
- Should contain mix of:
  - Uppercase letters
  - Lowercase letters
  - Numbers
  - Special characters

**Configuration:**

```java
// Increase BCrypt rounds for production
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(12); // More secure, slower
}
```

### 6. JWT Token Security

**Purpose:** Secure stateless authentication

**Implementation:**

```java
// JwtUtil.java
public String generateToken(UserDetails userDetails) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("role", userDetails.getAuthorities()
        .stream()
        .findFirst()
        .map(GrantedAuthority::getAuthority)
        .orElse("MEMBER"));

    return Jwts.builder()
        .setClaims(claims)
        .setSubject(userDetails.getUsername())
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
        .signWith(getSigningKey(), SignatureAlgorithm.HS256)
        .compact();
}
```

**Security Features:**

- ✅ Signed with HS256 algorithm
- ✅ 24-hour expiration
- ✅ Contains user role
- ✅ Cannot be modified without signature
- ✅ Validated on every protected request

**Configuration:**

```properties
# MUST be at least 256 bits
jwt.secret=${JWT_SECRET:change-this-in-production}
jwt.expiration=86400000  # 24 hours
```

**Production Secret:**

```bash
# Generate secure random key
export JWT_SECRET=$(openssl rand -base64 32)
```

### 7. Database Security

**Purpose:** Protect data at rest

**Features:**

1. **Parameterized Queries (JPA):**

```java
// Safe from SQL injection
@Query("SELECT m FROM MembershipApplication m WHERE m.email = :email")
List<MembershipApplication> findByEmail(@Param("email") String email);
```

2. **Connection Pooling:**

```properties
# HikariCP configuration
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.idle-timeout=600000
spring.datasource.hikari.max-lifetime=1800000
```

3. **Database Credentials:**

```bash
# Environment variables
export SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/desn_prod"
export SPRING_DATASOURCE_USERNAME="desn_user"
export SPRING_DATASOURCE_PASSWORD="secure_random_password"
```

4. **Limited Permissions:**

```sql
-- Database user with minimal privileges
CREATE USER desn_user WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE desn_prod TO desn_user;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO desn_user;
-- NO DELETE or DROP permissions
```

### 8. Session Security

**Purpose:** Secure session management

**Configuration:**

```properties
# Production session settings
server.servlet.session.cookie.secure=true
server.servlet.session.cookie.http-only=true
server.servlet.session.cookie.same-site=strict
server.servlet.session.timeout=30m
```

**What It Protects:**

- ✅ Cookies only sent over HTTPS
- ✅ JavaScript cannot access cookies
- ✅ CSRF protection via SameSite
- ✅ Session timeout after 30 minutes

### 9. Error Handling

**Purpose:** Don't leak sensitive information

**Implementation:**

```properties
# Production - hide error details
server.error.include-message=never
server.error.include-binding-errors=never
server.error.include-stacktrace=never
server.error.include-exception=false

# Development - show details
server.error.include-message=always
server.error.include-stacktrace=on_param
```

**Custom Error Responses:**

```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e) {
        // Log internally
        logger.error("Error occurred", e);

        // Return generic message to user
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("error", "An error occurred. Please try again."));
    }
}
```

## Configuration

### Development Environment

```properties
# application-dev.properties
# More verbose logging
logging.level.org.springframework.security=DEBUG
logging.level.com.example.proxy=DEBUG

# Show SQL queries
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Error details visible
server.error.include-stacktrace=on_param

# H2 console enabled
spring.h2.console.enabled=true
```

### Production Environment

```properties
# application-prod.properties
# Minimal logging
logging.level.org.springframework.security=WARN
logging.level.com.example.proxy=INFO

# No SQL in logs
spring.jpa.show-sql=false

# Hide errors
server.error.include-stacktrace=never

# H2 console disabled
spring.h2.console.enabled=false

# Secure sessions
server.servlet.session.cookie.secure=true
server.servlet.session.cookie.http-only=true
```

## Best Practices

### 1. Environment Variables

**Never hardcode secrets:**

```bash
# ❌ Bad
jwt.secret=my-secret-key

# ✅ Good
jwt.secret=${JWT_SECRET}
```

**Use .env file (not in git):**

```bash
# .env (add to .gitignore)
JWT_SECRET=your-secure-secret-key
KHALTI_SECRET_KEY=your-khalti-key
DATABASE_PASSWORD=your-db-password
```

### 2. Regular Updates

**Keep dependencies updated:**

```bash
# Check for updates
./mvnw versions:display-dependency-updates

# Update Spring Boot version
# Update all dependencies regularly
# Apply security patches promptly
```

### 3. Code Reviews

**Security checklist for PRs:**

- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] SQL queries parameterized
- [ ] Error handling doesn't leak info
- [ ] Authentication required for sensitive endpoints
- [ ] Authorization checks in place
- [ ] CORS configured correctly
- [ ] Rate limiting applied where needed

### 4. Security Headers

**Add to production:**

```java
@Override
protected void configure(HttpSecurity http) {
    http
        .headers()
            .contentSecurityPolicy("default-src 'self'")
            .and()
            .xssProtection()
            .and()
            .frameOptions().deny()
            .and()
            .httpStrictTransportSecurity()
                .maxAgeInSeconds(31536000)
                .includeSubDomains(true);
}
```

## Monitoring

### Logging

**Security events to log:**

```java
// Successful login
logger.info("User {} logged in successfully", email);

// Failed login
logger.warn("Failed login attempt for user {}", email);

// Rate limit exceeded
logger.warn("Rate limit exceeded for IP {}", clientIp);

// Payment transaction
logger.info("Payment initiated: {} for amount {}", txnId, amount);

// Admin actions
logger.info("Admin {} accessed dashboard", username);
```

### Metrics to Track

1. **Authentication Metrics:**

   - Login success rate
   - Failed login attempts
   - Token expiration rate

2. **Rate Limiting Metrics:**

   - Requests blocked
   - Top offending IPs
   - Peak request times

3. **Security Incidents:**
   - XSS attempts detected
   - Invalid JWT tokens
   - CORS violations
   - SQL injection attempts

### Alerting

**Set up alerts for:**

- Multiple failed logins from same IP
- Unusual payment amounts
- High rate of rate-limited requests
- Database connection failures
- JWT validation failures

## Compliance

### Data Protection

**GDPR Considerations:**

- ✅ User consent for data collection
- ✅ Right to data export (future)
- ✅ Right to deletion (future)
- ✅ Data encryption in transit (HTTPS)
- ✅ Secure password storage
- ✅ Audit logging

### PCI DSS (Payment Card Industry)

**Requirements:**

- ✅ Don't store card data (Khalti handles)
- ✅ Use HTTPS for payment forms
- ✅ Secure payment gateway integration
- ✅ Transaction logging
- ✅ Access control to payment data

## Security Checklist

### Pre-Production

- [ ] Change all default passwords
- [ ] Generate secure JWT secret
- [ ] Configure production CORS origins
- [ ] Enable HTTPS/TLS
- [ ] Set up PostgreSQL with strong password
- [ ] Disable H2 console
- [ ] Hide error stacktraces
- [ ] Enable security headers
- [ ] Configure rate limiting
- [ ] Set up monitoring and alerts
- [ ] Review all environment variables
- [ ] Test authentication flow
- [ ] Test authorization (roles)
- [ ] Verify input sanitization
- [ ] Check SQL injection protection
- [ ] Verify XSS protection
- [ ] Test CORS configuration
- [ ] Audit logging configuration
- [ ] Backup strategy in place

### Post-Production

- [ ] Monitor logs regularly
- [ ] Review security metrics
- [ ] Update dependencies monthly
- [ ] Rotate secrets quarterly
- [ ] Security audit annually
- [ ] Penetration testing
- [ ] Backup verification
- [ ] Incident response plan
- [ ] User security training

## Incident Response

### If Breach Detected

1. **Immediate Actions:**

   - Disable affected accounts
   - Rotate all secrets/keys
   - Review logs for scope
   - Document everything

2. **Investigation:**

   - Identify entry point
   - Determine data exposed
   - Timeline of breach
   - Systems affected

3. **Remediation:**

   - Patch vulnerability
   - Reset affected passwords
   - Update security measures
   - Test fixes

4. **Communication:**
   - Notify affected users
   - Report to authorities (if required)
   - Update security documentation
   - Share lessons learned

---

**Last Updated:** December 2024  
**Status:** Production Ready  
**Next Review:** Quarterly
