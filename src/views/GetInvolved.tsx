import React from "react";
import Box from "@mui/material/Box";
import HeroSection from "../components/getinvolved/HeroSection";
import ImpactSection from "../components/getinvolved/ImpactSection";
import VolunteerSection from "../components/getinvolved/VolunteerSection";
import VolunteerForm from "../components/getinvolved/VolunteerForm";
import DonationSection from "../components/getinvolved/DonationSection";
import MembershipSection from "../components/getinvolved/MembershipSection";
import CTASection from "../components/getinvolved/CTASection";

const GetInvolved: React.FC = () => {
  return (
    <Box>
      <HeroSection />
      <ImpactSection />
      <VolunteerSection />
      <VolunteerForm />
      <DonationSection />
      <MembershipSection />
      <CTASection />
    </Box>
  );
};

export default GetInvolved;
