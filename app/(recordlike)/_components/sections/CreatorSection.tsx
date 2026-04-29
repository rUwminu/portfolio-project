import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";

const CardList = [
  {
    name: "SimonTrixser",
    type: "Creator",
  },
  {
    name: "Mr.Beast",
    type: "Creator",
  },
  {
    name: "Dokibird",
    type: "Creator",
  },
  {
    name: "MX Studio",
    type: "Creator",
  },
];

const CreatorSection = () => {
  const container = {
    hidden: {},
    visible: {
      transition: {
        duration: 0.5,
        staggerChildren: 0, // children animate one by one
      },
    },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center w-full h-screen py-28"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.8 }}
    >
      <motion.span
        className="text-5xl font-semibold text-center"
        variants={slideUp}
      >
        Enjoy listening to endless stories <br /> with out creators
      </motion.span>

      <div className="relative flex-1 w-full">
        <CardAnimation />

        <BackgroundAnimation />
      </div>
    </motion.div>
  );
};

const BackgroundAnimation = () => {
  const boxVariants = (x: number, y: number, delay: number) => ({
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: [0, -32, 0], // bounce distance: change -12 to go higher (e.g. -20) or lower (e.g. -6)
      transition: {
        opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        x: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        y: {
          duration: 2, // how long one full bounce cycle takes — higher = slower
          ease: "easeInOut", // smooth in and out — this is what makes it feel floaty
          times: [0, 0.5, 1], // 0=start, 0.5=top of bounce, 1=back down (keep evenly spaced)
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0, // gap between each cycle — keep 0 for continuous float
          delay,
        },
      },
    },
  });

  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full overflow-hidden -z-10">
      {/* Wave */}
      <motion.div
        className="absolute top-18 right-0 inset-0 flex items-center w-[200%] text-gray-900/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.svg
          viewBox="0 0 2400 60"
          preserveAspectRatio="xMidYMid"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <path
            d="M0,30 C200,-160 400,180 600,30 C800,-160 1000,180 1200,30 C1400,-160 1600,180 1800,30 C2000,-160 2200,180 2400,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-border"
          />
        </motion.svg>
      </motion.div>

      {/* Boxes */}
      <div className="flex items-end justify-center gap-44">
        <motion.div
          className="w-44 h-44 rounded-2xl bg-purple-50 rotate-8"
          variants={boxVariants(-40, 0, 0.2)}
        />
        <motion.div
          className="w-96 h-96 rounded-2xl bg-red-50 rotate-4"
          variants={boxVariants(0, 40, 0)}
        />
        <motion.div
          className="w-48 h-48 rounded-2xl bg-orange-50 -rotate-12"
          variants={boxVariants(40, -20, 0.8)}
        />
      </div>
    </div>
  );
};

const cardVariants = (
  x: number,
  tilt: number,
  delay: number,
  flip: boolean,
) => ({
  hidden: { opacity: 0, x, y: 40 },
  visible: {
    opacity: 1,
    x: 0,
    y: [0, -68, 0],
    rotate: flip
      ? [tilt + 8, tilt - 8, tilt + 8] // rocks opposite direction
      : [tilt - 8, tilt + 8, tilt - 8],
    transition: {
      opacity: { duration: 1, ease: [0.22, 1, 0.36, 1], delay },
      x: { duration: 1, ease: [0.22, 1, 0.36, 1], delay },
      y: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        delay: delay + 0.6,
      },
      rotate: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        delay: delay + 0.6,
      },
    },
  },
});

const CardAnimation = () => {
  const getCardProps = (idx: number) => {
    const isCenter = idx === 1 || idx === 2;
    const delay = isCenter ? 0 : 0.4;
    const x = idx === 0 ? -60 : idx === 1 ? -60 : idx === 2 ? 60 : 60;
    const tilt = -9 + idx * 6;
    const flip = idx % 2 !== 0; // idx 1 and 3 rock opposite to idx 0 and 2

    return { x, tilt, delay, flip };
  };

  return (
    <div className="flex items-center justify-center gap-32 w-full h-full z-10">
      {CardList.map((card, idx) => {
        const { x, tilt, delay, flip } = getCardProps(idx);
        return (
          <motion.div
            key={idx}
            variants={cardVariants(x, tilt, delay, flip)}
            style={{ rotate: tilt }}
          >
            <Card {...card} />
          </motion.div>
        );
      })}
    </div>
  );
};

interface CardProps {
  name: string;
  type: string;
}

const Card: React.FC<CardProps> = ({ name, type }) => {
  return (
    <div className="flex flex-col items-center gap-6 w-60 p-4 bg-white rounded-3xl shadow-xl">
      <div className="w-28 h-28 bg-blue-400 rounded-full"></div>

      <span className="text-2xl font-semibold">{name}</span>

      <div className="px-4 py-1 bg-gray-200 rounded-lg">
        <span className="text-lg font-semibold">{type}</span>
      </div>
    </div>
  );
};

export default CreatorSection;
