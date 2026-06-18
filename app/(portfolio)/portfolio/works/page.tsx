"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import { usePortfolio } from "../../_context/PortfolioContext";

import ProjectCard from "../../_components/ProjectCard";

import StandyBottleProjectImg from "../../_assets/projects/stanly-bottle-site-1.png";
import NineKitchenProjectImg from "../../_assets/projects/nine-kitchen-site-1.png";

const Page = () => {
  const { registerSplashComplete, registerTransitionComplete } = usePortfolio();

  const projects = [
    {
      name: "Stanly Bottle",
      logo: "SB",
      image: StandyBottleProjectImg.src,
      video: "/portfolio/videos/stanly-bottle-site-demo.mp4",
      year: "2026",
      tag: "Product",
      tools: [
        "React.Js",
        "Next.Js",
        "UI",
        "UX",
        "Tailwind css",
        "Gsap",
        "Three.Js",
        "3D Model",
      ],
      projectUrl: "/portfolio/works/stanlybottle",
    },
    {
      name: "9 Kitchen",
      logo: "9K",
      image: NineKitchenProjectImg.src,
      video: "/portfolio/videos/nine-kitchen-site-demo.mp4",
      year: "2026",
      tag: "Product",
      tools: ["React.Js", "Next.Js", "UI", "UX", "Tailwind css", "Gsap"],
      projectUrl: "/portfolio/works/ninekitchen",
    },
  ];

  useGSAP(() => {
    gsap.set(".project-title-1", { yPercent: 100 });
    gsap.set(".project-span-1", { opacity: 0 });
    gsap.set(".project-card", { scale: 0.5, opacity: 0 });

    const unregisterSplash = registerSplashComplete(() => {
      gsap.to(".project-title-1", {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(".project-span-1", {
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(".project-card", {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
      });
    });
    const unregisterTransition = registerTransitionComplete(() => {
      gsap.to(".project-title-1", {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(".project-span-1", {
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(".project-card", {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
      });
    });

    return () => {
      unregisterSplash();
      unregisterTransition();
    };
  });

  return (
    <section className="flex flex-col gap-6 md:gap-10 lg:gap-14 w-full h-full py-20 md:py-24">
      <div className="flex flex-col justify-start gap-2">
        <span className="project-span-1 text-[clamp(14px,1.2vw,20px)] font-semibold">
          {"[Current Available]"}
        </span>

        <div className="overflow-hidden">
          <h1 className="project-title-1 -ml-[0.04em] text-[clamp(48px,12vw,200px)] font-bold tracking-tight leading-[0.8] uppercase">
            MY WORK
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 w-full">
        {projects.map((x, idx) => (
          <ProjectCard key={idx} {...x} />
        ))}
      </div>
    </section>
  );
};

export default Page;
