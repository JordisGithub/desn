package com.example.proxy.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class InitiatePaymentRequest {

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "1.0", message = "Minimum donation amount is NPR 1")
    @DecimalMax(value = "1000000.0", message = "Maximum donation amount is NPR 1,000,000")
    private BigDecimal amount;

    @NotBlank(message = "Donor name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String donorName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String donorEmail;

    @Pattern(regexp = "^[0-9+\\-\\s()]{7,15}$", message = "Invalid phone number format")
    private String donorPhone;

    @Size(max = 500, message = "Message must not exceed 500 characters")
    private String donorMessage;

    @NotBlank(message = "Return URL is required")
    private String returnUrl;

    @NotBlank(message = "Website URL is required")
    private String websiteUrl;

    // Getters and Setters
    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getDonorName() {
        return donorName;
    }

    public void setDonorName(String donorName) {
        this.donorName = donorName;
    }

    public String getDonorEmail() {
        return donorEmail;
    }

    public void setDonorEmail(String donorEmail) {
        this.donorEmail = donorEmail;
    }

    public String getDonorPhone() {
        return donorPhone;
    }

    public void setDonorPhone(String donorPhone) {
        this.donorPhone = donorPhone;
    }

    public String getDonorMessage() {
        return donorMessage;
    }

    public void setDonorMessage(String donorMessage) {
        this.donorMessage = donorMessage;
    }

    public String getReturnUrl() {
        return returnUrl;
    }

    public void setReturnUrl(String returnUrl) {
        this.returnUrl = returnUrl;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }
}
