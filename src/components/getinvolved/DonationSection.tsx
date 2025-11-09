import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentIcon from "@mui/icons-material/Payment";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HandshakeIcon from "@mui/icons-material/Handshake";
import DonationPaymentModal from "../payment/DonationPaymentModal";

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 12),
  backgroundColor: "white",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(8, 4),
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(6, 3),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4, 2),
  },
}));

const IntroContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(8),
  marginBottom: theme.spacing(8),
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(4),
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "608px",
  height: "384px",
  borderRadius: "14px",
  overflow: "hidden",
  boxShadow:
    "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1)",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  [theme.breakpoints.down("md")]: {
    height: "300px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "250px",
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const TitleBar = styled(Box)({
  width: "80px",
  height: "4px",
  backgroundColor: "#004c91",
  borderRadius: "100px",
});

const SectionTitle = styled(Typography)({
  fontSize: "32px",
  fontWeight: 400,
  color: "#004c91",
  marginTop: "20px",
  fontFamily: "'Open Sans', sans-serif",
});

const Description = styled(Typography)({
  fontSize: "20px",
  fontWeight: 400,
  color: "#364153",
  lineHeight: 1.5,
});

const BenefitsList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
}));

const BenefitItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const BenefitText = styled(Typography)({
  fontSize: "16px",
  fontWeight: 400,
  color: "#364153",
});

const PaymentGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "32px",
  marginBottom: "64px",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr",
    gap: "24px",
  },
}));

const PaymentCard = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "16px",
  padding: theme.spacing(5, 5),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const BankCard = styled(PaymentCard)({
  borderTop: "4px solid #004c91",
});

const KhaltiCard = styled(PaymentCard)({
  borderTop: "4px solid #00a77f",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const CardHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
}));

const IconBox = styled(Box)({
  width: "48px",
  height: "48px",
  borderRadius: "10px",
  backgroundColor: "rgba(0, 76, 145, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const KhaltiIconBox = styled(IconBox)({
  backgroundColor: "rgba(0, 167, 127, 0.1)",
});

const CardTitle = styled(Typography)({
  fontSize: "24px",
  fontWeight: 400,
  color: "#004c91",
  fontFamily: "'Open Sans', sans-serif",
});

const BankDetails = styled(Box)({
  fontSize: "24px",
  fontWeight: 500,
  color: "#2b2b2b",
  lineHeight: 1.8,
  "& p": {
    margin: "8px 0",
  },
  "& ol": {
    paddingLeft: "36px",
    margin: "4px 0",
  },
});

const KhaltiInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  width: "100%",
}));

const KhaltiId = styled(Box)(({ theme }) => ({
  backgroundColor: "#f9fafb",
  padding: theme.spacing(2),
  borderRadius: "10px",
}));

const KhaltiIdLabel = styled(Typography)({
  fontSize: "12px",
  color: "#4a5565",
  marginBottom: "4px",
});

const KhaltiIdValue = styled(Typography)({
  fontSize: "16px",
  fontWeight: 500,
  color: "#101828",
});

const KhaltiButton = styled(Button)({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  fontSize: "16px",
  fontWeight: 400,
  padding: "12px 24px",
  borderRadius: "10px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#f5ca4a",
  },
});

const KhaltiNote = styled(Typography)({
  fontSize: "12px",
  color: "#6a7282",
  textAlign: "center",
});

const ImpactBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#f9fafb",
  borderRadius: "16px",
  padding: theme.spacing(6),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(5),
  alignItems: "center",
}));

const ImpactTitle = styled(Typography)({
  fontSize: "36px",
  fontWeight: 400,
  color: "#004c91",
  textAlign: "center",
  fontFamily: "'Poppins', sans-serif",
});

const ImpactGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "24px",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "16px",
  },
}));

const ImpactItem = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: "16px",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2.5),
  boxShadow: "0px 4px 12px rgba(0, 76, 145, 0.1)",
  border: "2px solid transparent",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: "#00a77f",
    transform: "translateY(-4px)",
    boxShadow: "0px 8px 24px rgba(0, 167, 127, 0.2)",
  },
}));

const ImpactIconCircle = styled(Box)({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #004c91 0%, #00a77f 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 4px 16px rgba(0, 76, 145, 0.3)",
});

const ImpactAmount = styled(Typography)({
  fontSize: "24px",
  fontWeight: 600,
  color: "#004c91",
  textAlign: "center",
});

const ImpactDescription = styled(Typography)({
  fontSize: "15px",
  fontWeight: 400,
  color: "#6b7280",
  textAlign: "center",
  lineHeight: 1.5,
});

const QRImage = styled("img")(({ theme }) => ({
  maxWidth: "336px",
  width: "100%",
  height: "auto",
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "250px",
  },
}));

