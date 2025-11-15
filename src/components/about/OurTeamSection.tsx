import { Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SectionContainer = styled("section")(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  paddingTop: theme.spacing(14),
  paddingBottom: theme.spacing(14),
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
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
  color: "#4b5563",
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
  fontSize: "1.875rem",
  fontWeight: 600,
  color: "#004c91",
  marginBottom: theme.spacing(5),
  textAlign: "center",
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

// Team Member Card
const TeamCard = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "12px",
  padding: theme.spacing(5),
  textAlign: "center",
  border: "1px solid #e5e7eb",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 16px 32px rgba(0, 76, 145, 0.2)",
    borderColor: "#00a77f",
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

const AvatarIcon = styled(PersonIcon)({
  fontSize: "4rem",
  color: "#004c91",
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
  color: "#6b7280",
  lineHeight: 1.5,
  fontStyle: "italic",
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
}

interface BoardMember {
  name: string;
  role: string;
}

export default function OurTeamSection() {
  const { t } = useTranslation();

  // A. CORE LEADERSHIP (4-Up Grid with Full Cards)
  const coreLeadership: TeamMember[] = [
    {
      name: "Tek Nath Neopane",
      role: "Chairperson",
      expertise: "Prime Minister's Advisor • Blind by Birth",
    },
    {
      name: "Krishna Maharjan",
      role: "Secretary General",
      expertise: "Computer Engineer • UNDP Project Lead",
    },
    {
      name: "Tika Bajgain",
      role: "Treasurer",
      expertise: "Finance Head • 20+ Years Teaching/Finance",
    },
    {
      name: "Gopal Prasad Ghimire",
      role: "Board Member",
      expertise: "School Principal • 36 Years Teaching Experience",
    },
  ];

  // B. PROGRAM & TECHNICAL EXPERTS (3-Up Grid with Full Cards)
  const programTechnicalExperts: TeamMember[] = [
    {
      name: "Roji Maharjan",
      role: "Financial & Administrative Manager",
      expertise: "Account Management • Operations",
    },
    {
      name: "Sankalpa Neopane",
      role: "Program Officer",
      expertise: "Program Coordination & Implementation",
    },
    {
      name: "Aswin Adhikari",
      role: "Training & Capacity Building Lead",
      expertise: "Capacity Building • Training Programs",
    },
    {
      name: "Manish Maharjan",
      role: "Documentation Officer",
      expertise: "Data Analyst • Documentation",
    },
    {
      name: "Anamika Kumari Jha",
      role: "Technical Team Leader",
      expertise: "Bank IT Department • Tech Leadership",
    },
    {
      name: "Shree Krishna Khanal",
      role: "Software Developer I",
      expertise: "Software Company • Development",
    },
  ];

  // C. BOARD MEMBERS & ACTIVE CONTRIBUTORS (Condensed List)
  const boardAndContributors: BoardMember[] = [
    { name: "Bishnu Prasad Jaisi", role: "Vice Chairperson" },
    { name: "Kamala Bastola", role: "Secretary" },
    { name: "Khas Maya Gurung", role: "Board Member" },
    { name: "Suman Ghimire", role: "Board Member" },
    { name: "Krishna Prasad Dahal", role: "Board Member" },
    { name: "Rubi Maharjan", role: "Board Member • Community Engagement Coordinator" },
    { name: "Bidya Poudel", role: "Board Member" },
    { name: "Saman Acharya", role: "Software Developer II" },
    { name: "Saurav Aryal", role: "Quality Analyst • Business Analyst" },
    { name: "Bipin Chaudhary", role: "Technical Assistant" },
    { name: "Tej Bahadur Rokka", role: "Active Member • Teacher" },
    { name: "Laxmi KC", role: "Active Member • Teacher" },
    { name: "Rocky Maharjan", role: "Photographer • Videography" },
    { name: "Rajan Maharjan", role: "Social Mobilizer" },
    { name: "Sajina Maharjan", role: "Community Based Volunteer" },
    { name: "Bhakti Maya Karki", role: "Community Based Volunteer" },
    { name: "Kunjan Kafle", role: "Office Assistant" },
    { name: "Ram Babu Maharjan", role: "Security Person" },
    { name: "Sushila Diyali", role: "Office Helper" },
  ];

  return (
    <SectionContainer aria-labelledby='team-heading' id='teams'>
      <Container maxWidth='xl' sx={{ px: { xs: 2, sm: 3, md: 6 } }}>
        <Box textAlign='center'>
          <SectionTitle variant='h2' id='team-heading'>
            {t("about_team_title")}
          </SectionTitle>
          <UnderlineBar />
          <DescriptionText>{t("about_team_description")}</DescriptionText>
        </Box>

        {/* A. CORE LEADERSHIP (4-Up Grid) */}
        <SubsectionContainer>
          <SubsectionHeading variant='h3'>
            Core Leadership
          </SubsectionHeading>
          <LeadershipGrid>
            {coreLeadership.map((member, index) => (
              <TeamCard key={index}>
                <AvatarCircle>
                  <AvatarIcon />
                </AvatarCircle>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
                <MemberExpertise>{member.expertise}</MemberExpertise>
              </TeamCard>
            ))}
          </LeadershipGrid>
        </SubsectionContainer>

        {/* B. PROGRAM & TECHNICAL EXPERTS (3-Up Grid) */}
        <SubsectionContainer>
          <SubsectionHeading variant='h3'>
            Program & Technical Team
          </SubsectionHeading>
          <StaffGrid>
            {programTechnicalExperts.map((member, index) => (
              <TeamCard key={index}>
                <AvatarCircle>
                  <AvatarIcon />
                </AvatarCircle>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
                <MemberExpertise>{member.expertise}</MemberExpertise>
              </TeamCard>
            ))}
          </StaffGrid>
        </SubsectionContainer>

        {/* C. BOARD MEMBERS & ACTIVE CONTRIBUTORS (Condensed List) */}
        <SubsectionContainer>
          <SubsectionHeading variant='h3'>
            Board Members & Active Contributors
          </SubsectionHeading>
          <BoardListContainer>
            <BoardGrid>
              {boardAndContributors.map((member, index) => (
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
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography
              component="a"
              href="#teams"
              sx={{
                color: '#004c91',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'underline',
                '&:hover': { color: '#00a77f' },
              }}
            >
              View Full Staff & Technical Team
            </Typography>
          </Box>
        </SubsectionContainer>
      </Container>
    </SectionContainer>
  );
}
