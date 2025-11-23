#!/usr/bin/env node
// generate-sitemap.js
// Simple sitemap generator based on static React Router route list.
// Usage: node scripts/generate-sitemap.js > public/sitemap.xml

const fs = require("fs");
const path = require("path");

// Canonical domain (adjust if staging)
const DOMAIN = "https://desnepal.org";

// Static routes derived from App.tsx
const routes = [
  "/",
  "/about",
  "/get-involved",
  "/events",
  "/resources",
  "/contact",
  "/programs",
  "/search",
  "/accessibility",
  "/login",
  "/register",
  "/owner/dashboard",
  "/admin/dashboard",
  "/member/dashboard",
  "/payment/verify",
  "/donate",
];

const now = new Date().toISOString();

const urlNodes = routes
  .map(
    (r) =>
      `  <url>\n    <loc>${DOMAIN}${
        r === "/" ? "/" : r
      }</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${
        r === "/" ? "1.0" : "0.7"
      }</priority>\n  </url>`
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlNodes}\n</urlset>\n`;

// Write directly if run without redirect
if (require.main === module) {
  const outPath = path.join(__dirname, "..", "public", "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf8");
  console.log(`Sitemap written to ${outPath}`);
}

module.exports = { xml };
