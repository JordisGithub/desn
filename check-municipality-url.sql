-- Check the exact file_url for the municipality translation resource
SELECT id, title, file_url 
FROM resources 
WHERE file_url LIKE '%municipality%translation%';
