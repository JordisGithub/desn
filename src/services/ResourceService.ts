// @ts-expect-error ApiService is a JS file
import ApiService from "./ApiService.js";

export interface Resource {
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
  createdAt: string;
  updatedAt: string;
  featured: boolean;
}

export interface ResourceFavorite {
  favoriteId: number;
  favoritedAt: string;
  resource: Resource;
}

export interface ResourcesResponse {
  resources: Resource[];
  total: number;
  typeCounts: Record<string, number>;
}

export interface ResourceActionResponse {
  success: boolean;
  message: string;
  resource?: Resource;
}

export interface FavoriteResponse {
  success: boolean;
  isFavorited: boolean;
  favoriteCount: number;
  message: string;
}

export interface ClickResponse {
  success: boolean;
  clicks: number;
}

class ResourceService {
  /**
   * Get all resources with optional filters
   */
  async getResources(
    type?: string,
    search?: string
  ): Promise<ResourcesResponse> {
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    if (search) params.append("search", search);

    const queryString = params.toString();
    const endpoint = queryString
      ? `/api/resources?${queryString}`
      : "/api/resources";

    const response = await ApiService.get(endpoint);
    return response;
  }

  /**
   * Get featured resources
   */
  async getFeaturedResources(): Promise<Resource[]> {
    const response = await ApiService.get("/api/resources/featured");
    return response;
  }

  /**
   * Get single resource by ID
   */
  async getResource(resourceId: number): Promise<Resource> {
    const response = await ApiService.get(`/api/resources/${resourceId}`);
    return response;
  }

  /**
   * Create new resource (Admin only)
   */
  async createResource(
    resourceData: Partial<Resource>,
    _token: string
  ): Promise<ResourceActionResponse> {
    const response = await ApiService.postWithAuth(
      "/api/resources",
      resourceData
    );
    return response;
  }

  /**
   * Update resource (Admin only)
   */
  async updateResource(
    resourceId: number,
    resourceData: Partial<Resource>,
    _token: string
  ): Promise<ResourceActionResponse> {
    const response = await ApiService.putWithAuth(
      `/api/resources/${resourceId}`,
      resourceData
    );
    return response;
  }

  /**
   * Delete resource (Admin only)
   */
  async deleteResource(
    resourceId: number,
    _token: string
  ): Promise<ResourceActionResponse> {
    const response = await ApiService.deleteWithAuth(
      `/api/resources/${resourceId}`
    );
    return response;
  }

  /**
   * Toggle favorite for a resource
   */
  async toggleFavorite(
    resourceId: number,
    username: string,
    _token: string
  ): Promise<FavoriteResponse> {
    const response = await ApiService.postWithAuth(
      `/api/resources/${resourceId}/favorite`,
      { username }
    );
    return response;
  }

  /**
   * Track click on a resource (for analytics)
   */
  async trackClick(resourceId: number): Promise<ClickResponse> {
    const response = await ApiService.postWithAuth(
      `/api/resources/${resourceId}/click`,
      {}
    );
    return response;
  }

  /**
   * Get user's favorited resources
   */
  async getUserFavorites(
    username: string,
    token: string
  ): Promise<ResourceFavorite[]> {
    const response = await ApiService.get(
      `/api/resources/user/${username}/favorites`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }

  /**
   * Check if resource is favorited by user
   */
  async getFavoriteStatus(
    resourceId: number,
    username: string,
    token: string
  ): Promise<{ isFavorited: boolean }> {
    const response = await ApiService.get(
      `/api/resources/${resourceId}/favorite-status?username=${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  }

  /**
   * Get all resources for admin (with full analytics)
   */
  async getAllResourcesForAdmin(token: string): Promise<Resource[]> {
    const response = await ApiService.get("/api/resources/admin/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }

  /**
   * Helper to get resource type display name
   */
  getResourceTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      "annual-report": "Annual Report",
      "policy-brief": "Policy Brief",
      "training-manual": "Training Manual",
      research: "Research",
      guideline: "Guideline",
      newsletter: "Newsletter",
      video: "Video Resource",
    };
    return labels[type] || type;
  }

  /**
   * Format publish date
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}

export default new ResourceService();
