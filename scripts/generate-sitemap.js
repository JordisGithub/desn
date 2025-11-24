#!/usr/bin/env node
// generate-sitemap.js
// Advanced sitemap generator with sitemap index organization
// Generates multiple sitemaps by category for better SEO and organization
// Usage: node scripts/generate-sitemap.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Canonical domain (adjust if staging)
const DOMAIN = "https://desnepal.org";

// Categorized routes - public pages only (excludes auth/admin routes blocked in robots.txt)
const routeCategories = {
  main: {
    priority: "0.9",
    changefreq: "daily",
    routes: ["/", "/about", "/contact", "/accessibility"],
  },
  programs: {
    priority: "0.8",
    changefreq: "weekly",
    routes: ["/programs", "/get-involved", "/donate"],
  },
  content: {
    priority: "0.7",
    changefreq: "weekly",
    routes: ["/events", "/resources"],
  },
  utility: {
    priority: "0.5",
    changefreq: "monthly",
    routes: ["/search"],
  },
};

const now = new Date().toISOString();

// Generate individual sitemap for each category
function generateCategorySitemap(category, config) {
  const urlNodes = config.routes
    .map(
      (route) =>
        `  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${route === "/" ? "1.0" : config.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>
`;
}

// Generate sitemap index that references all category sitemaps
function generateSitemapIndex(categories) {
  const sitemapNodes = Object.keys(categories)
    .map(
      (category) =>
        `  <sitemap>
    <loc>${DOMAIN}/sitemap-${category}.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapNodes}
</sitemapindex>
`;
}

// Main execution
const publicDir = path.join(__dirname, "..", "public");

// Generate individual category sitemaps
Object.entries(routeCategories).forEach(([category, config]) => {
  const xml = generateCategorySitemap(category, config);
  const outPath = path.join(publicDir, `sitemap-${category}.xml`);
  fs.writeFileSync(outPath, xml, "utf8");
  console.log(`✓ Generated ${outPath} (${config.routes.length} URLs)`);
});

// Generate sitemap index
const indexXml = generateSitemapIndex(routeCategories);
const indexPath = path.join(publicDir, "sitemap.xml");
fs.writeFileSync(indexPath, indexXml, "utf8");
console.log(`✓ Generated ${indexPath} (sitemap index)`);

// Count total URLs
const totalUrls = Object.values(routeCategories).reduce(
  (sum, config) => sum + config.routes.length,
  0
);
console.log(
  `\n✅ Sitemap generation complete: ${totalUrls} total URLs across ${
    Object.keys(routeCategories).length
  } categories`
);

export { routeCategories, generateCategorySitemap, generateSitemapIndex };
