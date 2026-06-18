import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/all";

const greetings = ["· hello", "· 你好", "· नमस्ते", "· こんにちは"];

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const splashRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollSmoother.get()?.paused(true);

    const tl = gsap.timeline();

    greetings.forEach((_, i) => {
      tl.to(textRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" })
        .to(textRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
          delay: 0.4,
        })
        .call(() => {
          if (textRef.current)
            textRef.current.textContent = greetings[i + 1] ?? greetings[i];
        });
    });

    tl.to(splashRef.current, {
      opacity: 0,
      duration: 0.6,

      ease: "power2.in",
    })
      .call(() => {
        ScrollSmoother.get()?.paused(false);
        if (splashRef.current) splashRef.current.style.display = "none";
      })
      .call(() => {
        ScrollSmoother.get()?.paused(false);
        if (splashRef.current) splashRef.current.style.display = "none";
        onComplete();
      });
  });

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[9999] bg-neutral-100 flex items-center justify-center"
    >
      <span
        ref={textRef}
        style={{ opacity: 0 }}
        className="text-xl md:text-2xl font-medium tracking-widest text-black"
      >
        {greetings[0]}
      </span>
    </div>
  );
};

export default SplashScreen;
