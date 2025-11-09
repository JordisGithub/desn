package com.example.proxy.service;

import com.example.proxy.entity.Resource;
import com.example.proxy.entity.ResourceFavorite;
import com.example.proxy.repository.ResourceFavoriteRepository;
import com.example.proxy.repository.ResourceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ResourceService {
    
    private static final Logger log = LoggerFactory.getLogger(ResourceService.class);
    
    private final ResourceRepository resourceRepository;
    private final ResourceFavoriteRepository favoriteRepository;
    
    public ResourceService(ResourceRepository resourceRepository, 
                          ResourceFavoriteRepository favoriteRepository) {
        this.resourceRepository = resourceRepository;
        this.favoriteRepository = favoriteRepository;
    }
    
    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }
    
    public List<Resource> getFeaturedResources() {
        return resourceRepository.findByFeaturedTrue();
    }
    
    public List<Resource> getResourcesByType(String type) {
        return resourceRepository.findByType(type);
    }
    
    public List<Resource> searchResources(String query) {
        return resourceRepository.searchByTitleOrDescription(query);
    }
    
    public List<Resource> searchResourcesByTypeAndQuery(String type, String query) {
        return resourceRepository.searchByTypeAndQuery(type, query);
    }
    
    public Map<String, Long> getTypeCounts() {
        List<Object[]> results = resourceRepository.countByType();
        Map<String, Long> counts = new HashMap<>();
        for (Object[] result : results) {
            counts.put((String) result[0], (Long) result[1]);
        }
        return counts;
    }
    
    public Optional<Resource> getResourceById(Long id) {
        return resourceRepository.findById(id);
    }
    
    @Transactional
    public Resource saveResource(Resource resource) {
        return resourceRepository.save(resource);
    }
    
    @Transactional
    public void deleteResource(Long id) {
        resourceRepository.deleteById(id);
    }
    
    @Transactional
    public void incrementClicks(Long resourceId) {
        resourceRepository.findById(resourceId).ifPresent(resource -> {
            resource.setClicks(resource.getClicks() + 1);
            resourceRepository.save(resource);
            log.info("Incremented clicks for resource {}: {}", resourceId, resource.getClicks());
        });
    }
    
    @Transactional
    public Map<String, Object> toggleFavorite(Long resourceId, String username) {
        Map<String, Object> response = new HashMap<>();
        
        Optional<Resource> resourceOpt = resourceRepository.findById(resourceId);
        if (resourceOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "Resource not found");
            return response;
        }
        
        Resource resource = resourceOpt.get();
        Optional<ResourceFavorite> existingFavorite = 
            favoriteRepository.findByResourceIdAndUsername(resourceId, username);
        
        boolean isFavorited;
        if (existingFavorite.isPresent()) {
            // Remove favorite
            favoriteRepository.delete(existingFavorite.get());
            resource.setFavoriteCount(Math.max(0, resource.getFavoriteCount() - 1));
            isFavorited = false;
            log.info("Removed favorite for resource {} by user {}", resourceId, username);
        } else {
            // Add favorite
            ResourceFavorite favorite = new ResourceFavorite();
            favorite.setResource(resource);
            favorite.setUsername(username);
            favoriteRepository.save(favorite);
            resource.setFavoriteCount(resource.getFavoriteCount() + 1);
            isFavorited = true;
            log.info("Added favorite for resource {} by user {}", resourceId, username);
        }
        
        resourceRepository.save(resource);
        
        response.put("success", true);
        response.put("isFavorited", isFavorited);
        response.put("favoriteCount", resource.getFavoriteCount());
        response.put("message", isFavorited ? "Added to favorites" : "Removed from favorites");
        
        return response;
    }
    
    public List<ResourceFavorite> getUserFavorites(String username) {
        return favoriteRepository.findByUsername(username);
    }
    
    public boolean isFavorited(Long resourceId, String username) {
        return favoriteRepository.findByResourceIdAndUsername(resourceId, username).isPresent();
    }
}
