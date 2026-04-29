"use client";

import React from "react";

import BannerSection from "../_components/sections/BannerSection";
import FeatureSection from "../_components/sections/FeatureSection";
import ExhibitSection from "../_components/sections/ExhibitSection";
import BoradingSeaction from "../_components/sections/BoradingSeaction";
import CreatorSection from "../_components/sections/CreatorSection";

const Page: React.FC = () => {
  return (
    <>
      <BannerSection />

      <FeatureSection />

      <ExhibitSection />

      <BoradingSeaction />

      <CreatorSection />
    </>
  );
};

export default Page;
