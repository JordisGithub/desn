package com.example.proxy.service;

import com.example.proxy.dto.MembershipApplicationDto;
import com.example.proxy.dto.VolunteerApplicationDto;
import com.example.proxy.util.InputSanitizer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class FormSubmissionService {

    private static final Logger log = LoggerFactory.getLogger(FormSubmissionService.class);
    private static final String SUBMISSIONS_DIR = "form-submissions";
    private static final DateTimeFormatter FILENAME_FORMATTER = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");
    
    private final ObjectMapper objectMapper;
    private final InputSanitizer inputSanitizer;

    public FormSubmissionService(InputSanitizer inputSanitizer) {
        this.inputSanitizer = inputSanitizer;
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
        this.objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
        ensureDirectoriesExist();
    }

    private void ensureDirectoriesExist() {
        try {
            Files.createDirectories(Path.of(SUBMISSIONS_DIR, "membership"));
            Files.createDirectories(Path.of(SUBMISSIONS_DIR, "volunteer"));
            log.info("Form submission directories created/verified");
        } catch (IOException e) {
            log.error("Failed to create submission directories", e);
        }
    }

    public void saveMembershipApplication(MembershipApplicationDto application) throws IOException {
        // Sanitize all input fields
        application.setFullName(inputSanitizer.sanitizeText(application.getFullName()));
        application.setEmail(inputSanitizer.sanitizeEmail(application.getEmail()));
        application.setPhone(inputSanitizer.sanitizePhone(application.getPhone()));
        application.setAddress(inputSanitizer.sanitizeText(application.getAddress()));
        application.setMessage(inputSanitizer.sanitizeText(application.getMessage()));
        application.setLanguage(inputSanitizer.sanitizeText(application.getLanguage()));
        
        String timestamp = application.getSubmittedAt().format(FILENAME_FORMATTER);
        String sanitizedName = sanitizeFilename(application.getFullName());
        String filename = "membership_%s_%s.json".formatted(timestamp, sanitizedName);
        
        Path filePath = Path.of(SUBMISSIONS_DIR, "membership", filename);
        objectMapper.writeValue(filePath.toFile(), application);
        
        log.info("Saved membership application: {}", filename);
        
        // Also append to a CSV log for easy viewing
        appendToCsvLog("membership", application);
    }

    public void saveVolunteerApplication(VolunteerApplicationDto application) throws IOException {
        // Sanitize all input fields
        application.setFullName(inputSanitizer.sanitizeText(application.getFullName()));
        application.setEmail(inputSanitizer.sanitizeEmail(application.getEmail()));
        application.setPhone(inputSanitizer.sanitizePhone(application.getPhone()));
        application.setMessage(inputSanitizer.sanitizeText(application.getMessage()));
        application.setLanguage(inputSanitizer.sanitizeText(application.getLanguage()));
        
        String timestamp = application.getSubmittedAt().format(FILENAME_FORMATTER);
        String sanitizedName = sanitizeFilename(application.getFullName());
        String filename = "volunteer_%s_%s.json".formatted(timestamp, sanitizedName);
        
        Path filePath = Path.of(SUBMISSIONS_DIR, "volunteer", filename);
        objectMapper.writeValue(filePath.toFile(), application);
        
        log.info("Saved volunteer application: {}", filename);
        
        // Also append to a CSV log for easy viewing
        appendToCsvLog("volunteer", application);
    }

    public List<MembershipApplicationDto> getAllMembershipApplications() throws IOException {
        List<MembershipApplicationDto> applications = new ArrayList<>();
        Path dir = Path.of(SUBMISSIONS_DIR, "membership");
        
        if (Files.exists(dir)) {
            Files.list(dir)
                .filter(path -> path.toString().endsWith(".json"))
                .forEach(path -> {
                    try {
                        MembershipApplicationDto app = objectMapper.readValue(path.toFile(), MembershipApplicationDto.class);
                        applications.add(app);
                    } catch (IOException e) {
                        log.error("Failed to read application file: {}", path, e);
                    }
                });
        }
        
        return applications;
    }

    public List<VolunteerApplicationDto> getAllVolunteerApplications() throws IOException {
        List<VolunteerApplicationDto> applications = new ArrayList<>();
        Path dir = Path.of(SUBMISSIONS_DIR, "volunteer");
        
        if (Files.exists(dir)) {
            Files.list(dir)
                .filter(path -> path.toString().endsWith(".json"))
                .forEach(path -> {
                    try {
                        VolunteerApplicationDto app = objectMapper.readValue(path.toFile(), VolunteerApplicationDto.class);
                        applications.add(app);
                    } catch (IOException e) {
                        log.error("Failed to read application file: {}", path, e);
                    }
                });
        }
        
        return applications;
    }

    private String sanitizeFilename(String name) {
        if (name == null) return "unknown";
        return name.replaceAll("[^a-zA-Z0-9-_]", "_").toLowerCase();
    }

    private void appendToCsvLog(String type, Object application) {
        try {
            Path csvPath = Path.of(SUBMISSIONS_DIR, type + "_log.csv");
            boolean isNewFile = !Files.exists(csvPath);
            
            try (FileWriter writer = new FileWriter(csvPath.toFile(), true)) {
                if (isNewFile) {
                    // Write header
                    if (application instanceof MembershipApplicationDto) {
                        writer.write("Timestamp,Full Name,Email,Phone,Address,Message,Language\n");
                    } else if (application instanceof VolunteerApplicationDto) {
                        writer.write("Timestamp,Full Name,Email,Phone,Message,Language\n");
                    }
                }
                
                // Write data
                if (application instanceof MembershipApplicationDto app) {
                    writer.write("%s,%s,%s,%s,%s,%s,%s\n".formatted(
                            app.getSubmittedAt(),
                            escapeCsv(app.getFullName()),
                            escapeCsv(app.getEmail()),
                            escapeCsv(app.getPhone()),
                            escapeCsv(app.getAddress()),
                            escapeCsv(app.getMessage()),
                            escapeCsv(app.getLanguage())
                    ));
                } else if (application instanceof VolunteerApplicationDto app) {
                    writer.write("%s,%s,%s,%s,%s,%s\n".formatted(
                            app.getSubmittedAt(),
                            escapeCsv(app.getFullName()),
                            escapeCsv(app.getEmail()),
                            escapeCsv(app.getPhone()),
                            escapeCsv(app.getMessage()),
                            escapeCsv(app.getLanguage())
                    ));
                }
            }
        } catch (IOException e) {
            log.error("Failed to append to CSV log", e);
        }
    }

    private String escapeCsv(String value) {
        if (value == null) return "";
        if (value.contains(",") || value.contains("\"") || value.contains("\n")) {
            return "\"" + value.replace("\"", "\"\"") + "\"";
        }
        return value;
    }
}
