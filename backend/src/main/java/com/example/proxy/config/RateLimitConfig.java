package com.example.proxy.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
public class RateLimitConfig {

    /**
     * Rate limit: 5 requests per minute per IP address
     * This helps prevent spam and abuse of form submission endpoints
     */
    private static final int CAPACITY = 5;
    private static final Duration REFILL_DURATION = Duration.ofMinutes(1);

    @Bean
    public Map<String, Bucket> rateLimitBuckets() {
        return new ConcurrentHashMap<>();
    }

    /**
     * Creates a bucket for rate limiting
     * Each bucket allows CAPACITY requests and refills at rate of CAPACITY per REFILL_DURATION
     */
    public Bucket createBucket() {
        Bandwidth limit = Bandwidth.builder()
            .capacity(CAPACITY)
            .refillGreedy(CAPACITY, REFILL_DURATION)
            .build();
        return Bucket.builder()
            .addLimit(limit)
            .build();
    }
}
