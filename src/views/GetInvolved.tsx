import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { usePageTitle } from "../hooks/usePageTitle";
import { useSearchHighlight } from "../hooks/useSearchHighlight";
import { useTranslation } from "react-i18next";
import HeroSection from "../components/getinvolved/HeroSection";
import ImpactSection from "../components/getinvolved/ImpactSection";
import VolunteerSection from "../components/getinvolved/VolunteerSection";
import DonationSection from "../components/getinvolved/DonationSection";
import MembershipSection from "../components/getinvolved/MembershipSection";

const GetInvolved: React.FC = () => {
  usePageTitle("page_titles.get_involved");
  useSearchHighlight();
  const { t } = useTranslation();

  const SkipLink = styled("a")(({ theme }) => ({
    position: "absolute",
    left: -10000,
    top: "auto",
    width: 1,
    height: 1,
    overflow: "hidden",
    "&:focus": {
      left: 0,
      top: 0,
      width: "auto",
      height: "auto",
      padding: theme.spacing(1),
      background: "#fff",
      color: "#004c91",
      zIndex: 9999,
    },
  }));

  return (
    <Box component='div'>
      <SkipLink href='#main-content' aria-label={t("skip_to_content")}>
        {t("skip_to_content")}
      </SkipLink>
      <Box component='div'>
        <HeroSection />
        <ImpactSection />
        <VolunteerSection />
        <DonationSection />
        <MembershipSection />
      </Box>
    </Box>
  );
};

export default GetInvolved;
