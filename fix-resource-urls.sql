-- Fix resource URLs from localhost to production IP
-- Run this on the production server with:
-- sudo -u postgres psql -d desn -f fix-resource-urls.sql

-- Update all localhost URLs to use the production IP address
UPDATE resources 
SET file_url = REPLACE(file_url, 'http://localhost:8080', 'http://98.81.50.37')
WHERE file_url LIKE 'http://localhost:8080%';

-- Verify the changes
SELECT id, title, file_url 
FROM resources 
ORDER BY id;
