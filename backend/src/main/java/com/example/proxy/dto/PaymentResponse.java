package com.example.proxy.dto;

public class PaymentResponse {
    
    private boolean success;
    private String message;
    private String transactionId;
    private String paymentUrl;
    private String pidx;
    private Object data;

    public PaymentResponse() {
    }

    public PaymentResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public PaymentResponse(boolean success, String message, String transactionId, String paymentUrl, String pidx) {
        this.success = success;
        this.message = message;
        this.transactionId = transactionId;
        this.paymentUrl = paymentUrl;
        this.pidx = pidx;
    }

    // Static factory method for error responses
    public static PaymentResponse error(String message) {
        return new PaymentResponse(false, message);
    }

    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getPaymentUrl() {
        return paymentUrl;
    }

    public void setPaymentUrl(String paymentUrl) {
        this.paymentUrl = paymentUrl;
    }

    public String getPidx() {
        return pidx;
    }

    public void setPidx(String pidx) {
        this.pidx = pidx;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
