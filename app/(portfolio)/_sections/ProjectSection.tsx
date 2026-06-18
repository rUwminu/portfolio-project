"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import { usePortfolio } from "../_context/PortfolioContext";

import ProjectCard from "../_components/ProjectCard";

import StandyBottleProjectImg from "../_assets/projects/standy-bottle-site-1.png";
import NineKitchenProjectImg from "../_assets/projects/nine-kitchen-site-1.png";

import ArrowDownIcon from "@/assets/icons/ArrowDown.svg";

const projects = [
  {
    name: "Standy Bottle",
    logo: "SB",
    image: StandyBottleProjectImg.src,
    video: "/portfolio/videos/standy-bottle-site-demo.mp4",
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
    projectUrl: "/portfoli/work/standybottle",
  },
  {
    name: "9 Kitchen",
    logo: "9K",
    image: NineKitchenProjectImg.src,
    video: "/portfolio/videos/nine-kitchen-site-demo.mp4",
    year: "2026",
    tag: "Product",
    tools: ["React.Js", "Next.Js", "UI", "UX", "Tailwind css", "Gsap"],
    projectUrl: "/portfoli/work/ninekitchen",
  },
];

const ProjectSection = () => {
  const route = useRouter();

  const { playTransition } = usePortfolio();

  useGSAP(() => {
    gsap.set(".project-title-1", { yPercent: 100 });
    gsap.set(".project-span-1", { opacity: 0 });

    gsap.to(".project-title-1", {
      yPercent: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".project-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.to(".project-span-1", {
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".project-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.set(".project-card", { scale: 0.5, opacity: 0 });

    gsap.to(".project-card", {
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".project-section",
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });
  });

  return (
    <section className="project-section flex flex-col gap-6 md:gap-10 lg:gap-14 w-full py-14 md:py-20 lg:py-36">
      <div className="flex items-center justify-between overflow-hidden">
        <div className="flex items-end justify-start gap-2">
          <h1 className="project-title-1 text-[clamp(48px,12vw,200px)] font-bold tracking-tight leading-[0.8] uppercase">
            WORK
          </h1>

          <span className="project-span-1 text-[clamp(14px,1.2vw,20px)] font-semibold">
            Top pick
          </span>
        </div>

        <h1 className="project-title-1 text-[clamp(48px,12vw,200px)] font-bold tracking-tight leading-[0.8] uppercase">
          {"'2"}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 w-full">
        {projects.map((x, idx) => (
          <ProjectCard key={idx} {...x} />
        ))}
      </div>

      <div className="flex items-center justify-center w-full">
        <div
          className="group flex items-center gap-2 cursor-pointer"
          onClick={() => playTransition(() => route.push("/portfolio/works"))}
        >
          <span className="text-[clamp(20px,1.5vw,32px)] font-medium">
            See all
          </span>

          <ArrowDownIcon className="w-8 h-8 -rotate-90 text-zinc-900 group-hover:translate-x-4 transition-all duration-100" />
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
