"use client";

import React from "react";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

import BlackBottleBg from "../_assets/images/black-bottle.png";

const FeatureSection = () => {
  useGSAP(() => {
    const firstMsgSplit = SplitText.create(".text-overlay-review", {
      type: "chars",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".feature-section",
        start: "top top",
        end: "+=6500", // total budget: text read + fade + clip expand
        scrub: 1,
        pin: true,
      },
    });

    // Phase 1: text read — allocate ~50% of scroll budget
    tl.from(firstMsgSplit.chars, {
      opacity: 0.2,
      stagger: 0.3, // lower stagger = less total duration = less scroll needed
      duration: 1,
    });

    // Phase 2: scale + fade out
    tl.to(".text-overlay-review", {
      scale: 1.2,
      opacity: 0,
      duration: 2,
    });

    // Phase 3: clippath oval expands to full width
    tl.to(".image-oval-review", {
      clipPath: "inset(0% round 0px)",
      width: "100%",
      height: "140%",
      duration: 4,
      ease: "none",
    }).to(
      ".image-oval-overlay",
      {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
      },
      "<",
    );
  });

  return (
    <section className="feature-section relative w-full h-dvh overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-2">
        <h1 className="text-overlay-review text-7xl text-center text-white text-nowrap font-medium leading-22">
          stanly measure the impact
          <br />
          of your intake to improve the <br /> way you lives & sleep
        </h1>
      </div>

      <div className="image-overlay-review relative flex items-center justify-center w-full h-full bg-black">
        <div
          className="image-oval-review relative h-[900px] w-[475px] bg-white"
          style={{
            clipPath: "inset(0% round 240px)",
          }}
        >
          <div className="image-oval-overlay absolute top-0 left-0 w-full h-full bg-zinc-950 z-1" />

          <img
            src={BlackBottleBg.src}
            className="fixed top-0 left-1/2 -translate-x-1/2 h-screen w-auto object-cover z-0"
          />
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
