package com.example.proxy.config;

import com.example.proxy.entity.User;
import com.example.proxy.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Data initializer to create default admin user on application startup.
 * Checks if admin user exists before creating to avoid duplicates.
 */
@Configuration
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Check if admin user already exists
            if (!userRepository.existsByUsername("admin")) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@desn.org");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setFullName("DESN Administrator");
                admin.setRole(User.Role.ADMIN);
                admin.setEnabled(true);
                
                userRepository.save(admin);
                logger.info("✅ Default admin user created successfully!");
                logger.info("   Username: admin");
                logger.info("   Password: admin123");
                logger.info("   ⚠️  IMPORTANT: Change this password in production!");
            } else {
                logger.info("Admin user already exists. Skipping initialization.");
            }

            // Create a test member user for testing
            if (!userRepository.existsByUsername("member")) {
                User member = new User();
                member.setUsername("member");
                member.setEmail("member@desn.org");
                member.setPassword(passwordEncoder.encode("member123"));
                member.setFullName("Test Member");
                member.setRole(User.Role.MEMBER);
                member.setEnabled(true);
                
                userRepository.save(member);
                logger.info("✅ Test member user created successfully!");
                logger.info("   Username: member");
                logger.info("   Password: member123");
            } else {
                logger.info("Test member user already exists. Skipping initialization.");
            }
        };
    }
}
