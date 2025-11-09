package com.example.proxy.service;

import com.example.proxy.dto.MembershipApplicationDto;
import com.example.proxy.dto.VolunteerApplicationDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

/**
 * Service for sending email notifications about form submissions
 */
@Service
public class EmailNotificationService {

    private static final Logger log = LoggerFactory.getLogger(EmailNotificationService.class);
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final JavaMailSender mailSender;

    @Value("${app.email.admin:admin@desn.org.np}")
    private String adminEmail;

    @Value("${app.email.from:noreply@desn.org.np}")
    private String fromEmail;

    @Value("${spring.mail.username:#{null}}")
    private String mailUsername;

    public EmailNotificationService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendMembershipApplicationNotification(MembershipApplicationDto application) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mailUsername != null ? mailUsername : fromEmail);
            message.setTo(adminEmail);
            message.setSubject("New Membership Application - " + application.getFullName());
            message.setText(buildMembershipEmailBody(application));

            mailSender.send(message);
            log.info("Sent membership application notification email to {}", adminEmail);
        } catch (Exception e) {
            log.error("Failed to send membership application notification", e);
            throw e;
        }
    }

    public void sendVolunteerApplicationNotification(VolunteerApplicationDto application) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(mailUsername != null ? mailUsername : fromEmail);
            message.setTo(adminEmail);
            message.setSubject("New Volunteer Application - " + application.getFullName());
            message.setText(buildVolunteerEmailBody(application));

            mailSender.send(message);
            log.info("Sent volunteer application notification email to {}", adminEmail);
        } catch (Exception e) {
            log.error("Failed to send volunteer application notification", e);
            throw e;
        }
    }

    private String buildMembershipEmailBody(MembershipApplicationDto application) {
        StringBuilder body = new StringBuilder();
        body.append("New Membership Application Received\n\n");
        body.append("===================================\n\n");
        body.append("Full Name: ").append(application.getFullName()).append("\n");
        body.append("Email: ").append(application.getEmail()).append("\n");
        body.append("Phone: ").append(application.getPhone()).append("\n");
        body.append("Address: ").append(application.getAddress() != null ? application.getAddress() : "N/A").append("\n");
        body.append("Language: ").append(application.getLanguage() != null ? application.getLanguage() : "N/A").append("\n");
        body.append("Submitted: ").append(application.getSubmittedAt().format(FORMATTER)).append("\n\n");
        body.append("Message:\n");
        body.append(application.getMessage() != null ? application.getMessage() : "No message provided").append("\n\n");
        body.append("===================================\n");
        body.append("Please review and follow up with the applicant.\n");

        return body.toString();
    }

    private String buildVolunteerEmailBody(VolunteerApplicationDto application) {
        StringBuilder body = new StringBuilder();
        body.append("New Volunteer Application Received\n\n");
        body.append("===================================\n\n");
        body.append("Full Name: ").append(application.getFullName()).append("\n");
        body.append("Email: ").append(application.getEmail()).append("\n");
        body.append("Phone: ").append(application.getPhone()).append("\n");
        body.append("Language: ").append(application.getLanguage() != null ? application.getLanguage() : "N/A").append("\n");
        body.append("Submitted: ").append(application.getSubmittedAt().format(FORMATTER)).append("\n\n");
        body.append("Message:\n");
        body.append(application.getMessage() != null ? application.getMessage() : "No message provided").append("\n\n");
        body.append("===================================\n");
        body.append("Please review and follow up with the applicant.\n");

        return body.toString();
    }
}
