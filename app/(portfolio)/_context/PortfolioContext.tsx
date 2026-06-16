"use client";

import { createContext, useContext, useRef } from "react";
import gsap from "gsap";

import SplashScreen from "../_components/SplashScreen";

interface PortfolioContextType {
  playTransition: () => void;
  registerSplashComplete: (fn: () => void) => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx)
    throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
};

export const PortfolioProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const onSplashComplete = useRef<Array<() => void>>([]);

  const registerSplashComplete = (fn: () => void) => {
    onSplashComplete.current.push(fn);
  };

  const playTransition = () => {
    const el = overlayRef.current;
    if (!el) return;

    gsap.killTweensOf(el);
    gsap
      .timeline()
      .set(el, { pointerEvents: "auto" })
      .to(el, { opacity: 1, duration: 0.4, ease: "power2.out" })
      .to(el, { opacity: 0, duration: 0.4, ease: "power2.in", delay: 1.5 })
      .set(el, { pointerEvents: "none" });
  };

  return (
    <PortfolioContext.Provider
      value={{ playTransition, registerSplashComplete }}
    >
      {/* <SplashScreen
        onComplete={() => onSplashComplete.current.forEach((fn) => fn())}
      /> */}

      <TransitionOverlay overlayRef={overlayRef} />
      {children}
    </PortfolioContext.Provider>
  );
};

const TransitionOverlay = ({
  overlayRef,
}: {
  overlayRef: React.RefObject<HTMLDivElement>;
}) => (
  <div
    ref={overlayRef}
    style={{ opacity: 0, pointerEvents: "none" }}
    className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
  >
    <span className="text-xl md:text-2xl font-medium tracking-widest text-black">
      / Redirecting . . .
    </span>
  </div>
);
