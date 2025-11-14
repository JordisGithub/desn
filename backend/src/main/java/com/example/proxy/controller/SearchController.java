package com.example.proxy.controller;

import com.example.proxy.entity.Resource;
import com.example.proxy.entity.Event;
import com.example.proxy.repository.ResourceRepository;
import com.example.proxy.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class SearchController {

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> search(@RequestParam String q,
                                                      @RequestParam(required = false, defaultValue = "10") int limit) {
        // Simple DB search for resources
        List<Resource> resources = resourceRepository.searchByTitleOrDescription(q);

        // For events, do a simple title/description match in-memory if a repo method isn't present
        List<Event> events;
        try {
            events = eventRepository.searchByTitleOrDescription(q);
        } catch (Exception ex) {
            // Fallback: scan all events
            events = eventRepository.findAll().stream()
                    .filter(e -> (e.getTitle() != null && e.getTitle().toLowerCase().contains(q.toLowerCase()))
                            || (e.getDescription() != null && e.getDescription().toLowerCase().contains(q.toLowerCase())))
                    .collect(Collectors.toList());
        }

        Map<String, Object> res = new HashMap<>();
        res.put("resources", resources.stream().limit(limit).collect(Collectors.toList()));
        res.put("events", events.stream().limit(limit).collect(Collectors.toList()));
        return ResponseEntity.ok(res);
    }
}
