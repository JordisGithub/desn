package com.example.proxy.repository;

import com.example.proxy.entity.MembershipApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MembershipApplicationRepository extends JpaRepository<MembershipApplication, Long> {
    
    List<MembershipApplication> findByEmailIgnoreCase(String email);
    
    List<MembershipApplication> findBySubmittedAtBetween(LocalDateTime start, LocalDateTime end);
    
    long countBySubmittedAtAfter(LocalDateTime date);
}
