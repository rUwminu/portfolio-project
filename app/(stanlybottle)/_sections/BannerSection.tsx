import React from "react";
import { cn } from "@/utils/cn";

import BottleImg from "../_assets/images/black-bottle.png";
import GlobalSvg from "../_assets/images/global.svg";

const commonStyle = {
  boxShadow: "0px 0px 26px -8px rgba(0,0,0,0.2)",
};

const commonCardClass =
  "flex items-center w-full h-44 xl:h-56 2xl:h-76 px-2 md:px-4";

const BannerSection = () => {
  return (
    <section className=" w-full px-4 sm:px-2 md:px-8 lg:px-12">
      <div
        className="banner-grid w-full"
        style={{
          display: "grid",
          gap: "1rem",
        }}
      >
        <CardOne />

        <CardTwo />

        <CardThree />

        <CardFour />

        <CardFive />

        <CardSix />

        <CardSeven />
      </div>
    </section>
  );
};

export default BannerSection;

const CardOne = () => {
  return (
    <div
      className={cn(
        commonCardClass,
        "items-start h-44 sm:h-full md:h-full lg:h-full xl:h-full 2xl:h-full py-2 md:py-4",
      )}
      style={{ gridArea: "one", ...commonStyle }}
    >
      <h2 className="text-3xl xl:text-4xl font-medium tracking-tight">
        your bottle generate signals with every sip
      </h2>
    </div>
  );
};

const CardTwo = () => {
  return (
    <div
      className={cn(commonCardClass, "")}
      style={{ gridArea: "two", ...commonStyle }}
    >
      <div className="flex flex-col">
        <h1 className=" text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight ">
          2.12x
        </h1>

        <span className="font-medium text-[14px] ">
          health quality improvement for 48% of user at <br /> more than 95% of
          certainty with first 2 month
        </span>
      </div>
    </div>
  );
};

const CardThree = () => {
  return (
    <div
      className={cn(commonCardClass, "col-span-2 justify-between")}
      style={{ gridArea: "three", ...commonStyle }}
    >
      <img
        className="h-full aspect-square object-cover"
        src={BottleImg.src}
        alt="bottle-list"
      />

      <div className="flex flex-col gap-2 md:gap-3">
        <h1 className=" text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight leading-24">
          12
        </h1>

        <span className="font-medium">excellent crafted designs available</span>
      </div>
    </div>
  );
};

const CardFour = () => {
  return (
    <div
      className={cn(commonCardClass, "")}
      style={{ gridArea: "four", ...commonStyle }}
    >
      <h2 className="text-4xl xl:text-5xl text-center font-medium tracking-tight">
        we understand the impact of our bottle brings
      </h2>
    </div>
  );
};

const CardFive = () => {
  return (
    <div
      className={cn(
        commonCardClass,
        "flex-col items-start py-2 md:py-4 h-44 md:h-full lg:h-full xl:h-full 2xl:h-full",
      )}
      style={{ gridArea: "five", ...commonStyle }}
    >
      <h1 className=" text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight ">
        1.45m
      </h1>

      <span className="font-medium text-[14px] ">
        data points generated in 2022 by our pioneers to validate sofi
        end-to-end
      </span>
    </div>
  );
};

const CardSix = () => {
  return (
    <div
      className={cn(commonCardClass, "relative justify-center overflow-hidden")}
      style={{ gridArea: "six", ...commonStyle }}
    >
      <div className="flex flex-col gap-3 items-center justify-center z-1">
        <h1 className=" text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight ">
          1,000 years
        </h1>

        <span className="font-medium text-[14px] text-center">
          of collective experience in multiple fields
        </span>
      </div>

      <div className="absolute top-0 left-0 w-full h-full text-5xl text-nowrap font-medium text-zinc-100">
        <p>clinicians • scientists • physicians • coders • mathematicians</p>
        <p>lab technicians • biochemists • qualified persons • designers</p>
        <p>ethnobotanists • herbalists • nutritionists • medical doctors</p>
        <p>professors of medicine • product designers • psychologists</p>
        <p>clinicians • scientists • physicians • coders • mathematicians</p>
        <p>lab technicians • qualified persons • designers • biochemists</p>
      </div>
    </div>
  );
};

const CardSeven = () => {
  return (
    <div
      className={cn(
        commonCardClass,
        "relative flex-col items-start justify-between py-2 md:py-4 overflow-hidden",
      )}
      style={{ gridArea: "seven", ...commonStyle }}
    >
      <h1 className="text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight z-1">
        1.1k
      </h1>

      <span className="font-medium text-[14px] z-1 as">
        pioneers have received & tested bottle
      </span>

      <GlobalSvg className="absolute top-0 left-0 w-full" />
    </div>
  );
};
