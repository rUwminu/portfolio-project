"use client";

import React from "react";

import BannerSection from "../_components/sections/BannerSection";
import FeatureSection from "../_components/sections/FeatureSection";
import BoardingSection from "../_components/sections/BoardingSection";
import ArchiveSection from "../_components/sections/ArchiveSection";
import DishOverviewSection from "../_components/sections/DishOverviewSection";

const pages: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <BannerSection />

      <FeatureSection />

      <BoardingSection />

      <ArchiveSection />

      <DishOverviewSection />
    </div>
  );
};

export default pages;
