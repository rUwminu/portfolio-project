"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrambleTextPlugin);

const GsapProvider = ({ children }: { children: React.ReactNode }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 3,
      effects: true,
    });
  });

  return (
    <div className="smooth-wrapper bg-transparent" ref={wrapperRef}>
      <div
        className="portfolio-body-bg relative smooth-content w-full mx-auto px-2 md:px-4 "
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
};

export default GsapProvider;
