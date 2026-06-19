"use client";

import { createContext, useContext, useRef } from "react";
import gsap from "gsap";

import SplashScreen from "../_components/SplashScreen";

interface PortfolioContextType {
  playTransition: (fn: () => void) => void;
  registerSplashComplete: (fn: () => void) => () => void;
  registerTransitionComplete: (fn: () => void) => () => void;
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

  const onTransitionComplete = useRef<Array<() => void>>([]);

  const registerSplashComplete = (fn: () => void) => {
    onSplashComplete.current.push(fn);
    return () => {
      onSplashComplete.current = onSplashComplete.current.filter(
        (f) => f !== fn,
      );
    };
  };

  const registerTransitionComplete = (fn: () => void) => {
    onTransitionComplete.current.push(fn);
    return () => {
      onTransitionComplete.current = onTransitionComplete.current.filter(
        (f) => f !== fn,
      );
    };
  };

  const playTransition = (onCovered?: () => void) => {
    const el = overlayRef.current;
    if (!el) return;

    gsap.killTweensOf(el);
    gsap
      .timeline()
      .set(el, { pointerEvents: "auto" })
      .to(el, { opacity: 1, duration: 0.4, ease: "power2.out" })
      .call(() => onCovered?.())
      .to(el, { opacity: 0, duration: 0.4, ease: "power2.in", delay: 1.5 })
      .set(el, { pointerEvents: "none" })
      .call(() => {
        onTransitionComplete.current.forEach((fn) => fn());
      });
  };

  return (
    <PortfolioContext.Provider
      value={{
        playTransition,
        registerSplashComplete,
        registerTransitionComplete,
      }}
    >
      <SplashScreen
        onComplete={() => onSplashComplete.current.forEach((fn) => fn())}
      />

      <TransitionOverlay overlayRef={overlayRef} />

      {children}
    </PortfolioContext.Provider>
  );
};

const TransitionOverlay = ({
  overlayRef,
}: {
  overlayRef: React.RefObject<HTMLDivElement | null>;
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
