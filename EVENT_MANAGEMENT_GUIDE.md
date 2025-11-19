# Event Management System - Database Integration Guide

## Overview

The DESN website now has a complete event management system that allows administrators to add, edit, and delete events from the admin dashboard, which are then displayed on the home page and events page.

## Architecture

### Frontend Components

#### 1. **EventManagementPanel** (`/src/components/admin/EventManagementPanel.tsx`)

- Full CRUD operations for events
- Admin-only interface for managing events
- Features:
  - View all events in a table format
  - Add new events with form validation
  - Edit existing events
  - Delete events with confirmation dialog
  - Real-time success/error feedback
  - Loading states and error handling

#### 2. **AdminDashboard** (`/src/views/AdminDashboard.tsx`)

- Updated with new "Event Management" tab (tab 4)
- Tab order: Membership → Volunteer → Donations → Event Registrations → **Event Management** → Resources
- Integrates EventManagementPanel component

#### 3. **UpcomingEvents** (`/src/components/events/UpcomingEvents.tsx`)

- Fetches events from backend API: `GET /api/events/upcoming`
- Displays events with real-time registration status
- Formats dates and times based on selected language

#### 4. **FeaturedEvent** (Home page)

- Displays featured events from backend
- Fetches from: `GET /api/events/featured`

### Backend Components

#### 1. **Event Entity** (`backend/entity/Event.java`)

Database table: `events`

Columns:

- `id` (Long, PK, auto-increment)
- `title` (String, required, max 200 chars)
- `description` (Text, optional)
- `startDate` (LocalDateTime, required)
- `endDate` (LocalDateTime, required)
- `location` (String, required)
- `imageUrl` (String, optional)
- `maxAttendees` (Integer, required, default: 100)
- `currentAttendees` (Integer, required, default: 0)
- `featured` (Boolean, default: false)
- `createdAt` (LocalDateTime, auto-set)
- `updatedAt` (LocalDateTime, auto-updated)

#### 2. **EventService** (`backend/service/EventService.java`)

Provides business logic for event management:

Methods:

- `getAllEvents()` - Get all events
- `getFeaturedEvents()` - Get featured events only
- `getUpcomingEvents()` - Get events from now onwards
- `getPastEvents()` - Get past events
- `getEventById(Long id)` - Get single event
- `saveEvent(Event)` - Create or update
- `deleteEvent(Long id)` - Delete event
- `registerForEvent(Long eventId, String username, String email)` - User registration
- `cancelRegistration(Long eventId, String username)` - Cancel registration
- `getUserRegistrations(String username)` - Get user's registrations
- `getEventRegistrations(Long eventId)` - Get event's registrations
- `isUserRegistered(Long eventId, String username)` - Check registration status
- `getAllEventsRegistrations()` - Get all events with registrations (admin)

#### 3. **AdminEventController** (`backend/controller/AdminEventController.java`)

NEW: Admin-specific event management endpoints

Endpoints:

```
GET    /api/admin/events                 - Get all events
POST   /api/admin/events                 - Create new event (admin only)
PUT    /api/admin/events/{id}            - Update event (admin only)
DELETE /api/admin/events/{id}            - Delete event (admin only)
GET    /api/admin/events/registrations   - Get all events with registrations (admin)
```

#### 4. **EventController** (`backend/controller/EventController.java`)

Public event endpoints (unchanged):

```
GET    /api/events                           - Get all events
GET    /api/events/featured                  - Get featured events
GET    /api/events/upcoming                  - Get upcoming events
GET    /api/events/past                      - Get past events
GET    /api/events/{id}                      - Get single event
POST   /api/events/{id}/register             - Register for event
DELETE /api/events/{id}/register             - Cancel registration
GET    /api/events/user/{username}/registrations     - User's registrations
GET    /api/events/{id}/registrations               - Event's registrations
GET    /api/events/{id}/registration-status        - Check registration
GET    /api/events/all/registrations                - All events with registrations (admin)
```

### API Integration

The frontend `EventManagementPanel` connects to:

1. **Fetch Events** (on mount)

   ```
   GET /api/admin/events
   Headers: Authorization: Bearer {token}
   ```

2. **Create Event**

   ```
   POST /api/admin/events
   Body: {
     title: string,
     description: string,
     startDate: ISO8601,
     endDate: ISO8601,
     location: string,
     maxAttendees: number
   }
   ```

3. **Update Event**

   ```
   PUT /api/admin/events/{id}
   Body: { ...event fields }
   ```

4. **Delete Event**
   ```
   DELETE /api/admin/events/{id}
   ```

## Database Schema

