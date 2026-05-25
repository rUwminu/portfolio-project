import React from "react";

import SplashScreen from "../_components/SplashScreen";
import IntroSection from "../_sections/IntroSection";
import FeatureSection from "../_sections/FeatureSection";
import OverviewSection from "../_sections/OverviewSection";
import PassifloraSection from "../_sections/PassifloraSection";
import MessageSection from "../_sections/MessageSection";
import ProductSection from "../_sections/ProductSection";
import HighlightSection from "../_sections/HighlightSection";
import BannerSection from "../_sections/BannerSection";
import CommentSection from "../_sections/CommentSection";
import OutroSection from "../_sections/OutroSection";

const page = () => {
  return (
    <>
      <SplashScreen />

      <IntroSection />

      <FeatureSection />

      <OverviewSection />

      <PassifloraSection />

      <MessageSection />

      <ProductSection />

      <HighlightSection />

      <BannerSection />

      <CommentSection />

      <OutroSection />
    </>
  );
};

export default page;
