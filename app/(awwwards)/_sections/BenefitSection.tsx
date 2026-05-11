"use client";

import React from "react";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

import PlaySvg from "../_assets/images/play.svg";
import CircleTextSvg from "../_assets/images/circle-text.svg";

const BenefitSection = () => {
  useGSAP(() => {
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top 60%",
        end: "top top",
        scrub: 1.5,
      },
    });

    revealTl.to(".benefit-section .first-title", {
      duration: 1,
      opacity: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "circ.out",
    });

    revealTl.to(".benefit-section .second-title", {
      duration: 1,
      opacity: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "circ.out",
    });

    revealTl.to(".benefit-section .third-title", {
      duration: 1,
      opacity: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "circ.out",
    });

    revealTl.to(".benefit-section .fourth-title", {
      duration: 1,
      opacity: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "circ.out",
    });
  });

  return (
    <section className="benefit-section">
      <div className="container mx-auto pt-20">
        <div className="col-center">
          <p className="">
            Unlock the Advantages: <br />
            Explore the Key Benefits of Choosing SPYLT
          </p>

          <div className="mt-20 col-center ">
            <ClipPathTitle
              title={"Shelf stable"}
              color={"#faeade"}
              bg={"#c88e64"}
              className={"first-title"}
              borderColor={"#222123"}
            />

            <ClipPathTitle
              title={"Protein + Caffeine"}
              color={"#222123"}
              bg={"#faeade"}
              className={"second-title"}
              borderColor={"#222123"}
            />

            <ClipPathTitle
              title={"Infinitely recyclable"}
              color={"#faeade"}
              bg={"#7F3B2D"}
              className={"third-title"}
              borderColor={"#222123"}
            />

            <ClipPathTitle
              title={"Lactose free"}
              color={"#2E2D2F"}
              bg={"#FED775"}
              className={"fourth-title"}
              borderColor={"#222123"}
            />
          </div>

          <div className="mt-10 md:mt-0">
            <p>And much more ...</p>
          </div>
        </div>
      </div>

      <div className="relative overlay-box">
        <VideoPinSection />
      </div>
    </section>
  );
};

interface ClipPathTitleProps {
  title: string;
  color: string;
  bg: string;
  className: string;
  borderColor: string;
}

const ClipPathTitle: React.FC<ClipPathTitleProps> = ({
  title,
  color,
  bg,
  className,
  borderColor,
}) => {
  return (
    <div className="general-title">
      <div
        className={cn("border-[.5vw] text-nowrap opacity-0", className)}
        style={{
          clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          borderColor: borderColor,
        }}
      >
        <div
          className="pb-5 px-3 md:px-14 pt-3 md:pt-0"
          style={{
            backgroundColor: bg,
          }}
        >
          <h2
            style={{
              color: color,
            }}
          >
            {title}
          </h2>
        </div>
      </div>
    </div>
  );
};

const VideoPinSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(() => {
    if (!isMobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".vd-pin-section",
          start: "-15% top",
          end: "200% top",
          scrub: 1.5,
          pin: true,
        },
      });

      tl.to(".video-box", {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power1.inOut",
      });
    }
  });

  return (
    <section className="vd-pin-section">
      <div
        className="size-full video-box"
        style={{
          clipPath: isMobile
            ? "circle(100% at 50% 50%)"
            : "circle(6% at 50% 50%)",
        }}
      >
        <video
          src="/awwwards/videos/pin-video.mp4"
          playsInline
          autoPlay
          muted
          loop
        />

        <div className="abs-center scale-200 md:scale-100">
          <CircleTextSvg className="size-[15vw] spin-circle" />

          <div className="play-btn">
            <PlaySvg className="size-[3vw] ml-[.5vw]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;
