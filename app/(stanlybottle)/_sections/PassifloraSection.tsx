"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import PassifloraImg from "../_assets/images/passiflora_with_icons.webp";

const PassifloraSection = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".passiflora-section",
        start: "top top",
        end: "+=1200", // total budget: text read + fade + clip expand
        scrub: 1,
        pin: true,
      },
    });

    tl.to(".passi-message", {
      xPercent: -100,
      ease: "power1.inOut",
    }).to(
      ".passi-image",
      {
        scale: 0.9,
        ease: "power1.inOut",
      },
      "<",
    );
  });

  return (
    <section className="passiflora-section relative flex items-center w-full h-dvh overflow-hidden">
      <div className="flex flex-col">
        <span className="ml-6 font-medium">and inside lies</span>

        <h1 className="passi-message text-[320px] font-medium text-nowrap text-zinc-200 tracking-tighter leading-56 ">
          nature's magic
        </h1>
      </div>

      <div className="passi-image absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-175 h-175">
        <img src={PassifloraImg.src} className="w-full h-full object-cover" />
      </div>
    </section>
  );
};

export default PassifloraSection;
