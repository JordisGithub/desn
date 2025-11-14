package com.example.proxy.service;

import com.example.proxy.config.FileStorageConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.UUID;

@Service
public class FileStorageService {
    
    private static final Logger log = LoggerFactory.getLogger(FileStorageService.class);
    
    private final Path fileStorageLocation;
    private final FileStorageConfig fileStorageConfig;
    
    public FileStorageService(FileStorageConfig fileStorageConfig) {
        this.fileStorageConfig = fileStorageConfig;
        this.fileStorageLocation = Path.of(fileStorageConfig.getUploadDir())
                .toAbsolutePath().normalize();
        
        try {
            Files.createDirectories(this.fileStorageLocation);
            log.info("File storage location initialized: {}", this.fileStorageLocation);
        } catch (Exception ex) {
            log.error("Could not create the directory where the uploaded files will be stored.", ex);
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }
    
    /**
     * Store file in the specified category subdirectory
     */
    public String storeFile(MultipartFile file, String category) {
        // Validate file
        validateFile(file);
        
        // Normalize category (e.g., "annual-report" -> "annual-reports")
        String categoryDir = normalizeCategoryDir(category);
        
        // Create category directory if it doesn't exist
        Path categoryPath = this.fileStorageLocation.resolve(categoryDir);
        try {
            Files.createDirectories(categoryPath);
        } catch (IOException ex) {
            throw new RuntimeException("Could not create category directory: " + categoryDir, ex);
        }
        
        // Generate safe filename
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || originalFilename.trim().isEmpty()) {
            throw new IllegalArgumentException("Original filename cannot be null or empty");
        }
        originalFilename = StringUtils.cleanPath(originalFilename);
        String filename = generateUniqueFilename(originalFilename);
        
        try {
            // Check if filename contains invalid characters
            if (filename.contains("..")) {
                throw new RuntimeException("Filename contains invalid path sequence: " + filename);
            }
            
            // Copy file to the target location
            Path targetLocation = categoryPath.resolve(filename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            
            log.info("File stored successfully: {} in category: {}", filename, categoryDir);
            
            // Return the relative path that can be used in URLs
            return categoryDir + "/" + filename;
        } catch (IOException ex) {
            log.error("Could not store file {}. Please try again!", filename, ex);
            throw new RuntimeException("Could not store file " + filename + ". Please try again!", ex);
        }
    }
    
    /**
     * Load file as Resource
     */
    public Resource loadFileAsResource(String filename) {
        try {
            Path filePath = this.fileStorageLocation.resolve(filename).normalize();
            @SuppressWarnings("null")
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found: " + filename);
            }
        } catch (MalformedURLException ex) {
            log.error("File not found: {}", filename, ex);
            throw new RuntimeException("File not found: " + filename, ex);
        }
    }
    
    /**
     * Delete file
     */
    public boolean deleteFile(String filePath) {
        try {
            Path targetPath = this.fileStorageLocation.resolve(filePath).normalize();
            
            // Security check: ensure the file is within our storage directory
            if (!targetPath.startsWith(this.fileStorageLocation)) {
                throw new SecurityException("Cannot delete file outside storage directory");
            }
            
            boolean deleted = Files.deleteIfExists(targetPath);
            if (deleted) {
                log.info("File deleted successfully: {}", filePath);
            } else {
                log.warn("File not found for deletion: {}", filePath);
            }
            return deleted;
        } catch (IOException ex) {
            log.error("Could not delete file: {}", filePath, ex);
            throw new RuntimeException("Could not delete file: " + filePath, ex);
        }
    }
    
    /**
     * Validate uploaded file
     */
    private void validateFile(MultipartFile file) {
        // Check if file is empty
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot upload empty file");
        }
        
        // Check file size
        if (file.getSize() > fileStorageConfig.getMaxFileSize()) {
            throw new IllegalArgumentException(
                    "File size exceeds maximum allowed size of %d bytes".formatted(
                            fileStorageConfig.getMaxFileSize())
            );
        }
        
        // Check file type
        String contentType = file.getContentType();
        if (contentType == null || !Arrays.asList(fileStorageConfig.getAllowedTypes()).contains(contentType)) {
            throw new IllegalArgumentException(
                "Invalid file type. Only PDF files are allowed. Received: " + contentType
            );
        }
        
        // Check file extension
        String filename = file.getOriginalFilename();
        if (filename == null) {
            throw new IllegalArgumentException("Filename cannot be null");
        }
        
        String extension = filename.substring(filename.lastIndexOf(".")).toLowerCase();
        if (!Arrays.asList(fileStorageConfig.getAllowedExtensions()).contains(extension)) {
            throw new IllegalArgumentException(
                "Invalid file extension. Only PDF files are allowed. Received: " + extension
            );
        }
    }
    
    /**
     * Generate unique filename to avoid conflicts
     */
    private String generateUniqueFilename(String originalFilename) {
        String extension = "";
        String baseName = originalFilename;
        
        int dotIndex = originalFilename.lastIndexOf(".");
        if (dotIndex > 0) {
            extension = originalFilename.substring(dotIndex);
            baseName = originalFilename.substring(0, dotIndex);
        }
        
        // Sanitize base name (remove special chars, keep only alphanumeric, hyphens, underscores)
        baseName = baseName.replaceAll("[^a-zA-Z0-9-_]", "-").toLowerCase();
        
        // Add timestamp and short UUID to ensure uniqueness
        String timestamp = String.valueOf(System.currentTimeMillis());
        String shortUuid = UUID.randomUUID().toString().substring(0, 8);
        
        return baseName + "-" + timestamp + "-" + shortUuid + extension;
    }
    
    /**
     * Normalize category to directory name
     */
    private String normalizeCategoryDir(String category) {
        if (category == null || category.trim().isEmpty()) {
            return "general";
        }
        
        // Map resource types to directory names
        switch (category.toLowerCase()) {
            case "annual-report":
                return "annual-reports";
            case "policy-brief":
                return "policy-briefs";
            case "training-manual":
                return "training-manuals";
            case "research":
                return "research";
            case "guideline":
                return "guidelines";
            case "newsletter":
                return "newsletters";
            case "video":
                return "videos";
            default:
                return category.toLowerCase().replaceAll("[^a-z0-9-]", "-");
        }
    }
    
    /**
     * Get the base URL for accessing uploaded files
     */
    public String getFileUrl(String filePath) {
        // Files in static/resources will be served at /resources/<path>
        return "/resources/" + filePath;
    }
}
