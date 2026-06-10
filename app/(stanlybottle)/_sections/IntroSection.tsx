"use client";

import React from "react";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

import BlackBottleBg from "../_assets/images/black-bottle.png";

import { DELAY_SPLASH_SCREEN } from "../_constants";

const IntroSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 1024px)",
  });

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

    gsap.from(".image-bottle", {
      yPercent: 80,
      xPercent: 40,
      opacity: 0,
      rotate: 36,
      ease: "power1.inOut",
      duration: 1,
      delay: DELAY_SPLASH_SCREEN,
    });

    if (!isMobile) {
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
    } else {
      // Hero scroll out parallex
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-container",
          start: "40% top",
          end: "bottom top",
          scrub: true,
          pin: true,
          markers: true,
        },
      });

      heroTl.to(".hero-container", {
        yPercent: 40,
        ease: "power1.inOut",
      });
    }
  });

  return (
    <section className="relative w-full h-[calc(100vh+200px)] lg:h-dvh bg-white">
      <div className="hero-container relative flex items-end justify-center lg:items-start lg:justify-start lg:flex-row w-full h-full px-4 sm:px-12 md:px-20 lg:px-32 xl:px-48 z-2">
        <div className="flex flex-col pt-0 lg:pt-40 pb-24 lg:pb-0">
          <h1 className="first-title text-black text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-medium tracking-tight leading-28 lg:leading-32 xl:leading-40 2xl:leading-48 overflow-hidden">
            feel
          </h1>

          <h1 className="second-title text-black text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-medium tracking-tight leading-28 lg:leading-32 xl:leading-40 2xl:leading-48 overflow-hidden">
            better
          </h1>

          <div className="hidden lg:flex">
            <span className="p-message text-black text-sm md:text-base font-semibold ml-1 md:ml-4 mt-6 leading-5 overflow-hidden">
              we have used plants for thousands of years in our search for
              better
              <br />
              wellness — stanly is charting the future of plant-based remedies
            </span>
          </div>

          <span className="lg:hidden p-message text-black text-sm text-center mt-2 font-medium  leading-5 overflow-hidden">
            we have used plants for thousands of years in our <br /> search for
            better wellness — stanly is charting <br /> the future of
            plant-based remedies
          </span>
        </div>

        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full z-0">
          <img
            src={BlackBottleBg.src}
            className="image-bottle min-w-[1000px] lg:min-w-[1200px] lg:translate-x-[20%] -translate-y-48 lg:-translate-y-12 rotate-12 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
