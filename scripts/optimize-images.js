#!/usr/bin/env node
// Simple image optimizer using sharp. It creates resized WebP/JPEG variants and a tiny base64 placeholder map.
// Run: npm run optimize-images

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC_DIR = path.resolve(__dirname, "../src/assets");
const OUT_DIR = path.resolve(SRC_DIR, "optimized");
const META_FILE = path.resolve(OUT_DIR, "meta.json");

const sizes = [400, 800, 1200, 1600];

async function ensureOut() {
  await fs.promises.mkdir(OUT_DIR, { recursive: true });
}

function isImage(file) {
  return /\.(jpe?g|png|webp)$/i.test(file);
}

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (e.isFile() && isImage(e.name)) files.push(full);
  }
  return files;
}

async function processImage(file) {
  const rel = path.relative(SRC_DIR, file);
  const name = rel
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  const meta = { src: rel, variants: {}, placeholder: null };

  const image = sharp(file);
  const info = await image.metadata();

  // Create small placeholder (20px wide)
  try {
    const buf = await image.resize(20).blur(1).toBuffer();
    meta.placeholder = `data:${info.format};base64,${buf.toString("base64")}`;
  } catch (e) {
    console.warn("placeholder failed for", file, e.message);
  }

  for (const w of sizes) {
    if (info.width && info.width < w) continue; // don't upscale
    const outWebp = path.join(OUT_DIR, `${name}-${w}.webp`);
    const outJpg = path.join(OUT_DIR, `${name}-${w}.jpg`);
    try {
      await image.resize(w).webp({ quality: 75 }).toFile(outWebp);
      await image.resize(w).jpeg({ quality: 80 }).toFile(outJpg);
      meta.variants[w] = {
        webp: `./optimized/${path.basename(outWebp)}`,
        jpg: `./optimized/${path.basename(outJpg)}`,
      };
    } catch (e) {
      console.warn("resize failed for", file, e.message);
    }
  }

  // Also copy a 1600 fallback if not already created
  if (!meta.variants[1600]) {
    const outWebp = path.join(OUT_DIR, `${name}-1600.webp`);
    await image
      .resize(1600)
      .webp({ quality: 75 })
      .toFile(outWebp)
      .catch(() => {});
    meta.variants[1600] = { webp: `./optimized/${path.basename(outWebp)}` };
  }

  return meta;
}

(async function main() {
  console.log("Scanning", SRC_DIR);
  await ensureOut();
  const files = await walk(SRC_DIR);
  const metas = {};
  for (const f of files) {
    try {
      const m = await processImage(f);
      metas[m.src] = m;
      console.log("Optimized", m.src);
    } catch (e) {
      console.warn("Error processing", f, e.message);
    }
  }

  await fs.promises.writeFile(
    META_FILE,
    JSON.stringify(metas, null, 2),
    "utf8"
  );
  console.log("Wrote meta file to", META_FILE);
  console.log("Done.");
})();
