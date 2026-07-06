"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePortfolio } from "../_context/PortfolioContext";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  name: string;
  logo: string;
  image: string;
  video: string;
  year: string;
  tag: string;
  tools: string[];
  projectUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  logo,
  image,
  video,
  year,
  tag,
  tools,
  projectUrl,
}) => {
  const router = useRouter();
  const tickerRef = useRef<HTMLDivElement>(null);

  const { playTransition } = usePortfolio();

  const handleOnClick = () => {
    playTransition(() => {
      router.push(projectUrl);
    });
  };

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
    <div className="group w-full " onClick={handleOnClick}>
      <div className="project-card flex flex-col p-3 lg:p-4 bg-zinc-900 rounded-xl cursor-pointer overflow-hidden">
        <div className="relative rounded-lg overflow-hidden w-full h-[260px] md:h-[350px] lg:h-[clamp(500px,32vw,800px)] bg-zinc-600">
          <img
            src={image}
            className="w-full h-full object-cover group-hover:scale-105 duration-500 ease-in-out"
            alt="porject-img"
          />

          <div className="absolute inset-0 bg-zinc-900/30 backdrop-blur-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>

          <video
            src={video}
            className="absolute top-1/2 -translate-y-1/12 left-1/2 -translate-x-1/2 w-[clamp(300px,65%,600px)] h-auto rounded-lg object-cover z-20 [clip-path:polygon(30%_50%,70%_50%,70%_50%,30%_50%)] group-hover:[clip-path:polygon(0_100%,100%_100%,100%_0,0_0)] group-hover:-translate-y-6/12 transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]"
            playsInline
            autoPlay
            muted
            loop
          ></video>
        </div>

        <div className="flex items-center justify-between px-2 lg:px-4 py-4">
          <div className="flex items-center gap-2 lg:gap-4 ">
            <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white">
              <span className="text-lg lg:text-xl font-semibold text-zinc-900 uppercase">
                {logo}
              </span>
            </div>

            <span className="text-lg lg:text-xl text-white font-medium uppercase">
              {name}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-lg lg:text-xl text-zinc-400 uppercase">
              {tag}
            </span>

            <span className="text-lg lg:text-xl text-zinc-400 uppercase">
              {year}
            </span>
          </div>
        </div>

        <div className="w-full px-2 lg:px-4">
          <div className="relative w-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-zinc-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-zinc-900 to-transparent z-10 pointer-events-none" />

            <div ref={tickerRef} className=" flex items-center flex-nowrap">
              {[0, 1].map((i) => (
                <div key={i} className="flex items-center flex-nowrap shrink-0">
                  {[...tools, ...tools].map((s, idx) => (
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
      </div>
    </div>
  );
};

export default ProjectCard;
