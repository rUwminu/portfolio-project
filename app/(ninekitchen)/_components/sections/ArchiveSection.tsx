import React from "react";
import { motion } from "motion/react";

const archives = [
  {
    title: "Happy Customer",
    value: "7.6K",
  },
  {
    title: "Passionate Chef",
    value: "50+",
  },
  {
    title: "Years Of Experience",
    value: "10+",
  },
  {
    title: "Awards",
    value: "10+",
  },
];

const growWidth = {
  hidden: { width: 0 },
  visible: { width: "70%", transition: { duration: 0.5 } },
};

const ArchiveSection = () => {
  return (
    <motion.div
      className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 w-full max-w-7xl py-20 px-2 mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.8, once: true }}
    >
      <motion.div
        className="absolute top-0 right-0 h-1 bg-zinc-600"
        variants={growWidth}
      />

      {Array.isArray(archives) &&
        archives.map((x, idx) => <ArchiveCard key={idx} {...x} />)}

      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-zinc-600"
        variants={growWidth}
      />
    </motion.div>
  );
};

const scaleSmallBig = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

interface ArchiveCardProps {
  title: string;
  value: string;
}

const ArchiveCard: React.FC<ArchiveCardProps> = ({ title, value }) => {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center gap-2 aspect-square bg-zinc-800"
      variants={scaleSmallBig}
    >
      <div className="absolute top-0 right-0 w-1/2 h-1 bg-orange-600 rounded-sm" />

      <div className="absolute top-0 right-0 w-1 h-1/2 bg-orange-600 rounded-sm" />

      <span className="text-4xl md:text-6xl text-white font-semibold">
        {value}
      </span>

      <span className="text-lg text-zinc-400 ">{title}</span>

      <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-orange-600 rounded-sm" />

      <div className="absolute bottom-0 left-0 w-1 h-1/2 bg-orange-600 rounded-sm" />
    </motion.div>
  );
};

export default ArchiveSection;
