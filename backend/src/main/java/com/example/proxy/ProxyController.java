package com.example.proxy;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@RestController
@RequestMapping("/proxy")
public class ProxyController {

    private final Logger log = LoggerFactory.getLogger(ProxyController.class);

    @Value("${upstream.base.url}")
    private String upstreamBaseUrl;

    @Value("${server.api.key:}")
    private String serverApiKey;

    private final RestTemplate rest;

    // In-memory storage for event registrations (In production, use a database)
    private final Map<String, Map<String, Map<String, Object>>> eventRegistrations = new ConcurrentHashMap<>();
    private final Map<String, AtomicInteger> eventCapacity = new ConcurrentHashMap<>();
    
    private void initializeEvents() {
        // AIR Mid-Point Check-In
        eventCapacity.putIfAbsent("air-midpoint-checkin", new AtomicInteger(50));
        
        // International Day of Persons with Disabilities
        eventCapacity.putIfAbsent("international-day-disabilities", new AtomicInteger(100));
        
        // AIR Awards Ceremony
        eventCapacity.putIfAbsent("air-awards-ceremony", new AtomicInteger(75));
    }

    public ProxyController(RestTemplate restTemplate) {
        this.rest = restTemplate;
        initializeEvents();
    }

    private String extractPath(HttpServletRequest req) {
        String uri = req.getRequestURI();
        // strip /proxy prefix
        return uri.replaceFirst(req.getContextPath() + "/proxy", "");
    }

