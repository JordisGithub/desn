import Fuse from "fuse.js";
import ApiService from "./ApiService";

export type SearchItemType = "resource" | "event" | "page" | "document";

export interface SearchItem {
  id: string;
  type: SearchItemType;
  title: string;
  excerpt?: string;
  url: string;
  date?: string;
  matchText?: string;
}

class SearchService {
  private fuse: Fuse<SearchItem> | null = null;
  private items: SearchItem[] = [];
  private isBuilding = false;

  // Build the index by fetching minimal datasets
  async buildIndex(): Promise<void> {
    if (this.fuse || this.isBuilding) return;
    this.isBuilding = true;

    try {
      // No caching - always build fresh index to ensure latest content is searchable
      interface ResourcesResponse {
        resources?: Array<Record<string, unknown>>;
      }
      interface EventsResponse {
        events?: Array<Record<string, unknown>>;
      }

      let resourceItems: SearchItem[] = [];
      let eventItems: SearchItem[] = [];

      try {
        // Only try to fetch from API if we have a valid BASE_URL
        // In production without VITE_API_BASE_URL set, API calls will fail gracefully
        // and search will use static items only (which is acceptable)
        const resourcesPromise = ApiService.get<ResourcesResponse>(
          "/api/resources"
        ).catch(() => ({ resources: [] }));
        const eventsPromise = ApiService.get<EventsResponse>(
          "/api/events"
        ).catch(() => ({ events: [] }));

        const [resourcesRes, eventsRes] = await Promise.all([
          resourcesPromise,
          eventsPromise,
        ]);

        const resources: Array<Record<string, unknown>> =
          resourcesRes?.resources || [];
        const events: Array<Record<string, unknown>> = eventsRes?.events || [];

        resourceItems = resources.map((r) => {
          const rr = r as Record<string, unknown>;
          return {
            id: `resource-${String(rr["id"])}`,
            type: "resource",
            title: String(rr["title"] ?? "Untitled Resource"),
            excerpt: String(rr["description"] ?? ""),
            url: `/resources`, // Link to resources page, not individual resource
            date: String(rr["publishDate"] ?? ""),
          } as SearchItem;
        });

        eventItems = events.map((e) => {
          const ee = e as Record<string, unknown>;
          const id = String(ee["id"] ?? "");
          return {
            id: `event-${id}`,
            type: "event",
            title: String(ee["title"] ?? ee["name"] ?? `Event ${id}`),
            excerpt: String(ee["description"] ?? ""),
            url: `/events/${id}`,
            date: String(ee["startDate"] ?? ee["date"] ?? ""),
          } as SearchItem;
        });
      } catch (apiError) {
        // API errors are expected when backend is not available
        // Search will still work with static page and document items
        if (import.meta.env.DEV) {
          console.warn(
            "API calls failed (backend may not be running), using static items only:",
            apiError
          );
        }
      }

      const pageItems: SearchItem[] = [
        {
          id: "page-home",
          type: "page",
          title: "Home",
          url: "/",
          excerpt:
            "DESN homepage - Empowering persons with disabilities in Nepal through inclusive programs and advocacy",
        },
        {
          id: "page-about",
          type: "page",
          title: "About Us",
          url: "/about",
          excerpt:
            "Learn about DESN's mission, vision, and our work with persons with disabilities in Nepal",
        },
        {
          id: "page-programs",
          type: "page",
          title: "Programs & Services",
          url: "/programs",
          excerpt:
            "Education, Livelihood, and Advocacy programs for persons with disabilities including ICT training, skill development, and employment support",
        },
        {
          id: "page-programs-education",
          type: "page",
          title: "Education Programs",
          url: "/programs#pillar-education",
          excerpt:
            "ICT Training, Braille & Sign Language instruction, Scholarship Fund for students with disabilities",
        },
        {
          id: "page-programs-livelihood",
          type: "page",
          title: "Livelihood Programs",
          url: "/programs#pillar-livelihood",
          excerpt:
            "Microfinance, Skill Development training, Job Placement Support for employment and economic empowerment",
        },
        {
          id: "page-programs-advocacy",
          type: "page",
          title: "Advocacy & Rights",
          url: "/programs#pillar-advocacy",
          excerpt:
            "UNCRPD Monitoring, Policy Dialogue, Barrier-Free Environment Campaign for disability rights and inclusion",
        },
        {
          id: "page-what-we-do",
          type: "page",
          title: "What We Do",
          url: "/programs",
          excerpt:
            "DESN promotes disability inclusion through education, livelihood programs, and policy advocacy in Nepal",
        },
        {
          id: "page-impact",
          type: "page",
          title: "Our Impact",
          url: "/about",
          excerpt:
            "DESN has empowered thousands of persons with disabilities through training, employment, and advocacy initiatives",
        },
        {
          id: "page-get-involved",
          type: "page",
          title: "Get Involved",
          url: "/get-involved",
          excerpt:
            "Join our mission to support DESN's work. Volunteer, donate, or become a member to support DESN's mission of empowerment for persons with disabilities",
        },
        {
          id: "page-volunteer",
          type: "page",
          title: "Volunteer with DESN",
          url: "/get-involved#volunteer",
          excerpt:
            "Join our team of volunteers making a difference in the lives of persons with disabilities",
        },
        {
          id: "page-donate",
          type: "page",
          title: "Donate",
          url: "/get-involved#donate",
          excerpt:
            "Support DESN programs with your generous donation to help persons with disabilities",
        },
        {
          id: "page-membership",
          type: "page",
          title: "Become a Member",
          url: "/get-involved#membership",
          excerpt:
            "Become a DESN member and join our community supporting disability inclusion and empowerment",
        },
        {
          id: "page-events",
          type: "page",
          title: "Events & Activities",
          url: "/events",
          excerpt:
            "Upcoming events, workshops, and activities promoting disability awareness and inclusion",
        },
        {
          id: "page-resources",
          type: "page",
          title: "Resources & Publications",
          url: "/resources",
          excerpt:
            "Documents, publications, policies, and helpful resources on disability empowerment",
        },
        {
          id: "page-contact",
          type: "page",
          title: "Contact DESN",
          url: "/contact",
          excerpt:
            "Get in touch with DESN - Location, phone, email address for inquiries",
        },
      ];

      // Document/Publication items - actual resources
      // These serve as fallback when API is unavailable
      const documentItems: SearchItem[] = [];

      // If API failed, add some sample resources to search index
      // This ensures users can still search for resources when backend is unavailable
      if (resourceItems.length === 0 && import.meta.env.DEV) {
        resourceItems = [
          {
            id: "resource-sample-1",
            type: "resource",
            title: "Disability Inclusion Toolkit",
            excerpt:
              "Comprehensive toolkit for implementing disability inclusion in organizations",
            url: "/resources",
            date: "2024-01-15",
          },
          {
            id: "resource-sample-2",
            type: "resource",
            title: "Employment Support Guide",
            excerpt:
              "Guide for job placement support and employment opportunities for persons with disabilities",
            url: "/resources",
            date: "2024-02-20",
          },
          {
            id: "resource-sample-3",
            type: "resource",
            title: "Accessibility Standards",
            excerpt:
              "Standards and best practices for creating accessible digital and physical environments",
            url: "/resources",
            date: "2024-03-10",
          },
        ];
      }

      this.items = [
        ...resourceItems,
        ...eventItems,
        ...documentItems,
        ...pageItems,
      ];

      // Create Fuse index
      this.fuse = new Fuse(this.items, {
        keys: ["title", "excerpt", "type"],
        threshold: 0.35,
        includeMatches: true,
        minMatchCharLength: 2,
      });
    } catch (error) {
      console.error("Error building search index", error);
      this.items = [];
      this.fuse = new Fuse([], { keys: ["title"] });
    } finally {
      this.isBuilding = false;
    }
  }

