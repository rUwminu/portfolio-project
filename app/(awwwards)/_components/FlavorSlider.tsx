"use client";

import { useMemo, useRef, useEffect } from "react";
import { cn } from "@/utils/cn";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

import { flavorlists } from "../_constants/index";

import FlavorBgRed from "../_assets/images/red-bg.svg";
import FlavorBgBlue from "../_assets/images/blue-bg.svg";
import FlavorBgWhite from "../_assets/images/white-bg.svg";
import FlavorBgBlack from "../_assets/images/black-bg.svg";
import FlavorBgBrown from "../_assets/images/brown-bg.svg";
import FlavorBgOrange from "../_assets/images/orange-bg.svg";

import FlavorDrinkRed from "../_assets/images/red-drink.webp";
import FlavorDrinkBlue from "../_assets/images/blue-drink.webp";
import FlavorDrinkWhite from "../_assets/images/white-drink.webp";
import FlavorDrinkBlack from "../_assets/images/black-drink.webp";
import FlavorDrinkBrown from "../_assets/images/brown-drink.webp";
import FlavorDrinkOrange from "../_assets/images/orange-drink.webp";

import FlavorEleRed from "../_assets/images/red-elements.webp";
import FlavorEleBlue from "../_assets/images/blue-elements.webp";
import FlavorEleWhite from "../_assets/images/white-elements.webp";
import FlavorEleBlack from "../_assets/images/black-elements.webp";
import FlavorEleBrown from "../_assets/images/brown-elements.webp";
import FlavorEleOrange from "../_assets/images/orange-elements.webp";

const FlavorSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const scrollAmount = sliderRef.current
      ? sliderRef.current.scrollWidth - window.innerWidth
      : flavorlists.length * 1400;

    if (!isTablet) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "2% top",
          end: `+=${scrollAmount + 1400}px`,
          scrub: true,
          pin: true,
        },
      });

      tl.to(".flavor-section", {
        x: `-${scrollAmount + 1400}px`,
        ease: "power1.inOut",
      });
    }

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".flavor-section",
        start: "top top",
        end: "bottom 80%",
        scrub: 2,
      },
    });

    titleTl
      .to(".first-text-split", {
        xPercent: -30,
        ease: "power1.inOut",
      })
      .to(
        ".flavor-text-scroll",
        {
          xPercent: -22,
          ease: "power1.inOut",
        },
        "<",
      )
      .to(
        ".second-text-scroll",
        {
          xPercent: -10,
          ease: "power1.inOut",
        },
        "<",
      );
  });

  useEffect(() => {
    const handleResize = () => {
      window.location.reload();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {flavorlists.map((x, idx) => (
          <FlavorCard key={idx} {...x} />
        ))}
      </div>
    </div>
  );
};

interface FlavorCardProps {
  name: string;
  color: string;
  rotation: string;
}

const FlavorCard: React.FC<FlavorCardProps> = ({ name, color, rotation }) => {
  const GetBgSvg = useMemo(() => {
    switch (color) {
      case "red":
        return FlavorBgRed;
      case "blue":
        return FlavorBgBlue;
      case "white":
        return FlavorBgWhite;
      case "black":
        return FlavorBgBlack;
      case "brown":
        return FlavorBgBrown;
      case "orange":
        return FlavorBgOrange;
      default:
        break;
    }
  }, [color]);

  const GetDrinkImg = useMemo(() => {
    switch (color) {
      case "red":
        return FlavorDrinkRed.src;
      case "blue":
        return FlavorDrinkBlue.src;
      case "white":
        return FlavorDrinkWhite.src;
      case "black":
        return FlavorDrinkBlack.src;
      case "brown":
        return FlavorDrinkBrown.src;
      case "orange":
        return FlavorDrinkOrange.src;
      default:
        break;
    }
  }, [color]);

  const GetEleImg = useMemo(() => {
    switch (color) {
      case "red":
        return FlavorEleRed.src;
      case "blue":
        return FlavorEleBlue.src;
      case "white":
        return FlavorEleWhite.src;
      case "black":
        return FlavorEleBlack.src;
      case "brown":
        return FlavorEleBrown.src;
      case "orange":
        return FlavorEleOrange.src;
      default:
        break;
    }
  }, [color]);

  return (
    <div
      className={cn(
        "relative flex-none z-30 w-96 md:w-[90vw] lg:w-[50vw] h-80 md:h-[50vh] lg:h-[70vh]",
        rotation,
      )}
    >
      <GetBgSvg className="absolute bottom-0 " />

      <img src={GetDrinkImg} alt="flavor-ele" className="drinks" />

      <img src={GetEleImg} alt="flavor-ele" className="elements" />

      <h1 className="">{name}</h1>
    </div>
  );
};

export default FlavorSlider;
