package com.example.proxy.service;

import com.example.proxy.dto.InitiatePaymentRequest;
import com.example.proxy.dto.PaymentResponse;
import com.example.proxy.entity.PaymentTransaction;
import com.example.proxy.repository.PaymentTransactionRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class KhaltiPaymentService {

    private static final Logger log = LoggerFactory.getLogger(KhaltiPaymentService.class);

    @Value("${khalti.secret.key:}")
    private String khaltiSecretKey;

    @Value("${khalti.public.key:}")
    private String khaltiPublicKey;

    @Value("${khalti.api.url:https://a.khalti.com/api/v2}")
    private String khaltiApiUrl;

    @Value("${app.base.url:http://localhost:5175}")
    private String appBaseUrl;

    private final PaymentTransactionRepository paymentRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public KhaltiPaymentService(
            PaymentTransactionRepository paymentRepository,
            RestTemplate restTemplate,
            ObjectMapper objectMapper) {
        this.paymentRepository = paymentRepository;
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    @Transactional
    @SuppressWarnings("null")
    public PaymentResponse initiatePayment(InitiatePaymentRequest request) {
        try {
            // Validate Khalti configuration
            if (khaltiSecretKey == null || khaltiSecretKey.trim().isEmpty()) {
                log.warn("Khalti secret key is not configured - payment features are disabled");
                return new PaymentResponse(false, "Payment gateway is not configured yet. Please contact the administrator to enable donations.");
            }
            
            // Generate unique transaction ID
            String transactionId = generateTransactionId();

            // Create payment transaction record
            PaymentTransaction transaction = new PaymentTransaction();
            transaction.setTransactionId(transactionId);
            transaction.setPaymentGateway("KHALTI");
            transaction.setAmount(request.getAmount());
            transaction.setCurrency("NPR");
            transaction.setStatus(PaymentTransaction.PaymentStatus.PENDING);
            transaction.setDonorName(request.getDonorName());
            transaction.setDonorEmail(request.getDonorEmail());
            transaction.setDonorPhone(request.getDonorPhone());
            transaction.setDonorMessage(request.getDonorMessage());
            
            transaction = paymentRepository.save(transaction);

            // Prepare Khalti payment initiation request
            Map<String, Object> khaltiRequest = new HashMap<>();
            khaltiRequest.put("return_url", appBaseUrl + "/payment/verify?txnId=" + transactionId);
            khaltiRequest.put("website_url", appBaseUrl);
            khaltiRequest.put("amount", request.getAmount().multiply(BigDecimal.valueOf(100)).intValue()); // Convert to paisa
            khaltiRequest.put("purchase_order_id", transactionId);
            khaltiRequest.put("purchase_order_name", "Donation to DESN");
            
            Map<String, Object> customerInfo = new HashMap<>();
            customerInfo.put("name", request.getDonorName());
            customerInfo.put("email", request.getDonorEmail());
            customerInfo.put("phone", request.getDonorPhone());
            khaltiRequest.put("customer_info", customerInfo);

            Map<String, Object> productDetails = new HashMap<>();
            productDetails.put("identity", transactionId);
            productDetails.put("name", "Donation");
            khaltiRequest.put("product_details", new Object[]{productDetails});

            // Call Khalti API to initiate payment
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Key " + khaltiSecretKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(khaltiRequest, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    khaltiApiUrl + "/epayment/initiate/",
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode responseBody = objectMapper.readTree(response.getBody());
                
                String pidx = responseBody.get("pidx").asText();
                String paymentUrl = responseBody.get("payment_url").asText();

                // Update transaction with Khalti details
                transaction.setKhaltiPidx(pidx);
                transaction.setStatus(PaymentTransaction.PaymentStatus.INITIATED);
                paymentRepository.save(transaction);

                log.info("Payment initiated successfully. TransactionId: {}, Pidx: {}", transactionId, pidx);

                return new PaymentResponse(true, "Payment initiated successfully", transactionId, paymentUrl, pidx);
            } else {
                transaction.setStatus(PaymentTransaction.PaymentStatus.FAILED);
                transaction.setFailureReason("Khalti API error: " + response.getStatusCode());
                paymentRepository.save(transaction);

                log.error("Khalti API error: {}", response.getStatusCode());
                return new PaymentResponse(false, "Failed to initiate payment");
            }

        } catch (Exception e) {
            log.error("Error initiating payment", e);
            return new PaymentResponse(false, "An error occurred: " + e.getMessage());
        }
    }

    @Transactional
    @SuppressWarnings("null")
    public PaymentResponse verifyPayment(String transactionId, String pidx) {
        try {
            PaymentTransaction transaction = paymentRepository.findByTransactionId(transactionId)
                    .orElseThrow(() -> new RuntimeException("Transaction not found"));

            if (!transaction.getKhaltiPidx().equals(pidx)) {
                log.error("Pidx mismatch. Expected: {}, Got: {}", transaction.getKhaltiPidx(), pidx);
                return new PaymentResponse(false, "Invalid payment reference");
            }

            // Call Khalti API to verify payment
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Key " + khaltiSecretKey);

            Map<String, String> verifyRequest = new HashMap<>();
            verifyRequest.put("pidx", pidx);

            HttpEntity<Map<String, String>> entity = new HttpEntity<>(verifyRequest, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    khaltiApiUrl + "/epayment/lookup/",
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode responseBody = objectMapper.readTree(response.getBody());
                
                String status = responseBody.get("status").asText();
                
                if ("Completed".equalsIgnoreCase(status)) {
                    transaction.setStatus(PaymentTransaction.PaymentStatus.COMPLETED);
                    transaction.setVerifiedAt(LocalDateTime.now());
                    transaction.setCompletedAt(LocalDateTime.now());
                    
                    if (responseBody.has("transaction_id")) {
                        transaction.setKhaltiTransactionId(responseBody.get("transaction_id").asText());
                    }
                    
                    transaction.setMetadata(response.getBody());
                    paymentRepository.save(transaction);

                    log.info("Payment verified and completed. TransactionId: {}", transactionId);

                    PaymentResponse paymentResponse = new PaymentResponse(true, "Payment completed successfully");
                    paymentResponse.setTransactionId(transactionId);
                    paymentResponse.setData(transaction);
                    return paymentResponse;
                    
                } else if ("Pending".equalsIgnoreCase(status)) {
                    transaction.setStatus(PaymentTransaction.PaymentStatus.PROCESSING);
                    paymentRepository.save(transaction);
                    
                    return new PaymentResponse(false, "Payment is still processing");
                    
                } else {
                    transaction.setStatus(PaymentTransaction.PaymentStatus.FAILED);
                    transaction.setFailureReason("Payment status: " + status);
                    paymentRepository.save(transaction);
                    
                    return new PaymentResponse(false, "Payment failed");
                }
            } else {
                log.error("Khalti verification API error: {}", response.getStatusCode());
                return new PaymentResponse(false, "Failed to verify payment");
            }

        } catch (Exception e) {
            log.error("Error verifying payment", e);
            return new PaymentResponse(false, "An error occurred: " + e.getMessage());
        }
    }

    public PaymentTransaction getTransactionDetails(String transactionId) {
        return paymentRepository.findByTransactionId(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    public java.util.List<PaymentTransaction> getAllTransactions() {
        return paymentRepository.findAll();
    }

    private String generateTransactionId() {
        return "DESN-" + System.currentTimeMillis() + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
