import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { usePageTitle } from "../hooks/usePageTitle";
import HeroSection from "../components/getinvolved/HeroSection";
import ImpactSection from "../components/getinvolved/ImpactSection";
import VolunteerSection from "../components/getinvolved/VolunteerSection";
import DonationSection from "../components/getinvolved/DonationSection";
import MembershipSection from "../components/getinvolved/MembershipSection";
import AboutCTASection from "../components/about/AboutCTASection";

const GetInvolved: React.FC = () => {
  usePageTitle("page_titles.get_involved");

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
      <SkipLink href='#main-content'>Skip to content</SkipLink>
      <Box component='div'>
        <HeroSection />
        <ImpactSection />
        <VolunteerSection />
        <DonationSection />
        <MembershipSection />
        <AboutCTASection />
      </Box>
    </Box>
  );
};

export default GetInvolved;
