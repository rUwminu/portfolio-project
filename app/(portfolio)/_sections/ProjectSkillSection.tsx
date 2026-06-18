"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { cn } from "@/utils/cn";

import Ps1Img from "../_assets/images/project-skill-1.png";
import Ps2Img from "../_assets/images/project-skill-2.png";
import Ps3Img from "../_assets/images/project-skill-3.png";

const ProjectSkillSection = () => {
  const contents = [
    {
      index: "01",
      title: "Brand Strategy",
      desciption:
        "Helping other uncover their brand’s purpose and uniqueness - and the game plan to deliver it to their customer.",
      image: Ps1Img.src,
    },

    {
      index: "02",
      title: "Digital Design",
      desciption:
        "Create engaging digital experiences through thoughtful design, clear branding, and user-friendly interfaces that prioritize usability.",
      image: Ps2Img.src,
    },

    {
      index: "03",
      title: "Development",
      desciption:
        "Build reliable and scalable web applications with clean code, modern technologies, and seamless user experiences.",
      image: Ps3Img.src,
    },
  ];

  useGSAP(() => {
    const pMsgSplit = SplitText.create(".content-p", {
      type: "words, lines",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".project-skill-section",
        start: "top 70%",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.from(".content-p-tag", {
      yPercent: 100,
      ease: "power3.out",
      duration: 0.8,
    }).from(
      pMsgSplit.words,
      {
        yPercent: 300,
        opacity: 0,
        rotate: 3,
        ease: "power1.inOut",
        duration: 0.8,
        stagger: 0.01,
      },
      "<",
    );
  });

  return (
    <section className="project-skill-section w-full">
      <div className="w-full px-2 md:px-4 pb-2 md:pb-4  bg-zinc-900 rounded-xl">
        <div className="lg:grid lg:grid-cols-12 gap-24 w-full py-20">
          <div className="col-span-12 lg:col-start-3 lg:col-span-10">
            <div className="overflow-hidden">
              <span className="content-p-tag inline-block text-xs lg:text-[clamp(14px,3.3vw,18px)] text-white tracking-wide">
                FOCUS
              </span>
            </div>

            <div className="overflow-hidden">
              <p className="content-p text-[clamp(24px,3.3vw,56px)] text-white tracking-tight leading-[1.05] ">
                Evolving with every brief and build for impact, my process spans
                design, development and brand strategy aligning vision with
                execution to bring clarity and edge to every project.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full px-2 md:px-4 bg-zinc-700 rounded-lg">
          {contents.map((x, idx) => (
            <ContentCard
              key={idx}
              {...x}
              hasBorder={contents.length !== idx + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSkillSection;

interface ContentCardProps {
  index: string;
  title: string;
  desciption: string;
  image: string;
  hasBorder: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({
  index,
  title,
  desciption,
  image,
  hasBorder,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 95%",
          toggleActions: "play reverse play reverse",
        },
      });

      cardTl
        .from(".content-index", {
          yPercent: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          ".content-title",
          {
            yPercent: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".content-desc",
          {
            yPercent: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          ".content-img",
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "power3.out",
          },
          "-=1",
        );

      gsap.fromTo(
        cardRef.current.querySelector(".parallax-img"),
        { yPercent: -35 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: cardRef },
  );

  return (
    <div
      ref={cardRef}
      className={cn(
        `content-card-${index} flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8 w-full py-6 md:py-8`,
        hasBorder ? "border-b border-zinc-300" : "",
      )}
    >
      <span className="content-index lg:col-span-2 text-xs lg:text-[clamp(14px,3.3vw,18px)] text-zinc-300">
        /{index}
      </span>

      <h2 className="content-title lg:col-span-4 text-[clamp(24px,3.3vw,56px)] text-white leading-[1.05]">
        {title}
      </h2>

      <p className="content-desc lg:col-span-3 text-[clamp(14px,1.2vw,20px)] text-white">
        {desciption}
      </p>

      <div className="lg:col-span-3">
        <div
          className="content-img h-[220px] sm:h-[400px] md:h-[450px] lg:h-[clamp(220px,15vw,360px)] rounded-lg overflow-hidden relative bg-zinc-200"
          style={{
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          }}
        >
          <img
            className="parallax-img absolute w-full h-auto left-0 top-0"
            src={image}
            alt="project-skill"
          />
        </div>
      </div>
    </div>
  );
};
