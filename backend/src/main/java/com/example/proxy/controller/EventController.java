package com.example.proxy.controller;

import com.example.proxy.entity.Event;
import com.example.proxy.entity.EventRegistration;
import com.example.proxy.service.EventService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
public class EventController {
    
    private static final Logger log = LoggerFactory.getLogger(EventController.class);
    
    private final EventService eventService;
    
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }
    
    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        log.info("Fetching all events");
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }
    
    @GetMapping("/featured")
    public ResponseEntity<List<Event>> getFeaturedEvents() {
        log.info("Fetching featured events");
        List<Event> events = eventService.getFeaturedEvents();
        return ResponseEntity.ok(events);
    }
    
    @GetMapping("/upcoming")
    public ResponseEntity<List<Event>> getUpcomingEvents() {
        log.info("Fetching upcoming events");
        List<Event> events = eventService.getUpcomingEvents();
        return ResponseEntity.ok(events);
    }
    
    @GetMapping("/past")
    public ResponseEntity<List<Event>> getPastEvents() {
        log.info("Fetching past events");
        List<Event> events = eventService.getPastEvents();
        return ResponseEntity.ok(events);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEvent(@PathVariable Long id) {
        log.info("Fetching event with id: {}", id);
        return eventService.getEventById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Map<String, Object>> createEvent(
            @RequestBody Event event,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Creating new event: {}", event.getTitle());
        
        Map<String, Object> response = new HashMap<>();
        try {
            Event savedEvent = eventService.saveEvent(event);
            response.put("success", true);
            response.put("message", "Event created successfully");
            response.put("event", savedEvent);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            log.error("Error creating event", e);
            response.put("success", false);
            response.put("message", "Failed to create event");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateEvent(
            @PathVariable Long id,
            @RequestBody Event event,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Updating event with id: {}", id);
        
        Map<String, Object> response = new HashMap<>();
        
        return eventService.getEventById(id)
                .map(existingEvent -> {
                    event.setId(id);
                    Event updatedEvent = eventService.saveEvent(event);
                    response.put("success", true);
                    response.put("message", "Event updated successfully");
                    response.put("event", updatedEvent);
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    response.put("success", false);
                    response.put("message", "Event not found");
                    return ResponseEntity.notFound().build();
                });
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteEvent(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Deleting event with id: {}", id);
        
        Map<String, Object> response = new HashMap<>();
        
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
            response.put("message", "Failed to delete event");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @PostMapping("/{id}/register")
    public ResponseEntity<Map<String, Object>> registerForEvent(
            @PathVariable Long id,
            @RequestBody Map<String, String> request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        String username = request.get("username");
        String email = request.get("email");
        
        log.info("Registering user {} for event {}", username, id);
        
        Map<String, Object> response = eventService.registerForEvent(id, username, email);
        
        if ((boolean) response.get("success")) {
            return ResponseEntity.ok(response);
        } else {
            String message = (String) response.get("message");
            if (message.contains("not found")) {
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.badRequest().body(response);
            }
        }
    }
    
    @DeleteMapping("/{id}/register")
    public ResponseEntity<Map<String, Object>> cancelRegistration(
            @PathVariable Long id,
            @RequestBody Map<String, String> request,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        String username = request.get("username");
        
        log.info("Cancelling registration for user {} from event {}", username, id);
        
        Map<String, Object> response = eventService.cancelRegistration(id, username);
        
        if ((boolean) response.get("success")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/user/{username}/registrations")
    public ResponseEntity<List<Map<String, Object>>> getUserRegistrations(
            @PathVariable String username,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Fetching registrations for user: {}", username);
        
        List<EventRegistration> registrations = eventService.getUserRegistrations(username);
        
        List<Map<String, Object>> response = registrations.stream()
                .map(reg -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("registrationId", reg.getId());
                    item.put("registeredAt", reg.getRegisteredAt());
                    item.put("event", reg.getEvent());
                    return item;
                })
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}/registrations")
    public ResponseEntity<List<EventRegistration>> getEventRegistrations(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Fetching registrations for event: {}", id);
        
        List<EventRegistration> registrations = eventService.getEventRegistrations(id);
        return ResponseEntity.ok(registrations);
    }
    
    @GetMapping("/{id}/registration-status")
    public ResponseEntity<Map<String, Boolean>> getRegistrationStatus(
            @PathVariable Long id,
            @RequestParam String username,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Checking registration status for event {} by user {}", id, username);
        
        boolean isRegistered = eventService.isUserRegistered(id, username);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isRegistered", isRegistered);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/all/registrations")
    public ResponseEntity<List<Map<String, Object>>> getAllEventsRegistrations(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        log.info("Fetching all events with registrations for admin dashboard");
        
        List<Event> events = eventService.getAllEvents();
        List<Map<String, Object>> response = new ArrayList<>();
        
        for (Event event : events) {
            Map<String, Object> eventData = new HashMap<>();
            eventData.put("eventId", event.getId());
            eventData.put("eventTitle", event.getTitle());
            eventData.put("maxCapacity", event.getMaxAttendees());
            eventData.put("currentRegistrations", event.getCurrentAttendees());
            eventData.put("availableSpots", event.getMaxAttendees() - event.getCurrentAttendees());
            
            List<EventRegistration> registrations = eventService.getEventRegistrations(event.getId());
            List<Map<String, Object>> registrationsList = registrations.stream()
                .map(reg -> {
                    Map<String, Object> regData = new HashMap<>();
                    regData.put("username", reg.getUsername());
                    regData.put("email", reg.getEmail());
                    regData.put("fullName", reg.getUsername()); // Use username as fullName since we don't have it
                    regData.put("registeredAt", reg.getRegisteredAt().toString());
                    regData.put("status", "confirmed");
                    return regData;
                })
                .collect(Collectors.toList());
            
            eventData.put("registrations", registrationsList);
            response.add(eventData);
        }
        
        return ResponseEntity.ok(response);
    }
}
