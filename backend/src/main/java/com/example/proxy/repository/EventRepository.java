package com.example.proxy.repository;

import com.example.proxy.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    List<Event> findByFeaturedTrue();
    
    @Query("SELECT e FROM Event e WHERE e.startDate >= :now ORDER BY e.startDate ASC")
    List<Event> findUpcomingEvents(LocalDateTime now);
    
    @Query("SELECT e FROM Event e WHERE e.startDate < :now ORDER BY e.startDate DESC")
    List<Event> findPastEvents(LocalDateTime now);
}