```sql
CREATE TABLE events (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description LONGTEXT,
  startDate DATETIME NOT NULL,
  endDate DATETIME NOT NULL,
  location VARCHAR(255) NOT NULL,
  imageUrl VARCHAR(255),
  maxAttendees INT NOT NULL DEFAULT 100,
  currentAttendees INT NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT false,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  INDEX idx_startDate (startDate),
  INDEX idx_featured (featured)
);

CREATE TABLE eventRegistrations (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  eventId BIGINT NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  registeredAt DATETIME NOT NULL,
  FOREIGN KEY (eventId) REFERENCES events(id),
  UNIQUE KEY uq_event_user (eventId, username)
);
```

## How Events Flow Through the System

### 1. Admin Creates Event

1. Admin logs in to admin dashboard
2. Navigates to "Event Management" tab
3. Clicks "Add New Event" button
4. Fills form with:
   - Title (e.g., "Community Empowerment Workshop")
   - Description (optional)
   - Start Date & Time (auto set to 9 AM)
   - End Date & Time (auto set to 5 PM)
   - Location (e.g., "DESN Office")
   - Max Attendees (e.g., 50)
5. Clicks "Create" button
6. Frontend converts dates to ISO 8601 format
7. POST request sent to `/api/admin/events`
8. Backend saves to database
9. Success message shown, table refreshes

### 2. Events Display on Home Page

1. Home page component (`FeaturedEvent`) mounts
2. Calls `EventService.getFeaturedEvents()`
3. Backend queries `SELECT * FROM events WHERE featured = true`
4. Returns list of featured events
5. Frontend displays featured event card with details and "Register Now" button

### 3. Events Display on Events Page

1. Events page (`UpcomingEvents`) mounts
2. Calls `EventService.getUpcomingEvents()`
3. Backend queries `SELECT * FROM events WHERE startDate > NOW() ORDER BY startDate`
4. Returns upcoming events in chronological order
5. Frontend displays events in calendar and list format
6. Users can register for events

### 4. Event Registration

1. User clicks "Register" on event
2. Opens `EventRegistrationModal`
3. User enters their info (username, email)
4. Submits registration form
5. Frontend calls `EventService.registerForEvent(eventId, userData)`
6. Backend:
   - Checks if event exists
   - Checks if user already registered
   - Checks if event is full
   - Creates `EventRegistration` record
   - Increments `currentAttendees` count
7. Frontend shows success message

### 5. Admin Views Event Registrations

1. Admin on AdminDashboard → "Event Registrations" tab
2. Shows all events with registration counts
3. Expandable view shows all registered users
4. Real-time data pulled from database

## Environment Configuration

Make sure `.env.local` has:

```
VITE_API_BASE_URL=http://localhost:8080
```

Backend configuration for database (in `application.properties` or `application.yml`):

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/desn_db
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
```

## Testing the System

### Prerequisites

- Backend running on http://localhost:8080
- Frontend running on http://localhost:5174
- MySQL database running
- Admin user logged in

### Test Workflow

1. Go to Admin Dashboard → Event Management
2. Create a new event titled "Test Event"
   - Start: Today 9:00 AM
   - End: Today 5:00 PM
   - Location: Test Location
   - Max Attendees: 25
3. Click "Create" → Should see success message and event in table
4. Go to home page → Should see event if marked as featured
5. Go to Events page → Should see event in calendar
6. Click "Register Now" on event
7. Fill registration form and submit
8. Go back to Admin Dashboard → Event Registrations tab
9. See event with 1 attendee and registration details

## Key Features

✅ **Database-Backed**: All events stored in MySQL database
✅ **Real-time Updates**: Events appear immediately after creation
✅ **Admin CRUD**: Full create, read, update, delete functionality
✅ **User Registration**: Users can register for events from frontend
✅ **Capacity Tracking**: System tracks current attendees vs max capacity
✅ **Featured Events**: Admins can mark events as featured for home page
✅ **Multi-language Support**: Event dates/times formatted per user language
✅ **Form Validation**: Server and client-side validation
✅ **Error Handling**: Clear error messages for all operations
✅ **Responsive Design**: Works on desktop, tablet, mobile

## Security Notes

- Admin endpoints have authorization header check (add role verification in production)
- API key validation via proxy headers
- Input validation on both frontend and backend
- SQL injection protection via ORM (JPA/Hibernate)
- CORS configured appropriately
- Authentication required for admin operations

## Future Enhancements

- Event categories/tags
- Event image upload
- Email notifications for registrations
- Export registrations to CSV
- Event templates
- Bulk event creation
- Event analytics (attendance rate, popular times, locations)
- Calendar integration
- Payment integration for ticketed events
