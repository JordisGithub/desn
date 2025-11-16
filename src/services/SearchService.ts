import Fuse from "fuse.js";
import ApiService from "./ApiService";

export type SearchItemType = "resource" | "event" | "page";

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
      // Try sessionStorage cache first
      const cached =
        typeof window !== "undefined" &&
        sessionStorage.getItem("desn_search_index");
      if (cached) {
        this.items = JSON.parse(cached) as SearchItem[];
      } else {
        interface ResourcesResponse {
          resources?: Array<Record<string, unknown>>;
        }
        interface EventsResponse {
          events?: Array<Record<string, unknown>>;
        }

        let resourceItems: SearchItem[] = [];
        let eventItems: SearchItem[] = [];

        try {
          const [resourcesRes, eventsRes] = await Promise.all([
            ApiService.get<ResourcesResponse>("/api/resources"),
            ApiService.get<EventsResponse>("/api/events"),
          ]);

          const resources: Array<Record<string, unknown>> =
            resourcesRes?.resources || [];
          const events: Array<Record<string, unknown>> =
            eventsRes?.events || [];

          resourceItems = resources.map((r) => {
            const rr = r as Record<string, unknown>;
            return {
              id: `resource-${String(rr["id"])}`,
              type: "resource",
              title: String(rr["title"] ?? "Untitled Resource"),
              excerpt: String(rr["description"] ?? ""),
              url: `/resources/${String(rr["id"])}`,
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
          console.warn("API calls failed, using page items only:", apiError);
        }

        const pageItems: SearchItem[] = [
          {
            id: "page-home",
            type: "page",
            title: "Home",
            url: "/",
            excerpt:
              "DESN homepage - Empowering persons with disabilities in Nepal",
          },
          {
            id: "page-about",
            type: "page",
            title: "About Us",
            url: "/about",
            excerpt:
              "Learn about DESN's mission, vision, and our work with persons with disabilities",
          },
          {
            id: "page-programs",
            type: "page",
            title: "Programs",
            url: "/programs",
            excerpt:
              "Education, Livelihood, and Advocacy programs for persons with disabilities",
          },
          {
            id: "page-programs-education",
            type: "page",
            title: "Education Programs",
            url: "/programs#pillar-education",
            excerpt: "ICT Training, Braille & Sign Language, Scholarship Fund",
          },
          {
            id: "page-programs-livelihood",
            type: "page",
            title: "Livelihood Programs",
            url: "/programs#pillar-livelihood",
            excerpt: "Microfinance, Skill Development, Job Placement Support",
          },
          {
            id: "page-programs-advocacy",
            type: "page",
            title: "Advocacy Programs",
            url: "/programs#pillar-advocacy",
            excerpt:
              "UNCRPD Monitoring, Policy Dialogue, Barrier-Free Environment Campaign",
          },
          {
            id: "page-get-involved",
            type: "page",
            title: "Get Involved",
            url: "/get-involved",
            excerpt:
              "Volunteer, donate, or become a member to support our cause",
          },
          {
            id: "page-volunteer",
            type: "page",
            title: "Volunteer",
            url: "/get-involved#volunteer",
            excerpt: "Join our team of volunteers making a difference",
          },
          {
            id: "page-donate",
            type: "page",
            title: "Donate",
            url: "/get-involved#donate",
            excerpt: "Support our programs with your generous donation",
          },
          {
            id: "page-membership",
            type: "page",
            title: "Membership",
            url: "/get-involved#membership",
            excerpt: "Become a DESN member and join our community",
          },
          {
            id: "page-events",
            type: "page",
            title: "Events",
            url: "/events",
            excerpt: "Upcoming events, workshops, and activities",
          },
          {
            id: "page-resources",
            type: "page",
            title: "Resources",
            url: "/resources",
            excerpt: "Documents, publications, and helpful resources",
          },
          {
            id: "page-contact",
            type: "page",
            title: "Contact",
            url: "/contact",
            excerpt: "Get in touch with DESN - Location, phone, email",
          },
        ];

        this.items = [...resourceItems, ...eventItems, ...pageItems];

        try {
          if (typeof window !== "undefined") {
            sessionStorage.setItem(
              "desn_search_index",
              JSON.stringify(this.items)
            );
          }
        } catch {
          // ignore sessionStorage errors
        }
      }

      // Create Fuse index
      this.fuse = new Fuse(this.items, {
        keys: ["title", "excerpt", "type"],
        threshold: 0.35,
        includeMatches: true,
        minMatchCharLength: 3,
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
    try {
      if (typeof window !== "undefined")
        sessionStorage.removeItem("desn_search_index");
    } catch {
      // ignore
    }
    this.fuse = null;
    this.items = [];
    await this.buildIndex();
  }
}

export default new SearchService();