const DonationSection: React.FC = () => {
  const { t } = useTranslation();
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const benefits = [
    t("get_involved.donation.benefits.impact"),
    t("get_involved.donation.benefits.programs"),
    t("get_involved.donation.benefits.receipt"),
  ];

  const impactExamples = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40, color: "white" }} />,
      amount: t("get_involved.donation.impact.education.amount"),
      description: t("get_involved.donation.impact.education.description"),
    },
    {
      icon: <WorkIcon sx={{ fontSize: 40, color: "white" }} />,
      amount: t("get_involved.donation.impact.training.amount"),
      description: t("get_involved.donation.impact.training.description"),
    },
    {
      icon: <HomeWorkIcon sx={{ fontSize: 40, color: "white" }} />,
      amount: t("get_involved.donation.impact.accessibility.amount"),
      description: t("get_involved.donation.impact.accessibility.description"),
    },
  ];

  return (
    <Section>
      <IntroContainer>
        <ImageContainer>
          <img
            src='https://www.figma.com/api/mcp/asset/90389292-c0f3-4ebb-9928-d20c1b0c4265'
            alt='Donation'
          />
        </ImageContainer>
        <TextContent>
          <Box sx={{ position: "relative" }}>
            <HandshakeIcon sx={{ fontSize: 48, color: "#004c91", mb: 2 }} />
            <TitleBar />
          </Box>
          <SectionTitle>{t("get_involved.donation.title")}</SectionTitle>
          <Description>{t("get_involved.donation.description")}</Description>
          <BenefitsList>
            {benefits.map((benefit, index) => (
              <BenefitItem key={index}>
                <CheckCircleIcon sx={{ color: "#00a77f", fontSize: 20 }} />
                <BenefitText>{benefit}</BenefitText>
              </BenefitItem>
            ))}
          </BenefitsList>
          <Box
            sx={{
              backgroundColor: "#f0f9ff",
              borderRadius: "10px",
              padding: "16px",
              marginTop: "24px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: "1px solid #00a77f",
            }}
          >
            <CheckCircleIcon sx={{ color: "#00a77f", fontSize: 20 }} />
            <Typography sx={{ fontSize: "14px", color: "#004c91" }}>
              {t("get_involved.donation.security_note")}
            </Typography>
          </Box>
        </TextContent>
      </IntroContainer>

      <PaymentGrid>
        <BankCard>
          <CardHeader>
            <IconBox>
              <AccountBalanceIcon sx={{ fontSize: 24, color: "#004c91" }} />
            </IconBox>
            <CardTitle>{t("get_involved.donation.bank.title")}</CardTitle>
          </CardHeader>
          <BankDetails>
            <p>{t("get_involved.donation.bank.org_name")}</p>
            <ol>
              <li>{t("get_involved.donation.bank.address")}</li>
            </ol>
            <p>{t("get_involved.donation.bank.address_detail")}</p>
            <ol>
              <li>{t("get_involved.donation.bank.wire_transfer")}</li>
            </ol>
            <p>{t("get_involved.donation.bank.currency")}</p>
            <p>{t("get_involved.donation.bank.wire_details")}</p>
            <ol>
              <li>{t("get_involved.donation.bank.beneficiary")}</li>
            </ol>
            <p>{t("get_involved.donation.bank.beneficiary_name")}</p>
            <ol>
              <li>{t("get_involved.donation.bank.account_number_label")}</li>
            </ol>
            <p>{t("get_involved.donation.bank.account_number")}</p>
            <ol>
              <li>{t("get_involved.donation.bank.swift_code_label")}</li>
            </ol>
            <p>{t("get_involved.donation.bank.swift_code")}</p>
            <ol>
              <li>{t("get_involved.donation.bank.bank_address_label")}</li>
            </ol>
            <p>{t("get_involved.donation.bank.bank_name")}</p>
            <p>{t("get_involved.donation.bank.bank_branch")}</p>
            <p>{t("get_involved.donation.bank.bank_location")}</p>
          </BankDetails>
        </BankCard>

        <KhaltiCard>
          <QRImage
            src='https://www.figma.com/api/mcp/asset/6f5833ab-701b-4ecd-8321-cb7a678f1911'
            alt='Khalti QR Code'
          />
        </KhaltiCard>

        <KhaltiCard>
          <CardHeader sx={{ width: "100%" }}>
            <KhaltiIconBox>
              <PaymentIcon sx={{ fontSize: 24, color: "#00a77f" }} />
            </KhaltiIconBox>
            <CardTitle>{t("get_involved.donation.khalti.title")}</CardTitle>
          </CardHeader>
          <KhaltiInfo>
            <Typography fontSize='16px' color='#364153'>
              {t("get_involved.donation.khalti.description")}
            </Typography>
            <KhaltiId>
              <KhaltiIdLabel>
                {t("get_involved.donation.khalti.id_label")}
              </KhaltiIdLabel>
              <KhaltiIdValue>
                {t("get_involved.donation.khalti.id")}
              </KhaltiIdValue>
            </KhaltiId>
            <KhaltiButton
              startIcon={<PaymentIcon />}
              onClick={() => setOpenPaymentModal(true)}
            >
              {t("get_involved.donation.khalti.button")}
            </KhaltiButton>
            <KhaltiNote>{t("get_involved.donation.khalti.secure")}</KhaltiNote>
          </KhaltiInfo>
        </KhaltiCard>
      </PaymentGrid>

      <DonationPaymentModal
        open={openPaymentModal}
        onClose={() => setOpenPaymentModal(false)}
      />

      <ImpactBox>
        <ImpactTitle>{t("get_involved.donation.impact.title")}</ImpactTitle>
        <ImpactGrid>
          {impactExamples.map((example, index) => (
            <ImpactItem key={index}>
              <ImpactIconCircle>{example.icon}</ImpactIconCircle>
              <ImpactAmount>{example.amount}</ImpactAmount>
              <ImpactDescription>{example.description}</ImpactDescription>
            </ImpactItem>
          ))}
        </ImpactGrid>
      </ImpactBox>
    </Section>
  );
};

export default DonationSection;
