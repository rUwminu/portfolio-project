import React from "react";

import HeroSection from "../_sections/HeroSection";
import AboutMeSection from "../_sections/AboutMeSection";
import JournalSection from "../_sections/JournalSection";
import ProjectSection from "../_sections/ProjectSection";

const page = () => {
  return (
    <>
      <HeroSection />

      <AboutMeSection />

      <JournalSection />

      <ProjectSection />

      <section className="w-full h-dvh border"> Empty Section</section>
    </>
  );
};

export default page;
