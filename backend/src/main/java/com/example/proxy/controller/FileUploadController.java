package com.example.proxy.controller;

import com.example.proxy.service.FileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {
    
    private static final Logger log = LoggerFactory.getLogger(FileUploadController.class);
    
    private final FileStorageService fileStorageService;
    
    public FileUploadController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }
    
    /**
     * Upload a file (admin only)
     * POST /api/files/upload
     * 
     * @param file - The file to upload (multipart/form-data)
     * @param category - Resource category (annual-report, policy-brief, etc.)
     * @param authHeader - JWT token for authentication
     * @return Upload response with file URL
     */
    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "category", defaultValue = "general") String category,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Upload request received - File: {}, Category: {}", 
                file.getOriginalFilename(), category);
        
        Map<String, Object> response = new HashMap<>();
        
        // Require authentication for uploads (admin only)
        if (authHeader == null || authHeader.trim().isEmpty()) {
            log.warn("Upload attempted without authentication");
            response.put("success", false);
            response.put("message", "Authentication required. Please log in as admin.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        
        // You can add JWT token validation and role extraction here
        
        try {
            // Store the file and get relative path
            String filePath = fileStorageService.storeFile(file, category);
            
            // Generate the URL for accessing the file
            String fileUrl = fileStorageService.getFileUrl(filePath);
            
            response.put("success", true);
            response.put("message", "File uploaded successfully");
            response.put("fileName", file.getOriginalFilename());
            response.put("fileSize", file.getSize());
            response.put("filePath", filePath);
            response.put("fileUrl", fileUrl);
            response.put("category", category);
            
            log.info("File uploaded successfully: {} -> {}", file.getOriginalFilename(), fileUrl);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (IllegalArgumentException e) {
            log.error("Validation error during file upload: {}", e.getMessage());
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            
        } catch (Exception e) {
            log.error("Error uploading file", e);
            response.put("success", false);
            response.put("message", "Failed to upload file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Download/view a file
     * GET /api/files/download/{category}/{filename}
     * 
     * @param category - The category subdirectory
     * @param filename - The filename
     * @param request - HTTP request for content type detection
     * @return File as downloadable resource
     */
    @GetMapping("/download/{category}/{filename:.+}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable String category,
            @PathVariable String filename,
            HttpServletRequest request) {
        
        String filePath = category + "/" + filename;
        log.info("Download request for file: {}", filePath);
        
        try {
            // Load file as Resource
            Resource resource = fileStorageService.loadFileAsResource(filePath);
            
            // Try to determine file's content type
            String contentType = null;
            try {
                contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
            } catch (IOException ex) {
                log.info("Could not determine file type.");
            }
            
            // Fallback to the default content type if type could not be determined
            if (contentType == null) {
                contentType = "application/pdf";
            }
            
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, 
                            "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
                    
        } catch (Exception e) {
            log.error("Error downloading file: {}", filePath, e);
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Delete a file (admin only)
     * DELETE /api/files/{category}/{filename}
     * 
     * @param category - The category subdirectory
     * @param filename - The filename
     * @param authHeader - JWT token for authentication
     * @return Deletion response
     */
    @DeleteMapping("/{category}/{filename:.+}")
    public ResponseEntity<Map<String, Object>> deleteFile(
            @PathVariable String category,
            @PathVariable String filename,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        String filePath = category + "/" + filename;
        log.info("Delete request for file: {}", filePath);
        
        Map<String, Object> response = new HashMap<>();
        
        // Require authentication for deletion (admin only)
        if (authHeader == null || authHeader.trim().isEmpty()) {
            log.warn("Delete attempted without authentication");
            response.put("success", false);
            response.put("message", "Authentication required. Please log in as admin.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        
        // You can add JWT token validation and role extraction here
        
        try {
            boolean deleted = fileStorageService.deleteFile(filePath);
            
            if (deleted) {
                response.put("success", true);
                response.put("message", "File deleted successfully");
                log.info("File deleted successfully: {}", filePath);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "File not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
        } catch (SecurityException e) {
            log.error("Security violation during file deletion: {}", e.getMessage());
            response.put("success", false);
            response.put("message", "Access denied");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            
        } catch (Exception e) {
            log.error("Error deleting file: {}", filePath, e);
            response.put("success", false);
            response.put("message", "Failed to delete file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Get upload configuration info
     * GET /api/files/config
     * 
     * @return Configuration details (max size, allowed types)
     */
    @GetMapping("/config")
    public ResponseEntity<Map<String, Object>> getUploadConfig() {
        Map<String, Object> config = new HashMap<>();
        config.put("maxFileSize", 52428800); // 50MB
        config.put("maxFileSizeMB", 50);
        config.put("allowedTypes", new String[]{"application/pdf"});
        config.put("allowedExtensions", new String[]{".pdf"});
        config.put("categories", new String[]{
            "annual-report",
            "policy-brief",
            "training-manual",
            "research",
            "guideline",
            "newsletter",
            "video"
        });
        
        return ResponseEntity.ok(config);
    }
}
