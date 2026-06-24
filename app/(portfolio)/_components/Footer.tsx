import Link from "next/link";
import React from "react";

import LinkedinIcon from "../_assets/icons/linkedIn.svg";
import GithubIcon from "../_assets/icons/github,.svg";
import GmailIcon from "../_assets/icons/google.svg";
import WhatappIcon from "../_assets/icons/whatsApp.svg";

const Footer = () => {
  return (
    <section className="flex flex-col lg:flex-row lg:items-center gap-4 w-full pt-6 pb-30 md:pb-36 md:pt-8 px-0 md:px-8">
      <div className="flex items-center gap-4">
        <span className="text-lg md:text-[clamp(26px,3.3vw,46px)] font-medium tracking-tight">
          Get in touch:
        </span>

        <Link
          href={"https://www.linkedin.com/in/ray-goh-chen-yi-76392b218/"}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0  flex items-center justify-center w-[clamp(56px,3.5vw,104px)] aspect-square p-3 md:p-[1vw] bg-white rounded-full"
          style={{
            boxShadow: "0px 0px 20px -10px #000000",
          }}
        >
          <LinkedinIcon className="w-full h-full" />
        </Link>

        <Link
          href={"https://github.com/rUwminu"}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0  flex items-center justify-center w-[clamp(56px,3.5vw,104px)] aspect-square p-3 md:p-[1vw] bg-white rounded-full"
          style={{
            boxShadow: "0px 0px 20px -10px #000000",
          }}
        >
          <GithubIcon className="w-full h-full" />
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <a href="mailto:your@email.com">
          <div className="flex items-center gap-4 cursor-pointer">
            <div
              className="shrink-0 flex items-center justify-center w-[clamp(56px,3.5vw,104px)] aspect-square p-3 md:p-[1vw] bg-white rounded-full"
              style={{
                boxShadow: "0px 0px 20px -10px #000000",
              }}
            >
              <GmailIcon className="w-full h-full" />
            </div>

            <span className="text-base md:text-[clamp(20px,2.4vw,28px)] font-medium tracking-tight">
              rayigo98@gmail.com
            </span>
          </div>
        </a>

        <div className="flex items-center gap-4">
          <div
            className="shrink-0 flex items-center justify-center w-[clamp(56px,3.5vw,104px)] aspect-square p-3 md:p-[1vw] bg-white rounded-full"
            style={{
              boxShadow: "0px 0px 20px -10px #000000",
            }}
          >
            <WhatappIcon className="w-full h-full" />
          </div>

          <span className="text-base md:text-[clamp(20px,2.4vw,28px)] font-medium tracking-tight">
            +60 11-1072 5655
          </span>
        </div>
      </div>
    </section>
  );
};

export default Footer;
