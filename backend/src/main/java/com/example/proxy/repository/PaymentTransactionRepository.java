package com.example.proxy.repository;

import com.example.proxy.entity.PaymentTransaction;
import com.example.proxy.entity.PaymentTransaction.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentTransactionRepository extends JpaRepository<PaymentTransaction, Long> {
    
    Optional<PaymentTransaction> findByTransactionId(String transactionId);
    
    Optional<PaymentTransaction> findByKhaltiPidx(String khaltiPidx);
    
    List<PaymentTransaction> findByStatus(PaymentStatus status);
    
    List<PaymentTransaction> findByPaymentGateway(String paymentGateway);
    
    List<PaymentTransaction> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    List<PaymentTransaction> findByStatusAndCreatedAtBefore(PaymentStatus status, LocalDateTime dateTime);
}
