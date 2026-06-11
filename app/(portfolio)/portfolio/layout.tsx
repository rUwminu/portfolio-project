"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";

import Header from "../_components/Header";
import Navigation from "../_components/Navigation";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Portfoliolayout = ({ children }: { children: React.ReactNode }) => {
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
    <div className=" w-full h-full">
      <div className="smooth-wrapper bg-transparent" ref={wrapperRef}>
        <div
          className="portfolio-body-bg relative smooth-content w-full mx-auto px-2 md:px-4 outline-1"
          style={{ backgroundColor: "white" }}
          ref={contentRef}
        >
          <Header />

          {children}

          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default Portfoliolayout;
