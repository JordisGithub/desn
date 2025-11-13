package com.example.proxy.controller;

import com.example.proxy.dto.InitiatePaymentRequest;
import com.example.proxy.dto.PaymentResponse;
import com.example.proxy.entity.PaymentTransaction;
import com.example.proxy.service.KhaltiPaymentService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private static final Logger log = LoggerFactory.getLogger(PaymentController.class);

    private final KhaltiPaymentService khaltiPaymentService;

    public PaymentController(KhaltiPaymentService khaltiPaymentService) {
        this.khaltiPaymentService = khaltiPaymentService;
    }

    @PostMapping("/initiate")
    public ResponseEntity<?> initiatePayment(
            @Valid @RequestBody InitiatePaymentRequest request,
            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            Map<String, String> errors = bindingResult.getFieldErrors().stream()
                    .collect(Collectors.toMap(
                            error -> error.getField(),
                            error -> error.getDefaultMessage()
                    ));
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Validation failed",
                    "errors", errors
            ));
        }

        try {
            PaymentResponse response = khaltiPaymentService.initiatePayment(request);
            
            if (response.isSuccess()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        } catch (Exception e) {
            log.error("Error initiating payment", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new PaymentResponse(false, "Failed to initiate payment: " + e.getMessage())
            );
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyPayment(
            @RequestParam String txnId,
            @RequestParam String pidx) {

        try {
            PaymentResponse response = khaltiPaymentService.verifyPayment(txnId, pidx);
            
            if (response.isSuccess()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
        } catch (Exception e) {
            log.error("Error verifying payment", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new PaymentResponse(false, "Failed to verify payment: " + e.getMessage())
            );
        }
    }

    @GetMapping("/status/{transactionId}")
    public ResponseEntity<?> getPaymentStatus(@PathVariable String transactionId) {
        try {
            PaymentTransaction transaction = khaltiPaymentService.getTransactionDetails(transactionId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("transactionId", transaction.getTransactionId());
            response.put("status", transaction.getStatus());
            response.put("amount", transaction.getAmount());
            response.put("currency", transaction.getCurrency());
            response.put("createdAt", transaction.getCreatedAt());
            response.put("completedAt", transaction.getCompletedAt());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error fetching payment status", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    Map.of("success", false, "message", "Transaction not found")
            );
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<PaymentResponse> handleWebhook(@RequestBody Map<String, Object> webhookData) {
        log.info("Received Khalti webhook: {}", webhookData);
        
        try {
            String pidx = (String) webhookData.get("pidx");
            if (pidx != null) {
                // Verify the payment
                PaymentResponse response = khaltiPaymentService.verifyPayment(pidx, null);
                return ResponseEntity.ok(response);
            }
            
            return ResponseEntity.ok(PaymentResponse.error("No pidx provided"));
        } catch (Exception e) {
            log.error("Error processing webhook", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(PaymentResponse.error("Failed to process webhook"));
        }
    }

    @GetMapping("/transactions")
    public ResponseEntity<?> getAllTransactions() {
        log.info("Admin fetching all payment transactions");
        
        try {
            List<PaymentTransaction> transactions = khaltiPaymentService.getAllTransactions();
            return ResponseEntity.ok(transactions);
        } catch (Exception e) {
            log.error("Error fetching transactions", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(PaymentResponse.error("Failed to fetch transactions"));
        }
    }
}
