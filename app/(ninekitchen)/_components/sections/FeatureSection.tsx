import React from "react";
import { motion } from "motion/react";

import MenuIcon from "../../_assets/icons/Menu.svg";
import ServingDishIcon from "../../_assets/icons/ServingDish.svg";
import PinLocationIcon from "../../_assets/icons/PinLocation.svg";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const FeatureSection = () => {
  const features = [
    {
      icon: MenuIcon,
      title: "Food Recipe",
      label:
        "Carefully curated recipes designed for balanced, flavorful meals every day.",
    },
    {
      icon: ServingDishIcon,
      title: "Fresh Made Daily",
      label:
        "Prepared fresh each day using quality ingredients for the best taste and nutrition.",
    },
    {
      icon: PinLocationIcon,
      title: "Door Step Delivery",
      label:
        "Reliable delivery straight to your door, so you never miss a meal.",
    },
  ];

  return (
    <motion.div
      className="relative flex flex-wrap items-center justify-around gap-6 w-full max-w-7xl py-20 px-2 mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 1, once: true }}
    >
      {Array.isArray(features) &&
        features.map((x, idx) => <FeatureCard key={idx} {...x} />)}
    </motion.div>
  );
};

interface FeatureCardProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  label: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  label,
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center"
      variants={cardVariants}
    >
      <Icon className="w-16 h-16 text-white" />

      <span className=" pt-8 pb-4 text-xl text-white font-semibold">
        {title}
      </span>

      <span className="w-[250px] text-center text-zinc-300 ">{label}</span>
    </motion.div>
  );
};

export default FeatureSection;
