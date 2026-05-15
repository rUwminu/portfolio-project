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
    <div className="bg-white">
      <Header />

      <div className="smooth-wrapper bg-white" ref={wrapperRef}>
        <div className="smooth-content bg-white" ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default StanlyBottlelayout;
