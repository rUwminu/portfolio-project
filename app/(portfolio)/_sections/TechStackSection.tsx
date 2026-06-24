"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import ReactIcon from "../_assets/icons/react.svg";
import NextJsIcon from "../_assets/icons/nextjs.svg";
import TypescriptIcon from "../_assets/icons/typescript.svg";
import GsapIcon from "../_assets/icons/gsap.svg";
import TailwindIcon from "../_assets/icons/tailwindcss.svg";
import FigmaIcon from "../_assets/icons/figma.svg";
import PostgresIcon from "../_assets/icons/postgresql.svg";

const WORDS = ["MODERN", "TECH STACK"];

const TechStackSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const letters =
        containerRef.current?.querySelectorAll(".slot-letter-inner");
      if (!letters?.length) return;

      gsap.set(letters, { yPercent: 0 });

      gsap.to(letters, {
        yPercent: -50,
        stagger: {
          each: 0.05,
          from: "random",
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      });

      gsap.set(".bubble", { scale: 0 });

      gsap.to(".bubble", {
        scale: 1,
        ease: "elastic.out(1, 0.5)",
        stagger: {
          each: 0.15,
          from: "random",
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "center center",
          scrub: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center w-full h-dvh px-10"
    >
      <div className="relative flex flex-col items-center justify-center z-1">
        {WORDS.map((word, i) => (
          <h1
            key={i}
            className="text-[14.25vw] lg:text-[10.475vw] leading-none font-semibold tracking-tighter text-nowrap"
          >
            {word.split("").map((char, j) => (
              <SlotLetter key={j} char={char} />
            ))}
          </h1>
        ))}

        <div
          className="bubble absolute left-[8%] top-[8%] -translate-x-1/2 -translate-y-1/2 shrink-0  flex items-center justify-center w-[clamp(64px,6.5vw,124px)] h-[clamp(64px,6.5vw,124px)] aspect-square p-3 md:p-[1vw] bg-white rounded-full z-1"
          style={{
            boxShadow: "0px 0px 20px -10px #000000",
          }}
        >
          <ReactIcon className="w-full h-full" />
        </div>

        <div
          className="bubble absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 shrink-0  flex items-center justify-center w-[clamp(64px,6.5vw,124px)] h-[clamp(64px,6.5vw,124px)] aspect-square p-3 md:p-[1vw] bg-white rounded-full z-1"
          style={{
            boxShadow: "0px 0px 20px -10px #000000",
          }}
        >
          <NextJsIcon className="w-full h-full" />
        </div>

        <div
          className="bubble absolute right-[8%] top-[8%] translate-x-1/2 -translate-y-1/2 shrink-0  flex items-center justify-center w-[clamp(64px,6.5vw,124px)] h-[clamp(64px,6.5vw,124px)] aspect-square p-3 md:p-[1vw] bg-white rounded-full z-1"
          style={{
            boxShadow: "0px 0px 20px -10px #000000",
          }}
        >
          <TypescriptIcon className="w-full h-full" />
        </div>

        <div
          className="bubble absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 shrink-0  flex items-center justify-center w-[clamp(64px,6.5vw,124px)] h-[clamp(64px,6.5vw,124px)] aspect-square p-3 md:p-[1vw] bg-white rounded-full z-1"
          style={{
            boxShadow: "0px 0px 20px -10px #000000",
          }}
        >
          <GsapIcon className="w-full h-full" />
        </div>

        <div
          className="bubble absolute left-[12%] bottom-[8%] -translate-x-1/2 translate-y-1/2 shrink-0  flex items-center justify-center w-[clamp(64px,6.5vw,124px)] h-[clamp(64px,6.5vw,124px)] aspect-square p-3 md:p-[1vw] bg-white rounded-full z-1"
          style={{
            boxShadow: "0px 0px 20px -10px #000000",
          }}
        >
          <TailwindIcon className="w-full h-full" />
        </div>

        <div
          className="bubble absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 shrink-0  flex items-center justify-center w-[clamp(64px,6.5vw,124px)] h-[clamp(64px,6.5vw,124px)] aspect-square p-3 md:p-[1vw] bg-white rounded-full z-1"
          style={{
            boxShadow: "0px 0px 20px -10px #000000",
          }}
        >
          <FigmaIcon className="w-full h-full" />
        </div>

        <div
          className="bubble absolute right-[8%] bottom-[12%] translate-x-1/2 translate-y-1/2 shrink-0  flex items-center justify-center w-[clamp(64px,6.5vw,124px)] h-[clamp(64px,6.5vw,124px)] aspect-square p-3 md:p-[1vw] bg-white rounded-full z-1"
          style={{
            boxShadow: "0px 0px 20px -10px #000000",
          }}
        >
          <PostgresIcon className="w-full h-full" />
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;

const SlotLetter = ({ char }: { char: string }) => {
  if (char === " ") {
    return <span className="inline-block w-[0.3em]">&nbsp;</span>;
  }

  return (
    <span className="slot-letter inline-block overflow-hidden h-[1em] leading-none">
      <span className="slot-letter-inner flex flex-col items-center justify-center leading-none px-[0.03em]">
        <span className="h-[1em] -ml-[0.035em] leading-none">{char}</span>
        <span className="h-[1em] -ml-[0.035em]  leading-none">{char}</span>
      </span>
    </span>
  );
};
