package com.example.proxy.controller;

import com.example.proxy.entity.Event;
import com.example.proxy.service.EventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/events")
public class AdminEventController {
    
    private static final Logger log = LoggerFactory.getLogger(AdminEventController.class);
    
    private final EventService eventService;
    
    public AdminEventController(EventService eventService) {
        this.eventService = eventService;
    }
    
    /**
     * Get all events (admin dashboard)
     */
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        log.info("Admin: Fetching all events");
        
        // In production, verify admin role from authHeader
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }
    
    /**
     * Create a new event (admin only)
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createEvent(
            @RequestBody Event event,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Admin: Creating new event: {}", event.getTitle());
        
        Map<String, Object> response = new HashMap<>();
        
        // In production, verify admin role from authHeader
        if (event.getTitle() == null || event.getTitle().isBlank()) {
            response.put("success", false);
            response.put("message", "Event title is required");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (event.getStartDate() == null || event.getEndDate() == null) {
            response.put("success", false);
            response.put("message", "Start and end dates are required");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (event.getLocation() == null || event.getLocation().isBlank()) {
            response.put("success", false);
            response.put("message", "Location is required");
            return ResponseEntity.badRequest().body(response);
        }
        
        if (event.getMaxAttendees() == null || event.getMaxAttendees() <= 0) {
            response.put("success", false);
            response.put("message", "Max attendees must be greater than 0");
            return ResponseEntity.badRequest().body(response);
        }
        
        try {
            // Set default values
            if (event.getCurrentAttendees() == null) {
                event.setCurrentAttendees(0);
            }
            if (event.getFeatured() == null) {
                event.setFeatured(false);
            }
            
            Event savedEvent = eventService.saveEvent(event);
            response.put("success", true);
            response.put("message", "Event created successfully");
            response.put("event", savedEvent);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            log.error("Error creating event", e);
            response.put("success", false);
            response.put("message", "Failed to create event: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Update an event (admin only)
     */
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateEvent(
            @PathVariable Long id,
            @RequestBody Event event,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Admin: Updating event with id: {}", id);
        
        Map<String, Object> response = new HashMap<>();
        
        // In production, verify admin role from authHeader
        return eventService.getEventById(id)
                .map(existingEvent -> {
                    try {
                        // Update only provided fields
                        if (event.getTitle() != null && !event.getTitle().isBlank()) {
                            existingEvent.setTitle(event.getTitle());
                        }
                        if (event.getDescription() != null) {
                            existingEvent.setDescription(event.getDescription());
                        }
                        if (event.getStartDate() != null) {
                            existingEvent.setStartDate(event.getStartDate());
                        }
                        if (event.getEndDate() != null) {
                            existingEvent.setEndDate(event.getEndDate());
                        }
                        if (event.getLocation() != null && !event.getLocation().isBlank()) {
                            existingEvent.setLocation(event.getLocation());
                        }
                        if (event.getMaxAttendees() != null && event.getMaxAttendees() > 0) {
                            existingEvent.setMaxAttendees(event.getMaxAttendees());
                        }
                        if (event.getImageUrl() != null) {
                            existingEvent.setImageUrl(event.getImageUrl());
                        }
                        if (event.getFeatured() != null) {
                            existingEvent.setFeatured(event.getFeatured());
                        }
                        if (event.getAltText() != null) {
                            existingEvent.setAltText(event.getAltText());
                        }
                        if (event.getTitleTranslations() != null) {
                            existingEvent.setTitleTranslations(event.getTitleTranslations());
                        }
                        if (event.getDescriptionTranslations() != null) {
                            existingEvent.setDescriptionTranslations(event.getDescriptionTranslations());
                        }
                        if (event.getAltTextTranslations() != null) {
                            existingEvent.setAltTextTranslations(event.getAltTextTranslations());
                        }
                        
                        Event updatedEvent = eventService.saveEvent(existingEvent);
                        response.put("success", true);
                        response.put("message", "Event updated successfully");
                        response.put("event", updatedEvent);
                        return ResponseEntity.ok(response);
                    } catch (Exception e) {
                        log.error("Error updating event", e);
                        response.put("success", false);
                        response.put("message", "Failed to update event: " + e.getMessage());
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
                    }
                })
                .orElseGet(() -> {
                    response.put("success", false);
                    response.put("message", "Event not found");
                    return ResponseEntity.notFound().build();
                });
    }
    
    /**
     * Delete an event (admin only)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteEvent(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Admin: Deleting event with id: {}", id);
        
        Map<String, Object> response = new HashMap<>();
        
        // In production, verify admin role from authHeader
        if (eventService.getEventById(id).isEmpty()) {
            response.put("success", false);
            response.put("message", "Event not found");
            return ResponseEntity.notFound().build();
        }
        
        try {
            eventService.deleteEvent(id);
            response.put("success", true);
            response.put("message", "Event deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error deleting event", e);
            response.put("success", false);
            response.put("message", "Failed to delete event: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * Get all events with registrations (admin dashboard)
     */
    @GetMapping("/registrations")
    public ResponseEntity<List<Map<String, Object>>> getAllEventsRegistrations(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Admin: Fetching all events with registrations");
        
        // In production, verify admin role from authHeader
        return eventService.getAllEventsRegistrations();
    }
}
