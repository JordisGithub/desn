package com.example.proxy.repository;

import com.example.proxy.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {
    
    List<Resource> findByFeaturedTrue();
    
    List<Resource> findByType(String type);
    
    @Query("SELECT r FROM Resource r WHERE " +
           "LOWER(r.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.description) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Resource> searchByTitleOrDescription(@Param("search") String search);
    
    @Query("SELECT r FROM Resource r WHERE r.type = :type AND " +
           "(LOWER(r.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.description) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Resource> searchByTypeAndQuery(@Param("type") String type, @Param("search") String search);
    
    @Query("SELECT r.type, COUNT(r) FROM Resource r GROUP BY r.type")
    List<Object[]> countByType();
}
