import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

const CTAContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to bottom, #004c91, #00a77f)",
  padding: theme.spacing(8, 12),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(4),
}));

const CTATitle = styled(Typography)({
  fontSize: "32px",
  fontWeight: 400,
  color: "white",
  textAlign: "center",
  fontFamily: "'Open Sans', sans-serif",
});

const CTASubtitle = styled(Typography)({
  fontSize: "20px",
  fontWeight: 400,
  color: "rgba(255, 255, 255, 0.9)",
  textAlign: "center",
  maxWidth: "800px",
});

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const PrimaryButton = styled(Button)({
  backgroundColor: "#f6d469",
  color: "#2b2b2b",
  fontSize: "20px",
  fontWeight: 600,
  padding: "14px 28px",
  borderRadius: "10px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#f5ca4a",
  },
});

const SecondaryButton = styled(Button)({
  backgroundColor: "#f6d469",
  border: "2px solid white",
  color: "#2b2b2b",
  fontSize: "20px",
  fontWeight: 600,
  padding: "14px 28px",
  borderRadius: "10px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#f5ca4a",
  },
});

const CTASection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <CTAContainer>
      <CTATitle>{t("get_involved.cta.title")}</CTATitle>
      <CTASubtitle>{t("get_involved.cta.subtitle")}</CTASubtitle>
      <ButtonGroup>
        <PrimaryButton>{t("get_involved.cta.get_involved")}</PrimaryButton>
        <SecondaryButton>{t("get_involved.cta.donate")}</SecondaryButton>
      </ButtonGroup>
    </CTAContainer>
  );
};

export default CTASection;
