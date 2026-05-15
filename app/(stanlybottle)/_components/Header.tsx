import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { DELAY_SPLASH_SCREEN } from "../_constants";

import FlowerIcon from "../_assets/icons/flower.svg";

const Header = () => {
  useGSAP(() => {
    gsap.from(".nav-header", {
      yPercent: -200,
      opacity: 0,
      ease: "power1.inOut",
      delay: DELAY_SPLASH_SCREEN,
    });
  });

  return (
    <header
      style={{ mixBlendMode: "difference" }}
      className="nav-header fixed top-0 left-0 flex items-center justify-between w-full px-2 md:px-6 py-4 z-100"
    >
      <span
        style={{ color: "white" }}
        className="text-2xl md:text-3xl font-semibold"
      >
        Stanly Bottle
      </span>

      <FlowerIcon />
    </header>
  );
};

export default Header;
