# Event Management System

The DESN website includes a comprehensive event management system that allows members to browse and register for events, with admin capabilities for tracking registrations and managing capacity.

## 📋 Table of Contents

- [Overview](#overview)
- [User Features](#user-features)
- [Admin Features](#admin-features)
- [Backend Implementation](#backend-implementation)
- [Frontend Implementation](#frontend-implementation)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)

## Overview

The event management system provides:

- Public event browsing with real-time availability
- Member registration with capacity limits
- Registration management (view, cancel)
- Admin dashboard for tracking all registrations
- Email notifications (optional)

## User Features

### Event Browsing

- **Public Access**: All visitors can view upcoming events
- **Event Details**: Date, time, location, capacity, description
- **Real-time Availability**: Shows current registrations and available spots
- **Visual Indicators**: Color-coded status (Available, Limited, Full)

### Event Registration

- **Authentication Required**: Users must be logged in to register
- **Capacity Management**: System prevents over-registration
- **Instant Confirmation**: Immediate registration status
- **Registration Details**: Full name, email, username stored

### Member Dashboard

- **My Events**: View all registered events
- **Event Details**: Date, time, location displayed
- **Registration Status**: Confirmed status chip
- **Cancel Registration**: One-click cancellation with confirmation dialog

## Admin Features

### Admin Dashboard - Events Tab

- **All Registrations**: View registrations across all events
- **Event Statistics**: Current/Max capacity, available spots
- **Color-coded Status**:
  - 🟢 Green: Plenty of spots available
  - 🟡 Yellow: Limited spots (< 10)
  - 🔴 Red: Event full (0 spots)
- **Expandable Details**: Click to see full registration list
- **Registration Info**: Registered date/time, full name, username, email, status

### Registration Details

Each registration includes:

- Timestamp of registration
- Full name
- Username
- Email address
- Status (confirmed, waitlist, etc.)

## Backend Implementation

### Entity: EventRegistration

Located: `backend/src/main/java/com/example/proxy/entity/EventRegistration.java`

```java
@Entity
@Table(uniqueConstraints = {
    @UniqueConstraint(columnNames = {"event_id", "username"})
})
public class EventRegistration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventId;
    private String username;
    private String email;
    private String fullName;
    private LocalDateTime registeredAt;
    private String status; // confirmed, waitlist, cancelled
}
```

**Key Features:**

- Unique constraint prevents duplicate registrations
- Automatic timestamp on creation
- Status field for future enhancements (waitlist, etc.)

### Repository: EventRegistrationRepository

Located: `backend/src/main/java/com/example/proxy/repository/EventRegistrationRepository.java`

```java
public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {
    boolean existsByEventIdAndUsername(String eventId, String username);
    List<EventRegistration> findByUsername(String username);
    Optional<EventRegistration> findByEventIdAndUsername(String eventId, String username);
    long countByEventId(String eventId);
    List<EventRegistration> findByEventId(String eventId);
}
```

### Controller: EventController

Located: `backend/src/main/java/com/example/proxy/EventController.java`

**Key Endpoints:**

1. **GET /api/events** - List all events with registration counts
2. **POST /api/events/{eventId}/register** - Register for an event
3. **GET /api/events/user/{username}/registrations** - Get user's registrations
4. **DELETE /api/events/{eventId}/cancel** - Cancel registration
5. **GET /api/events/{eventId}/status** - Check registration status
6. **GET /api/events/admin/all** - Admin view of all registrations

### Event Configuration

Event details are currently configured in code (future: database-driven):

```java
private static final Map<String, EventConfig> EVENT_CONFIGS = Map.of(
    "air-midpoint-checkin", new EventConfig(
        "AIR Mid-Point Check-In",
        LocalDate.of(2025, 10, 25),
        100 // max capacity
    ),
    "international-day-disabilities", new EventConfig(
        "International Day of Persons with Disabilities",
        LocalDate.of(2025, 12, 3),
        50
    ),
    "air-awards-ceremony", new EventConfig(
        "AIR Awards Ceremony",
        LocalDate.of(2026, 1, 16),
        200
    )
);
```

## Frontend Implementation

### Service: EventService

Located: `src/services/EventService.ts`

```typescript
class EventService {
  async getAllEvents(token?: string): Promise<EventsResponse>;
  async registerForEvent(
    eventId: string,
    username: string,
    token: string
  ): Promise<EventActionResponse>;
  async getUserRegistrations(
    username: string,
    token: string
  ): Promise<UserRegistrationsResponse>;
  async cancelRegistration(
    eventId: string,
    username: string,
    token: string
  ): Promise<EventActionResponse>;
  async checkRegistrationStatus(
    eventId: string,
    username: string
  ): Promise<RegistrationStatusResponse>;
  async getAllEventsRegistrations(token: string): Promise<AdminEventsResponse>;
}
```

### Views

#### Events Page (`src/views/Events.tsx`)

Features:

- Hero section with title and description
- Event cards showing:
  - Event title, date, time, location
  - Current capacity (e.g., "45/100 registered")
  - Visual status indicator
  - Register/View Registration button
- Registration dialog with confirmation
- Success/error notifications

#### Member Dashboard (`src/views/MemberDashboard.tsx`)

Features:

- "My Events" tab showing all registrations
- Event cards with metadata
- Cancel registration button with confirmation dialog
- Empty state with "Browse Events" CTA

#### Admin Dashboard (`src/views/AdminDashboard.tsx`)

Features:

- "Event Registrations" tab
- Accordion layout for each event
- Capacity summary chips
- Expandable registration details table
- Export capability (future enhancement)

## API Endpoints

### Public Endpoints

#### GET /api/events

Get all events with registration counts.

**Response:**

```json
{
  "success": true,
  "events": [
    {
      "eventId": "air-midpoint-checkin",
      "title": "AIR Mid-Point Check-In",
      "eventDate": "2025-10-25",
      "maxCapacity": 100,
      "currentRegistrations": 45,
      "availableSpots": 55,
      "isOpen": true
    }
  ]
}
```

#### GET /api/events/{eventId}/status?username={username}

Check if a user is registered for an event.

**Response:**

```json
{
  "success": true,
  "isRegistered": true,
  "registeredAt": "2025-03-15T14:30:00"
}
```

### Protected Endpoints (Authenticated)

#### POST /api/events/{eventId}/register

Register for an event.

**Request Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "fullName": "John Doe"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Successfully registered for AIR Mid-Point Check-In"
}
```

**Error Cases:**

- Already registered: 409 Conflict
- Event full: 400 Bad Request
- Event not found: 404 Not Found

#### GET /api/events/user/{username}/registrations

Get all registrations for a user.

**Response:**

```json
{
  "success": true,
  "registrations": [
    {
      "eventId": "air-midpoint-checkin",
      "username": "john_doe",
      "email": "john@example.com",
      "fullName": "John Doe",
      "registeredAt": "2025-03-15T14:30:00",
      "status": "confirmed"
    }
  ]
}
```

#### DELETE /api/events/{eventId}/cancel?username={username}

Cancel event registration.

**Response:**

```json
{
  "success": true,
  "message": "Registration cancelled successfully"
}
```

### Admin Endpoints

#### GET /api/events/admin/all

Get all events with full registration details.

**Headers:**

```
Authorization: Bearer {jwt_token}
```

**Response:**

```json
{
  "success": true,
  "events": [
    {
      "eventId": "air-midpoint-checkin",
      "title": "AIR Mid-Point Check-In",
      "eventDate": "2025-10-25",
      "maxCapacity": 100,
      "currentRegistrations": 45,
      "availableSpots": 55,
      "registrations": [
        {
          "username": "john_doe",
          "email": "john@example.com",
          "fullName": "John Doe",
          "registeredAt": "2025-03-15T14:30:00",
          "status": "confirmed"
        }
      ]
    }
  ]
}
```

## Database Schema

### Event Registration Table

```sql
CREATE TABLE event_registration (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'confirmed',
    UNIQUE KEY uk_event_user (event_id, username)
);

CREATE INDEX idx_username ON event_registration(username);
CREATE INDEX idx_event_id ON event_registration(event_id);
```

## Future Enhancements

### Planned Features

1. **Waitlist Management**

   - Automatic waitlist when event is full
   - Email notification when spot becomes available

2. **Event CRUD**

   - Admin interface to create/edit/delete events
   - Database-driven event configuration
   - Custom fields per event

3. **Email Notifications**

   - Registration confirmation email
   - Reminder email before event
   - Cancellation confirmation

4. **Calendar Integration**

   - Export to Google Calendar
   - iCal file download
   - Calendar view on frontend

5. **Check-in System**

   - QR code generation
   - Event day check-in tracking
   - Attendance reports

6. **Advanced Analytics**

   - Registration trends over time
   - Popular event types
   - User engagement metrics

7. **Event Categories**
   - Filter by event type
   - Category-based search
   - Recommended events

## Testing

### Manual Testing Checklist

- [ ] Browse events as public user
- [ ] Register for event as logged-in member
- [ ] Verify capacity enforcement (try registering when full)
- [ ] View registered events in member dashboard
- [ ] Cancel registration and verify update
- [ ] Check admin dashboard shows all registrations
- [ ] Verify unique constraint (try duplicate registration)
- [ ] Test error handling (invalid event ID, etc.)

### Test Credentials

See main README.md for default test user credentials.

## Troubleshooting

### Common Issues

**Problem**: "Event is full" but spots appear available

- **Solution**: Check for race condition, refresh page

**Problem**: Registration button shows "View Registration" but user not registered

- **Solution**: Clear browser cache, re-login

**Problem**: Admin dashboard not loading registrations

- **Solution**: Verify JWT token is valid and user has ADMIN role

**Problem**: Duplicate registration error

- **Solution**: Check if user already registered, refresh page

## Support

For issues or questions about the event system:

- Create an issue on GitHub
- Check existing documentation
- Contact development team

---

**Last Updated**: November 2025
