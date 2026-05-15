import React from "react";

import SplashScreen from "../_components/SplashScreen";
import IntroSection from "../_sections/IntroSection";
import OutroSection from "../_sections/OutroSection";

import OverviewSection from "../_sections/OverviewSection";

const page = () => {
  return (
    <>
      {/* <SplashScreen /> */}

      <IntroSection />

      <OverviewSection />

      <OutroSection />
    </>
  );
};

export default page;
