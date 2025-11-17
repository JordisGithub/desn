--
-- PostgreSQL database dump
--

\restrict 514NN1qKsxPSYglRKQzdMtAFGXgkq4auqcYdVJMKyT16tim31NW9fz9bnxLUnhp

-- Dumped from database version 16.11 (Homebrew)
-- Dumped by pg_dump version 17.7 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: resources; Type: TABLE DATA; Schema: public; Owner: desn_user
--

INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (8, 0, '2025-11-16 21:17:40.536454', 'BoDs CVs - Copy of District Adminstration Office Registration_Translation.pdf', 0, false, 'http://localhost:8080/resources/guidelines/copy-of-district-adminstration-office-registration_translation.pdf', 0, '2025-11-10 00:00:00', NULL, 'Copy of District Adminstration Office Registration_Translation', 'research', '2025-11-16 21:47:26.812729');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (2, 0, '2025-11-16 21:17:40.536454', 'Annual Reports - Annual Progress Report 2080-81.pdf', 0, true, 'http://localhost:8080/resources/annual-reports/annual-progress-report-2080-81.pdf', 0, '2025-11-10 00:00:00', NULL, 'Annual Progress Report 2080 81', 'annual-report', '2025-11-16 21:17:40.536454');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (17, 0, '2025-11-16 21:17:40.536454', 'DESN Policies - Communication policy_Disability Empowerment Society Nepal-signed.pdf', 0, false, 'http://localhost:8080/resources/policy-briefs/communication-policy_disability-empowerment-society-nepal-signed.pdf', 0, '2025-11-10 00:00:00', NULL, 'Communication policy_Disability Empowerment Society Nepal signed', 'policy-brief', '2025-11-16 21:17:40.536454');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (18, 0, '2025-11-16 21:17:40.536454', 'DESN Policies - Communication policy_Disability Empowerment Society Nepal.pdf', 0, false, 'http://localhost:8080/resources/policy-briefs/communication-policy_disability-empowerment-society-nepal.pdf', 0, '2025-11-10 00:00:00', NULL, 'Communication policy_Disability Empowerment Society Nepal', 'policy-brief', '2025-11-16 21:17:40.536454');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (19, 0, '2025-11-16 21:17:40.536454', 'DESN Policies - Computer policy_Disability Empowerment Society Nepal-signed.pdf', 0, false, 'http://localhost:8080/resources/policy-briefs/computer-policy_disability-empowerment-society-nepal-signed.pdf', 0, '2025-11-10 00:00:00', NULL, 'Computer policy_Disability Empowerment Society Nepal signed', 'policy-brief', '2025-11-16 21:17:40.536454');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (9, 0, '2025-11-16 21:17:40.536454', 'BoDs CVs - Copy of IRD Registration_Translation.pdf', 0, false, 'http://localhost:8080/resources/guidelines/copy-of-ird-registration_translation.pdf', 0, '2025-11-10 00:00:00', NULL, 'Copy of IRD Registration_Translation', 'registration', '2025-11-16 21:54:45.330613');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (10, 0, '2025-11-16 21:17:40.536454', 'BoDs CVs - Copy of Municipality Registration_Translation.pdf', 0, false, 'http://localhost:8080/resources/guidelines/copy-of-municipality-registration_translation.pdf', 0, '2025-11-10 00:00:00', NULL, 'Copy of Municipality Registration_Translation', 'registration', '2025-11-16 21:17:40.536454');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (11, 0, '2025-11-16 21:17:40.536454', 'BoDs CVs - Copy of Social Welfare Council Registrationl_Translation.pdf', 0, false, 'http://localhost:8080/resources/guidelines/copy-of-social-welfare-council-registrationl_translation.pdf', 0, '2025-11-10 00:00:00', NULL, 'Copy of Social Welfare Council Registrationl_Translation', 'registration', '2025-11-16 21:17:40.536454');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (12, 0, '2025-11-16 21:17:40.536454', 'BoDs CVs - District Administration Office Registration.pdf', 0, false, 'http://localhost:8080/resources/guidelines/district-administration-office-registration.pdf', 0, '2025-11-10 00:00:00', NULL, 'District Administration Office Registration', 'registration', '2025-11-16 21:17:40.536454');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (13, 0, '2025-11-16 21:17:40.536454', 'BoDs CVs - Inland Revenue Certificate (PAN).pdf', 0, false, 'http://localhost:8080/resources/guidelines/inland-revenue-certificate-(pan).pdf', 0, '2025-11-10 00:00:00', NULL, 'Inland Revenue Certificate (PAN)', 'registration', '2025-11-16 21:17:40.536454');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (14, 0, '2025-11-16 21:17:40.536454', 'BoDs CVs - Municipality Registration.pdf', 0, false, 'http://localhost:8080/resources/guidelines/municipality-registration.pdf', 0, '2025-11-10 00:00:00', NULL, 'Municipality Registration', 'registration', '2025-11-16 21:17:40.536454');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (15, 0, '2025-11-16 21:17:40.536454', 'BoDs CVs - NFDN Registration.pdf', 0, false, 'http://localhost:8080/resources/guidelines/nfdn-registration.pdf', 0, '2025-11-10 00:00:00', NULL, 'NFDN Registration', 'registration', '2025-11-16 21:17:40.536454');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (1, 2, '2025-11-16 21:17:40.536454', 'Annual Reports - Annual Progress Report 2078-79.pdf', 0, true, 'http://localhost:8080/resources/annual-reports/annual-progress-report-2078-79.pdf', 0, '2025-11-10 00:00:00', NULL, 'Annual Progress Report 2078 79', 'annual-report', '2025-11-16 21:58:44.935192');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (20, 0, '2025-11-16 21:17:40.536454', 'DESN Policies - Computer policy_Disability Empowerment Society Nepal.pdf', 0, false, 'http://localhost:8080/resources/policy-briefs/computer-policy_disability-empowerment-society-nepal.pdf', 0, '2025-11-10 00:00:00', NULL, 'Computer policy_Disability Empowerment Society Nepal', 'policy-brief', '2025-11-16 21:17:40.536454');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (21, 0, '2025-11-16 21:17:40.536454', 'DESN Policies - PSEA Policy_Disability Empowerment Society Nepal-signed.pdf', 0, false, 'http://localhost:8080/resources/policy-briefs/psea-policy_disability-empowerment-society-nepal-signed.pdf', 0, '2025-11-10 00:00:00', NULL, 'PSEA Policy_Disability Empowerment Society Nepal signed', 'policy-brief', '2025-11-16 21:17:40.536454');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (24, 0, '2025-11-16 21:17:40.536454', 'Publications - Samadristi Magazine 15th Edition.pdf', 0, false, 'http://localhost:8080/resources/newsletters/samadristi-magazine-15th-edition.pdf', 0, '2025-11-10 00:00:00', NULL, 'Samadristi Magazine 15th Edition', 'newsletter', '2025-11-16 21:17:40.536454');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (23, 0, '2025-11-16 21:17:40.536454', 'Publications - Local Handicraft_Training Manual.pdf', 0, false, 'http://localhost:8080/resources/newsletters/local-handicraft_training-manual.pdf', 0, '2025-11-10 00:00:00', NULL, 'Local Handicraft Training Manual', 'annual-report', '2025-11-16 21:49:37.184413');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (22, 0, '2025-11-16 21:17:40.536454', 'Publications - Digital Literacy_Training Manual.pdf', 0, false, 'http://localhost:8080/resources/newsletters/digital-literacy_training-manual.pdf', 0, '2025-11-10 00:00:00', NULL, 'Digital Literacy_Training Manual', 'training-manual', '2025-11-16 21:51:19.421208');
INSERT INTO public.resources (id, clicks, created_at, description, favorite_count, featured, file_url, pages, publish_date, thumbnail_url, title, type, updated_at) VALUES (16, 0, '2025-11-16 21:17:40.536454', 'BoDs CVs - Social Welfare Council Registration.pdf', 0, false, 'http://localhost:8080/resources/guidelines/social-welfare-council-registration.pdf', 0, '2025-11-10 00:00:00', NULL, 'Social Welfare Council Registration', 'registration', '2025-11-16 21:17:40.536454');


--
-- Name: resources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: desn_user
--

SELECT pg_catalog.setval('public.resources_id_seq', 6, true);


--
-- PostgreSQL database dump complete
--

\unrestrict 514NN1qKsxPSYglRKQzdMtAFGXgkq4auqcYdVJMKyT16tim31NW9fz9bnxLUnhp

