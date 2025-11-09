package com.example.proxy.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payment_transactions")
public class PaymentTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String transactionId;

    @Column(nullable = false)
    private String paymentGateway; // "KHALTI", "BANK_TRANSFER"

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false, length = 3)
    private String currency; // "NPR", "USD"

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    private String donorName;
    private String donorEmail;
    private String donorPhone;
    private String donorMessage;

    // Khalti specific fields
    private String khaltiToken;
    private String khaltiPidx;
    private String khaltiTransactionId;
    
    // Bank transfer specific fields
    private String bankReferenceNumber;
    private String bankName;

    @Column(length = 1000)
    private String metadata; // JSON string for additional data

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime verifiedAt;
    private LocalDateTime completedAt;

    @Column(length = 500)
    private String failureReason;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public enum PaymentStatus {
        PENDING,
        INITIATED,
        PROCESSING,
        COMPLETED,
        FAILED,
        REFUNDED,
        CANCELLED
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getPaymentGateway() {
        return paymentGateway;
    }

    public void setPaymentGateway(String paymentGateway) {
        this.paymentGateway = paymentGateway;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
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

    public String getKhaltiToken() {
        return khaltiToken;
    }

    public void setKhaltiToken(String khaltiToken) {
        this.khaltiToken = khaltiToken;
    }

    public String getKhaltiPidx() {
        return khaltiPidx;
    }

    public void setKhaltiPidx(String khaltiPidx) {
        this.khaltiPidx = khaltiPidx;
    }

    public String getKhaltiTransactionId() {
        return khaltiTransactionId;
    }

    public void setKhaltiTransactionId(String khaltiTransactionId) {
        this.khaltiTransactionId = khaltiTransactionId;
    }

    public String getBankReferenceNumber() {
        return bankReferenceNumber;
    }

    public void setBankReferenceNumber(String bankReferenceNumber) {
        this.bankReferenceNumber = bankReferenceNumber;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getMetadata() {
        return metadata;
    }

    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getVerifiedAt() {
        return verifiedAt;
    }

    public void setVerifiedAt(LocalDateTime verifiedAt) {
        this.verifiedAt = verifiedAt;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public String getFailureReason() {
        return failureReason;
    }

    public void setFailureReason(String failureReason) {
        this.failureReason = failureReason;
    }
}
