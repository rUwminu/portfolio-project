"use client";

import React from "react";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

import { DELAY_SPLASH_SCREEN } from "../_constants";

const IntroSection = () => {
  useGSAP(() => {
    const firstTitleSplit = SplitText.create(`.first-title`, {
      type: "chars",
    });
    const secondTitleSplit = SplitText.create(`.second-title`, {
      type: "chars",
    });
    const pMsgSplit = SplitText.create(".p-message", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    gsap.from(firstTitleSplit.chars, {
      yPercent: 200,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power1.out",
      delay: DELAY_SPLASH_SCREEN + 0.5,
    });

    gsap.from(secondTitleSplit.chars, {
      yPercent: 200,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power1.out",
      delay: DELAY_SPLASH_SCREEN + 0.5,
    });

    gsap.from(pMsgSplit.words, {
      yPercent: 300,
      rotate: 3,
      ease: "power1.inOut",
      duration: 1,
      stagger: 0.01,
      delay: DELAY_SPLASH_SCREEN + 0.5,
    });

    // Hero scroll out parallex
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });

    heroTl.to(".hero-container", {
      yPercent: 40,
      ease: "power1.inOut",
    });
  });

  return (
    <section className="relative w-full h-dvh bg-white">
      <div className="hero-container w-full h-full px-4 sm:px-12 md:px-20 lg:px-32 py-56 sm:py-40 md:py-48 ">
        <div className="flex flex-col">
          <h1 className="first-title text-black text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] font-semibold leading-28 sm:leading-32 md:leading-40 lg:leading-48 overflow-hidden">
            feel
          </h1>

          <h1 className="second-title text-black text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] font-semibold leading-28 sm:leading-32 md:leading-40 lg:leading-48 overflow-hidden">
            better
          </h1>

          <span className="p-message text-black text-sm md:text-base font-semibold ml-1 md:ml-4 mt-6 leading-5 overflow-hidden">
            we have used plants for thousands of years in our search for better{" "}
            <br />
            wellness — stanly is charting the future of plant-based remedies
          </span>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
