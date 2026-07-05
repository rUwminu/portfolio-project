"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const WORDS: { text: string; accent?: boolean }[] = [
  { text: "Hosting" },
  { text: "should" },
  { text: "feel" },
  { text: "like" },
  { text: "the" },
  { text: "party" },
  { text: "—" },
  { text: "not" },
  { text: "the" },
  { text: "planning." },
  { text: "So" },
  { text: "we" },
  { text: "made" },
  { text: "events" },
  { text: "you" },
  { text: "can" },
  { text: "create,", accent: true },
  { text: "invite,", accent: true },
  { text: "and", accent: true },
  { text: "join", accent: true },
  { text: "in" },
  { text: "seconds." },
];

const BuzzSentence = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(".bw, .bwa");
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(".bw", { color: "#09090b" });
        gsap.set(".bwa", { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          end: "center 38%",
          scrub: 0.5,
        },
      });
      words.forEach((el, i) => {
        tl.to(
          el,
          el.classList.contains("bwa")
            ? { opacity: 1, duration: 1 }
            : { color: "#09090b", duration: 1 },
          i * 0.55,
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-white px-6 py-[26vh]">
      <h2 className="mx-auto max-w-260 text-[clamp(38px,5.2vw,72px)] leading-[1.12] font-bold tracking-[-0.035em] text-pretty">
        {WORDS.map((word, i) => (
          <span
            key={`${word.text}-${i}`}
            className={cn(
              word.accent
                ? "bwa bg-linear-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent opacity-22"
                : "bw text-zinc-300",
              "mr-[0.28em] inline-block",
            )}
          >
            {word.text}
          </span>
        ))}
      </h2>
    </section>
  );
};

export default BuzzSentence;
