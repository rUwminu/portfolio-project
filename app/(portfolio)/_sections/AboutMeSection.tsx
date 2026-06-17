"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

const AboutMeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const split = SplitText.create(".param-text", { type: "words" });

    split.words.forEach((word) => {
      const original = word.textContent ?? "";
      const placeholder = Array.from({ length: original.length }, () =>
        "X&i*^@nO!%$#".charAt(Math.floor(Math.random() * 13)),
      ).join("");

      gsap.set(word, {
        scrambleText: { text: placeholder, chars: "upperCase" },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: word,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(word, {
        duration: 0.8,
        scrambleText: {
          text: original,
          chars: "upperCase",
          speed: 0.5,
        },
      });
    });

    return () => split.revert();
  });

  return (
    <section ref={sectionRef} className="flex flex-col w-full py-28">
      <h2 className="text-base md:text-lg font-medium tracking-wider">
        ABOUT ME
      </h2>

      <p className="param-text text-xl sm:text-[3vw] font-medium tracking-tight leading-tight mt-2 md:mt-4">
        Passionate on merging design and engineering. I craft smooth,
        interactive experiences with purpose. With focus on performance, brands
        and goals, that bring digital product to life.
      </p>
    </section>
  );
};

export default AboutMeSection;
