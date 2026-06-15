"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePortfolio } from "../_context/PortfolioContext";

import ArrowDownIcon from "@/assets/icons/ArrowDown.svg";

const words = ["SOFTWARE", "FRONTEND", "BACKEND", "FULLSTACK"];

const HeroSection = () => {
  const { registerSplashComplete } = usePortfolio();

  useGSAP(() => {
    gsap.set(".flip-word", { yPercent: 100 });
    gsap.set(".flip-word:first-child", { yPercent: 0 });
    gsap.set(".banner-tag-inner", { yPercent: -100 });
    gsap.set(".banner-title-inner", { yPercent: 100 });
    gsap.set(".indicator-container", { yPercent: 150 });

    registerSplashComplete(() => {
      // Tag slides down
      gsap.to(".banner-tag-inner", {
        yPercent: 0,
        duration: 0.7,
        ease: "power2.out",
      });

      // Title slides up, slightly delayed
      gsap.to(".banner-title-inner", {
        yPercent: 0,
        duration: 0.7,
        delay: 0.1,
        ease: "power2.out",
        onComplete: () => {
          // Start flip loop after title lands
          let current = 0;

          const flip = () => {
            const next = (current + 1) % words.length;
            gsap.to(`.flip-word:nth-child(${current + 1})`, {
              yPercent: -100,
              duration: 0.6,
              ease: "power2.inOut",
            });
            gsap.fromTo(
              `.flip-word:nth-child(${next + 1})`,
              { yPercent: 100 },
              { yPercent: 0, duration: 0.6, ease: "power2.inOut" },
            );
            current = next;
          };

          gsap.delayedCall(2, () => {
            flip();
            setInterval(flip, 2500);
          });
        },
      });

      gsap.to(".indicator-container", {
        yPercent: 0,
        duration: 0.7,
        ease: "power2.out",
      });
    });
  });

  return (
    <section className="relative w-full h-dvh">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="banner-tag flex items-center justify-between w-full overflow-hidden">
          <div className="banner-tag-inner flex items-center justify-between w-full">
            <span className="text-[clamp(14px,1.2vw,20px)] font-semibold">
              A
            </span>
            <span className="text-[clamp(14px,1.2vw,20px)] font-semibold">
              SERIOUSLY
            </span>
            <span className="text-[clamp(14px,1.2vw,20px)] font-semibold">
              GOOD
            </span>
          </div>
        </div>

        <div className="banner-title flex flex-col lg:flex-row flex-nowrap items-center lg:items-start justify-center lg:justify-between w-full overflow-hidden">
          <div className="banner-title-inner flex flex-col lg:flex-row flex-nowrap items-center lg:items-start justify-center lg:justify-between w-full">
            <div className="overflow-hidden w-full">
              <div className="relative w-full h-[18vw] lg:h-[10.125vw]">
                {words.map((word) => (
                  <h1
                    key={word}
                    className="flip-word absolute w-full -ml-[0.05em] lg:-ml-[0.06em] text-[19.25vw] lg:text-[10.475vw] text-center lg:text-left leading-none font-semibold tracking-tighter"
                  >
                    {word}
                  </h1>
                ))}
              </div>
            </div>

            <h1 className="text-[19.25vw] lg:text-[10.475vw] leading-none font-semibold tracking-tighter">
              ENGINEER
            </h1>
          </div>
        </div>
      </div>

      <div className="indicator-container absolute bottom-28 lg:bottom-4 left-0 flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <ArrowDownIcon className="w-4 md:w-5 aspect-square text-zinc-900" />

          <span className="text-lg md:text-xl font-medium">Scroll for</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg md:text-xl font-medium">More</span>

          <ArrowDownIcon className="w-4 md:w-5 aspect-square text-zinc-900" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
