import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

import CuctusIcon from "../../_assets/icons/Cuctus.svg";
import SaladIcon from "../../_assets/icons/Salad.svg";

import BannerImage from "../../_assets/images/FoodSeasoning.jpg";
import FoodImage from "../../_assets/images/recipes/BeefwithMashEggHotSource.jpg";

const BoardingSection = () => {
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-7xl py-20 px-2 mx-auto">
      <BoardingBanner />

      <BoardingContent />
    </div>
  );
};

const container = {
  hidden: {},
  visible: {
    transition: {
      duration: 0.5,
      staggerChildren: 0.2, // children animate one by one
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

const slideRight = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

const scaleSmallBig = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const BoardingBanner = () => {
  return (
    <motion.div
      className="flex flex-col w-full"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.8, once: true }}
    >
      <motion.div
        className="relative w-[55%] aspect-2/3 z-0 rounded-md overflow-hidden"
        variants={scaleSmallBig}
      >
        <Image
          src={FoodImage}
          alt="Food Seasoning"
          fill
          className="object-cover"
        />
      </motion.div>

      <div className="relative flex items-end justify-around -mt-62 z-1">
        <motion.div
          className="relative flex items-center justify-center w-44 h-44"
          variants={scaleSmallBig}
        >
          <motion.svg
            viewBox="0 0 176 176"
            className="absolute inset-0 w-full h-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <defs>
              <path
                id="circle"
                d="M 88,88 m -68,0 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0"
              />
            </defs>
            <text className="text-[11px] fill-orange-600 tracking-widest">
              <textPath href="#circle">
                Fresh Meals • Monthly Plan • Subscribe Now • DoorStep Delivery •
              </textPath>
            </text>
          </motion.svg>

          <div className="flex items-center justify-center w-20 h-20 bg-orange-700 rounded-full z-10">
            <span className="text-2xl text-white font-semibold">9K</span>
          </div>
        </motion.div>

        <motion.div
          className="relative w-[55%] aspect-2/3 z-0 rounded-md overflow-hidden"
          variants={scaleSmallBig}
        >
          <Image
            src={BannerImage}
            alt="Food Seasoning"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const BoardingContent = () => {
  const tags = [
    {
      icon: SaladIcon,
      title: "Organic Food",
      label:
        "Made with responsibly sourced ingredients, focusing on natural and wholesome options.",
    },
    {
      icon: CuctusIcon,
      title: "Hygienic Handle",
      label:
        "Prepared and packed under strict hygiene standards to ensure food safety and quality.",
    },
  ];

  return (
    <motion.div
      className="flex flex-col"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.8, once: true }}
    >
      <motion.span className="md:text-lg text-orange-600" variants={slideUp}>
        Our Commitment
      </motion.span>

      <div className="flex flex-col gap-3 pt-2">
        <motion.span
          className="text-2xl md:text-5xl text-white font-semibold"
          variants={slideUp}
        >
          Fresh and Appetizing
        </motion.span>

        <motion.span
          className="text-2xl md:text-5xl text-white font-semibold"
          variants={slideUp}
        >
          Cuisine For Daily Meal
        </motion.span>
      </div>

      <motion.div
        className="flex flex-col gap-4 mt-6 text-zinc-400"
        variants={slideUp}
      >
        <p>
          Our meal plans are thoughtfully crafted to bring variety, freshness,
          and quality into your daily routine. Enjoy special dishes on selected
          days, carefully designed to keep your meals exciting and something to
          look forward to.
        </p>
        <p>
          Every meal is prepared fresh on the same day it's delivered — we never
          serve overnight food. From preparation to packaging, we focus on
          maintaining the best taste and nutritional value in every bite.
        </p>
        <p>
          We also prioritize sourcing ingredients locally whenever possible,
          supporting nearby farmers and suppliers while ensuring fresher produce
          reaches your table.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col items-start gap-6 mt-12"
        variants={slideUp}
      >
        {Array.isArray(tags) &&
          tags.map((x, idx) => <ContentTag key={idx} {...x} />)}
      </motion.div>

      <motion.button
        className="w-56 h-14  mt-12 text-lg text-white font-semibold bg-orange-600 rounded-md"
        variants={scaleSmallBig}
      >
        Subscribe Now
      </motion.button>
    </motion.div>
  );
};

interface ContentTagProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  label: string;
}

const ContentTag: React.FC<ContentTagProps> = ({
  icon: Icon,
  title,
  label,
}) => {
  return (
    <div className="flex items-center justify-center gap-6">
      <div className="flex items-center justify-center min-w-20 min-h-20 bg-orange-600 rounded-md">
        <Icon className="w-12 h-12 text-white" />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xl text-white font-semibold">{title}</span>

        <span className="text-zinc-400">{label}</span>
      </div>
    </div>
  );
};

export default BoardingSection;
