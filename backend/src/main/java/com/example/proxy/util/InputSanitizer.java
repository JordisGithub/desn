package com.example.proxy.util;

import org.owasp.encoder.Encode;
import org.springframework.stereotype.Component;

/**
 * Utility class for sanitizing user input to prevent XSS attacks
 */
@Component
public class InputSanitizer {

    /**
     * Sanitizes HTML content to prevent XSS attacks
     * Encodes special characters that could be used for script injection
     */
    public String sanitizeHtml(String input) {
        if (input == null) {
            return null;
        }
        return Encode.forHtml(input);
    }

    /**
     * Sanitizes input for use in HTML attributes
     */
    public String sanitizeHtmlAttribute(String input) {
        if (input == null) {
            return null;
        }
        return Encode.forHtmlAttribute(input);
    }

    /**
     * Removes potentially dangerous characters while preserving normal text
     * Good for names, addresses, and messages
     */
    public String sanitizeText(String input) {
        if (input == null) {
            return null;
        }
        
        // Remove null bytes and control characters except common ones (newline, tab)
        String sanitized = input.replaceAll("[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]", "");
        
        // Trim whitespace
        sanitized = sanitized.trim();
        
        // Limit length to prevent DOS attacks
        if (sanitized.length() > 5000) {
            sanitized = sanitized.substring(0, 5000);
        }
        
        return sanitized;
    }

    /**
     * Validates and sanitizes email addresses
     */
    public String sanitizeEmail(String email) {
        if (email == null) {
            return null;
        }
        
        // Remove whitespace and convert to lowercase
        String sanitized = email.trim().toLowerCase();
        
        // Remove any control characters
        sanitized = sanitized.replaceAll("[\\x00-\\x1F\\x7F]", "");
        
        return sanitized;
    }

    /**
     * Validates and sanitizes phone numbers
     */
    public String sanitizePhone(String phone) {
        if (phone == null) {
            return null;
        }
        
        // Remove all characters except digits, spaces, +, -, (, )
        String sanitized = phone.replaceAll("[^0-9\\s+\\-()]", "");
        
        return sanitized.trim();
    }
}
