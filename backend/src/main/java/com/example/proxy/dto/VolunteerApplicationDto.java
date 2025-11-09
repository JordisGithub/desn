package com.example.proxy.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public class VolunteerApplicationDto {

    @NotBlank(message = "Full name is required")
    @JsonProperty("fullName")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @JsonProperty("email")
    private String email;

    @NotBlank(message = "Phone number is required")
    @JsonProperty("phone")
    private String phone;

    @JsonProperty("message")
    private String message;

    @JsonProperty("submittedAt")
    private LocalDateTime submittedAt;

    @JsonProperty("language")
    private String language;

    // Constructors
    public VolunteerApplicationDto() {
        this.submittedAt = LocalDateTime.now();
    }

    public VolunteerApplicationDto(String fullName, String email, String phone, String message, String language) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.message = message;
        this.language = language;
        this.submittedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    @Override
    public String toString() {
        return "VolunteerApplicationDto{" +
                "fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", message='" + message + '\'' +
                ", submittedAt=" + submittedAt +
                ", language='" + language + '\'' +
                '}';
    }
}
