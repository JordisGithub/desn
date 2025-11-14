package com.example.proxy.controller;

import com.example.proxy.entity.User;
import com.example.proxy.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Get all users - OWNER only
     */
    @GetMapping
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<?> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            List<Map<String, Object>> userList = users.stream()
                .map(user -> {
                    Map<String, Object> userMap = new HashMap<>();
                    userMap.put("id", user.getId());
                    userMap.put("username", user.getUsername());
                    userMap.put("email", user.getEmail());
                    userMap.put("fullName", user.getFullName());
                    userMap.put("role", user.getRole().name());
                    userMap.put("enabled", user.isEnabled());
                    userMap.put("createdAt", user.getCreatedAt());
                    return userMap;
                })
                .collect(Collectors.toList());

            return ResponseEntity.ok(userList);
        } catch (Exception e) {
            log.error("Error fetching users", e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to fetch users"));
        }
    }

    /**
     * Update user role - OWNER only
     */
    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            String newRole = request.get("role");
            
            if (newRole == null || (!newRole.equals("OWNER") && !newRole.equals("ADMIN") && !newRole.equals("MEMBER"))) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Invalid role. Must be OWNER, ADMIN, or MEMBER"));
            }

            User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

            user.setRole(User.Role.valueOf(newRole));
            userRepository.save(user);

            log.info("User {} role updated to {}", user.getUsername(), newRole);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "User role updated successfully",
                "user", Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "email", user.getEmail(),
                    "fullName", user.getFullName(),
                    "role", user.getRole().name(),
                    "enabled", user.isEnabled()
                )
            ));
        } catch (Exception e) {
            log.error("Error updating user role", e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to update user role: " + e.getMessage()));
        }
    }

    /**
     * Delete user - OWNER only
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

            // Prevent deleting the last owner
            if (user.getRole() == User.Role.OWNER) {
                long ownerCount = userRepository.findAll().stream()
                    .filter(u -> u.getRole() == User.Role.OWNER)
                    .count();
                
                if (ownerCount <= 1) {
                    return ResponseEntity.badRequest()
                        .body(Map.of("error", "Cannot delete the last owner"));
                }
            }

            String username = user.getUsername();
            userRepository.delete(user);

            log.info("User {} deleted", username);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "User deleted successfully"
            ));
        } catch (Exception e) {
            log.error("Error deleting user", e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to delete user: " + e.getMessage()));
        }
    }

    /**
     * Create new user - OWNER only
     */
    @PostMapping
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<?> createUser(@RequestBody Map<String, String> request) {
        try {
            String username = request.get("username");
            String email = request.get("email");
            String password = request.get("password");
            String fullName = request.get("fullName");
            String role = request.get("role");

            // Validation
            if (username == null || username.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Username is required"));
            }
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Email is required"));
            }
            if (password == null || password.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Password is required"));
            }
            if (role == null || (!role.equals("OWNER") && !role.equals("ADMIN") && !role.equals("MEMBER"))) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Invalid role. Must be OWNER, ADMIN, or MEMBER"));
            }

            // Check if username exists
            if (userRepository.existsByUsername(username)) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Username already exists"));
            }

            // Check if email exists
            if (userRepository.existsByEmail(email)) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "Email already exists"));
            }

            // Create new user
            User user = new User();
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password));
            user.setFullName(fullName != null ? fullName : username);
            user.setRole(User.Role.valueOf(role));
            user.setEnabled(true);

            user = userRepository.save(user);

            log.info("New user created by owner: {} with role {}", user.getUsername(), user.getRole());

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "User created successfully",
                "user", Map.of(
                    "id", user.getId(),
                    "username", user.getUsername(),
                    "email", user.getEmail(),
                    "fullName", user.getFullName(),
                    "role", user.getRole().name(),
                    "enabled", user.isEnabled()
                )
            ));
        } catch (Exception e) {
            log.error("Error creating user", e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to create user: " + e.getMessage()));
        }
    }

    /**
     * Toggle user enabled status - OWNER only
     */
    @PutMapping("/{id}/toggle-status")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<?> toggleUserStatus(@PathVariable Long id) {
        try {
            User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

            // Prevent disabling the last owner
            if (user.getRole() == User.Role.OWNER && user.isEnabled()) {
                long enabledOwnerCount = userRepository.findAll().stream()
                    .filter(u -> u.getRole() == User.Role.OWNER && u.isEnabled())
                    .count();
                
                if (enabledOwnerCount <= 1) {
                    return ResponseEntity.badRequest()
                        .body(Map.of("error", "Cannot disable the last enabled owner"));
                }
            }

            user.setEnabled(!user.isEnabled());
            userRepository.save(user);

            log.info("User {} status toggled to {}", user.getUsername(), user.isEnabled() ? "enabled" : "disabled");

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "User status updated successfully",
                "enabled", user.isEnabled()
            ));
        } catch (Exception e) {
            log.error("Error toggling user status", e);
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Failed to update user status: " + e.getMessage()));
        }
    }
}
