package com.example.proxy.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "file.storage")
public class FileStorageConfig {
    
    private String uploadDir = "src/main/resources/static/resources";
    private long maxFileSize = 52428800; // 50MB in bytes
    private String[] allowedTypes = {"application/pdf"};
    private String[] allowedExtensions = {".pdf"};
    
    public String getUploadDir() {
        return uploadDir;
    }
    
    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }
    
    public long getMaxFileSize() {
        return maxFileSize;
    }
    
    public void setMaxFileSize(long maxFileSize) {
        this.maxFileSize = maxFileSize;
    }
    
    public String[] getAllowedTypes() {
        return allowedTypes;
    }
    
    public void setAllowedTypes(String[] allowedTypes) {
        this.allowedTypes = allowedTypes;
    }
    
    public String[] getAllowedExtensions() {
        return allowedExtensions;
    }
    
    public void setAllowedExtensions(String[] allowedExtensions) {
        this.allowedExtensions = allowedExtensions;
    }
}
