import React from "react";

import HeroSection from "../_sections/HeroSection";
import AboutMeSection from "../_sections/AboutMeSection";

const page = () => {
  return (
    <>
      <HeroSection />

      <AboutMeSection />

      <section className="w-full h-dvh border"> Empty Section</section>
    </>
  );
};

export default page;
