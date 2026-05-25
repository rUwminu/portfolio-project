"use client";

import "./style.css";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";

import Header from "../_components/Header";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const StanlyBottlelayout = ({ children }: { children: React.ReactNode }) => {
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
      <Header />

      <div className="smooth-wrapper bg-transparent" ref={wrapperRef}>
        <div
          className="body-bg smooth-content"
          style={{ backgroundColor: "white" }}
          ref={contentRef}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default StanlyBottlelayout;
