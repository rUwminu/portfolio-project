"use client";

import FlavorTitle from "../_components/FlavorTitle";
import FlavorSlider from "../_components/FlavorSlider";

const FlavorSection = () => {
  return (
    <section className="flavor-section">
      <div className="relative h-full flex flex-col lg:flex-row items-center">
        <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
          <FlavorTitle />
        </div>

        <div className="h-full">
          <FlavorSlider />
        </div>
      </div>
    </section>
  );
};

export default FlavorSection;
