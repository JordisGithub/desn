package com.example.proxy.repository;

import com.example.proxy.entity.EventRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {
    
    List<EventRegistration> findByUsername(String username);
    
    List<EventRegistration> findByEventId(Long eventId);
    
    Optional<EventRegistration> findByEventIdAndUsername(Long eventId, String username);
    
    boolean existsByEventIdAndUsername(Long eventId, String username);
}
