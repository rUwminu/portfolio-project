import React from "react";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";

import PlayVideoIcon from "@/assets/icons/PlayVideo.svg";
import UploadAudioIcon from "@/assets/icons/UploadAudio.svg";
import CropVideoIcon from "@/assets/icons/CropVideo.svg";
import EditVideoIcon from "@/assets/icons/EditVideo.svg";
import EditTextIcon from "@/assets/icons/EditText.svg";
import PlayButtonIcon from "@/assets/icons/PlayButton.svg";
import PriceIcon from "@/assets/icons/Price.svg";
import ClappedBoardPlayIcon from "@/assets/icons/ClappedBoardPlayBold.svg";

const IconList = [
  PlayVideoIcon,
  UploadAudioIcon,
  CropVideoIcon,
  EditVideoIcon,
  EditTextIcon,
];

const BoradingSeaction = () => {
  return (
    <div className="relative">
      <div className="flex items-center justify-center gap-12 w-full max-w-[1340px] mx-auto py-20 ">
        <div className=" relative flex justify-center gap-12 w-full h-200">
          <div className="flex-1 flex items-center justify-center z-1">
            <BannerCard />
          </div>

          <div className="flex-1 flex items-start justify-start z-1">
            <BannerInfo />
          </div>
        </div>
      </div>

      <div className="absolute top-16 left-0 bg-gradient-to-r from-transparent to-purple-50 w-full h-[60%] rounded-lg" />
    </div>
  );
};

const BannerCard = () => {
  const container = {
    hidden: {
      opacity: 0,
      scale: 0.2,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2, // children animate one by one
      },
    },
  };

  return (
    <motion.div
      className="relative w-[80%] aspect-[2/3] bg-purple-400 rounded-[64px]"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.8 }}
    >
      <BannerPlayButton />

      <BannerToolList />

      <BannerVideoControl />

      <BannerQnA />
    </motion.div>
  );
};

// BannerCard Component
const BannerPlayButton = () => {
  const button = {
    hidden: {
      opacity: 0,
      x: -200,
      rotate: -500,
    },
    visible: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="absolute top-8 -right-10 rotate-12 flex items-center justify-center w-24 h-24 bg-orange-500 rounded-4xl"
      variants={button}
      initial={{ opacity: 0, x: -200, rotate: -500 }}
    >
      <PlayButtonIcon className="w-10 h-10 -mr-1 text-gray-100" />
    </motion.div>
  );
};

