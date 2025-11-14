package com.example.proxy.service;

import com.example.proxy.entity.Event;
import com.example.proxy.entity.EventRegistration;
import com.example.proxy.repository.EventRegistrationRepository;
import com.example.proxy.repository.EventRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EventService {
    
    private static final Logger log = LoggerFactory.getLogger(EventService.class);
    
    private final EventRepository eventRepository;
    private final EventRegistrationRepository registrationRepository;
    
    public EventService(EventRepository eventRepository, 
                       EventRegistrationRepository registrationRepository) {
        this.eventRepository = eventRepository;
        this.registrationRepository = registrationRepository;
    }
    
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    
    public List<Event> getFeaturedEvents() {
        return eventRepository.findByFeaturedTrue();
    }
    
    public List<Event> getUpcomingEvents() {
        return eventRepository.findUpcomingEvents(LocalDateTime.now());
    }
    
    public List<Event> getPastEvents() {
        return eventRepository.findPastEvents(LocalDateTime.now());
    }
    
    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }
    
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }
    
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
    
    @Transactional
    public Map<String, Object> registerForEvent(Long eventId, String username, String email) {
        Map<String, Object> response = new HashMap<>();
        
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        if (eventOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "Event not found");
            return response;
        }
        
        Event event = eventOpt.get();
        
        // Check if already registered
        if (registrationRepository.existsByEventIdAndUsername(eventId, username)) {
            response.put("success", false);
            response.put("message", "Already registered for this event");
            return response;
        }
        
        // Check if event is full
        if (event.getCurrentAttendees() >= event.getMaxAttendees()) {
            response.put("success", false);
            response.put("message", "Event is full");
            return response;
        }
        
        // Create registration
        EventRegistration registration = new EventRegistration();
        registration.setEvent(event);
        registration.setUsername(username);
        registration.setEmail(email);
        registrationRepository.save(registration);
        
        // Update attendee count
        event.setCurrentAttendees(event.getCurrentAttendees() + 1);
        eventRepository.save(event);
        
        response.put("success", true);
        response.put("message", "Successfully registered for event");
        response.put("registration", registration);
        
        log.info("User {} registered for event {}", username, eventId);
        
        return response;
    }
    
    @Transactional
    public Map<String, Object> cancelRegistration(Long eventId, String username) {
        Map<String, Object> response = new HashMap<>();
        
        Optional<EventRegistration> regOpt = registrationRepository.findByEventIdAndUsername(eventId, username);
        if (regOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "Registration not found");
            return response;
        }
        
        EventRegistration registration = regOpt.get();
        Event event = registration.getEvent();
        
        // Delete registration
        registrationRepository.delete(registration);
        
        // Update attendee count
        event.setCurrentAttendees(Math.max(0, event.getCurrentAttendees() - 1));
        eventRepository.save(event);
        
        response.put("success", true);
        response.put("message", "Registration cancelled successfully");
        
        log.info("User {} cancelled registration for event {}", username, eventId);
        
        return response;
    }
    
    public List<EventRegistration> getUserRegistrations(String username) {
        return registrationRepository.findByUsername(username);
    }
    
    public List<EventRegistration> getEventRegistrations(Long eventId) {
        return registrationRepository.findByEventId(eventId);
    }
    
    public boolean isUserRegistered(Long eventId, String username) {
        return registrationRepository.existsByEventIdAndUsername(eventId, username);
    }
}
