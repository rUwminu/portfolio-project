"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MessageSection = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".message-section",
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(".message-seperator", {
      width: "100%",
      duration: 0.8,
      ease: "power1.inOut",
    })
      .from(
        ".slide-title",
        {
          yPercent: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power1.out",
        },
        "<",
      )
      .from(
        ".slide-message",
        {
          yPercent: 50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power1.out",
        },
        "<",
      );
  });

  return (
    <section className="message-section relative flex items-start w-full pt-40 pb-40 md:pb-72 overflow-hidden">
      <div className="flex flex-col gap-5 w-full pt-40 px-8 md:px-20 lg:px-40 mx-auto">
        <div className="message-seperator w-0 h-[1px] bg-black" />

        <div className="flex justify-between w-full">
          <span className="slide-title  font-medium">standy bottle //</span>

          <div className="flex flex-col gap-3">
            <p className="slide-message font-medium ">
              Stay on top of your daily hydration with a smart water bottle{" "}
              <br />
              designed to understand your drinking habits. The bottle <br />
              automatically tracks your water intake throughout the day, helping{" "}
              <br />
              you build healthier routines with clear and effortless monitoring.{" "}
              <br />
            </p>

            <p className="slide-message font-medium ">
              Beyond simple tracking, the bottle also records how frequently you{" "}
              <br />
              refill and how much water is added each time. These insights help{" "}
              <br />
              users better understand their hydration patterns, making it easier{" "}
              <br />
              to stay consistent whether at work, the gym, or during daily{" "}
              <br />
              activities.
            </p>

            <p className="slide-message font-medium ">
              Crafted with premium food-grade materials, the bottle is built for{" "}
              <br />
              both durability and everyday comfort. We use high-quality BPA-free{" "}
              <br />
              Tritan™ plastic, known for its crystal-clear finish, lightweight{" "}
              <br />
              feel, and long-lasting performance, ensuring a safe and reliable{" "}
              <br />
              hydration experience every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
