package com.example.proxy.controller;

import com.example.proxy.dto.MembershipApplicationDto;
import com.example.proxy.dto.VolunteerApplicationDto;
import com.example.proxy.service.DatabaseFormSubmissionService;
import com.example.proxy.service.FormSubmissionService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/forms")
public class FormController {

    private static final Logger log = LoggerFactory.getLogger(FormController.class);
    
    private final FormSubmissionService fileFormSubmissionService;
    private final DatabaseFormSubmissionService databaseFormSubmissionService;

    @Value("${app.storage.mode:database}")
    private String storageMode;

    public FormController(
            FormSubmissionService fileFormSubmissionService,
            DatabaseFormSubmissionService databaseFormSubmissionService) {
        this.fileFormSubmissionService = fileFormSubmissionService;
        this.databaseFormSubmissionService = databaseFormSubmissionService;
    }

    @PostMapping("/membership")
    public ResponseEntity<Map<String, Object>> submitMembershipApplication(
            @Valid @RequestBody MembershipApplicationDto application,
            BindingResult bindingResult) {
        
        Map<String, Object> response = new HashMap<>();
        
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream()
                .map(error -> error.getDefaultMessage())
                .collect(Collectors.toList());
            
            response.put("success", false);
            response.put("errors", errors);
            log.warn("Membership application validation failed: {}", errors);
            return ResponseEntity.badRequest().body(response);
        }
        
        try {
            if ("database".equalsIgnoreCase(storageMode)) {
                databaseFormSubmissionService.saveMembershipApplication(application);
            } else {
                fileFormSubmissionService.saveMembershipApplication(application);
            }
            
            response.put("success", true);
            response.put("message", "Membership application submitted successfully");
            log.info("Membership application submitted ({}): {}", storageMode, application.getEmail());
            
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            log.error("Failed to save membership application", e);
            response.put("success", false);
            response.put("message", "Failed to submit application. Please try again.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } catch (Exception e) {
            log.error("Failed to save membership application", e);
            response.put("success", false);
            response.put("message", "Failed to submit application. Please try again.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/volunteer")
    public ResponseEntity<Map<String, Object>> submitVolunteerApplication(
            @Valid @RequestBody VolunteerApplicationDto application,
            BindingResult bindingResult) {
        
        Map<String, Object> response = new HashMap<>();
        
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream()
                .map(error -> error.getDefaultMessage())
                .collect(Collectors.toList());
            
            response.put("success", false);
            response.put("errors", errors);
            log.warn("Volunteer application validation failed: {}", errors);
            return ResponseEntity.badRequest().body(response);
        }
        
        try {
            if ("database".equalsIgnoreCase(storageMode)) {
                databaseFormSubmissionService.saveVolunteerApplication(application);
            } else {
                fileFormSubmissionService.saveVolunteerApplication(application);
            }
            
            response.put("success", true);
            response.put("message", "Volunteer application submitted successfully");
            log.info("Volunteer application submitted ({}): {}", storageMode, application.getEmail());
            
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            log.error("Failed to save volunteer application", e);
            response.put("success", false);
            response.put("message", "Failed to submit application. Please try again.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        } catch (Exception e) {
            log.error("Failed to save volunteer application", e);
            response.put("success", false);
            response.put("message", "Failed to submit application. Please try again.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/membership")
    public ResponseEntity<List<MembershipApplicationDto>> getMembershipApplications() {
        try {
            List<MembershipApplicationDto> applications;
            if ("database".equalsIgnoreCase(storageMode)) {
                applications = databaseFormSubmissionService.getAllMembershipApplications();
            } else {
                applications = fileFormSubmissionService.getAllMembershipApplications();
            }
            log.info("Retrieved {} membership applications from {}", applications.size(), storageMode);
            return ResponseEntity.ok(applications);
        } catch (IOException e) {
            log.error("Failed to retrieve membership applications", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (Exception e) {
            log.error("Failed to retrieve membership applications", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/volunteer")
    public ResponseEntity<List<VolunteerApplicationDto>> getVolunteerApplications() {
        try {
            List<VolunteerApplicationDto> applications;
            if ("database".equalsIgnoreCase(storageMode)) {
                applications = databaseFormSubmissionService.getAllVolunteerApplications();
            } else {
                applications = fileFormSubmissionService.getAllVolunteerApplications();
            }
            log.info("Retrieved {} volunteer applications from {}", applications.size(), storageMode);
            return ResponseEntity.ok(applications);
        } catch (IOException e) {
            log.error("Failed to retrieve volunteer applications", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (Exception e) {
            log.error("Failed to retrieve volunteer applications", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "Form Submission Service");
        return ResponseEntity.ok(response);
    }
}
