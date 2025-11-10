package com.example.proxy.config;

import com.example.proxy.entity.Resource;
import com.example.proxy.repository.ResourceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Configuration
@Profile("dev")
public class SampleDataConfig {
    
    private static final Logger log = LoggerFactory.getLogger(SampleDataConfig.class);
    
    @Bean
    CommandLineRunner initResourceData(ResourceRepository resourceRepository) {
        return args -> {
            // Clear existing data on startup
            log.info("Clearing existing resource data...");
            resourceRepository.deleteAll();
            
            log.info("Initializing client-provided resource data (24 files)...");
            
            List<Resource> resources = new ArrayList<>();
            LocalDateTime now = LocalDateTime.now();
            
            // Annual Reports (2 files) - Featured
            resources.add(createResource(
                "Annual Progress Report 2078-79",
                "DESN Annual Progress Report for fiscal year 2078-79",
                "annual-report",
                "/resources/annual-reports/annual-progress-report-2078-79.pdf",
                now.minusDays(30),
                true
            ));
            
            resources.add(createResource(
                "Annual Progress Report 2080-81",
                "DESN Annual Progress Report for fiscal year 2080-81",
                "annual-report",
                "/resources/annual-reports/annual-progress-report-2080-81.pdf",
                now.minusDays(15),
                true
            ));
            
            // Board CVs (5 files)
            resources.add(createResource(
                "Chairperson - Tek Nath Neopane CV",
                "Curriculum Vitae of DESN Chairperson Tek Nath Neopane",
                "guideline",
                "/resources/guidelines/chairperson_tek-nath-neopane-cv.pdf",
                now.minusDays(60),
                true
            ));
            
            resources.add(createResource(
                "DESN Board and Staff",
                "Complete list of DESN Board Members and Staff",
                "guideline",
                "/resources/guidelines/copy-of-desn-board-and-staff.pdf",
                now.minusDays(45),
                false
            ));
            
            resources.add(createResource(
                "Executive Member - Gopal Prasad Ghimire CV",
                "Curriculum Vitae of Executive Member Gopal Prasad Ghimire",
                "guideline",
                "/resources/guidelines/executive-member_gopal-prasad-ghimire-cv.pdf",
                now.minusDays(55),
                false
            ));
            
            resources.add(createResource(
                "Krishna CV",
                "Curriculum Vitae of DESN Board Member Krishna",
                "guideline",
                "/resources/guidelines/krishna-cv.pdf",
                now.minusDays(50),
                false
            ));
            
            resources.add(createResource(
                "Tika Bajgain CV",
                "Curriculum Vitae of DESN Board Member Tika Bajgain",
                "guideline",
                "/resources/guidelines/tika_bajgain_cv.pdf",
                now.minusDays(48),
                false
            ));
            
            // Legal Documents (9 files)
            resources.add(createResource(
                "District Administration Office Registration",
                "Official registration document from District Administration Office",
                "guideline",
                "/resources/guidelines/district-administration-office-registration.pdf",
                LocalDateTime.of(2024, 1, 15, 0, 0),
                false
            ));
            
            resources.add(createResource(
                "District Administration Registration (Translation)",
                "English translation of District Administration Office registration",
                "guideline",
                "/resources/guidelines/copy-of-district-adminstration-office-registration_translation.pdf",
                LocalDateTime.of(2024, 1, 15, 0, 0),
                false
            ));
            
            resources.add(createResource(
                "Inland Revenue Certificate (PAN)",
                "Tax registration certificate from Inland Revenue Department",
                "guideline",
                "/resources/guidelines/inland-revenue-certificate-(pan).pdf",
                LocalDateTime.of(2024, 1, 20, 0, 0),
                false
            ));
            
            resources.add(createResource(
                "IRD Registration (Translation)",
                "English translation of Inland Revenue Department registration",
                "guideline",
                "/resources/guidelines/copy-of-ird-registration_translation.pdf",
                LocalDateTime.of(2024, 1, 20, 0, 0),
                false
            ));
            
            resources.add(createResource(
                "Municipality Registration",
                "Official registration document from local municipality",
                "guideline",
                "/resources/guidelines/municipality-registration.pdf",
                LocalDateTime.of(2024, 1, 25, 0, 0),
                false
            ));
            
            resources.add(createResource(
                "Municipality Registration (Translation)",
                "English translation of municipality registration",
                "guideline",
                "/resources/guidelines/copy-of-municipality-registration_translation.pdf",
                LocalDateTime.of(2024, 1, 25, 0, 0),
                false
            ));
            
            resources.add(createResource(
                "Social Welfare Council Registration",
                "Official registration with Social Welfare Council of Nepal",
                "guideline",
                "/resources/guidelines/social-welfare-council-registration.pdf",
                LocalDateTime.of(2024, 2, 1, 0, 0),
                false
            ));
            
            resources.add(createResource(
                "Social Welfare Council Registration (Translation)",
                "English translation of Social Welfare Council registration",
                "guideline",
                "/resources/guidelines/copy-of-social-welfare-council-registrationl_translation.pdf",
                LocalDateTime.of(2024, 2, 1, 0, 0),
                false
            ));
            
            resources.add(createResource(
                "NFDN Registration",
                "Registration with National Federation of the Disabled Nepal",
                "guideline",
                "/resources/guidelines/nfdn-registration.pdf",
                LocalDateTime.of(2024, 2, 10, 0, 0),
                false
            ));
            
            // Policies (5 files)
            resources.add(createResource(
                "Communication Policy (Signed)",
                "Official DESN Communication Policy - Signed version",
                "policy-brief",
                "/resources/policy-briefs/communication-policy_disability-empowerment-society-nepal-signed.pdf",
                now.minusDays(90),
                false
            ));
            
            resources.add(createResource(
                "Communication Policy",
                "DESN Communication Policy document",
                "policy-brief",
                "/resources/policy-briefs/communication-policy_disability-empowerment-society-nepal.pdf",
                now.minusDays(90),
                false
            ));
            
            resources.add(createResource(
                "Computer Policy (Signed)",
                "Official DESN Computer and IT Policy - Signed version",
                "policy-brief",
                "/resources/policy-briefs/computer-policy_disability-empowerment-society-nepal-signed.pdf",
                now.minusDays(85),
                false
            ));
            
            resources.add(createResource(
                "Computer Policy",
                "DESN Computer and IT Policy document",
                "policy-brief",
                "/resources/policy-briefs/computer-policy_disability-empowerment-society-nepal.pdf",
                now.minusDays(85),
                false
            ));
            
            resources.add(createResource(
                "PSEA Policy (Signed)",
                "Protection from Sexual Exploitation and Abuse Policy - Signed",
                "policy-brief",
                "/resources/policy-briefs/psea-policy_disability-empowerment-society-nepal-signed.pdf",
                now.minusDays(80),
                false
            ));
            
            // Publications (3 files)
            resources.add(createResource(
                "Digital Literacy Training Manual",
                "Comprehensive training manual for digital literacy programs",
                "newsletter",
                "/resources/newsletters/digital-literacy_training-manual.pdf",
                now.minusDays(120),
                false
            ));
            
            resources.add(createResource(
                "Local Handicraft Training Manual",
                "Training manual for local handicraft and livelihood programs",
                "newsletter",
                "/resources/newsletters/local-handicraft_training-manual.pdf",
                now.minusDays(100),
                false
            ));
            
            resources.add(createResource(
                "Samadristi Magazine - 15th Edition",
                "DESN flagship magazine Samadristi - 15th Edition",
                "newsletter",
                "/resources/newsletters/samadristi-magazine-15th-edition.pdf",
                now.minusDays(20),
                false
            ));
            
            resourceRepository.saveAll(resources);
            
            log.info("Successfully initialized {} client resources!", resources.size());
        };
    }
    
    private Resource createResource(String title, String description, String type, 
                                   String fileUrl, LocalDateTime publishDate, boolean featured) {
        Resource resource = new Resource();
        resource.setTitle(title);
        resource.setDescription(description);
        resource.setType(type);
        resource.setFileUrl("http://localhost:8080" + fileUrl);
        resource.setThumbnailUrl(null);
        resource.setPages(0);
        resource.setPublishDate(publishDate);
        resource.setFeatured(featured);
        resource.setClicks(0);
        resource.setFavoriteCount(0);
        return resource;
    }
}