const BannerToolList = () => {
  const list = {
    hidden: {
      opacity: 0,
      x: 60,
      y: -100,
      scale: 1.4,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="absolute top-[20%] -left-9 flex flex-col items-center justify-center gap-8 w-18 py-8 bg-white rounded-2xl shadow-2xl"
      variants={list}
    >
      {IconList.map((Icon, idx) => (
        <Icon key={idx} className="w-7 h-7 text-gray-500" />
      ))}
    </motion.div>
  );
};

const BannerVideoControl = () => {
  const EDITOR_LENGTH = 10;

  const control = {
    hidden: {
      opacity: 0,
      x: 80,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="absolute bottom-8 -left-6 flex flex-col gap-2 p-4 bg-white rounded-2xl shadow-xl"
      variants={control}
      initial={{
        opacity: 0,
        x: 80,
      }}
    >
      <div className="flex items-end justify-between gap-2">
        <div className="w-[2px] h-4 bg-gray-600 rounded-sm" />

        {Array.from({ length: EDITOR_LENGTH }).map((_, idx) => (
          <div key={idx} className="w-[2px] h-2 bg-gray-600 rounded-sm" />
        ))}

        <div className="w-[2px] h-4 bg-gray-600 rounded-sm" />

        {Array.from({ length: EDITOR_LENGTH }).map((_, idx) => (
          <div key={idx} className="w-[2px] h-2 bg-gray-600 rounded-sm" />
        ))}

        <div className="w-[2px] h-4 bg-gray-600 rounded-sm" />
      </div>

      <div className="w-2/3 h-6 bg-green-300 rounded-md"></div>
    </motion.div>
  );
};

const BannerQnA = () => {
  const qnaContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.2, // wait for siblings to finish
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const card = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const line = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  const trigangleSlideDown = {
    hidden: {
      opacity: 0,
      y: 0,
    },
    visible: { opacity: 1, y: 50, transition: { duration: 0.6 } },
  };

  const trigangleSlideLeft = {
    hidden: {
      opacity: 0,
      x: 0,
    },
    visible: { opacity: 1, x: -50, transition: { duration: 0.6 } },
  };

  return (
    <div className="absolute bottom-0 -right-22 w-56 h-60 ">
      {/* TODO: nested stagger animate for the element in this wrapper */}
      <motion.div className="relative w-full h-full" variants={qnaContainer}>
        <motion.div
          className="qa-card absolute -top-22 left-0 flex flex-col w-46 h-44 rounded-3xl shadow-2xl overflow-hidden z-2"
          variants={card}
        >
          <div className="flex-1 bg-blue-400" />

          <div className="flex flex-col py-2 px-3 bg-white">
            <span className="text-lg font-bold">Question</span>

            <span className="text-sm text-gray-500 font-semibold">
              Video length?
            </span>
          </div>
        </motion.div>

        {/* Animate Card then all the line then the last small card */}
        <motion.div
          className="line absolute top-0 right-0 w-1/2 h-[2px] bg-gray-400"
          variants={line}
        />

        <div className="absolute top-0 right-0 h-full">
          <div className="relative h-full">
            <motion.div
              className="line absolute top-0 right-0 w-0.5 h-full bg-gray-400"
              variants={line}
            />

            <motion.div
              className="absolute top-0 right-0 translate-x-2.5"
              variants={trigangleSlideDown}
            >
              <PlayButtonIcon className="rotate-90 w-6 h-6  text-purple-600" />
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-2/3">
          <div className="relative w-full">
            <motion.div
              className="line absolute top-0 right-0 w-full h-0.5 bg-gray-400"
              variants={line}
            />

            <motion.div
              className="absolute top-0 right-0 -translate-y-2.5"
              variants={trigangleSlideLeft}
            >
              <PlayButtonIcon className=" rotate-180 w-6 h-6  text-purple-600" />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="qa-card absolute -bottom-12 -left-12 flex flex-col w-38 h-36 rounded-3xl shadow-2xl overflow-hidden z-2"
          variants={card}
        >
          <div className="flex-1 bg-blue-400" />

          <div className="flex flex-col py-1 px-2 bg-white">
            <span className="font-bold">Share</span>

            <span className="text-xs text-gray-500 font-semibold">
              Youtude...
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const BannerInfo = () => {
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

  const slideLeft = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.2 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="flex flex-col w-full h-full pt-14 pr-0 pb-4 pl-4"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.8 }}
    >
      <div className="flex flex-col gap-6">
        <motion.span
          className="text-7xl font-semibold leading-13"
          variants={slideUp}
        >
          Freedom for
        </motion.span>

        <motion.span
          className="text-7xl font-semibold leading-13 "
          variants={slideUp}
        >
          your creative
        </motion.span>

        <motion.div className="flex items-end gap-1 mt-1" variants={slideUp}>
          <span className="text-7xl font-semibold leading-13 ">ideas</span>

          <div className="w-4 h-4 bg-orange-600 rounded-full" />
        </motion.div>
      </div>

      <motion.span
        className="mt-10 text-lg font-semibold text-gray-600"
        variants={slideUp}
      >
        Freedom to turn your ideas into videos, explore creations and learn
        their techniques, and share your own work with community.
      </motion.span>

      <div className="flex items-center justify-start gap-8 mt-19">
        <motion.button
          className="flex items-center justify-center w-max h-16 px-18 text-white bg-orange-500 text-lg font-semibold rounded-2xl"
          variants={buttonVariants}
        >
          Get Started
        </motion.button>

        <div className="flex items-center justify-start gap-4">
          <motion.button
            className="flex items-center justify-center w-16 h-16 text-white bg-white rounded-2xl border border-gray-600"
            variants={buttonVariants}
          >
            <PlayButtonIcon className="w-7 h-7 -mr-1 text-gray-500" />
          </motion.button>

          <motion.span
            className="text-lg font-bold text-gray-600"
            variants={slideLeft}
          >
            How it works?
          </motion.span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 my-auto">
        <BannerInfoCard
          icon={ClappedBoardPlayIcon}
          label="Control the plot of stories"
          iconClass="text-purple-600"
        />

        <BannerInfoCard
          icon={UploadAudioIcon}
          label="Add audio tracks to your stories"
          iconClass="text-blue-600"
        />

        <BannerInfoCard
          icon={PriceIcon}
          label="Make money on content"
          iconClass="text-orange-600"
        />
      </div>
    </motion.div>
  );
};

interface BannerInfoCardProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  iconClass: string;
}

const BannerInfoCard: React.FC<BannerInfoCardProps> = ({
  icon: Icon,
  label,
  iconClass,
}) => {
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
      className="flex items-center justify-center gap-2"
      variants={slideUp}
    >
      <div className="flex items-center justify-center min-w-14 h-14 p-4 bg-gray-100 rounded-full">
        <Icon className={cn("w-full h-full", iconClass)} />
      </div>

      <span className="font-semibold">{label}</span>
    </motion.div>
  );
};

export default BoradingSeaction;
