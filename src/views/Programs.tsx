import { usePageTitle } from "../hooks/usePageTitle";
import ProgramsHero from "../components/programs/ProgramsHero";
import ProgramStats from "../components/programs/ProgramStats";
import CorePrograms from "../components/programs/CorePrograms";
import OurApproach from "../components/programs/OurApproach";
import ProgramsCTA from "../components/programs/ProgramsCTA";

export default function Programs() {
  usePageTitle("page_titles.programs");

  return (
    <>
      <ProgramsHero />
      <ProgramStats />
      <CorePrograms />
      <OurApproach />
      <ProgramsCTA />
    </>
  );
}
