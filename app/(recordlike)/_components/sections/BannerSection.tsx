"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/utils/cn";
import { ScrollContainerContext } from "../ScrollContainerContext";

import Header from "./Header";

import UserIcon from "@/assets/icons/User.svg";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const BannerSection = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  return (
    <BannerRefContext.Provider value={bannerRef}>
      <div ref={bannerRef} className="snap-start w-full max-w-7xl mx-auto">
        <Header />

        <div className="flex items-center justify-center gap-4 overflow-visible -mt-16">
          <motion.div
            className="w-[30%] flex flex-col overflow-visible z-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              className={cn("text-6xl font-semibold")}
              variants={slideUpVariants}
            >
              Welcome to
            </motion.span>

            <motion.span
              className={cn("text-6xl font-semibold text-blue-800")}
              variants={slideUpVariants}
            >
              RLikes
            </motion.span>

            <motion.span
              className={cn("text-3xl font-semibold text-gray-600 mt-6")}
              variants={slideUpVariants}
            >
              Digital Retailer of Content. Watch & Create Content
            </motion.span>

            <motion.button
              className={cn(
                "flex items-center justify-center h-16 mt-6 text-white bg-orange-500 text-lg font-semibold rounded-2xl",
              )}
              variants={buttonVariants}
            >
              Get Started!
            </motion.button>
          </motion.div>

          <div className="flex items-center justify-center w-[70%]">
            <AnimationImageSlider />
          </div>
        </div>

        <motion.div
          className="relative flex items-center justify-between gap-4 -mt-16 z-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <InfoCard
            title="Active User"
            label="322,117"
            icon={UserIcon}
            color="text-blue-500"
            bgColor="bg-blue-100"
            wrapperClass={``}
          />

          <InfoCard
            title="Create content now"
            label="Just few click away"
            icon={UserIcon}
            color="text-orange-500"
            bgColor="bg-orange-100"
            wrapperClass={``}
          />

          <InfoCard
            title="Find our best creator"
            label="Professional & individual available"
            icon={UserIcon}
            color="text-purple-500"
            bgColor="bg-purple-100"
            wrapperClass={``}
          />
        </motion.div>
      </div>
    </BannerRefContext.Provider>
  );
};

// Shared banner ref via context so Column can access it without prop drilling
const BannerRefContext = React.createContext<
  React.RefObject<HTMLDivElement | null>
>({ current: null });

const useBannerRef = () => React.useContext(BannerRefContext);

const CARDS_PER_COLUMN = 5;

interface ColumnProps {
  direction: "up" | "down";
  initialY: number;
  offsetTop: string;
}

const Column: React.FC<ColumnProps> = ({ direction, initialY, offsetTop }) => {
  const bannerRef = useBannerRef();
  const scrollContainer = React.useContext(ScrollContainerContext);

  const isInView = useInView(bannerRef, {
    root: scrollContainer,
    amount: 0.8,
  });

  const exitY = direction === "up" ? -300 : 300;

  return (
    <motion.div
      className={cn("flex flex-col gap-12", offsetTop)}
      initial={{ y: initialY }}
      animate={{ y: isInView ? 0 : exitY }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {Array.from({ length: CARDS_PER_COLUMN }).map((_, i) => (
        <ImageCard key={i} />
      ))}
    </motion.div>
  );
};

const AnimationImageSlider = () => {
  return (
    <motion.div
      className="relative w-[90%] aspect-square overflow-hidden"
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 -rotate-12 flex items-start justify-center gap-12">
        <Column direction="down" initialY={-300} offsetTop="" />
        <Column direction="up" initialY={300} offsetTop="mt-24" />
        <Column direction="down" initialY={-300} offsetTop="" />
      </div>

      <motion.div
        className="absolute w-full h-full pointer-events-none"
        initial={{ "--reveal": "10%" } as any}
        animate={{ "--reveal": "40%" } as any}
        transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
        style={
          {
            background: `radial-gradient(ellipse var(--reveal) var(--reveal) at center, transparent 40%, white 120%)`,
          } as any
        }
      />
    </motion.div>
  );
};

const ImageCard = () => {
  return <div className="w-48 h-64 rounded-3xl bg-blue-300" />;
};

interface InfoCardProps {
  title: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  bgColor: string;
  wrapperClass: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  label,
  icon: Icon,
  color,
  bgColor,
  wrapperClass,
}) => {
  return (
    <motion.div
      className={cn("flex items-center justify-center gap-4", wrapperClass)}
      variants={slideUpVariants}
    >
      <div
        className={cn(
          "flex items-center justify-center w-18 h-18 p-4 rounded-full",
          bgColor,
        )}
      >
        <Icon className={cn("w-full h-full", color)} />
      </div>

      <div className="flex flex-col">
        <span className="text-xl font-semibold">{title}</span>
        <span className="font-semibold text-gray-600">{label}</span>
      </div>
    </motion.div>
  );
};

export default BannerSection;
