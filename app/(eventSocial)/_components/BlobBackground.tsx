"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

/** Soft drifting color spots used behind the landing, login and event pages. */
const BlobBackground = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  // useGSAP(
  //   () => {
  //     gsap.to(".blob", {
  //       x: "random(-70, 70)",
  //       y: "random(-50, 50)",
  //       scale: "random(0.85, 1.25)",
  //       duration: "random(5, 8)",
  //       repeat: -1,
  //       yoyo: true,
  //       ease: "sine.inOut",
  //     });
  //   },
  //   { scope: ref }
  // );

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 w-full h-full overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <div className="blob absolute -top-24 -left-24 size-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="blob absolute top-1/3 -right-32 size-112 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="blob absolute -bottom-32 left-1/4 size-96 rounded-full bg-violet-500/10 blur-3xl" />
    </div>
  );
};

export default BlobBackground;
