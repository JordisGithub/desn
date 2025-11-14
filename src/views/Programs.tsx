import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { usePageTitle } from "../hooks/usePageTitle";
import ProgramsHero from "../components/programs/ProgramsHero";
import ProgramStats from "../components/programs/ProgramStats";
import CorePrograms from "../components/programs/CorePrograms";
import OurApproach from "../components/programs/OurApproach";
import ProgramsCTA from "../components/programs/ProgramsCTA";

const SkipLink = styled("a")({
  position: "absolute",
  top: "-40px",
  left: 0,
  background: "#004c91",
  color: "white",
  padding: "8px 16px",
  textDecoration: "none",
  zIndex: 9999,
  "&:focus": {
    top: 0,
    outline: "3px solid #f6d469",
    outlineOffset: "2px",
  },
});

export default function Programs() {
  const { t } = useTranslation();
  usePageTitle("page_titles.programs");

  return (
    <>
      <SkipLink href='#main-content'>{t("skip_to_content")}</SkipLink>
      <main id='main-content'>
        <ProgramsHero />
        <ProgramStats />
        <CorePrograms />
        <OurApproach />
        <ProgramsCTA />
      </main>
    </>
  );
}
