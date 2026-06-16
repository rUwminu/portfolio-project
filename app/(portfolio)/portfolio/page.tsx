import React from "react";

import HeroSection from "../_sections/HeroSection";
import AboutMeSection from "../_sections/AboutMeSection";
import JournalSection from "../_sections/JournalSection";

const page = () => {
  return (
    <>
      <HeroSection />

      <AboutMeSection />

      <JournalSection />

      <section className="w-full h-dvh border"> Empty Section</section>
    </>
  );
};

export default page;
