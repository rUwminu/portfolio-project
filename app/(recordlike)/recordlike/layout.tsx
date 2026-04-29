"use client";

import { useRef, useCallback, useEffect } from "react";
import { ScrollContainerContext } from "../_components/ScrollContainerContext";

const DURATION = 1200; // ms

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function animateScrollTo(container: HTMLElement, targetY: number) {
  const startY = container.scrollTop;
  const distance = targetY - startY;
  const startTime = performance.now();

  const tick = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / DURATION, 1);
    container.scrollTop = startY + distance * easeInOut(progress);
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

export default function RecordlikeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const currentIndex = useRef(0);

  const getSections = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return [];
    return Array.from(container.children) as HTMLElement[];
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const container = scrollRef.current;
      const sections = getSections();
      if (!container || index < 0 || index >= sections.length) return;

      const section = sections[index];
      const targetY =
        section.offsetTop - (container.clientHeight - section.clientHeight) / 2;

      isScrolling.current = true;
      currentIndex.current = index;
      animateScrollTo(container, Math.max(0, targetY));

      setTimeout(() => {
        isScrolling.current = false;
      }, DURATION + 50);
    },
    [getSections],
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      scrollToIndex(currentIndex.current + direction);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (isScrolling.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToIndex(currentIndex.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToIndex(currentIndex.current - 1);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKey);
    return () => {
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKey);
    };
  }, [scrollToIndex]);

  return (
    <ScrollContainerContext.Provider value={scrollRef}>
      <div
        ref={scrollRef}
        className="h-screen overflow-y-hidden overflow-x-hidden"
      >
        {children}
      </div>
    </ScrollContainerContext.Provider>
  );
}
