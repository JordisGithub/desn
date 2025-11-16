import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import krishnaMaharjanImg from "../../assets/AboutUs/Krishna_Maharjan.png";
import shreeKrishnaKhanalImg from "../../assets/AboutUs/Shree_Krishna_Khanal.png";
import tikaBajgainImg from "../../assets/AboutUs/Tika_Bajgain.png";

const SectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "2.75rem",
  fontWeight: 700,
  color: "#004c91",
  letterSpacing: "0.02em",
  marginBottom: theme.spacing(1.5),
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: "2.125rem",
    letterSpacing: "0.01em",
  },
}));

const UnderlineBar = styled(Box)({
  width: "80px",
  height: "4px",
  backgroundColor: "#00a77f",
  borderRadius: "16777200px",
  marginBottom: "32px",
  margin: "0 auto 32px",
});

const DescriptionText = styled(Typography)({
  fontSize: "1.125rem",
  color: "#1f2937",
  lineHeight: 1.6,
  maxWidth: "800px",
  margin: "0 auto 64px",
  textAlign: "center",
});

const SubsectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(8),
  },
}));

const SubsectionHeading = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 700,
  color: "#004c91",
  marginBottom: theme.spacing(3),
  textAlign: "center",
  letterSpacing: "0.01em",
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
    marginBottom: theme.spacing(4),
  },
}));

// Leadership Grid (4-column, responsive)
const LeadershipGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: theme.spacing(4),
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(3),
  },
}));

// Staff Grid (3-column)
const StaffGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

// Team Member Card with Premium Styling and WCAG 2.2 Accessibility
const TeamCard = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "16px",
  padding: theme.spacing(5),
  textAlign: "center",
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
  height: "100%",
  minHeight: "280px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 16px 40px rgba(0, 76, 145, 0.25)",
    borderColor: "#00a77f",
  },
  "&:focus-visible": {
    outline: "3px solid #f6d469",
    outlineOffset: "3px",
    borderColor: "#004c91",
  },
}));

const AvatarCircle = styled(Box)(({ theme }) => ({
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  backgroundColor: "#e5f3ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  border: "3px solid #004c91",
  [theme.breakpoints.down("sm")]: {
    width: "100px",
    height: "100px",
  },
}));

const AvatarImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "50%",
});

const MemberName = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: "#1f2937",
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.125rem",
  },
}));

const MemberRole = styled(Typography)({
  fontSize: "0.938rem",
  fontWeight: 600,
  color: "#004c91",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "12px",
});

const MemberExpertise = styled(Typography)({
  fontSize: "0.938rem",
  color: "#4b5563",
  lineHeight: 1.5,
  fontStyle: "normal",
});

// Board List Section
const BoardListContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "12px",
  padding: theme.spacing(5),
  border: "1px solid #e5e7eb",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const BoardGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(2),
  },
}));

const BoardMemberItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: "8px",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "#f9fafb",
  },
}));

const BoardIcon = styled(AccountCircleIcon)({
  fontSize: "2.5rem",
  color: "#004c91",
  flexShrink: 0,
});

const BoardMemberName = styled(Typography)({
  fontSize: "1rem",
  fontWeight: 600,
  color: "#1f2937",
  marginBottom: "4px",
});

const BoardMemberRole = styled(Typography)({
  fontSize: "0.875rem",
  color: "#6b7280",
});

interface TeamMember {
  name: string;
  role: string;
  expertise: string;
  image?: string;
}

interface BoardMember {
  name: string;
  role: string;
}

