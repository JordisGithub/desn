package com.example.proxy.service;

import com.example.proxy.dto.MembershipApplicationDto;
import com.example.proxy.dto.VolunteerApplicationDto;
import com.example.proxy.entity.MembershipApplication;
import com.example.proxy.entity.VolunteerApplication;
import com.example.proxy.repository.MembershipApplicationRepository;
import com.example.proxy.repository.VolunteerApplicationRepository;
import com.example.proxy.util.InputSanitizer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Database-backed form submission service using JPA
 * This should be used in production instead of file-based storage
 */
@Service("databaseFormSubmissionService")
public class DatabaseFormSubmissionService {

    private static final Logger log = LoggerFactory.getLogger(DatabaseFormSubmissionService.class);

    private final MembershipApplicationRepository membershipRepository;
    private final VolunteerApplicationRepository volunteerRepository;
    private final InputSanitizer inputSanitizer;
    private final EmailNotificationService emailNotificationService;

    @Value("${app.email.notifications.enabled:false}")
    private boolean emailNotificationsEnabled;

    public DatabaseFormSubmissionService(
            MembershipApplicationRepository membershipRepository,
            VolunteerApplicationRepository volunteerRepository,
            InputSanitizer inputSanitizer,
            EmailNotificationService emailNotificationService) {
        this.membershipRepository = membershipRepository;
        this.volunteerRepository = volunteerRepository;
        this.inputSanitizer = inputSanitizer;
        this.emailNotificationService = emailNotificationService;
    }

    @Transactional
    public void saveMembershipApplication(MembershipApplicationDto dto) {
        // Sanitize input
        dto.setFullName(inputSanitizer.sanitizeText(dto.getFullName()));
        dto.setEmail(inputSanitizer.sanitizeEmail(dto.getEmail()));
        dto.setPhone(inputSanitizer.sanitizePhone(dto.getPhone()));
        dto.setAddress(inputSanitizer.sanitizeText(dto.getAddress()));
        dto.setMessage(inputSanitizer.sanitizeText(dto.getMessage()));
        dto.setLanguage(inputSanitizer.sanitizeText(dto.getLanguage()));

        // Convert DTO to entity
        MembershipApplication entity = new MembershipApplication();
        entity.setFullName(dto.getFullName());
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setAddress(dto.getAddress());
        entity.setMessage(dto.getMessage());
        entity.setSubmittedAt(dto.getSubmittedAt());
        entity.setLanguage(dto.getLanguage());

        // Save to database
        entity = membershipRepository.save(entity);
        log.info("Saved membership application to database: ID={}, Email={}", entity.getId(), entity.getEmail());

        // Send email notification if enabled
        if (emailNotificationsEnabled) {
            try {
                emailNotificationService.sendMembershipApplicationNotification(dto);
            } catch (Exception e) {
                log.error("Failed to send email notification for membership application", e);
                // Don't fail the request if email fails
            }
        }
    }

    @Transactional
    public void saveVolunteerApplication(VolunteerApplicationDto dto) {
        // Sanitize input
        dto.setFullName(inputSanitizer.sanitizeText(dto.getFullName()));
        dto.setEmail(inputSanitizer.sanitizeEmail(dto.getEmail()));
        dto.setPhone(inputSanitizer.sanitizePhone(dto.getPhone()));
        dto.setMessage(inputSanitizer.sanitizeText(dto.getMessage()));
        dto.setLanguage(inputSanitizer.sanitizeText(dto.getLanguage()));

        // Convert DTO to entity
        VolunteerApplication entity = new VolunteerApplication();
        entity.setFullName(dto.getFullName());
        entity.setEmail(dto.getEmail());
        entity.setPhone(dto.getPhone());
        entity.setMessage(dto.getMessage());
        entity.setSubmittedAt(dto.getSubmittedAt());
        entity.setLanguage(dto.getLanguage());

        // Save to database
        entity = volunteerRepository.save(entity);
        log.info("Saved volunteer application to database: ID={}, Email={}", entity.getId(), entity.getEmail());

        // Send email notification if enabled
        if (emailNotificationsEnabled) {
            try {
                emailNotificationService.sendVolunteerApplicationNotification(dto);
            } catch (Exception e) {
                log.error("Failed to send email notification for volunteer application", e);
                // Don't fail the request if email fails
            }
        }
    }

    @Transactional(readOnly = true)
    public List<MembershipApplicationDto> getAllMembershipApplications() {
        return membershipRepository.findAll().stream()
                .map(this::convertMembershipToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<VolunteerApplicationDto> getAllVolunteerApplications() {
        return volunteerRepository.findAll().stream()
                .map(this::convertVolunteerToDto)
                .collect(Collectors.toList());
    }

    private MembershipApplicationDto convertMembershipToDto(MembershipApplication entity) {
        MembershipApplicationDto dto = new MembershipApplicationDto();
        dto.setFullName(entity.getFullName());
        dto.setEmail(entity.getEmail());
        dto.setPhone(entity.getPhone());
        dto.setAddress(entity.getAddress());
        dto.setMessage(entity.getMessage());
        dto.setSubmittedAt(entity.getSubmittedAt());
        dto.setLanguage(entity.getLanguage());
        return dto;
    }

    private VolunteerApplicationDto convertVolunteerToDto(VolunteerApplication entity) {
        VolunteerApplicationDto dto = new VolunteerApplicationDto();
        dto.setFullName(entity.getFullName());
        dto.setEmail(entity.getEmail());
        dto.setPhone(entity.getPhone());
        dto.setMessage(entity.getMessage());
        dto.setSubmittedAt(entity.getSubmittedAt());
        dto.setLanguage(entity.getLanguage());
        return dto;
    }
}