  async search(query: string, limit = 8): Promise<SearchItem[]> {
    if (!query || query.trim().length === 0) return [];

    // Build index if not already built
    if (!this.fuse) await this.buildIndex();
    if (!this.fuse) return [];

    // Use client-side Fuse.js search for all queries
    const results = this.fuse.search(query, { limit });
    return results.map((r) => {
      const item = { ...r.item };

      // Extract matching text for context
      if (r.matches && r.matches.length > 0) {
        const match = r.matches[0];
        if (match.value) {
          // Get text around the match for context
          const matchValue = match.value;
          const indices = match.indices?.[0];
          if (indices) {
            const [start, end] = indices;
            const contextStart = Math.max(0, start - 40);
            const contextEnd = Math.min(matchValue.length, end + 80);
            let excerpt = matchValue.substring(contextStart, contextEnd);

            // Add ellipsis if truncated
            if (contextStart > 0) excerpt = "..." + excerpt;
            if (contextEnd < matchValue.length) excerpt = excerpt + "...";

            item.matchText = excerpt;
          } else {
            // Fallback to excerpt if no indices
            item.matchText = item.excerpt;
          }
        }
      }

      return item;
    });
  }

  // Force refresh (clear cache and rebuild)
  async refresh(): Promise<void> {
    this.fuse = null;
    this.items = [];
    await this.buildIndex();
  }
}

export default new SearchService();