export default function OurTeamSection() {
  const { t } = useTranslation();

  // Helper function to get team member photo
  const getTeamMemberImage = (name: string): string | undefined => {
    const imageMap: Record<string, string> = {
      "Krishna Maharjan": krishnaMaharjanImg,
      "Shree Krishna Khanal": shreeKrishnaKhanalImg,
      "Tika Bajgain": tikaBajgainImg,
    };
    return imageMap[name];
  };

  // Helper function to get placeholder image based on name
  const getPlaceholderImage = (name: string): string => {
    // Infer gender from common Nepali female names
    const femaleIndicators = [
      "Kamala",
      "Khas Maya",
      "Rubi",
      "Laxmi",
      "Sajina",
      "Bhakti",
      "Sushila",
    ];
    const isFemale = femaleIndicators.some((indicator) =>
      name.includes(indicator)
    );

    // Use UI Avatars API for high-quality placeholder images
    const bgColor = isFemale ? "e91e63" : "004c91";
    const textColor = "ffffff";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&size=200&background=${bgColor}&color=${textColor}&bold=true&format=png`;
  };

  // A. OUR BOARD & LEADERSHIP (All 11 members - consolidated)
  const boardAndLeadership: TeamMember[] = [
    {
      name: "Tek Nath Neopane",
      role: t("role_chairperson"),
      expertise: `${t("expertise_pm_advisor")} • ${t(
        "expertise_blind_by_birth"
      )}`,
    },
    {
      name: "Bishnu Prasad Jaisi",
      role: t("role_vice_chairperson"),
      expertise: `${t("expertise_secondary_teacher")} • ${t(
        "expertise_visual_impairment"
      )}`,
    },
    {
      name: "Kamala Bastola",
      role: t("role_secretary"),
      expertise: `${t("expertise_lower_secondary_teacher")} • ${t(
        "expertise_physical_disability"
      )}`,
    },
    {
      name: "Krishna Maharjan",
      role: t("role_secretary_general"),
      expertise: `${t("expertise_computer_engineer")} • ${t(
        "expertise_undp_project_lead"
      )}`,
    },
    {
      name: "Tika Bajgain",
      role: t("role_treasurer"),
      expertise: `${t("expertise_finance_head")} • 20+ ${t(
        "expertise_years_experience"
      )} ${t("expertise_teaching_finance")}`,
    },
    {
      name: "Gopal Prasad Ghimire",
      role: t("role_board_member"),
      expertise: `${t("expertise_school_principal")} • 36 ${t(
        "expertise_years_experience"
      )} ${t("expertise_teaching_experience")}`,
    },
    {
      name: "Khas Maya Gurung",
      role: t("role_board_member"),
      expertise: `${t("expertise_agriculture_entrepreneur")} • ${t(
        "expertise_physical_disability"
      )}`,
    },
    {
      name: "Suman Ghimire",
      role: t("role_board_member"),
      expertise: `${t("expertise_health_personnel")} • ${t(
        "expertise_visual_impairment"
      )}`,
    },
    {
      name: "Krishna Prasad Dahal",
      role: t("role_board_member"),
      expertise: `${t("expertise_teacher")} • ${t(
        "expertise_physical_disability"
      )}`,
    },
    {
      name: "Rubi Maharjan",
      role: t("role_board_member"),
      expertise: `${t("expertise_community_engagement")} • ${t(
        "expertise_physical_disability"
      )}`,
    },
    {
      name: "Bidya Poudel",
      role: t("role_board_member"),
      expertise: `${t("expertise_office_clerk")} • ${t(
        "expertise_low_vision"
      )}`,
    },
  ];

  // B. PROGRAM STAFF (3-Up Grid with Full Cards)
  const programStaff: TeamMember[] = [
    {
      name: "Roji Maharjan",
      role: t("role_financial_admin_manager"),
      expertise: `${t("expertise_account_management")} • ${t(
        "expertise_operations"
      )}`,
    },
    {
      name: "Sankalpa Neopane",
      role: t("role_program_officer"),
      expertise: t("expertise_program_coordination"),
    },
    {
      name: "Aswin Adhikari",
      role: t("role_training_lead"),
      expertise: `${t("expertise_capacity_building")} • ${t(
        "expertise_training_programs"
      )}`,
    },
    {
      name: "Manish Maharjan",
      role: t("role_documentation_officer"),
      expertise: `${t("expertise_data_analyst")} • ${t(
        "expertise_documentation"
      )}`,
    },
  ];

  // C. TECHNICAL TEAM (Part-Time) (3-Up Grid with Full Cards)
  const technicalTeam: TeamMember[] = [
    {
      name: "Anamika Kumari Jha",
      role: t("role_technical_team_leader"),
      expertise: `${t("expertise_bank_it")} • ${t(
        "expertise_tech_leadership"
      )}`,
    },
    {
      name: "Shree Krishna Khanal",
      role: t("role_software_developer_1"),
      expertise: `${t("expertise_software_company")} • ${t(
        "expertise_development"
      )}`,
    },
    {
      name: "Saman Acharya",
      role: t("role_software_developer_2"),
      expertise: `${t("expertise_software_company")} • ${t(
        "expertise_development"
      )}`,
    },
    {
      name: "Saurav Aryal",
      role: t("role_quality_analyst"),
      expertise: `${t("expertise_business_analyst")} • ${t(
        "expertise_quality_assurance"
      )}`,
    },
    {
      name: "Bipin Chaudhary",
      role: t("role_technical_assistant"),
      expertise: `${t("expertise_software_company")} • ${t(
        "expertise_technical_support"
      )}`,
    },
  ];

  // E. COMMUNITY VOLUNTEERS & SUPPORT STAFF (Condensed List)
  const communityAndSupport: BoardMember[] = [
    {
      name: "Tej Bahadur Rokka",
      role: `${t("role_active_member")} • ${t("expertise_teacher")}`,
    },
    {
      name: "Laxmi KC",
      role: `${t("role_active_member")} • ${t("expertise_teacher")}`,
    },
    {
      name: "Rocky Maharjan",
      role: `${t("role_photographer")} • ${t("expertise_videography")}`,
    },
    { name: "Rajan Maharjan", role: t("role_social_mobilizer") },
    { name: "Sajina Maharjan", role: t("role_community_volunteer") },
    { name: "Bhakti Maya Karki", role: t("role_community_volunteer") },
    { name: "Kunjan Kafle", role: t("role_office_assistant") },
    { name: "Ram Babu Maharjan", role: t("role_security_person") },
    { name: "Sushila Diyali", role: t("role_office_helper") },
  ];

  return (
    <SectionContainer
      aria-labelledby='team-heading'
      id='teams'
      role='region'
      aria-label='Team Members'
    >
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <Box textAlign='center'>
          <SectionTitle variant='h2' id='team-heading' tabIndex={-1}>
            {t("about_team_title")}
          </SectionTitle>
          <UnderlineBar aria-hidden='true' />
          <DescriptionText>{t("about_team_description")}</DescriptionText>
        </Box>

        {/* A. OUR BOARD & LEADERSHIP - Consolidated (All 11 members) */}
        <SubsectionContainer
          role='region'
          aria-labelledby='board-leadership-heading'
        >
          <SubsectionHeading variant='h3' id='board-leadership-heading'>
            Our Board & Leadership
          </SubsectionHeading>
          <LeadershipGrid>
            {boardAndLeadership.map((member, index) => {
              const memberImage = getTeamMemberImage(member.name);
              const placeholderImage = getPlaceholderImage(member.name);
              return (
                <TeamCard
                  key={index}
                  role='article'
                  aria-label={`Board member: ${member.name}, ${member.role}`}
                >
                  <AvatarCircle>
                    <AvatarImage
                      src={memberImage || placeholderImage}
                      alt={`Photo of ${member.name}, ${member.role}`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = placeholderImage;
                      }}
                    />
                  </AvatarCircle>
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>{member.role}</MemberRole>
                  <MemberExpertise>{member.expertise}</MemberExpertise>
                </TeamCard>
              );
            })}
          </LeadershipGrid>
        </SubsectionContainer>

        {/* B. PROGRAM STAFF (3-Up Grid) */}
        <SubsectionContainer
          role='region'
          aria-labelledby='program-staff-heading'
        >
          <SubsectionHeading variant='h3' id='program-staff-heading'>
            {t("about_team_program_staff")}
          </SubsectionHeading>
          <StaffGrid>
            {programStaff.map((member, index) => {
              const placeholderImage = getPlaceholderImage(member.name);
              return (
                <TeamCard
                  key={index}
                  role='article'
                  aria-label={`Staff member: ${member.name}, ${member.role}`}
                >
                  <AvatarCircle>
                    <AvatarImage
                      src={placeholderImage}
                      alt={`Photo of ${member.name}, ${member.role}`}
                    />
                  </AvatarCircle>
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>{member.role}</MemberRole>
                  <MemberExpertise>{member.expertise}</MemberExpertise>
                </TeamCard>
              );
            })}
          </StaffGrid>
        </SubsectionContainer>

        {/* C. TECHNICAL TEAM (Part-Time) (3-Up Grid) */}
        <SubsectionContainer
          role='region'
          aria-labelledby='technical-team-heading'
        >
          <SubsectionHeading variant='h3' id='technical-team-heading'>
            {t("about_team_technical_team")}
          </SubsectionHeading>
          <StaffGrid>
            {technicalTeam.map((member, index) => {
              const memberImage = getTeamMemberImage(member.name);
              const placeholderImage = getPlaceholderImage(member.name);
              return (
                <TeamCard
                  key={index}
                  role='article'
                  aria-label={`Technical team: ${member.name}, ${member.role}`}
                >
                  <AvatarCircle>
                    <AvatarImage
                      src={memberImage || placeholderImage}
                      alt={`Photo of ${member.name}, ${member.role}`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = placeholderImage;
                      }}
                    />
                  </AvatarCircle>
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>{member.role}</MemberRole>
                  <MemberExpertise>{member.expertise}</MemberExpertise>
                </TeamCard>
              );
            })}
          </StaffGrid>
        </SubsectionContainer>

        {/* E. COMMUNITY VOLUNTEERS & SUPPORT STAFF (Condensed List) */}
        <SubsectionContainer
          role='region'
          aria-labelledby='community-volunteers-heading'
        >
          <SubsectionHeading variant='h3' id='community-volunteers-heading'>
            {t("about_team_community_volunteers")}
          </SubsectionHeading>
          <BoardListContainer>
            <BoardGrid>
              {communityAndSupport.map((member, index) => (
                <BoardMemberItem key={index}>
                  <BoardIcon />
                  <Box>
                    <BoardMemberName>{member.name}</BoardMemberName>
                    <BoardMemberRole>{member.role}</BoardMemberRole>
                  </Box>
                </BoardMemberItem>
              ))}
            </BoardGrid>
          </BoardListContainer>
        </SubsectionContainer>
      </Container>
    </SectionContainer>
  );
}
