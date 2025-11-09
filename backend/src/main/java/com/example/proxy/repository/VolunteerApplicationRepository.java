package com.example.proxy.repository;

import com.example.proxy.entity.VolunteerApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VolunteerApplicationRepository extends JpaRepository<VolunteerApplication, Long> {
    
    List<VolunteerApplication> findByEmailIgnoreCase(String email);
    
    List<VolunteerApplication> findBySubmittedAtBetween(LocalDateTime start, LocalDateTime end);
    
    long countBySubmittedAtAfter(LocalDateTime date);
}
