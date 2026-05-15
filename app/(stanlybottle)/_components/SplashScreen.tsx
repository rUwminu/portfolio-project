"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

const words = [
  {
    type: "001",
    title: "sleep",
    trademark: "2026",
  },
  {
    type: "002",
    title: "smart",
    trademark: "2026",
  },
  {
    type: "003",
    title: "naturally",
    trademark: "2026",
  },
];

export default function SplashScreen() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();

    // curtains open
    tl.to(
      ".curtain-top",
      {
        yPercent: -100,
        duration: 7,
        ease: "power1.inOut",
      },
      "<",
    ).to(
      ".curtain-bottom",
      {
        yPercent: 100,
        duration: 7,
        ease: "power1.inOut",
      },
      "<",
    );

    const textTl = gsap.timeline({
      delay: 2,
      onComplete: () => {
        document.body.style.overflow = "";
        rootRef.current?.remove();
      },
    });

    // animate each word in sequence
    words.forEach((_, idx) => {
      const wrapper = `.text-wrapper-${idx + 1}`;

      const titleEl = document.querySelector(`${wrapper} .split-title`);

      if (!titleEl) return;

      const split = SplitText.create(`${wrapper} .split-title`, {
        type: "chars",
      });
      const chars = [...split.chars].reverse(); // right to left: last char first
      const exitDuration = 0.05 * chars.length;

      // set initial state
      gsap.set(`${wrapper} .fade-span`, { opacity: 0 });

      textTl
        .from(
          chars,
          {
            yPercent: 200,
            duration: 0.6,
            stagger: 0.1,
            ease: "power1.out",
          },
          "<",
        )
        .to(
          `${wrapper} .fade-span`,
          {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          "<",
        )
        .to(chars, {
          yPercent: -200,
          duration: 0.3,
          stagger: 0.1,
          ease: "power1.in",
        })
        .to(
          `${wrapper} .fade-span`,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          },
          `<${exitDuration}`, // start with chars exit
        );
    });
  });

  return (
    <div
      ref={rootRef}
      className="splash-screen flex items-center justify-center fixed w-dvw h-dvh inset-0 bg-white z-100"
    >
      {/* curtains */}
      <div className="curtain-top absolute top-0 left-0 w-full h-1/2 bg-black z-1" />
      <div className="curtain-bottom absolute bottom-0 left-0 w-full h-1/2 bg-black z-1" />

      {words.map((x, idx) => (
        <CenterText key={idx} className={`text-wrapper-${idx + 1}`} {...x} />
      ))}
    </div>
  );
}

interface CenterTextProps {
  className: string;
  type: string;
  title: string;
  trademark: string;
}

const CenterText: React.FC<CenterTextProps> = ({
  className,
  type,
  title,
  trademark,
}) => {
  return (
    <div
      className={cn(
        "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-2 overflow-hidden",
        className,
      )}
    >
      <span className="fade-span mt-auto font-semibold text-nowrap opacity-0">
        {type}
      </span>

      <h1 className="split-title text-[12rem] text-black font-semibold leading-40 text-nowrap ">
        {title}
      </h1>

      <span className="fade-span font-semibold text-nowrap opacity-0">
        {trademark}
      </span>
    </div>
  );
};
