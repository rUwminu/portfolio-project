"use client";

import React from "react";
import { useMediaQuery } from "react-responsive";

import FooterDipImg from "../_assets/images/footer-dip.png";
import FooterDrinkImg from "../_assets/images/footer-drink.png";

import ArrowIcon from "../_assets/images/arrow.svg";
import YoutubeIcon from "../_assets/images/yt.svg";
import InstragramIcon from "../_assets/images/insta.svg";
import TiktokIcon from "../_assets/images/tiktok.svg";

const FooterSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  return (
    <section className="footer-section">
      <img
        src={FooterDipImg.src}
        alt="footer-dip"
        className="w-full object-cover -translate-y-0"
      />

      <div className="relative 2xl:h-[110vh] pt-[10vh] md:pt-[20vh]">
        <div className="overflow-hidden">
          <h1 className=" general-title text-center text-milk py-5">
            #CHUGRESPONSIBLY
          </h1>
        </div>

        {isMobile ? (
          <img
            src={FooterDrinkImg.src}
            className="absolute top-0 object-contain"
          />
        ) : (
          <video
            src="/awwwards/videos/splash.mp4"
            autoPlay
            playsInline
            muted
            className="absolute top-0 object-contain mix-blend-lighten"
          />
        )}

        <div className="flex-center gap-5 relative z-10 md:mt-20 mt-5">
          <div className="social-btn">
            <YoutubeIcon />
          </div>
          <div className="social-btn">
            <InstragramIcon />
          </div>
          <div className="social-btn">
            <TiktokIcon />
          </div>
        </div>

        <div className="mt-40 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-milk font-paragraph md:text-lg font-medium">
          <div className="flex items-center md:gap-16 gap-5">
            <div>
              <p>SPYLT Flavors</p>
            </div>
            <div>
              <p>Chug Club</p>
              <p>Student Marketing</p>
              <p>Dairy Dealers</p>
            </div>
            <div>
              <p>Company</p>
              <p>Contacts</p>
              <p>Tasty Talk</p>
            </div>
          </div>

          <div className="md:max-w-lg">
            <p>
              Get Exclusive Early Access and Stay Informed About Product
              Updates, Events, and More!
            </p>
            <div className="flex justify-between items-center border-b border-[#D9D9D9] py-5 md:mt-10">
              {/* The input field and arrow icon for newsletter signup. */}{" "}
              {/* A
          border at the bottom for a clean, modern look. */}
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full placeholder:font-sans placeholder:text-[#999999]"
              />
              <ArrowIcon />
            </div>
          </div>
        </div>

        <div className="copyright-box">
          {/* The final row with copyright and legal links. */}
          <p>Copyright © 2025 Spylt - All Rights Reserved</p>
          <div className="flex items-center gap-7">
            <p>Privacy Policy</p>
            <p>Terms of Sеrvice</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
