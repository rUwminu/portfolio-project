import React, { useRef } from "react";
import { cn } from "@/utils/cn";
import { motion, useInView } from "motion/react";
import { ScrollContainerContext } from "../ScrollContainerContext";

import StarIcon from "@/assets/icons/Star.svg";
import ShootingStarIcon from "@/assets/icons/ShootingStar.svg";
import HeadphoneIcon from "@/assets/icons/Headphone.svg";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.75 } },
};

const FeatureSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useContext(ScrollContainerContext);
  const isInView = useInView(ref, { root: scrollContainerRef, amount: 1 });

  return (
    <motion.div
      ref={ref}
      className="snap-center flex flex-col items-center justify-center gap-8 md:gap-10 lg:gap-16 w-full max-w-7xl h-dvh lg:h-auto mx-auto py-0 md:py-8 lg:py-14 xl:py-24"
      viewport={{ amount: 1 }}
    >
      <motion.div
        className="flex flex-wrap items-start justify-around gap-8 w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.8 }}
      >
        <FeatureCard
          icon={HeadphoneIcon}
          title="Listen audio of top creators"
          label="Explore top creators and other content to inspire your next video!"
          color="bg-blue-400"
          outlineColor="bg-blue-200"
          shadowColor="shadow-blue-400/50"
        />

        <FeatureCard
          icon={StarIcon}
          title="Create your own content"
          label="Explore top creators and other content to inspire your next video!"
          color="bg-purple-400"
          outlineColor="bg-purple-200"
          shadowColor="shadow-purple-400/50"
        />

        <FeatureCard
          icon={ShootingStarIcon}
          title="Everything is unique"
          label="Explore top creators and other content to inspire your next video!"
          color="bg-orange-400"
          outlineColor="bg-orange-200"
          shadowColor="shadow-orange-400/50"
        />
      </motion.div>

      <motion.button
        className="flex items-center justify-center w-max  h-12 md:h-14 lg:h-16 px-18 text-white bg-orange-500 text-lg font-semibold rounded-2xl"
        variants={buttonVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        Register Now!
      </motion.button>
    </motion.div>
  );
};

interface FeatureCardProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  label: string;
  color: string;
  outlineColor: string;
  shadowColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  label,
  color,
  outlineColor,
  shadowColor,
}) => {
  return (
    <motion.div
      className="flex flex-col gap-3 md:gap-6 max-w-96"
      variants={cardVariants}
    >
      <motion.div
        className={cn(
          "flex items-center justify-center w-18 sm:w-24 md:w-28 lg:w-32 aspect-square rounded-full shadow-[0_0_30px_3px_var(--tw-shadow-color)]",
          shadowColor,
          outlineColor,
        )}
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
        }}
      >
        <div
          className={cn(
            "flex items-center justify-center w-12 sm:w-16 md:w-20 lg:w-24 aspect-square rounded-full",
            color,
          )}
        >
          <Icon className="w-8 md:w-10 aspect-square text-white" />
        </div>
      </motion.div>

      <motion.span
        className="text-2xl md:text-3xl font-semibold"
        variants={cardVariants}
      >
        {title}
      </motion.span>

      <motion.span
        className="text-base sm:text-lg md:text-xl text-gray-600"
        variants={cardVariants}
      >
        {label}
      </motion.span>
    </motion.div>
  );
};
export default FeatureSection;
