"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ThankSection = () => {
  const tickerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
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
  });

  return (
    <section className="flex items-center w-full py-20 md:py-28 overflow-hidden">
      <div ref={tickerRef} className="flex items-center">
        <h1 className="text-[19.25vw] lg:text-[10.475vw] leading-none text-nowrap font-semibold tracking-tighter">
          THANKS YOU, 谢谢你, TERIMA KASIH, धन्यवाद, ありがとう,{" "}
        </h1>

        <h1 className=" text-[19.25vw] lg:text-[10.475vw] leading-none text-nowrap font-semibold tracking-tighter">
          THANKS YOU, 谢谢你, TERIMA KASIH, धन्यवाद, ありがとう,{" "}
        </h1>
      </div>
    </section>
  );
};

export default ThankSection;
