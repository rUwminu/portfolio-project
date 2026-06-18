"use client";

import React from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { usePortfolio } from "../_context/PortfolioContext";

import ArrowUpRightIcon from "@/assets/icons/ArrowUpRight.svg";

interface ProjectPreviewPageProps {
  name: string;
  year: string;
  tools: string[];
  summary: string;
  siteUrl: string;
  imageOne: string;
  imageTwo: string;
  imageThree: string;
  video: string;
}

const ProjectPreviewPage: React.FC<ProjectPreviewPageProps> = ({
  name,
  year,
  tools,
  summary,
  siteUrl,
  imageOne,
  imageTwo,
  imageThree,
  video,
}) => {
  const { registerSplashComplete, registerTransitionComplete } = usePortfolio();

  useGSAP(() => {
    gsap.set(".preview-title-1", { yPercent: 100 });
    gsap.set(".info-label", { yPercent: 100 });
    gsap.set(".info-value", { yPercent: 100 });
    gsap.set(".tool-tag", { yPercent: 100 });
    gsap.set(".preview-img-1", { yPercent: 20, opacity: 0 });

    const summarySplit = SplitText.create(".summary-p", {
      type: "words, lines",
    });

    const unregisterSplash = registerSplashComplete(() => {
      gsap.to(".preview-title-1", {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(".info-label", {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(".info-value", {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(".tool-tag", {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "power3.out",
      });

      gsap.from(summarySplit.words, {
        yPercent: 300,
        opacity: 0,
        rotate: 3,
        ease: "power1.inOut",
        duration: 0.8,
        stagger: 0.01,
      });

      gsap.to(".preview-img-1", {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });
    });
    const unregisterTransition = registerTransitionComplete(() => {
      gsap.to(".preview-title-1", {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(".info-label", {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(".info-value", {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(".tool-tag", {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "power3.out",
      });

      gsap.from(summarySplit.words, {
        yPercent: 300,
        opacity: 0,
        rotate: 3,
        ease: "power1.inOut",
        duration: 0.8,
        stagger: 0.01,
      });

      gsap.to(".preview-img-1", {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => {
      unregisterSplash();
      unregisterTransition();
    };
  });

  return (
    <div className="w-full pt-36">
      <div className="flex flex-col w-full p-2 md:p-4 bg-zinc-900 rounded-2xl">
        <div className="relative flex items-center justify-center w-full py-20 md:py-20 lg:py-24 ">
          <div className="overflow-hidden">
            <h1 className="preview-title-1 text-[clamp(32px,8vw,160px)] text-neutral-100 font-bold tracking-tight leading-[0.8] uppercase">
              {name}
            </h1>
          </div>

          <Link
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-0 right-0 flex items-center px-[clamp(6px,1.2vw,18px)] bg-zinc-600 rounded-4xl cursor-pointer"
          >
            <span className="text-[clamp(14px,1.2vw,20px)] text-neutral-100">
              Visit
            </span>

            <ArrowUpRightIcon className="w-[clamp(14px,1.2vw,20px)] aspect-square text-neutral-100" />
          </Link>
        </div>

        <div className="flex flex-col gap-6 w-full p-3 md:p-5 bg-zinc-800 rounded-xl">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12">
            <div className="flex flex-col gap-2 col-span-3">
              <div className="overflow-hidden">
                <span className="info-label block text-[clamp(14px,1.2vw,20px)] text-zinc-300">
                  YEAR
                </span>
              </div>

              <div className=" overflow-hidden">
                <h2 className="info-value text-[clamp(48px,3.5vw,96px)] text-neutral-100 font-medium tracking-tight leading-[0.8]">
                  {year}
                </h2>
              </div>
            </div>

            <div className="flex flex-col gap-2 col-span-4">
              <div className="overflow-hidden">
                <span className="info-label block text-[clamp(14px,1.2vw,20px)] text-zinc-300">
                  SERVICES
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full">
                {tools.map((t, idx) => (
                  <div key={idx} className="overflow-hidden">
                    <div className="tool-tag w-fit px-2 bg-zinc-700 rounded-lg">
                      <span className="text-[clamp(14px,1.2vw,20px)] text-neutral-100 text-nowrap">
                        {t}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block col-span-1" />

            <div className="flex flex-col gap-2 col-span-4">
              <div className="overflow-hidden">
                <span className="info-label block text-[clamp(14px,1.2vw,20px)] text-zinc-300">
                  SUMMARY
                </span>
              </div>

              <div className="overflow-hidden">
                <p className="summary-p text-[clamp(14px,1.2vw,20px)] text-neutral-100 leading-[1.3]">
                  {summary}
                </p>
              </div>
            </div>
          </div>

          <div className="preview-img-1 group relative w-full mt-8 aspect-video bg-zinc-900 rounded-lg overflow-hidden">
            <img
              src={imageOne}
              className="w-full h-full object-cover"
              alt="project-img-1"
            />

            <div className="absolute inset-0 bg-zinc-900/30 backdrop-blur-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>

            <video
              src={video}
              className="absolute top-1/2 -translate-y-1/12 left-1/2 -translate-x-1/2 w-[clamp(300px,85%,1200px)] h-auto rounded-lg object-cover z-20 [clip-path:polygon(30%_50%,70%_50%,70%_50%,30%_50%)] group-hover:[clip-path:polygon(0_100%,100%_100%,100%_0,0_0)] group-hover:-translate-y-6/12 transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]"
              playsInline
              autoPlay
              muted
              loop
            ></video>
          </div>

          <div className="w-full aspect-video bg-zinc-900 rounded-lg overflow-hidden">
            <img
              src={imageTwo}
              className="w-full h-full object-cover"
              alt="project-img-1"
            />
          </div>

          <div className="w-full aspect-video bg-zinc-900 rounded-lg overflow-hidden">
            <img
              src={imageThree}
              className="w-full h-full object-cover"
              alt="project-img-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreviewPage;
