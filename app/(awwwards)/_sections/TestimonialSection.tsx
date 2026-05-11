"use client";

import React, { useRef } from "react";
import { cn } from "@/utils/cn";
import { cards } from "../_constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const TestimonialSection = () => {
  useGSAP(() => {
    gsap.set(".testimonials-section", {
      marginTop: "-140vh",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top bottom",
        end: "200% top",
        scrub: true,
      },
    });

    tl.to(".testimonials-section .first-title", {
      xPercent: 70,
    })
      .to(
        ".testimonials-section .second-title",
        {
          xPercent: 25,
        },
        "<",
      )
      .to(
        ".testimonials-section .third-title",
        {
          xPercent: -50,
        },
        "<",
      );

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "10% top",
        end: "200%",
        scrub: 1.5,
        pin: true,
        // markers: true,
      },
    });

    pinTl.from(".vd-card", {
      yPercent: 150,
      stagger: 0.2,
      ease: "power1.inOut",
    });
  });

  return (
    <section className="testimonials-section">
      <div className="absolute size-full flex flex-col items-center pt-[5vw]">
        <h1 className="text-black first-title">What's</h1>

        <h1 className="text-light-brown second-title">Everyone</h1>

        <h1 className="text-black third-title">Talking</h1>
      </div>

      <div className="pin-box">
        {cards.map((x, idx) => (
          <Card key={idx} {...x} />
        ))}
      </div>
    </section>
  );
};

interface CardProps {
  src: string;
  img: string;
  name: string;
  rotation: string;
  translation: string;
}

const Card: React.FC<CardProps> = ({
  src,
  img,
  name,
  rotation,
  translation,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => videoRef.current?.play();
  const handleMouseLeave = () => videoRef.current?.pause();

  return (
    <div
      className={cn("vd-card", rotation, translation)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        playsInline
        muted
        loop
        className="size-full object-cover"
      />

      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <img src={img} className="object-cover w-12 h-12" />

        <span className="text-milk text-lg">{name}</span>
      </div>
    </div>
  );
};

export default TestimonialSection;
