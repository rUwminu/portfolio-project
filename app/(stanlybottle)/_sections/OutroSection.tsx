"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

const OutroSection = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".outro-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
    const titleSplit = SplitText.create(`.title`, {
      type: "chars",
    });

    tl.from(titleSplit.chars, {
      yPercent: 200,
      opacity: 0,
      duration: 0.2,
      stagger: 0.03,
      ease: "power1.out",
    }).from(
      ".tag",
      {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
      },
      "<",
    );
  });

  return (
    <section className="outro-section flex items-center justify-center relative py-14 lg:py-24 px-4 md:px-8 lg:px-14">
      <div className="flex items-center justify-center gap-1 md:gap-2 lg:gap-4 xl:gap-6">
        <div className="flex flex-col items-center justify-center">
          <span className="tag font-medium -mb-3">purity of</span>

          <h1 className="title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-medium tracking-tight ">
            material
          </h1>
        </div>

        <div className="dot w-2 h-2 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-7 xl:h-7 -mb-1 md:-mb-3 lg:-mb-3 xl:-mb-4 bg-black rounded-full" />

        <div className="flex flex-col items-center justify-center">
          <span className="tag font-medium -mb-3">power of</span>

          <h1 className="title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-medium tracking-tight ">
            people
          </h1>
        </div>

        <div className="dot w-2 h-2 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-7 xl:h-7 -mb-1 md:-mb-3 lg:-mb-3 xl:-mb-4 bg-black rounded-full" />

        <div className="flex flex-col items-center justify-center">
          <span className="tag font-medium -mb-3">preservation of</span>

          <h1 className="title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-medium tracking-tight ">
            plant
          </h1>
        </div>
      </div>
    </section>
  );
};

export default OutroSection;
