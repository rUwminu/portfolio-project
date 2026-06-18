import React from "react";

import HeroSection from "../_sections/HeroSection";
import AboutMeSection from "../_sections/AboutMeSection";
import JournalSection from "../_sections/JournalSection";
import ProjectSection from "../_sections/ProjectSection";
import ProjectSkillSection from "../_sections/ProjectSkillSection";
import TechStackSection from "../_sections/TechStackSection";
import ThankSection from "../_sections/ThankSection";

const page = () => {
  return (
    <>
      <HeroSection />

      <AboutMeSection />

      <JournalSection />

      <ProjectSection />

      <ProjectSkillSection />

      <TechStackSection />

      <ThankSection />
    </>
  );
};

export default page;
