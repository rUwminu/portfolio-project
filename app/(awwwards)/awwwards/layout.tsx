"use client";

import "./style.css";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";

import NavBar from "../_components/NavBar";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Awwwardslayout = ({ children }: { children: React.ReactNode }) => {
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
    <div className="awwwards-root">
      <NavBar />
      <div className="smooth-wrapper" ref={wrapperRef}>
        <div className="smooth-content" ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Awwwardslayout;
