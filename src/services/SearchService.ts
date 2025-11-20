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

        // Document/Publication items - actual resources
        const documentItems: SearchItem[] = [
          {
            id: "doc-communication-policy",
            type: "document",
            title: "Communication Policy",
            url: "/resources",
            excerpt: "Official communication policy of DESN",
          },
          {
            id: "doc-computer-usage-policy",
            type: "document",
            title: "Computer Usage Policy",
            url: "/resources",
            excerpt: "Computer usage policy and guidelines of DESN",
          },
          {
            id: "doc-annual-report",
            type: "document",
            title: "Annual Report",
            url: "/resources",
            excerpt: "DESN Annual Report - Strategic initiatives and impact",
          },
          {
            id: "doc-policy-brief",
            type: "document",
            title: "Policy Brief",
            url: "/resources",
            excerpt: "Policy briefs on disability rights and inclusion",
          },
          {
            id: "doc-guidelines",
            type: "document",
            title: "Accessibility Guidelines",
            url: "/resources",
            excerpt: "Guidelines for accessible environment and services",
          },
          {
            id: "doc-training-materials",
            type: "document",
            title: "Training Materials",
            url: "/resources",
            excerpt:
              "Educational materials for disability awareness and inclusion",
          },
          {
            id: "doc-research-papers",
            type: "document",
            title: "Research Papers",
            url: "/resources",
            excerpt: "Research and studies on disability empowerment in Nepal",
          },
          {
            id: "doc-publications",
            type: "document",
            title: "Publications",
            url: "/resources",
            excerpt: "DESN publications and articles on disability issues",
          },
          {
            id: "doc-protection-policy",
            type: "document",
            title: "Protection from Sexual Exploitation and Abuse Policy",
            url: "/resources",
            excerpt:
              "Protection from Sexual Exploitation and Abuse (PSEA) policy",
          },
          {
            id: "doc-data-protection-policy",
            type: "document",
            title: "Data Protection Policy",
            url: "/resources",
            excerpt:
              "Data protection and privacy policy for DESN beneficiaries and staff",
          },
          {
            id: "doc-financial-policy",
            type: "document",
            title: "Financial Policy and Procedures",
            url: "/resources",
            excerpt:
              "Financial management policies and procedures for organizational accountability",
          },
        ];

        this.items = [
          ...resourceItems,
          ...eventItems,
          ...documentItems,
          ...pageItems,
        ];

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
