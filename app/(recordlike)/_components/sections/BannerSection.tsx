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
      <div
        ref={bannerRef}
        className="relative flex flex-col w-full h-dvh max-w-7xl mx-auto px-2 md:px-4 "
      >
        <Header />

        <div className="relative flex flex-col items-center justify-center gap-4 w-full h-full overflow-visible">
          <div className=" flex items-center justify-center gap-4 w-full overflow-visible">
            <motion.div
              className="w-full lg:w-[30%] -mt-4 md:-mt-18 lg:-mt-44 flex flex-col overflow-visible z-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span
                className={cn("text-5xl lg:text-6xl font-semibold")}
                variants={slideUpVariants}
              >
                Welcome to
              </motion.span>

              <motion.span
                className={cn(
                  "text-5xl lg:text-6xl font-semibold text-blue-800",
                )}
                variants={slideUpVariants}
              >
                RLikes
              </motion.span>

              <motion.span
                className={cn(
                  "text-2xl lg:text-3xl font-semibold text-gray-800 mt-6",
                )}
                variants={slideUpVariants}
              >
                Digital Retailer of Content. Watch & Create Content
              </motion.span>

              <motion.button
                className={cn(
                  "flex items-center justify-center w-fit h-12 md:h-14 lg:h-16 mt-6 px-12 text-white bg-orange-500 text-lg font-semibold rounded-2xl",
                )}
                variants={buttonVariants}
              >
                Get Started!
              </motion.button>
            </motion.div>

            <div className="absolute top-0 left-0 lg:static flex items-center justify-center w-full lg:w-[70%] md:-mt-24">
              <AnimationImageSlider />
            </div>
          </div>

          <motion.div
            className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-24 lg:-mt-36 z-2"
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

        <div className=" lg:hidden absolute inset-0 bg-white/5 backdrop-blur-md z-1 opacity-100 transition-opacity duration-500 ease-in-out"></div>
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
  imageArray: string[];
}

const Column: React.FC<ColumnProps> = ({
  direction,
  initialY,
  offsetTop,
  imageArray,
}) => {
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
      {imageArray.map((url, i) => (
        <ImageCard key={i} url={url} />
      ))}
    </motion.div>
  );
};

const AnimationImageSlider = () => {
  const stockImageOne = [
    "https://images.unsplash.com/photo-1610041321063-bbaf5286de89?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1602492665157-639323eadd31?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1630797160666-38e8c5ba44c1?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1695408247109-3bf125ad0538?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621184078811-1120e2f1fc9e?q=80&w=1200&auto=format&fit=crop",
  ];

  const stockImageTwo = [
    "https://images.unsplash.com/photo-1630797160666-38e8c5ba44c1?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1695408247109-3bf125ad0538?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1719937051157-d3d81cc28e86?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1610041321420-a596dd14ebc9?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594009375816-39536ebd0b63?q=80&w=1200&auto=format&fit=crop",
  ];

  const stockImageThree = [
    "https://images.unsplash.com/photo-1594009375816-39536ebd0b63?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1695408247109-3bf125ad0538?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1719937051157-d3d81cc28e86?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1627777941175-d31f471f3d12?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1610041321063-bbaf5286de89?q=80&w=1200&auto=format&fit=crop",
  ];

  return (
    <motion.div
      className="relative w-[90%] aspect-square overflow-hidden"
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 -rotate-12 flex items-start justify-center gap-12">
        <Column
          direction="down"
          initialY={-300}
          offsetTop=""
          imageArray={stockImageOne}
        />
        <Column
          direction="up"
          initialY={300}
          offsetTop="mt-24"
          imageArray={stockImageTwo}
        />
        <Column
          direction="down"
          initialY={-300}
          offsetTop=""
          imageArray={stockImageThree}
        />
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

const ImageCard = ({ url }: { url: string }) => {
  return (
    <div className="w-48 h-64 rounded-3xl bg-blue-300 overflow-hidden">
      <img
        src={url}
        className="w-full h-full object-cover"
        alt={"ceator-img"}
      />
    </div>
  );
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
      className={cn("flex items-center justify-start gap-4", wrapperClass)}
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
