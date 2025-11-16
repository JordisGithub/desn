import { usePageTitle } from "../hooks/usePageTitle";
import ProgramsHero from "../components/programs/ProgramsHero";
import ProgramIntro from "../components/programs/ProgramIntro";
import ProgramCards from "../components/programs/ProgramCards";
import ProgramSuccessStories from "../components/programs/ProgramSuccessStories";

export default function Programs() {
  usePageTitle("page_titles.programs");

  return (
    <>
      <ProgramsHero />
      <ProgramIntro />
      <ProgramCards />
      <ProgramSuccessStories />
    </>
  );
}
