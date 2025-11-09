package com.example.proxy.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public class MembershipApplicationDto {

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

    @JsonProperty("address")
    private String address;

    @JsonProperty("message")
    private String message;

    @JsonProperty("submittedAt")
    private LocalDateTime submittedAt;

    @JsonProperty("language")
    private String language;

    // Constructors
    public MembershipApplicationDto() {
        this.submittedAt = LocalDateTime.now();
    }

    public MembershipApplicationDto(String fullName, String email, String phone, String address, String message, String language) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.address = address;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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
        return "MembershipApplicationDto{" +
                "fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", message='" + message + '\'' +
                ", submittedAt=" + submittedAt +
                ", language='" + language + '\'' +
                '}';
    }
}
