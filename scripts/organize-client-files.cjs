#!/usr/bin/env node

/**
 * Script to organize and upload client-provided PDF files
 * This script:
 * 1. Moves files from client folders to static/resources with proper naming
 * 2. Uploads each file via the API
 * 3. Creates Resource database entries
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const BASE_PATH = path.join(__dirname, '..', 'backend', 'src', 'main', 'resources');
const STATIC_PATH = path.join(BASE_PATH, 'static', 'resources');

// Mapping of client folders to categories
const FOLDER_MAPPINGS = {
  'Annual Reports': 'annual-reports',
  'BoDs CVs': 'guidelines',  // Store CVs as guidelines
  'DESN Legal Incorporation Documents': 'guidelines',
  'DESN Policies': 'policy-briefs',
  'Publications': 'newsletters',
};

// Files to skip
const SKIP_FILES = ['.DS_Store', 'Thumbs.db', '.gitkeep'];

function sanitizeFileName(filename) {
  // Remove or replace problematic characters
  return filename
    .replace(/[^a-zA-Z0-9.\-_() ]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✓ Created directory: ${dirPath}`);
  }
}

function copyFile(sourcePath, destPath) {
  try {
    fs.copyFileSync(sourcePath, destPath);
    return true;
  } catch (error) {
    console.error(`✗ Error copying file: ${error.message}`);
    return false;
  }
}

function processClientFiles() {
  console.log('\n📦 Starting file organization process...\n');
  
  const fileManifest = [];

  Object.entries(FOLDER_MAPPINGS).forEach(([clientFolder, category]) => {
    const sourceDirPath = path.join(BASE_PATH, clientFolder);
    
    if (!fs.existsSync(sourceDirPath)) {
      console.log(`⚠ Folder not found: ${clientFolder}`);
      return;
    }

    const categoryPath = path.join(STATIC_PATH, category);
    ensureDirectoryExists(categoryPath);

    console.log(`\n📁 Processing: ${clientFolder} → ${category}`);
    
    const files = fs.readdirSync(sourceDirPath);
    
    files.forEach(file => {
      // Skip non-PDF files and system files
      if (!file.toLowerCase().endsWith('.pdf') || SKIP_FILES.includes(file)) {
        if (!SKIP_FILES.includes(file)) {
          console.log(`  ⊘ Skipping non-PDF: ${file}`);
        }
        return;
      }

      const sourcePath = path.join(sourceDirPath, file);
      const sanitizedName = sanitizeFileName(file);
      const destPath = path.join(categoryPath, sanitizedName);

      if (copyFile(sourcePath, destPath)) {
        console.log(`  ✓ Copied: ${file}`);
        
        // Add to manifest
        fileManifest.push({
          originalName: file,
          sanitizedName: sanitizedName,
          category: category,
          categoryDisplay: Object.keys(FOLDER_MAPPINGS).find(k => FOLDER_MAPPINGS[k] === category) || category,
          relativePath: `${category}/${sanitizedName}`,
          fileUrl: `/resources/${category}/${sanitizedName}`,
          sourceFolder: clientFolder,
        });
      }
    });
  });

  // Save manifest
  const manifestPath = path.join(__dirname, 'file-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(fileManifest, null, 2));
  console.log(`\n✓ File manifest saved to: ${manifestPath}`);
  console.log(`\n📊 Total files processed: ${fileManifest.length}\n`);

  return fileManifest;
}

function generateSQLInserts(manifest) {
  console.log('\n📝 Generating SQL INSERT statements...\n');
  
  const sqlStatements = [];
  
  // First, clear existing resources
  sqlStatements.push('-- Clear existing resources');
  sqlStatements.push('DELETE FROM resource_favorites;');
  sqlStatements.push('DELETE FROM resources;');
  sqlStatements.push('');
  
  // Generate INSERT statements
  sqlStatements.push('-- Insert new resources from client files');
  manifest.forEach((file, index) => {
    const title = file.originalName.replace('.pdf', '').replace(/-/g, ' ');
    const description = `${file.categoryDisplay} - ${file.originalName}`;
    const publishDate = new Date().toISOString().split('T')[0];
    
    const sql = `INSERT INTO resources (id, title, description, type, file_url, pages, featured, clicks, favorite_count, publish_date, thumbnail_url) VALUES (${index + 1}, '${title.replace(/'/g, "''")}', '${description.replace(/'/g, "''")}', '${file.category}', 'http://localhost:8080${file.fileUrl}', 0, ${index < 3 ? 'TRUE' : 'FALSE'}, 0, 0, '${publishDate}', NULL);`;
    
    sqlStatements.push(sql);
  });

  const sqlPath = path.join(__dirname, 'import-resources.sql');
  fs.writeFileSync(sqlPath, sqlStatements.join('\n'));
  console.log(`✓ SQL file generated: ${sqlPath}`);
  console.log(`\nTo import into database, run:`);
  console.log(`  cd backend && ./mvnw spring-boot:run`);
  console.log(`  Then access H2 console at http://localhost:8080/h2-console`);
  console.log(`  And execute the SQL from: ${sqlPath}\n`);
}

// Main execution
try {
  console.log('\n=================================================');
  console.log('  DESN Resources File Organization Script');
  console.log('=================================================');
  
  const manifest = processClientFiles();
  generateSQLInserts(manifest);
  
  console.log('\n✅ File organization complete!');
  console.log('\nNext steps:');
  console.log('  1. Start the backend: cd backend && ./mvnw spring-boot:run');
  console.log('  2. Access H2 console: http://localhost:8080/h2-console');
  console.log('  3. Run the SQL from: ./scripts/import-resources.sql');
  console.log('  4. View resources at: http://localhost:5176/resources');
  console.log('=================================================\n');
  
} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
