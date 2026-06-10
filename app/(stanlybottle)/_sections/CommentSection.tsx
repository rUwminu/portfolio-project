"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import QuateIcon from "../_assets/icons/Quate.svg";

const CommentSection = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".comment-section",
        start: "top top",
        end: "+=1200", // total budget: text read + fade + clip expand
        scrub: 1,
        pin: true,
      },
    });

    tl.to(".comment-overlay", {
      scale: 1.1,
      opacity: 0,
      ease: "power1.inOut",
    }).to(".comment", {
      scale: 1,
      opacity: 1,
      ease: "power1.inOut",
    });
  });

  return (
    <section className="comment-section relative flex items-center w-full h-dvh overflow-hidden">
      <div className="comment-overlay absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-4 md:gap-6 z-1">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-medium tracking-tight">
          never drinking alone
        </h1>

        <span className="text-xs sm:text-base font-medium text-center">
          join our community · the sofi treehouse · where you'll find insights,{" "}
          <br />
          answers, and experiences from thousands of members & pioneers
        </span>
      </div>

      <div className="comment flex flex-col items-center justify-center gap-4 w-full h-full scale-90 opacity-0">
        <QuateIcon className="w-20 h-20 text-black" />

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center font-medium tracking-tight">
          wow, absolutely astonishing! all I know is that if it <br /> was made
          available to the wider public it would <br /> help so many more. I
          can't thank you enough... <br /> it's been a game changer for me.
        </h2>

        <span className="font-medium">@javin</span>
      </div>
    </section>
  );
};

export default CommentSection;
