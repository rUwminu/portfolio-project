"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { Button } from "@/components/ui/button";

import { DELAY_SPLASH_SCREEN } from "../_constants";

const Header = () => {
  const tagRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".header-portfolio", {
      yPercent: -200,
      opacity: 0,
      duration: 0.7,
      ease: "power1.inOut",
      delay: DELAY_SPLASH_SCREEN,
    });
  });

  useEffect(() => {
    const tag = tagRef.current;
    const wrapper = wrapperRef.current;
    if (!wrapper || !tag) return;

    const spans = wrapper.querySelectorAll("span");
    const [top, bottom] = Array.from(spans);

    gsap.set(bottom, { yPercent: 100 });

    const enter = gsap
      .timeline({ paused: true })
      .to(top, { yPercent: -100, duration: 0.3, ease: "power2.inOut" }, "<")
      .to(bottom, { yPercent: 0, duration: 0.3, ease: "power2.inOut" }, "<");

    tag.addEventListener("mouseenter", () => enter.play());
    tag.addEventListener("mouseleave", () => enter.reverse());

    return () => {
      tag.removeEventListener("mouseenter", () => enter.play());
      tag.removeEventListener("mouseleave", () => enter.reverse());
    };
  }, []);

  return (
    <div className="header-portfolio absolute top-0 left-0 flex items-center justify-between gap-6 w-full min-w-0 p-2 md:p-4 z-100">
      <div className="basis-3/5  flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-sm md:text-base text-zinc-500 font-medium">
            I am
          </span>

          <span className="text-lg md:text-xl text-zinc-900 font-medium leading-5">
            Ray
          </span>
        </div>

        <div ref={tagRef} className="flex flex-col">
          <span className="text-lg md:text-xl text-zinc-900 font-medium leading-5">
            Malaysia Based
          </span>

          <div ref={wrapperRef} className="relative overflow-hidden">
            <span className="block text-sm md:text-base text-zinc-500 font-medium">
              Working globally
            </span>

            <span className="absolute bottom-0 left-0  text-sm md:text-base text-zinc-500 font-medium">
              Working globally
            </span>
          </div>
        </div>

        <div className="hidden lg:flex flex-col">
          <span className="text-lg md:text-xl text-zinc-900 font-medium leading-5">
            Work As
          </span>

          <span className="text-sm md:text-base text-zinc-500 font-medium">
            Doftware Enginner
          </span>
        </div>
      </div>

      <div className="basis-2/5 flex justify-end">
        <Button className="h-12 px-4 md:px-8 text-base bg-zinc-900  text-white rounded-3xl">
          Get in touch
        </Button>
      </div>
    </div>
  );
};

export default Header;
