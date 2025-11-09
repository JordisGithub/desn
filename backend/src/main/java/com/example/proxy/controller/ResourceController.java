package com.example.proxy.controller;

import com.example.proxy.entity.Resource;
import com.example.proxy.entity.ResourceFavorite;
import com.example.proxy.service.ResourceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {
    
    private static final Logger log = LoggerFactory.getLogger(ResourceController.class);
    
    private final ResourceService resourceService;
    
    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> getResources(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String search) {
        
        log.info("Fetching resources - type: {}, search: {}", type, search);
        
        List<Resource> resources;
        
        if (type != null && search != null) {
            resources = resourceService.searchResourcesByTypeAndQuery(type, search);
        } else if (type != null) {
            resources = resourceService.getResourcesByType(type);
        } else if (search != null) {
            resources = resourceService.searchResources(search);
        } else {
            resources = resourceService.getAllResources();
        }
        
        Map<String, Long> typeCounts = resourceService.getTypeCounts();
        
        Map<String, Object> response = new HashMap<>();
        response.put("resources", resources);
        response.put("total", resources.size());
        response.put("typeCounts", typeCounts);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/featured")
    public ResponseEntity<List<Resource>> getFeaturedResources() {
        log.info("Fetching featured resources");
        List<Resource> resources = resourceService.getFeaturedResources();
        return ResponseEntity.ok(resources);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Resource> getResource(@PathVariable Long id) {
        log.info("Fetching resource with id: {}", id);
        return resourceService.getResourceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> createResource(
            @RequestBody Resource resource,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Creating new resource: {}", resource.getTitle());
        
        Map<String, Object> response = new HashMap<>();
        try {
            Resource savedResource = resourceService.saveResource(resource);
            response.put("success", true);
            response.put("message", "Resource created successfully");
            response.put("resource", savedResource);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            log.error("Error creating resource", e);
            response.put("success", false);
            response.put("message", "Failed to create resource");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateResource(
            @PathVariable Long id,
            @RequestBody Resource resource,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Updating resource with id: {}", id);
        
        Map<String, Object> response = new HashMap<>();
        
        return resourceService.getResourceById(id)
                .map(existingResource -> {
                    resource.setId(id);
                    Resource updatedResource = resourceService.saveResource(resource);
                    response.put("success", true);
                    response.put("message", "Resource updated successfully");
                    response.put("resource", updatedResource);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("success", false);
                    response.put("message", "Resource not found");
                    return ResponseEntity.notFound().build();
                });
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteResource(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Deleting resource with id: {}", id);
        
        Map<String, Object> response = new HashMap<>();
        
        if (resourceService.getResourceById(id).isEmpty()) {
            response.put("success", false);
            response.put("message", "Resource not found");
            return ResponseEntity.notFound().build();
        }
        
        try {
            resourceService.deleteResource(id);
            response.put("success", true);
            response.put("message", "Resource deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error deleting resource", e);
            response.put("success", false);
            response.put("message", "Failed to delete resource");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @PostMapping("/{id}/favorite")
    public ResponseEntity<Map<String, Object>> toggleFavorite(
            @PathVariable Long id,
            @RequestBody Map<String, String> request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        String username = request.get("username");
        log.info("Toggling favorite for resource {} by user {}", id, username);
        
        Map<String, Object> response = resourceService.toggleFavorite(id, username);
        
        if ((boolean) response.get("success")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/{id}/click")
    public ResponseEntity<Map<String, Object>> trackClick(@PathVariable Long id) {
        log.info("Tracking click for resource {}", id);
        
        Map<String, Object> response = new HashMap<>();
        
        return resourceService.getResourceById(id)
                .map(resource -> {
                    resourceService.incrementClicks(id);
                    response.put("success", true);
                    response.put("clicks", resource.getClicks() + 1);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("success", false);
                    response.put("message", "Resource not found");
                    return ResponseEntity.notFound().build();
                });
    }
    
    @GetMapping("/user/{username}/favorites")
    public ResponseEntity<List<Map<String, Object>>> getUserFavorites(
            @PathVariable String username,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Fetching favorites for user: {}", username);
        
        List<ResourceFavorite> favorites = resourceService.getUserFavorites(username);
        
        List<Map<String, Object>> response = favorites.stream()
                .map(fav -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("favoriteId", fav.getId());
                    item.put("favoritedAt", fav.getFavoritedAt());
                    item.put("resource", fav.getResource());
                    return item;
                })
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}/favorite-status")
    public ResponseEntity<Map<String, Boolean>> getFavoriteStatus(
            @PathVariable Long id,
            @RequestParam String username,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Checking favorite status for resource {} by user {}", id, username);
        
        boolean isFavorited = resourceService.isFavorited(id, username);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isFavorited", isFavorited);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/admin/all")
    public ResponseEntity<List<Resource>> getAllResourcesForAdmin(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Admin fetching all resources");
        List<Resource> resources = resourceService.getAllResources();
        return ResponseEntity.ok(resources);
    }
}
