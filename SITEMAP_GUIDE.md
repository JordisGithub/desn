# Sitemap Setup Guide

## ✅ What's Been Implemented

### 1. **Google Search Console Verification Meta Tag** (index.html)

```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />
```

**⚠️ ACTION REQUIRED:** Replace `YOUR_VERIFICATION_CODE_HERE` with your actual verification code from Google Search Console:

1. Go to https://search.google.com/search-console
2. Add property → Choose "HTML tag" method
3. Copy the `content` value from the meta tag Google provides
4. Replace `YOUR_VERIFICATION_CODE_HERE` in `/index.html`
5. Deploy your site
6. Click "Verify" in Google Search Console

---

### 2. **Cleaned Sitemap** (Removed Auth/Admin Pages)

✅ **Removed from sitemap** (still blocked in robots.txt):

- `/login`
- `/register`
- `/owner/dashboard`
- `/admin/dashboard`
- `/member/dashboard`
- `/payment/verify`

📊 **Result**: 16 URLs → 10 public URLs

---

### 3. **Organized Sitemap Index Structure**

Your sitemap is now organized into categories:

#### **Main Sitemap Index** (`/sitemap.xml`)

```xml
<sitemapindex>
  <sitemap><loc>https://desnepal.org/sitemap-main.xml</loc></sitemap>
  <sitemap><loc>https://desnepal.org/sitemap-programs.xml</loc></sitemap>
  <sitemap><loc>https://desnepal.org/sitemap-content.xml</loc></sitemap>
  <sitemap><loc>https://desnepal.org/sitemap-utility.xml</loc></sitemap>
</sitemapindex>
```

#### **Category Sitemaps:**

**sitemap-main.xml** (4 URLs - Priority 0.9, Daily updates)

- `/` (homepage - priority 1.0)
- `/about`
- `/contact`
- `/accessibility`

**sitemap-programs.xml** (3 URLs - Priority 0.8, Weekly)

- `/programs`
- `/get-involved`
- `/donate`

**sitemap-content.xml** (2 URLs - Priority 0.7, Weekly)

- `/events`
- `/resources`

**sitemap-utility.xml** (1 URL - Priority 0.5, Monthly)

- `/search`

---

### 4. **Automatic Sitemap Regeneration on Build**

✅ **Configured in package.json:**

```json
"build": "npm run generate:sitemap && tsc -b && vite build"
```

**What this means:**

- Every time you run `npm run build`, sitemaps are regenerated automatically
- Timestamps (`<lastmod>`) are updated to current time
- All 4 sitemap files are generated fresh

**Manual regeneration:**

```bash
npm run generate:sitemap
```

---

## 🚀 Next Steps for Google Search Console

### **Step 1: Update Verification Code**

1. Edit `/index.html`
2. Replace `YOUR_VERIFICATION_CODE_HERE` with your actual code
3. Commit and deploy

### **Step 2: Submit Sitemaps to Google**

After deploying, submit **all 4 category sitemaps** plus the index:

1. Go to Google Search Console → Sitemaps
2. Submit these URLs one by one:
   - `sitemap.xml` (index - submit this first)
   - `sitemap-main.xml`
   - `sitemap-programs.xml`
   - `sitemap-content.xml`
   - `sitemap-utility.xml`

**Why submit all?**

- More detailed analytics per category
- Better error tracking
- Faster indexing

### **Step 3: Monitor Results**

- Check status after 24-48 hours
- Expected: "Success" status with URLs discovered
- All sitemaps accessible at:
  - https://desnepal.org/sitemap.xml
  - https://desnepal.org/sitemap-main.xml
  - https://desnepal.org/sitemap-programs.xml
  - https://desnepal.org/sitemap-content.xml
  - https://desnepal.org/sitemap-utility.xml

---

## 📝 How to Add New Pages

**To add a new page to sitemap:**

1. Edit `/scripts/generate-sitemap.js`
2. Add the route to the appropriate category:

```javascript
const routeCategories = {
  main: {
    priority: "0.9",
    changefreq: "daily",
    routes: ["/", "/about", "/contact", "/accessibility", "/new-page"], // Add here
  },
  // ... other categories
};
```

3. Run: `npm run generate:sitemap` (or just build)
4. Commit and deploy

---

## 🔍 SEO Best Practices Implemented

✅ **Priority levels:**

- Homepage: 1.0
- Main pages: 0.9
- Programs: 0.8
- Content: 0.7
- Utility: 0.5

✅ **Update frequency:**

- Main pages: Daily (high visibility)
- Programs/Content: Weekly (regular updates)
- Utility: Monthly (stable)

✅ **Robots.txt compliance:**

- Sitemap index referenced
- Auth/admin pages excluded from sitemap
- Consistent with disallow rules

✅ **Technical SEO:**

- XML 1.0 encoding
- Proper namespace declarations
- ISO 8601 timestamps
- Valid sitemap index structure

---

## 🛠️ Troubleshooting

**Q: Sitemap shows "Couldn't fetch" in GSC**

- Verify sitemaps are accessible in browser
- Check deployment includes `public/sitemap*.xml` files
- Wait 24 hours and check again

**Q: Want to exclude a page from Google?**

- Remove from `routeCategories` in `generate-sitemap.js`
- Rebuild and deploy
- (Optional) Add to robots.txt `Disallow:`

**Q: How to change update frequency?**

- Edit `changefreq` in category config
- Valid values: `always`, `hourly`, `daily`, `weekly`, `monthly`, `yearly`, `never`

---

## 📊 Current Status

- ✅ 10 public URLs in sitemap (6 auth/admin removed)
- ✅ 4 category sitemaps + 1 index
- ✅ Automatic regeneration on build
- ✅ Google verification tag ready (needs your code)
- ⏳ Pending: Replace verification code and submit to GSC
