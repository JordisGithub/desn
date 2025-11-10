import Fuse from "fuse.js";
// @ts-expect-error - ApiService is JS
import ApiService from "./ApiService.js";

export type SearchItemType = "resource" | "event" | "page";

export interface SearchItem {
  id: string;
  type: SearchItemType;
  title: string;
  excerpt?: string;
  url: string;
  date?: string;
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
        const [resourcesRes, eventsRes] = await Promise.all([
          ApiService.get("/api/resources"),
          ApiService.get("/api/events"),
        ]);

        const resources: Array<Record<string, unknown>> =
          resourcesRes?.resources || resourcesRes || [];
        const events: Array<Record<string, unknown>> =
          eventsRes?.events || eventsRes || [];

        const resourceItems: SearchItem[] = resources.map((r) => {
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

        const eventItems: SearchItem[] = events.map((e) => {
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

        const pageItems: SearchItem[] = [
          {
            id: "page-home",
            type: "page",
            title: "Home",
            url: "/",
            excerpt: "",
          },
          {
            id: "page-about",
            type: "page",
            title: "About",
            url: "/about",
            excerpt: "",
          },
          {
            id: "page-get-involved",
            type: "page",
            title: "Get Involved",
            url: "/get-involved",
            excerpt: "",
          },
          {
            id: "page-events",
            type: "page",
            title: "Events",
            url: "/events",
            excerpt: "",
          },
          {
            id: "page-resources",
            type: "page",
            title: "Resources",
            url: "/resources",
            excerpt: "",
          },
          {
            id: "page-programs",
            type: "page",
            title: "Programs",
            url: "/programs",
            excerpt: "",
          },
          {
            id: "page-contact",
            type: "page",
            title: "Contact",
            url: "/contact",
            excerpt: "",
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

    // If query is long enough, prefer server-side search (faster for large datasets)
    if (query.trim().length >= 4) {
      try {
        const res = await ApiService.get(
          `/api/search?q=${encodeURIComponent(query)}&limit=${limit}`
        );
        const resources = (res?.resources || []) as Array<
          Record<string, unknown>
        >;
        const events = (res?.events || []) as Array<Record<string, unknown>>;

        const items: SearchItem[] = [
          ...resources.map((r) => {
            const rr = r as Record<string, unknown>;
            const id = String(rr["id"] ?? "");
            return {
              id: `resource-${id}`,
              type: "resource",
              title: String(rr["title"] ?? "Untitled Resource"),
              excerpt: String(rr["description"] ?? ""),
              url: `/resources/${id}`,
              date: String(rr["publishDate"] ?? ""),
            } as SearchItem;
          }),
          ...events.map((e) => {
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
          }),
        ];

        return items.slice(0, limit);
      } catch {
        // fallback to client index
        console.warn("Server search failed, falling back to client index");
      }
    }

    if (!this.fuse) await this.buildIndex();
    if (!this.fuse) return [];

    const results = this.fuse.search(query, { limit });
    return results.map((r) => r.item);
  }

  // Force refresh (clear cache and rebuild)
  async refresh(): Promise<void> {
    try {
      if (typeof window !== "undefined")
        sessionStorage.removeItem("desn_search_index");
    } catch (err) {
      // ignore
    }
    this.fuse = null;
    this.items = [];
    await this.buildIndex();
  }
}

export default new SearchService();
