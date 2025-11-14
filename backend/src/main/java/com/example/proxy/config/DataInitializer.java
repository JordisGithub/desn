package com.example.proxy.config;

import com.example.proxy.entity.Event;
import com.example.proxy.entity.Resource;
import com.example.proxy.entity.User;
import com.example.proxy.entity.MembershipApplication;
import com.example.proxy.entity.VolunteerApplication;
import com.example.proxy.entity.PaymentTransaction;
import com.example.proxy.repository.EventRepository;
import com.example.proxy.repository.ResourceRepository;
import com.example.proxy.repository.UserRepository;
import com.example.proxy.repository.MembershipApplicationRepository;
import com.example.proxy.repository.VolunteerApplicationRepository;
import com.example.proxy.repository.PaymentTransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Data initializer to create default admin user on application startup.
 * Checks if admin user exists before creating to avoid duplicates.
 */
@Configuration
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder,
                                   ResourceRepository resourceRepository, EventRepository eventRepository,
                                   MembershipApplicationRepository membershipRepository,
                                   VolunteerApplicationRepository volunteerRepository,
                                   PaymentTransactionRepository paymentRepository) {
        return args -> {
            // Create owner user if not exists
            if (!userRepository.existsByUsername("owner")) {
                User owner = new User();
                owner.setUsername("owner");
                owner.setEmail("owner@desn.org.np");
                owner.setPassword(passwordEncoder.encode("owner123"));
                owner.setFullName("DESN Owner");
                owner.setRole(User.Role.OWNER);
                owner.setEnabled(true);
                
                userRepository.save(owner);
                logger.info("✅ Default owner user created successfully!");
                logger.info("   Username: owner");
                logger.info("   Password: owner123");
                logger.info("   ⚠️  IMPORTANT: Change this password in production!");
            } else {
                logger.info("Owner user already exists. Skipping initialization.");
            }
            
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
            
            // Initialize sample resources
            if (resourceRepository.count() == 0) {
                logger.info("Initializing sample resources...");
                
                Resource r1 = new Resource();
                r1.setTitle("Annual Report 2024");
                r1.setDescription("Comprehensive overview of DESN's activities and achievements in 2024");
                r1.setType("annual-report");
                r1.setFileUrl("https://example.com/files/annual-report-2024.pdf");
                r1.setThumbnailUrl("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400");
                r1.setPages(45);
                r1.setPublishDate(LocalDateTime.now().minusMonths(1));
                r1.setFeatured(true);
                resourceRepository.save(r1);
                
                Resource r2 = new Resource();
                r2.setTitle("Disability Rights Policy Brief");
                r2.setDescription("Policy recommendations for inclusive disability rights legislation in Nepal");
                r2.setType("policy-brief");
                r2.setFileUrl("https://example.com/files/policy-brief-2024.pdf");
                r2.setThumbnailUrl("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400");
                r2.setPages(12);
                r2.setPublishDate(LocalDateTime.now().minusWeeks(2));
                r2.setFeatured(true);
                resourceRepository.save(r2);
                
                Resource r3 = new Resource();
                r3.setTitle("Accessible Design Training Manual");
                r3.setDescription("Complete guide for architects and engineers on accessible infrastructure design");
                r3.setType("training-manual");
                r3.setFileUrl("https://example.com/files/accessible-design-manual.pdf");
                r3.setThumbnailUrl("https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400");
                r3.setPages(78);
                r3.setPublishDate(LocalDateTime.now().minusMonths(3));
                r3.setFeatured(true);
                resourceRepository.save(r3);
                
                Resource r4 = new Resource();
                r4.setTitle("Research on Employment Barriers");
                r4.setDescription("Study on employment challenges faced by persons with disabilities in urban Nepal");
                r4.setType("research");
                r4.setFileUrl("https://example.com/files/employment-barriers-research.pdf");
                r4.setThumbnailUrl("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400");
                r4.setPages(32);
                r4.setPublishDate(LocalDateTime.now().minusMonths(4));
                r4.setFeatured(false);
                resourceRepository.save(r4);
                
                Resource r5 = new Resource();
                r5.setTitle("Community Inclusion Guidelines");
                r5.setDescription("Best practices for creating inclusive community programs and activities");
                r5.setType("guideline");
                r5.setFileUrl("https://example.com/files/inclusion-guidelines.pdf");
                r5.setThumbnailUrl("https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400");
                r5.setPages(24);
                r5.setPublishDate(LocalDateTime.now().minusMonths(2));
                r5.setFeatured(false);
                resourceRepository.save(r5);
                
                Resource r6 = new Resource();
                r6.setTitle("Monthly Newsletter - December 2024");
                r6.setDescription("Updates on DESN activities, member stories, and upcoming events");
                r6.setType("newsletter");
                r6.setFileUrl("https://example.com/files/newsletter-dec-2024.pdf");
                r6.setThumbnailUrl("https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400");
                r6.setPages(8);
                r6.setPublishDate(LocalDateTime.now().minusDays(5));
                r6.setFeatured(false);
                resourceRepository.save(r6);
                
                logger.info("✅ Sample resources initialized successfully!");
            }
            
            // Initialize sample events
            if (eventRepository.count() == 0) {
                logger.info("Initializing sample events...");
                
                Event e1 = new Event();
                e1.setTitle("Disability Rights Awareness Workshop");
                e1.setDescription("Interactive workshop on understanding and promoting disability rights in communities");
                e1.setLocation("Kathmandu Community Center");
                e1.setStartDate(LocalDateTime.now().plusDays(15));
                e1.setEndDate(LocalDateTime.now().plusDays(15).plusHours(4));
                e1.setMaxAttendees(50);
                e1.setCurrentAttendees(12);
                e1.setFeatured(true);
                e1.setImageUrl("https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=600");
                eventRepository.save(e1);
                
                Event e2 = new Event();
                e2.setTitle("Accessible Technology Training");
                e2.setDescription("Hands-on training on assistive technologies and accessible software solutions");
                e2.setLocation("DESN Training Center, Lalitpur");
                e2.setStartDate(LocalDateTime.now().plusDays(22));
                e2.setEndDate(LocalDateTime.now().plusDays(22).plusHours(3));
                e2.setMaxAttendees(30);
                e2.setCurrentAttendees(8);
                e2.setFeatured(true);
                e2.setImageUrl("https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600");
                eventRepository.save(e2);
                
                Event e3 = new Event();
                e3.setTitle("Annual General Meeting 2025");
                e3.setDescription("DESN's annual meeting to discuss progress, plans, and member concerns");
                e3.setLocation("Hotel Yak & Yeti, Kathmandu");
                e3.setStartDate(LocalDateTime.now().plusMonths(1));
                e3.setEndDate(LocalDateTime.now().plusMonths(1).plusHours(6));
                e3.setMaxAttendees(100);
                e3.setCurrentAttendees(0);
                e3.setFeatured(false);
                e3.setImageUrl("https://images.unsplash.com/photo-1511578314322-379afb476865?w=600");
                eventRepository.save(e3);
                
                logger.info("✅ Sample events initialized successfully!");
            }
            
            // Initialize sample membership applications
            if (membershipRepository.count() == 0) {
                logger.info("Initializing sample membership applications...");
                
                MembershipApplication m1 = new MembershipApplication();
                m1.setFullName("Sita Sharma");
                m1.setEmail("sita.sharma@email.com");
                m1.setPhone("+977-9841234567");
                m1.setAddress("Thamel, Kathmandu");
                m1.setMessage("I am interested in becoming a member to support disability rights advocacy in Nepal.");
                m1.setLanguage("en");
                membershipRepository.save(m1);
                
                MembershipApplication m2 = new MembershipApplication();
                m2.setFullName("Ram Bahadur Thapa");
                m2.setEmail("ram.thapa@email.com");
                m2.setPhone("+977-9851234568");
                m2.setAddress("Patan, Lalitpur");
                m2.setMessage("म पहिचान अधिकार संवर्द्धनमा योगदान गर्न चाहन्छु।");
                m2.setLanguage("ne");
                membershipRepository.save(m2);
                
                logger.info("✅ Sample membership applications initialized successfully!");
            }
            
            // Initialize sample volunteer applications
            if (volunteerRepository.count() == 0) {
                logger.info("Initializing sample volunteer applications...");
                
                VolunteerApplication v1 = new VolunteerApplication();
                v1.setFullName("Maya Gurung");
                v1.setEmail("maya.gurung@email.com");
                v1.setPhone("+977-9861234569");
                v1.setMessage("I have experience in community outreach and would love to volunteer for DESN programs.");
                v1.setLanguage("en");
                volunteerRepository.save(v1);
                
                VolunteerApplication v2 = new VolunteerApplication();
                v2.setFullName("Bikash Shrestha");
                v2.setEmail("bikash.shrestha@email.com");
                v2.setPhone("+977-9871234570");
                v2.setMessage("I am a graphic designer willing to help with communication materials.");
                v2.setLanguage("en");
                volunteerRepository.save(v2);
                
                logger.info("✅ Sample volunteer applications initialized successfully!");
            }
            
            // Initialize sample donation transactions
            if (paymentRepository.count() == 0) {
                logger.info("Initializing sample donation transactions...");
                
                PaymentTransaction p1 = new PaymentTransaction();
                p1.setTransactionId("TXN-" + System.currentTimeMillis());
                p1.setPaymentGateway("KHALTI");
                p1.setAmount(new BigDecimal("5000.00"));
                p1.setCurrency("NPR");
                p1.setStatus(PaymentTransaction.PaymentStatus.COMPLETED);
                p1.setDonorName("Anita Karki");
                p1.setDonorEmail("anita.karki@email.com");
                p1.setDonorPhone("+977-9881234571");
                p1.setCompletedAt(LocalDateTime.now().minusDays(5));
                paymentRepository.save(p1);
                
                PaymentTransaction p2 = new PaymentTransaction();
                p2.setTransactionId("TXN-" + (System.currentTimeMillis() + 1));
                p2.setPaymentGateway("BANK_TRANSFER");
                p2.setAmount(new BigDecimal("10000.00"));
                p2.setCurrency("NPR");
                p2.setStatus(PaymentTransaction.PaymentStatus.COMPLETED);
                p2.setDonorName("Rajesh Poudel");
                p2.setDonorEmail("rajesh.poudel@email.com");
                p2.setDonorPhone("+977-9891234572");
                p2.setBankReferenceNumber("BRN123456789");
                p2.setBankName("Nepal Bank Limited");
                p2.setCompletedAt(LocalDateTime.now().minusDays(2));
                paymentRepository.save(p2);
                
                PaymentTransaction p3 = new PaymentTransaction();
                p3.setTransactionId("TXN-" + (System.currentTimeMillis() + 2));
                p3.setPaymentGateway("KHALTI");
                p3.setAmount(new BigDecimal("2500.00"));
                p3.setCurrency("NPR");
                p3.setStatus(PaymentTransaction.PaymentStatus.PENDING);
                p3.setDonorName("Sunita Rai");
                p3.setDonorEmail("sunita.rai@email.com");
                p3.setDonorPhone("+977-9801234573");
                paymentRepository.save(p3);
                
                logger.info("✅ Sample donation transactions initialized successfully!");
            }
        };
    }
}