    @RequestMapping(value = "**", method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    @SuppressWarnings("null")
    public ResponseEntity<String> proxy(HttpMethod method, HttpEntity<byte[]> httpEntity, HttpServletRequest request) throws IOException {
        String path = extractPath(request);
        String query = request.getQueryString();
        String target = upstreamBaseUrl + path + (query != null ? "?" + query : "");

        log.info("Incoming request: {} {} -> {}", method, path, target);

        HttpHeaders headers = new HttpHeaders();
        headers.putAll(httpEntity.getHeaders());

        // For POST/PUT/DELETE, ensure the server-side API key header is present
        if (method == HttpMethod.POST || method == HttpMethod.PUT || method == HttpMethod.DELETE) {
            if (serverApiKey != null && !serverApiKey.isEmpty()) {
                headers.set("X-API-Key", serverApiKey);
                log.debug("Added server-side X-API-Key header for method {}", method);
            } else {
                log.warn("Server API key is not configured but a mutating request was proxied: {} {}", method, path);
            }
        }

        byte[] body = httpEntity.getBody();

        HttpEntity<byte[]> forwardEntity = new HttpEntity<>(body, headers);

        ResponseEntity<String> resp = rest.exchange(URI.create(target), method, forwardEntity, String.class);

        log.info("Upstream responded: {} for {} {}", resp.getStatusCode(), method, path);

        return ResponseEntity.status(resp.getStatusCode()).headers(resp.getHeaders()).body(resp.getBody());
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        log.info("Health check requested");
        return ResponseEntity.ok("OK");
    }

    @PostMapping("/api/events/{eventId}/register")
    public ResponseEntity<Map<String, Object>> registerForEvent(
            @PathVariable String eventId,
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> registrationData) {
        
        log.info("Event registration request for event: {} by user: {}", eventId, registrationData.get("username"));
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String username = registrationData.get("username");
            String email = registrationData.get("email");
            String fullName = registrationData.get("fullName");
            
            if (username == null || email == null || fullName == null) {
                response.put("success", false);
                response.put("message", "Missing required fields");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Check if event exists
            if (!eventCapacity.containsKey(eventId)) {
                response.put("success", false);
                response.put("message", "Event not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            // Initialize event registrations if not exists
            eventRegistrations.putIfAbsent(eventId, new ConcurrentHashMap<>());
            
            // Check if user already registered
            if (eventRegistrations.get(eventId).containsKey(username)) {
                response.put("success", false);
                response.put("message", "You are already registered for this event");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
            
            // Check capacity
            AtomicInteger capacity = eventCapacity.get(eventId);
            int currentCount = eventRegistrations.get(eventId).size();
            
            if (currentCount >= capacity.get()) {
                response.put("success", false);
                response.put("message", "Event is full");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
            
            // Register user
            Map<String, Object> registration = new HashMap<>();
            registration.put("username", username);
            registration.put("email", email);
            registration.put("fullName", fullName);
            registration.put("registeredAt", new Date().toString());
            registration.put("status", "confirmed");
            
            eventRegistrations.get(eventId).put(username, registration);
            
            response.put("success", true);
            response.put("message", "Successfully registered for the event");
            response.put("registration", registration);
            
            log.info("User {} successfully registered for event {}", username, eventId);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error registering for event: ", e);
            response.put("success", false);
            response.put("message", "An error occurred during registration");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/api/events/{eventId}/register")
    public ResponseEntity<Map<String, Object>> cancelEventRegistration(
            @PathVariable String eventId,
            @RequestHeader("Authorization") String authHeader,
            @RequestParam String username) {
        
        log.info("Event cancellation request for event: {} by user: {}", eventId, username);
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            if (!eventRegistrations.containsKey(eventId) || 
                !eventRegistrations.get(eventId).containsKey(username)) {
                response.put("success", false);
                response.put("message", "Registration not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            eventRegistrations.get(eventId).remove(username);
            
            response.put("success", true);
            response.put("message", "Registration cancelled successfully");
            
            log.info("User {} cancelled registration for event {}", username, eventId);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error cancelling registration: ", e);
            response.put("success", false);
            response.put("message", "An error occurred during cancellation");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/api/events/{eventId}/status")
    public ResponseEntity<Map<String, Object>> getEventStatus(@PathVariable String eventId) {
        log.info("Event status request for event: {}", eventId);
        
        Map<String, Object> response = new HashMap<>();
        
        if (!eventCapacity.containsKey(eventId)) {
            response.put("success", false);
            response.put("message", "Event not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        
        int maxCapacity = eventCapacity.get(eventId).get();
        int currentRegistrations = eventRegistrations.getOrDefault(eventId, new HashMap<>()).size();
        
        response.put("success", true);
        response.put("eventId", eventId);
        response.put("maxCapacity", maxCapacity);
        response.put("currentRegistrations", currentRegistrations);
        response.put("availableSpots", maxCapacity - currentRegistrations);
        response.put("isFull", currentRegistrations >= maxCapacity);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/events/user/{username}/registrations")
    public ResponseEntity<Map<String, Object>> getUserRegistrations(
            @PathVariable String username,
            @RequestHeader("Authorization") String authHeader) {
        
        log.info("Fetching registrations for user: {}", username);
        
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> registrations = new ArrayList<>();
        
        for (Map.Entry<String, Map<String, Map<String, Object>>> entry : eventRegistrations.entrySet()) {
            String eventId = entry.getKey();
            Map<String, Map<String, Object>> eventRegs = entry.getValue();
            
            if (eventRegs.containsKey(username)) {
                Map<String, Object> reg = new HashMap<>(eventRegs.get(username));
                reg.put("eventId", eventId);
                registrations.add(reg);
            }
        }
        
        response.put("success", true);
        response.put("registrations", registrations);
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/events/{eventId}/registrations")
    public ResponseEntity<Map<String, Object>> getEventRegistrations(
            @PathVariable String eventId,
            @RequestHeader("Authorization") String authHeader) {
        
        log.info("Fetching all registrations for event: {}", eventId);
        
        Map<String, Object> response = new HashMap<>();
        
        if (!eventCapacity.containsKey(eventId)) {
            response.put("success", false);
            response.put("message", "Event not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        
        Map<String, Map<String, Object>> eventRegs = eventRegistrations.getOrDefault(eventId, new HashMap<>());
        
        response.put("success", true);
        response.put("eventId", eventId);
        response.put("maxCapacity", eventCapacity.get(eventId).get());
        response.put("currentRegistrations", eventRegs.size());
        response.put("registrations", new ArrayList<>(eventRegs.values()));
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/events/all/registrations")
    public ResponseEntity<Map<String, Object>> getAllEventsRegistrations(
            @RequestHeader("Authorization") String authHeader) {
        
        log.info("Fetching all events registrations (admin)");
        
        Map<String, Object> response = new HashMap<>();
        List<Map<String, Object>> allEvents = new ArrayList<>();
        
        for (String eventId : eventCapacity.keySet()) {
            Map<String, Object> eventData = new HashMap<>();
            eventData.put("eventId", eventId);
            eventData.put("maxCapacity", eventCapacity.get(eventId).get());
            
            Map<String, Map<String, Object>> eventRegs = eventRegistrations.getOrDefault(eventId, new HashMap<>());
            eventData.put("currentRegistrations", eventRegs.size());
            eventData.put("availableSpots", eventCapacity.get(eventId).get() - eventRegs.size());
            eventData.put("registrations", new ArrayList<>(eventRegs.values()));
            
            allEvents.add(eventData);
        }
        
        response.put("success", true);
        response.put("events", allEvents);
        
        return ResponseEntity.ok(response);
    }
}
