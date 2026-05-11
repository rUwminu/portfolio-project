"use client";

import React, { useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { nutrientLists } from "../_constants/index";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

import SliderDipImg from "../_assets/images/slider-dip.png";
import BigImg from "../_assets/images/big-img.png";

const NutritionSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(() => {
    const titleSplit = SplitText.create(".nutrition-title", {
      type: "chars",
    });
    const pSplite = SplitText.create(".font-p", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".nutrition-section",
        start: "top center",
      },
    });

    contentTl
      .from(titleSplit.chars, {
        yPercent: 130,
        stagger: 0.02,
        ease: "power2.out",
      })
      .from(pSplite.words, {
        yPercent: 300,
        rotate: 3,
        ease: "power1.inOut",
        duration: 1,
        stagger: 0.01,
      });

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".nutrition-section",
        start: "top 60%",
      },
    });

    titleTl.to(".nutrition-text-scroll", {
      duration: 1,
      opacity: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "power1.inOut",
    });
  });

  const list = useMemo(() => {
    if (isMobile) {
      return nutrientLists.slice(0, 3);
    }

    return nutrientLists;
  }, [isMobile]);

  return (
    <section className="nutrition-section">
      <img
        src={SliderDipImg.src}
        alt="slider-dip"
        className="w-full object-cover"
      />

      <img src={BigImg.src} alt="bg-img" className="big-img" />

      <div className="flex flex-col md:flex-row justify-between px-5 md:px-10 mt-10 md:mt-0">
        <div className="relative inline-block md:translate-y-20">
          <div className="general-title relative flex flex-col justify-center items-center gap-24">
            <div className="overflow-hidden place-self-start">
              <h1 className="nutrition-title">It still does</h1>
            </div>

            <div
              className="nutrition-text-scroll place-self-start"
              style={{ clipPath: "polygon(0% 0, 0% 0%, 0% 100%, 0% 100%)" }}
            >
              <div className="bg-yellow-brown pb-6 pt-3 md:pt-0 px-3 md:px-5 inline-block">
                <h2 className="text-milk-yellow">Body Good</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center md:justify-center transalte-y-5">
          <div className="max-w-md md:max-w-xs">
            <p className="font-p text-lg md:text-right text-balance">
              Milk contains a wide array of nutrients, including vitamins,
              minerals, and protein, and this is lactose free
            </p>
          </div>
        </div>

        <div className="nutrition-box">
          <div className="list-wrapper">
            {Array.isArray(list) &&
              list.map((x, idx) => (
                <NutritionCard
                  key={idx}
                  idx={idx}
                  length={list.length}
                  {...x}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface NutritionCardProps {
  idx: number;
  length: number;
  label: string;
  amount: string;
}

const NutritionCard: React.FC<NutritionCardProps> = ({
  idx,
  length,
  label,
  amount,
}) => {
  return (
    <div className="relative flex-1 col-center">
      <div className="">
        <p className="font-p md:text-lg font-semibold">{label}</p>

        <p className="font-p mt-2 text-sm">Up to</p>

        <p className="font-p text-2xl md:text-4xl tracking-tighter font-bold">
          {amount}
        </p>
      </div>

      {idx !== length - 1 ? <div className="spacer-border" /> : null}
    </div>
  );
};

export default NutritionSection;
