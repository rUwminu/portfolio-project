import React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";

import PlayIcon from "@/assets/icons/PlayButton.svg";

import BannerImage from "../../_assets/images/FoodSeasoning.jpg";
import UserMale1 from "../../_assets/images/users/m-1.jpg";
import UserMale2 from "../../_assets/images/users/m-2.jpg";
import UserMale3 from "../../_assets/images/users/m-3.jpg";
import UserFemale1 from "../../_assets/images/users/w-1.jpg";

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

const BannerSection = () => {
  return (
    <div className="relative flex flex-col w-full max-w-7xl px-2 pt-36 pb-48 mx-auto">
      <BannerContent />

      <BannerBackground />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.8, once: true }}
      >
        <CustomerRating
          wrapperClass={"xl:hidden w-[85%] mt-28 mx-auto"}
          extendClass=" "
        />
      </motion.div>
    </div>
  );
};

const BannerContent = () => {
  return (
    <motion.div
      className="relative flex flex-col gap-8 md:gap-12 z-10"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.8, once: true }}
    >
      <div className="flex flex-col gap-2 md:gap-4">
        <motion.span
          className="text-4xl md:text-7xl font-semibold text-white"
          variants={slideUp}
        >
          Drint, Food &
        </motion.span>

        <motion.span
          className="text-4xl md:text-7xl font-semibold text-white"
          variants={slideUp}
        >
          Enjoy With Your
        </motion.span>

        <motion.span
          className="text-4xl md:text-7xl font-semibold text-white"
          variants={slideUp}
        >
          Family.
        </motion.span>
      </div>

      <motion.span className="text-md md:text-lg text-white" variants={slideUp}>
        We have a proper passion for cooking. Love is the <br /> secret
        ingredient that makes all our meals taste <br /> excellent and magical.
      </motion.span>

      <div className="flex items-center gap-6">
        <motion.button
          className="h-14 px-12 font-semibold text-white bg-orange-600 rounded-md"
          variants={scaleSmallBig}
        >
          DISCOVER MENU
        </motion.button>

        <motion.button
          className="flex items-center justify-center w-14 h-14 bg-zinc-600 rounded-full"
          variants={slideRight}
        >
          <PlayIcon className="w-5 h-5 -mr-0.5 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const BannerBackground = () => {
  return (
    <div className="absolute top-0 md:top-16 left-0 md:left-[39%] w-full md:w-auto z-0">
      <motion.div
        className="relative"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.8, once: true }}
      >
        <motion.div
          className="relative w-full md:w-125 h-125 md:h-150 rounded-md overflow-hidden z-1  "
          variants={scaleSmallBig}
        >
          <Image
            src={BannerImage}
            alt="Food Seasoning"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent md:hidden" />
        </motion.div>

        <div className="hidden xl:block absolute right-0 bottom-0 translate-y-14 translate-x-[265px]">
          <CustomerRating
            wrapperClass=""
            extendClass="hidden md:flex w-[500px] h-[400px] items-start justify-end"
          />
        </div>
      </motion.div>
    </div>
  );
};

interface CustomerRatingProps {
  wrapperClass: string;
  extendClass: string;
}

const CustomerRating: React.FC<CustomerRatingProps> = ({
  wrapperClass,
  extendClass,
}) => {
  const innerContainer = {
    hidden: { opacity: 0, scale: 0.2 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
        staggerChildren: 0.2, // children animate one by one
      },
    },
  };

  const users = [UserMale1, UserMale2, UserFemale1, UserMale3];

  return (
    <div className={cn("relative", wrapperClass)}>
      <motion.div
        className={cn(
          "flex items-center justify-start py-10 px-6 bg-orange-600 rounded-md",
          extendClass,
        )}
        variants={innerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.8, once: true }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-6">
            <motion.span
              className="text-lg text-white font-semibold"
              variants={slideUp}
            >
              Customers Rating
            </motion.span>

            <span className="text-lg text-white font-semibold">4.5</span>
          </div>

          <div className="flex items-canter">
            {Array.isArray(users) &&
              users.map((img, idx) => (
                <motion.div
                  key={idx}
                  className={cn(
                    "relative w-14 h-14 bg-white rounded-full overflow-hidden",
                  )}
                  style={{
                    marginLeft: idx > 0 ? `-16px` : "0",
                    zIndex: idx,
                  }}
                  variants={slideRight}
                >
                  <Image
                    src={img}
                    alt="UserRating"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}

            <motion.div
              className="relative flex items-center justify-center w-14 h-14 -ml-4 bg-white rounded-full z-5"
              variants={slideRight}
            >
              <span className="text-orange-600 font-semibold">20+</span>
            </motion.div>
          </div>

          <motion.span className="text-white" variants={slideUp}>
            Used by 100k + users <br /> around the world
          </motion.span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-0 translate-y-10 translate-x-10 w-[180px] h-[180px]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 3px, transparent 3px)",
          backgroundSize: "15px 15px",
        }}
        variants={{
          hidden: { opacity: 0, x: -40 },
          visible: {
            opacity: 0.6,
            x: 0,
            transition: { duration: 0.5 },
          },
        }}
      ></motion.div>
    </div>
  );
};

export default BannerSection;
