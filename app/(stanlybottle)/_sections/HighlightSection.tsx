"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

const HighlightSection = () => {
  useGSAP(() => {
    const firstMsgSplit = SplitText.create(".highlight-title-message", {
      type: "chars",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".highlight-section",
        start: "top 30%",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.from(firstMsgSplit.chars, {
      opacity: 0.2,
      stagger: 0.1, // lower stagger = less total duration = less scroll needed
      duration: 1,
    });
  });

  return (
    <section className="highlight-section relative flex items-center justify-center w-full h-dvh">
      <div className="flex flex-col items-center justify-center">
        <h1 className="highlight-title-message text-center text-4xl md:text-6xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] min-[114rem]:text-[12rem] min-[132.5rem]:text-[14rem] font-medium tracking-tighter ">
          we learn across <br /> individual responses
        </h1>
        <span className="font-medium">and listen for signs of impact</span>
      </div>
    </section>
  );
};

export default HighlightSection;
