"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/utils/cn";

import JobOneImage from "../_assets/images/chiga-site.png";
import JobTwoImage from "../_assets/images/peoplex-site.png";
import JobThreeImage from "../_assets/images/adams-site.png";

const JournalSection = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".journal-section",
        start: "top 50%",
        end: "bottom 50%",
        scrub: true,
      },
    });

    tl.to(".exp-1 .grow-line", {
      height: "calc(100% + 1.5rem)",
      ease: "none",
    })
      .to(".exp-2 .grow-line", { height: "calc(100% + 1.5rem)", ease: "none" })
      .to(".exp-3 .grow-line", { height: "calc(100% + 1.5rem)", ease: "none" });
  });

  return (
    <section className="journal-section flex flex-col items-center w-full">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium">
        MY JOURNAL
      </h1>

      <ExperienceCard
        image={JobOneImage.src}
        jobTitle={"IT Support & Developer"}
        jobCompany={"Chiga Light"}
        year={"2021"}
        fromDate={"2021 Mar"}
        toDate={"2022 Feb"}
        jobBadge={"Support & Window App"}
        warpperName={"exp-1"}
        isReverse={false}
      />

      <ExperienceCard
        image={JobTwoImage.src}
        jobTitle={"Junior Software Engineer"}
        jobCompany={"Syntrino Solution (Adams.AI)"}
        year={"2022"}
        fromDate={"2022 May"}
        toDate={"2023 Dec"}
        jobBadge={"PeopleX CRM Saas"}
        warpperName={"exp-2"}
        isReverse={true}
      />

      <ExperienceCard
        image={JobThreeImage.src}
        jobTitle={"Senior Software Engineer"}
        jobCompany={"Adams.AI"}
        year={"2024"}
        fromDate={"2024 Jan"}
        toDate={"2026 Mar"}
        jobBadge={"Adams CRM Saas & Mobile"}
        warpperName={"exp-3"}
        isReverse={false}
      />
    </section>
  );
};

export default JournalSection;

interface ExperienceCardProps {
  image: string;
  jobTitle: string;
  jobCompany: string;
  year: string;
  fromDate: string;
  toDate: string;
  jobBadge: string;
  warpperName: string;
  isReverse: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  image,
  jobTitle,
  jobCompany,
  year,
  fromDate,
  toDate,
  jobBadge,
  warpperName,
  isReverse,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;

      gsap.fromTo(
        cardRef.current.querySelector(".parallax-img"),
        { yPercent: -10 },
        {
          yPercent: 15,
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
      className={`${warpperName} relative flex items-stretch gap-4 w-full my-6`}
    >
      <div className=" md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center gap-6 md:h-full">
        <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-zinc-900 text-white rounded-md shrink-0 ">
          {year}
        </div>

        <div className="relative h-full">
          <div className="w-1 h-[calc(100%+1.5rem)] bg-zinc-300 rounded-md" />

          <div className="grow-line absolute top-0 left-0 w-1 bg-zinc-900 rounded-md" />
        </div>
      </div>

      <div
        className={cn(
          "flex flex-col md:flex-row md:items-center justify-start md:justify-center gap-4 md:gap-20 w-full mt-0 md:mt-22",
          isReverse ? "md:flex-row-reverse" : "",
        )}
      >
        <div className="flex-1 w-full aspect-video bg-zinc-600 rounded-xl overflow-hidden">
          <img
            src={image}
            className="parallax-img w-full h-full object-fill scale-110"
            alt="company-img"
          />
        </div>

        <div
          className={cn("flex-1 flex flex-col", isReverse ? "items-end" : "")}
        >
          <h2 className="text-2xl md:text-3xl mb-2 font-medium">{jobTitle}</h2>

          <span className="md:text-lg">at {jobCompany}</span>

          <span className="text-sm md:text-base">
            {fromDate} - {toDate}
          </span>

          <div className="flex items-center gap-2 w-fit h-8 pl-3 pr-5 mt-3 bg-zinc-900 rounded-3xl">
            <div className="w-3 h-3 bg-white rounded-full" />

            <span className="text-base text-white">{jobBadge}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
