"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { PortfolioProvider } from "../_context/PortfolioContext";

import Header from "../_components/Header";
import Navigation from "../_components/Navigation";
import Footer from "../_components/Footer";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrambleTextPlugin);

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
    <PortfolioProvider>
      <Header />

      <div className="relative w-full h-full">
        <Navigation />

        <div className="smooth-wrapper bg-transparent" ref={wrapperRef}>
          <div
            className="portfolio-body-bg relative smooth-content w-full mx-auto px-2 md:px-4 "
            style={{ backgroundColor: "white" }}
            ref={contentRef}
          >
            {children}

            <Footer />
          </div>
        </div>
      </div>
    </PortfolioProvider>
  );
};

export default Portfoliolayout;
