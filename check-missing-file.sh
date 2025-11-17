#!/bin/bash
# Check for the missing file on production server

echo "Checking for missing file..."
echo ""

# Check if file exists in the backend static resources
if [ -d "backend/src/main/resources/static/resources/guidelines" ]; then
    echo "Files in backend/src/main/resources/static/resources/guidelines/:"
    ls -lh backend/src/main/resources/static/resources/guidelines/ | grep -i "municipality.*translation"
else
    echo "Directory does not exist locally"
fi

echo ""
echo "All municipality files:"
find backend/src/main/resources/static/resources/guidelines/ -name "*municipality*" 2>/dev/null || echo "No municipality files found"
