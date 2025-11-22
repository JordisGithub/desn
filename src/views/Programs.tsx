import { usePageTitle } from "../hooks/usePageTitle";
import { useSearchHighlight } from "../hooks/useSearchHighlight";
import ProgramsHero from "../components/programs/ProgramsHero";
import ProgramPillarsSection from "../components/programs/ProgramPillarsSection";
import ProgramPillarCategory from "../components/programs/ProgramPillarCategory";

// Import program images
import ictTraining from "../assets/ProgramsAndServices/ICT expert training the project beneficiaries.jpg";
import brailleSign from "../assets/ProgramsAndServices/Braille & Sign Language Classes.jpg";
import scholarship from "../assets/ProgramsAndServices/scholarship.jpg";
import microfinance from "../assets/ProgramsAndServices/microfinance.jpg";
import skillsDevelopment from "../assets/ProgramsAndServices/skills development.jpg";
import jobPlacement from "../assets/ProgramsAndServices/job placement support.JPG";
import uncrpdMonitoring from "../assets/ProgramsAndServices/uncrpd monitoring.jpg";
import policyDialogue from "../assets/ProgramsAndServices/polici dialogue.jpg";
import barrierFree from "../assets/ProgramsAndServices/barrier free campaign.jpg";

// Education Programs Data
const educationPrograms = [
  {
    id: "edu-ict",
    titleKey: "programs.education_programs.ict_training.title",
    impactKey: "programs.education_programs.ict_training.impact",
    outcomeKey: "programs.education_programs.ict_training.outcome",
    altKey: "programs.education_programs.ict_training.alt",
    image: ictTraining,
  },
  {
    id: "edu-braille",
    titleKey: "programs.education_programs.braille_sign.title",
    impactKey: "programs.education_programs.braille_sign.impact",
    outcomeKey: "programs.education_programs.braille_sign.outcome",
    altKey: "programs.education_programs.braille_sign.alt",
    image: brailleSign,
  },
  {
    id: "edu-scholarship",
    titleKey: "programs.education_programs.scholarship.title",
    impactKey: "programs.education_programs.scholarship.impact",
    outcomeKey: "programs.education_programs.scholarship.outcome",
    altKey: "programs.education_programs.scholarship.alt",
    image: scholarship,
  },
];

// Livelihood Programs Data
const livelihoodPrograms = [
  {
    id: "liv-microfinance",
    titleKey: "programs.livelihood_programs.microfinance.title",
    impactKey: "programs.livelihood_programs.microfinance.impact",
    outcomeKey: "programs.livelihood_programs.microfinance.outcome",
    altKey: "programs.livelihood_programs.microfinance.alt",
    image: microfinance,
  },
  {
    id: "liv-skills",
    titleKey: "programs.livelihood_programs.skill_development.title",
    impactKey: "programs.livelihood_programs.skill_development.impact",
    outcomeKey: "programs.livelihood_programs.skill_development.outcome",
    altKey: "programs.livelihood_programs.skill_development.alt",
    image: skillsDevelopment,
  },
  {
    id: "liv-jobs",
    titleKey: "programs.livelihood_programs.job_placement.title",
    impactKey: "programs.livelihood_programs.job_placement.impact",
    outcomeKey: "programs.livelihood_programs.job_placement.outcome",
    altKey: "programs.livelihood_programs.job_placement.alt",
    image: jobPlacement,
  },
];

// Advocacy Programs Data
const advocacyPrograms = [
  {
    id: "adv-uncrpd",
    titleKey: "programs.advocacy_programs.uncrpd_monitoring.title",
    impactKey: "programs.advocacy_programs.uncrpd_monitoring.impact",
    outcomeKey: "programs.advocacy_programs.uncrpd_monitoring.outcome",
    altKey: "programs.advocacy_programs.uncrpd_monitoring.alt",
    image: uncrpdMonitoring,
  },
  {
    id: "adv-policy",
    titleKey: "programs.advocacy_programs.policy_dialogue.title",
    impactKey: "programs.advocacy_programs.policy_dialogue.impact",
    outcomeKey: "programs.advocacy_programs.policy_dialogue.outcome",
    altKey: "programs.advocacy_programs.policy_dialogue.alt",
    image: policyDialogue,
  },
  {
    id: "adv-barrier-free",
    titleKey: "programs.advocacy_programs.barrier_free.title",
    impactKey: "programs.advocacy_programs.barrier_free.impact",
    outcomeKey: "programs.advocacy_programs.barrier_free.outcome",
    altKey: "programs.advocacy_programs.barrier_free.alt",
    image: barrierFree,
  },
];

export default function Programs() {
  usePageTitle("page_titles.programs");
  useSearchHighlight();

  return (
    <>
      <ProgramsHero />
      <ProgramPillarsSection />
      <ProgramPillarCategory
        pillarType='education'
        programs={educationPrograms}
      />
      <ProgramPillarCategory
        pillarType='livelihood'
        programs={livelihoodPrograms}
      />
      <ProgramPillarCategory
        pillarType='advocacy'
        programs={advocacyPrograms}
      />
    </>
  );
}
