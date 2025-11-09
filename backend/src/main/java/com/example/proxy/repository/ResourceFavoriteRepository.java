package com.example.proxy.repository;

import com.example.proxy.entity.ResourceFavorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResourceFavoriteRepository extends JpaRepository<ResourceFavorite, Long> {
    
    List<ResourceFavorite> findByUsername(String username);
    
    Optional<ResourceFavorite> findByResourceIdAndUsername(Long resourceId, String username);
    
    void deleteByResourceIdAndUsername(Long resourceId, String username);
    
    long countByResourceId(Long resourceId);
}
