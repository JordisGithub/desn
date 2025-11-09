# Resources & Publications Library

The DESN website includes a comprehensive resources and publications library that allows users to browse, search, and favorite various types of educational materials, reports, and media content.

## 📋 Table of Contents

- [Overview](#overview)
- [Resource Types](#resource-types)
- [User Features](#user-features)
- [Admin Features](#admin-features)
- [Backend Implementation](#backend-implementation)
- [Frontend Implementation](#frontend-implementation)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)

## Overview

The resources library provides:

- Browsable collection of publications and media
- Search and filter capabilities
- Favorite/bookmark functionality for authenticated users
- Download/view tracking for analytics
- Admin management interface for CRUD operations
- Featured resources highlighting

## Resource Types

The system supports 7 different resource types:

| Type                | Icon | Description                        | Example                            |
| ------------------- | ---- | ---------------------------------- | ---------------------------------- |
| **annual-report**   | 📊   | Annual organizational reports      | "DESN Annual Report 2024"          |
| **policy-brief**    | 📋   | Policy documents and briefs        | "Digital Governance Policy Brief"  |
| **training-manual** | 📚   | Educational and training materials | "Digital Literacy Training Manual" |
| **research**        | 🔬   | Research papers and studies        | "Employment Barriers Research"     |
| **guideline**       | 📖   | Guidelines and standards           | "Accessible Web Design Guidelines" |
| **newsletter**      | 📰   | Newsletters and updates            | "DESN Quarterly Newsletter"        |
| **video**           | 🎥   | Video content and tutorials        | "Digital Skills Workshop Series"   |

## User Features

### Browse Resources

- **Public Access**: All resources visible to public
- **Featured Section**: Highlighted important publications
- **Grid Layout**: Responsive card-based display
- **Resource Cards**: Show thumbnail, title, description, metadata
- **Visual Type Indicators**: Icons for each resource type

### Search & Filter

- **Text Search**: Search by title or description
- **Category Filters**: 8 category chips with resource counts
- **Combined Filtering**: Search + category filtering
- **Real-time Results**: Instant filtering without page reload

### Favorites System

- **Authentication Required**: Login needed to favorite
- **Toggle Favorite**: Heart icon to add/remove favorites
- **Visual Feedback**: Filled heart for favorited items
- **Favorite Count**: Shows how many users favorited
- **Member Dashboard**: View all favorites in one place

### Download Tracking

- **Click Counting**: Automatic tracking of downloads/views
- **Analytics**: View count displayed on resource cards
- **Separate Counts**: Different labels for documents vs videos

### Resource Details

Each resource card displays:

- **Thumbnail**: Image or gradient background
- **Title**: Resource name
- **Type Badge**: Category label with icon
- **Featured Badge**: Special indicator for featured items
- **Description**: Brief overview (truncated)
- **Metadata**:
  - Page count (for documents)
  - Publication date
  - Downloads/views count
- **Action Buttons**: Download/Watch and Favorite

## Admin Features

### Admin Dashboard - Resources Tab

Located in Admin Dashboard, provides:

- **Resource List Table**: All resources with key metrics
- **Add New Resource**: Button to create resources
- **Edit Resources**: Modify existing resources
- **Delete Resources**: Remove resources (with confirmation)
- **Analytics View**: See clicks and favorites per resource

### Resource Table Columns

| Column          | Description                           |
| --------------- | ------------------------------------- |
| Title           | Resource name and description preview |
| Type            | Category badge                        |
| Publish Date    | When published                        |
| Downloads/Views | Click count                           |
| Favorites       | Number of user favorites              |
| Featured        | Featured status indicator             |
| Actions         | Edit and delete buttons               |

### Create/Edit Resource

Dialog form with fields:

- **Title** (required): Resource name
- **Description** (required): Detailed description
- **Type** (required): Select from 7 types
- **File URL** (required): Link to PDF or video
- **Thumbnail URL** (optional): Preview image
- **Pages** (optional): For documents only
- **Featured** (checkbox): Mark as featured

### Resource Analytics

Admin can view:

- Total clicks per resource
- Favorite counts
- Most popular resources
- Resource type distribution

## Backend Implementation

### Entity: Resource

Located: `backend/src/main/java/com/example/proxy/entity/Resource.java`

```java
@Entity
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String type; // annual-report, policy-brief, etc.
    private String fileUrl;
    private String thumbnailUrl;
    private Integer pages;

    private LocalDate publishDate;

    private Long clicks = 0L;
    private Long favoriteCount = 0L;

    private Boolean featured = false;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Methods
    public void incrementClicks()
    public void incrementFavoriteCount()
    public void decrementFavoriteCount()
}
```

### Entity: ResourceFavorite

Located: `backend/src/main/java/com/example/proxy/entity/ResourceFavorite.java`

```java
@Entity
@Table(uniqueConstraints = {
    @UniqueConstraint(columnNames = {"resource_id", "username"})
})
public class ResourceFavorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long resourceId;
    private String username;
    private LocalDateTime favoritedAt;
}
```

**Key Features:**

- Unique constraint prevents duplicate favorites
- Many-to-many relationship between users and resources
- Automatic timestamp on creation

### Repositories

#### ResourceRepository

Located: `backend/src/main/java/com/example/proxy/repository/ResourceRepository.java`

```java
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    List<Resource> findByType(String type);
    List<Resource> findByFeaturedTrue();
    List<Resource> findAllByOrderByPublishDateDesc();

    @Query("SELECT r FROM Resource r WHERE " +
           "LOWER(r.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.description) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Resource> searchByTitleOrDescription(@Param("search") String search);

    @Query("SELECT r FROM Resource r WHERE r.type = :type AND " +
           "(LOWER(r.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Resource> searchByTypeAndTitleOrDescription(
        @Param("type") String type,
        @Param("search") String search
    );
}
```

#### ResourceFavoriteRepository

Located: `backend/src/main/java/com/example/proxy/repository/ResourceFavoriteRepository.java`

```java
public interface ResourceFavoriteRepository extends JpaRepository<ResourceFavorite, Long> {
    Optional<ResourceFavorite> findByResourceIdAndUsername(Long resourceId, String username);
    List<ResourceFavorite> findByUsername(String username);
    boolean existsByResourceIdAndUsername(Long resourceId, String username);
    long countByResourceId(Long resourceId);

    @Modifying
    @Transactional
    void deleteByResourceIdAndUsername(Long resourceId, String username);
}
```

### Controller: ResourceController

Located: `backend/src/main/java/com/example/proxy/ResourceController.java`

**Endpoints:** 10 total

1. `GET /api/resources` - List with filters (public)
2. `GET /api/resources/featured` - Featured resources (public)
3. `GET /api/resources/{id}` - Single resource (public)
4. `POST /api/resources` - Create (admin)
5. `PUT /api/resources/{id}` - Update (admin)
6. `DELETE /api/resources/{id}` - Delete (admin)
7. `POST /api/resources/{id}/favorite` - Toggle favorite (authenticated)
8. `POST /api/resources/{id}/click` - Track click (public)
9. `GET /api/resources/user/{username}/favorites` - User favorites (authenticated)
10. `GET /api/resources/admin/all` - Admin analytics (admin)

### Data Initialization

Located: `backend/src/main/java/com/example/proxy/config/ResourceDataInitializer.java`

Seeds database with 14 sample resources on first run:

- 2 Annual Reports
- 2 Policy Briefs
- 3 Training Manuals
- 2 Research Papers
- 2 Guidelines
- 1 Newsletter
- 2 Videos

## Frontend Implementation

### Service: ResourceService

Located: `src/services/ResourceService.ts`

```typescript
interface Resource {
  id: number;
  title: string;
  description: string;
  type:
    | "annual-report"
    | "policy-brief"
    | "training-manual"
    | "research"
    | "guideline"
    | "newsletter"
    | "video";
  fileUrl: string;
  thumbnailUrl?: string;
  pages?: number;
  publishDate: string;
  clicks: number;
  favoriteCount: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

class ResourceService {
  async getResources(
    type?: string,
    search?: string
  ): Promise<ResourcesResponse>;
  async getFeaturedResources(): Promise<Resource[]>;
  async getResource(id: number): Promise<Resource>;
  async createResource(
    resourceData: Partial<Resource>,
    token: string
  ): Promise<ResourceActionResponse>;
  async updateResource(
    id: number,
    resourceData: Partial<Resource>,
    token: string
  ): Promise<ResourceActionResponse>;
  async deleteResource(
    id: number,
    token: string
  ): Promise<ResourceActionResponse>;
  async toggleFavorite(
    resourceId: number,
    username: string,
    token: string
  ): Promise<FavoriteResponse>;
  async trackClick(resourceId: number): Promise<ClickResponse>;
  async getUserFavorites(
    username: string,
    token: string
  ): Promise<ResourceFavorite[]>;

  // Helper methods
  getResourceTypeLabel(type: string): string;
  formatDate(dateString: string): string;
}
```

### Views

#### Resources Page (`src/views/Resources.tsx`)

**Sections:**

1. **Hero Section**

   - Gradient background (#004c91 to #00a77f)
   - "Knowledge Library" title
   - Description text
   - CTA buttons

2. **Featured Publications**

   - 3-column responsive grid
   - Special highlighting
   - Limited to featured resources

3. **All Resources**

   - Search bar with icon
   - Category filter chips with counts
   - Responsive grid layout
   - Loading skeletons

4. **Resource Cards**

   - Thumbnail with fallback gradient
   - Type badge and featured badge
   - Title and description
   - Metadata row (pages, date, clicks)
   - Download/Watch button
   - Favorite button (heart icon)
   - Hover effects

5. **CTA Section**
   - Newsletter subscription prompt
   - Gradient background

#### Member Dashboard - Favorites Tab

Located: `src/views/MemberDashboard.tsx`

Features:

- "Favorite Resources" tab
- Resource cards with full details
- Remove favorite button
- View/download with tracking
- Empty state with "Browse Resources" link

#### Admin Dashboard - Resources Tab

Located: `src/views/AdminDashboard.tsx`

Features:

- "Add New Resource" button
- Resource table with all data
- Edit resource dialog
- Delete confirmation dialog
- Real-time analytics display

## API Endpoints

### Public Endpoints

#### GET /api/resources

List resources with optional filters.

**Query Parameters:**

- `type` (optional): Filter by resource type
- `search` (optional): Search in title/description

**Response:**

```json
{
  "resources": [
    {
      "id": 1,
      "title": "DESN Annual Report 2024",
      "description": "Comprehensive overview...",
      "type": "annual-report",
      "fileUrl": "https://example.com/report.pdf",
      "thumbnailUrl": "https://example.com/thumb.jpg",
      "pages": 48,
      "publishDate": "2024-12-31",
      "clicks": 342,
      "favoriteCount": 28,
      "featured": true,
      "createdAt": "2025-01-15T10:00:00",
      "updatedAt": "2025-01-15T10:00:00"
    }
  ],
  "total": 14,
  "typeCounts": {
    "annual-report": 2,
    "policy-brief": 2,
    "training-manual": 3,
    "research": 2,
    "guideline": 2,
    "newsletter": 1,
    "video": 2
  }
}
```

#### GET /api/resources/featured

Get featured resources only.

**Response:**

```json
[
  {
    "id": 1,
    "title": "DESN Annual Report 2024",
    "featured": true,
    ...
  }
]
```

#### POST /api/resources/{id}/click

Track download/view click.

**Response:**

```json
{
  "success": true,
  "clicks": 343
}
```

### Protected Endpoints (Authenticated)

#### POST /api/resources/{id}/favorite

Toggle favorite status.

**Request Body:**

```json
{
  "username": "john_doe"
}
```

**Response:**

```json
{
  "success": true,
  "isFavorited": true,
  "favoriteCount": 29,
  "message": "Resource added to favorites"
}
```

#### GET /api/resources/user/{username}/favorites

Get user's favorited resources.

**Headers:**

```
Authorization: Bearer {jwt_token}
```

**Response:**

```json
[
  {
    "favoriteId": 1,
    "favoritedAt": "2025-03-15T14:30:00",
    "resource": {
      "id": 1,
      "title": "DESN Annual Report 2024",
      ...
    }
  }
]
```

### Admin Endpoints

#### POST /api/resources

Create new resource.

**Headers:**

```
Authorization: Bearer {jwt_token}
```

**Request Body:**

```json
{
  "title": "New Training Manual",
  "description": "Comprehensive guide to...",
  "type": "training-manual",
  "fileUrl": "https://example.com/manual.pdf",
  "thumbnailUrl": "https://example.com/thumb.jpg",
  "pages": 120,
  "featured": false
}
```

**Response:**

```json
{
  "success": true,
  "message": "Resource created successfully",
  "resource": { ... }
}
```

#### PUT /api/resources/{id}

Update existing resource.

**Headers:**

```
Authorization: Bearer {jwt_token}
```

**Request Body:** Same as POST

**Response:**

```json
{
  "success": true,
  "message": "Resource updated successfully",
  "resource": { ... }
}
```

#### DELETE /api/resources/{id}

Delete resource and all associated favorites.

**Headers:**

```
Authorization: Bearer {jwt_token}
```

**Response:**

```json
{
  "success": true,
  "message": "Resource deleted successfully"
}
```

#### GET /api/resources/admin/all

Get all resources with analytics (same as public list).

**Headers:**

```
Authorization: Bearer {jwt_token}
```

## Database Schema

### Resources Table

```sql
CREATE TABLE resource (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    type VARCHAR(50) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    pages INTEGER,
    publish_date DATE NOT NULL,
    clicks BIGINT DEFAULT 0,
    favorite_count BIGINT DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_type ON resource(type);
CREATE INDEX idx_featured ON resource(featured);
CREATE INDEX idx_publish_date ON resource(publish_date);
```

### Resource Favorites Table

```sql
CREATE TABLE resource_favorite (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resource_id BIGINT NOT NULL,
    username VARCHAR(255) NOT NULL,
    favorited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_resource_user (resource_id, username),
    FOREIGN KEY (resource_id) REFERENCES resource(id) ON DELETE CASCADE
);

CREATE INDEX idx_username ON resource_favorite(username);
CREATE INDEX idx_resource_id ON resource_favorite(resource_id);
```

## Resource Type Configuration

### Type Labels

```typescript
const typeLabels = {
  "annual-report": "Annual Report",
  "policy-brief": "Policy Brief",
  "training-manual": "Training Manual",
  research: "Research",
  guideline: "Guideline",
  newsletter: "Newsletter",
  video: "Video",
};
```

### Type Icons

- Annual Report: 📊
- Policy Brief: 📋
- Training Manual: 📚
- Research: 🔬
- Guideline: 📖
- Newsletter: 📰
- Video: 🎥

## Future Enhancements

### Planned Features

1. **Advanced Search**

   - Full-text search
   - Date range filtering
   - Author/source filtering
   - Tags/keywords system

2. **Collections/Playlists**

   - Group related resources
   - Curated learning paths
   - Recommended resources

3. **Comments & Ratings**

   - User feedback
   - Star ratings
   - Resource reviews

4. **File Upload**

   - Direct file upload to server/cloud storage
   - Automatic thumbnail generation
   - PDF preview

5. **Version Control**

   - Track resource updates
   - Version history
   - Change notifications

6. **Notifications**

   - Email alerts for new resources
   - Favorite resource updates
   - Personalized recommendations

7. **Analytics Dashboard**

   - Download trends
   - Popular resources
   - User engagement metrics
   - Geographic data

8. **Social Sharing**

   - Share to social media
   - Generate share links
   - Embed resources

9. **Accessibility Features**

   - Screen reader support
   - Transcript for videos
   - Alternative formats

10. **Multi-language Content**
    - Separate resources per language
    - Translated resources
    - Language-specific filtering

## Best Practices

### Admin Guidelines

1. **Resource Quality**

   - Ensure files are accessible and high quality
   - Use descriptive titles and descriptions
   - Add relevant thumbnails
   - Keep page counts accurate

2. **Featured Resources**

   - Limit featured resources (3-5 recommended)
   - Rotate featured content regularly
   - Feature recent/important publications

3. **File Management**

   - Use CDN for better performance
   - Compress PDFs when possible
   - Host videos on appropriate platforms

4. **Metadata**
   - Always include publish date
   - Add page counts for documents
   - Use correct resource types

### User Guidelines

1. **Favorites**

   - Use favorites as bookmarks
   - Review favorites regularly
   - Manage favorite list

2. **Downloads**
   - Respect copyright
   - Use for educational purposes
   - Share appropriately

## Testing

### Manual Testing Checklist

- [ ] Browse resources as public user
- [ ] Search and filter resources
- [ ] View resource details
- [ ] Track clicks on downloads
- [ ] Login and favorite resources
- [ ] View favorites in member dashboard
- [ ] Remove favorites
- [ ] Admin: Create new resource
- [ ] Admin: Edit existing resource
- [ ] Admin: Delete resource
- [ ] Admin: View analytics
- [ ] Test with different resource types
- [ ] Verify unique favorite constraint
- [ ] Test error handling

## Troubleshooting

### Common Issues

**Problem**: Resource not appearing in list

- **Solution**: Check if filters are applied, refresh page

**Problem**: Favorite button not working

- **Solution**: Verify user is logged in, check JWT token

**Problem**: Download count not incrementing

- **Solution**: Check network tab for API errors, verify endpoint

**Problem**: Admin can't create resource

- **Solution**: Verify user has ADMIN role, check all required fields

**Problem**: Thumbnail not displaying

- **Solution**: Check thumbnail URL is valid and accessible

## Support

For issues or questions about the resources system:

- Create an issue on GitHub
- Check existing documentation
- Contact development team

---

**Last Updated**: November 2025
