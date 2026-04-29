import React, { useRef, useEffect } from "react";
import { motion, useAnimationControls, useInView } from "motion/react";
import { ScrollContainerContext } from "../ScrollContainerContext";

const CARDS_PER_COLUMN = 8;

const ExhibitSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const titleControls = useAnimationControls();
  const controls1 = useAnimationControls();
  const controls2 = useAnimationControls();

  const wasInView = useRef(false);

  const animate = async (scrollingDown: boolean) => {
    titleControls.set({ opacity: 0, y: 40 });
    controls1.set({ x: scrollingDown ? 2000 : -2000, opacity: 0 });
    controls2.set({ x: scrollingDown ? -2000 : 2000, opacity: 0 });

    await Promise.all([
      titleControls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } }),
      controls1.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      }),
      controls2.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      }),
    ]);
  };

  const scrollContainerRef = React.useContext(ScrollContainerContext);
  const isInView = useInView(ref, { root: scrollContainerRef, amount: 0.8 });

  const scrollDirection = useRef<"down" | "up">("down");
  const lastScrollY = useRef(-1);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const current = el.scrollTop;
      scrollDirection.current = current > lastScrollY.current ? "down" : "up";
      lastScrollY.current = current;
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef]);

  useEffect(() => {
    if (isInView && !wasInView.current) {
      animate(scrollDirection.current === "down");
    } else if (!isInView && wasInView.current) {
      // leaving — slide out in the same direction we're scrolling
      const exitX1 = scrollDirection.current === "down" ? -2000 : 2000;
      const exitX2 = scrollDirection.current === "down" ? 2000 : -2000;

      titleControls.start({
        opacity: 0,
        y: scrollDirection.current === "down" ? -40 : 40,
        transition: { duration: 0.5 },
      });
      controls1.start({
        x: exitX1,
        opacity: 0,
        transition: { duration: 0.8, ease: "easeIn" },
      });
      controls2.start({
        x: exitX2,
        opacity: 0,
        transition: { duration: 0.8, ease: "easeIn" },
      });
    }

    wasInView.current = isInView;
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      className="snap-center flex flex-col justify-center gap-8 w-full h-screen max-w-7xl mx-auto"
      viewport={{ amount: 1 }}
    >
      <motion.span
        className="w-[800px] text-6xl text-center font-semibold mx-auto mb-32"
        animate={titleControls}
        initial={{ opacity: 0, y: 40 }}
      >
        Over 5000+ products available{" "}
        <span className="text-blue-600">to check</span>
      </motion.span>

      <div className="flex items-center justify-center gap-12 mr-14 rotate-4">
        {Array.from({ length: CARDS_PER_COLUMN }).map((_, i) => (
          <motion.div
            key={i}
            animate={controls1}
            initial={{ x: 2000, opacity: 0 }}
          >
            <Card />
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-12 ml-14 rotate-4">
        {Array.from({ length: CARDS_PER_COLUMN }).map((_, i) => (
          <motion.div
            key={i}
            animate={controls2}
            initial={{ x: -2000, opacity: 0 }}
          >
            <Card />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Card = () => {
  return (
    <div className="flex flex-col justify-between min-w-80 h-52 p-4 rounded-2xl bg-blue-300">
      <div className="w-14 h-10 rounded-full bg-white"></div>
      <div className="w-14 h-14 ml-auto rounded-full bg-orange-500"></div>
    </div>
  );
};

export default ExhibitSection;
