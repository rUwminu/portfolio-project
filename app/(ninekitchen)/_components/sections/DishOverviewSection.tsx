import { cn } from "@/utils/cn";
import Image from "next/image";
import { StaticImageData } from "next/image";

import AvocadoOrangeSalad from "../../_assets/images/recipes/AvocadoOrangeSalad.jpg";
import BraisedCajunChicken from "../../_assets/images/recipes/BraisedCajunChicken.jpg";
import DePouletBarbecue from "../../_assets/images/recipes/DePouletBarbecue.jpg";
import WinterFruitSalad from "../../_assets/images/recipes/WinterFruitSalad.jpg";
import LemonHerbChickenSalad from "../../_assets/images/recipes/LemonHerbChickenSalad.jpg";
import BeefwithMashEggHotSource from "../../_assets/images/recipes/BeefwithMashEggHotSource.jpg";
import BeefShankwithCreamyMashPotatoes from "../../_assets/images/recipes/BeefShankwithCreamyMashPotatoes.jpg";

const foods = [
  {
    image: BeefwithMashEggHotSource,
    title: "Avocado Orange Salad",
    extendClass: "row-span-2 md:row-span-1",
  },
  {
    image: AvocadoOrangeSalad,
    title: "Beef with Mash Egg",
    extendClass: "row-span-1 md:row-span-3",
  },
  {
    image: BraisedCajunChicken,
    title: "Braised Cajun Chicken",
    extendClass: "",
  },
  {
    image: DePouletBarbecue,
    title: "De Poulet Barbecue",
    extendClass: "",
  },
  {
    image: WinterFruitSalad,
    title: "Winter Fruit Salad",
    extendClass: "row-span-2 md:row-span-1",
  },
  {
    image: LemonHerbChickenSalad,
    title: "Lemon Herb Chicken Salad",
    extendClass: "",
  },
  {
    image: BeefShankwithCreamyMashPotatoes,
    title: "Beef Shank with Creamy Mash Potatoes",
    extendClass: "hidden md:block",
  },
];

const DishOverviewSection = () => {
  return (
    <div className="relative grid grid-cols-2 md:grid-cols-3 grid-rows-4 md:grid-rows-3 gap-6 w-full max-w-7xl h-screen py-20 px-2 mx-auto">
      {Array.isArray(foods) &&
        foods.map((x, idx) => <DishCard key={idx} {...x} />)}
    </div>
  );
};

const DishCard = ({
  image,
  title,
  extendClass,
}: {
  image: StaticImageData;
  title: string;
  extendClass: string;
}) => {
  return (
    <div
      className={cn(
        "relative min-h-56 overflow-hidden rounded-md group",
        extendClass,
      )}
    >
      <Image
        src={image}
        alt={title}
        className="w-full h-full object-cover"
        fill
      />

      <div className="absolute inset-0 bg-orange-600/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <h3 className="text-white font-semibold text-xl">{title}</h3>
      </div>
    </div>
  );
};

export default DishOverviewSection;
