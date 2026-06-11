"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import HamburgerMenuIcon from "@/assets/icons/HamburgerMenu.svg";

const base = [
  "Creative Engineer",
  "Design Enthusiast",
  "Awwwards Explorer",
  "Next.js Enthusiast",
];

const Navigation = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!menuRef.current) return;
    const items = menuRef.current.querySelectorAll(".menu-item");

    if (isOpen) {
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.2,
        },
      );
    } else {
      gsap.to(items, { opacity: 0, y: 20, duration: 0.2, stagger: 0.04 });
    }
  }, [isOpen]);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    const singleWidth = ticker.children[0].getBoundingClientRect().width;

    gsap.to(ticker, {
      x: -singleWidth,
      duration: 10,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % singleWidth),
      },
    });
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full px-2 py-2 md:py-4">
      <div className="flex flex-col w-full max-w-2xl p-2 mx-auto bg-zinc-900 rounded-2xl">
        <div
          className="grid overflow-hidden transition-all duration-300"
          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        >
          <div ref={menuRef} className="min-h-0 flex flex-col gap-4">
            <div className="menu-item flex items-center gap-4 w-full h-20 md:h-22 shrink-0">
              <div className="flex items-center justify-center h-full aspect-square bg-white rounded-xl shrink-0">
                <span className="text-lg text-zinc-900 font-semibold tracking-tighter">
                  . Ray
                </span>
              </div>

              <div className="flex flex-col w-full min-w-0 ">
                <span className="text-lg text-white">Home</span>
              </div>
            </div>

            <div className="menu-item flex items-center gap-4 w-full h-20 md:h-22 shrink-0">
              <div className="flex items-center justify-center h-full aspect-square bg-white rounded-xl shrink-0">
                <span className="text-lg text-zinc-900 font-semibold tracking-tighter">
                  Work
                </span>
              </div>

              <div className="flex flex-col w-full min-w-0 ">
                <span className="text-lg text-white">Work</span>
              </div>
            </div>

            <div
              className={cn(
                "w-full h-px bg-zinc-600",
                isOpen ? "flex mb-4" : "hidden",
              )}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 w-full h-20 md:h-22">
          <div className="flex items-center justify-center h-full aspect-square bg-white rounded-xl shrink-0">
            <span className="text-lg text-zinc-900 font-semibold tracking-tighter">
              Home
            </span>
          </div>

          <div className="flex flex-col w-full min-w-0 ">
            <span className="text-lg text-white">Ray Goh Chen Yi</span>

            <div className="relative w-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-zinc-900 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-zinc-900 to-transparent z-10 pointer-events-none" />

              <div ref={tickerRef} className=" flex items-center flex-nowrap">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="flex items-center flex-nowrap shrink-0"
                  >
                    {base.map((s, idx) => (
                      <div key={idx} className="flex items-center flex-nowrap">
                        <span className="text-zinc-300 text-nowrap">{s}</span>
                        <div className="w-1.5 h-1.5 mx-2 bg-zinc-300 rounded-full shrink-0" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-center h-full aspect-square shrink-0 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <HamburgerMenuIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
