import React, { useRef, useState } from "react";
import { useClickOutside } from "@/utils/customHooks";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

import UserIcon from "@/assets/icons/User.svg";
import CartIcon from "@/assets/icons/Cart.svg";

const Header = () => {
  return (
    <div className="sticky top-0 left-0 w-full bg-zinc-900 border-b-2 border-zinc-600 z-50">
      <div className="flex items-center w-full max-w-7xl mx-auto px-2 py-4">
        <span className="text-lg lg:text-2xl xl:text-3xl font-semibold text-white">
          9 Kitchen
        </span>

        <NavigationContainer />
      </div>
    </div>
  );
};

interface NavigationOption {
  name: string;
  route: string;
}

const headerNavigationOption: NavigationOption[] = [
  { name: "Home", route: "/ninekitchen" },
  { name: "Recipe", route: "/ninekitchen/recipe" },
  { name: "Contact", route: "/ninekitchen/contact" },
];

const NavigationContainer = () => {
  const pathname = usePathname();

  return (
    <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
      <div className="flex items-center gap-4 md:gap-6">
        {headerNavigationOption.map((option: NavigationOption) => {
          const { name, route } = option;
          const isActive = pathname === route;

          return (
            <div key={name} className="cursor-pointer">
              <span
                className={cn(
                  "font-semibold",
                  isActive ? "text-orange-500" : "text-zinc-300",
                )}
              >
                {name}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-1">
        <UserButton />

        <QrScanButton />
      </div>
    </div>
  );
};

const UserButton = () => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsActive(false));

  return (
    <div className="relative" ref={ref}>
      <div
        className="w-9 h-9 md:w-11 md:h-11 p-1 md:p-2 rounded-full transition-all cursor-pointer hover:bg-gray-400/30"
        // onClick={() => setIsActive((prev) => !prev)}
      >
        <UserIcon className="w-full h-full text-zinc-300" />
      </div>

      {/* <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, width: 0, height: 0 }}
            animate={{ opacity: 1, width: 192, height: "auto" }}
            exit={{ opacity: 0, width: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-0 right-0 translate-y-full flex flex-col max-w-[calc(100svw-8px)] p-2 bg-zinc-200 rounded-2xl overflow-hidden"
          >
            <span className="flex items-center h-10 px-1 font-semibold">
              Login as
            </span>

            <div className="py-2 px-1 rounded-xl transition-all hover:pl-3 hover:bg-zinc-300 cursor-pointer">
              <span>Owner</span>
            </div>

            <div className="py-2 px-1 rounded-xl transition-all hover:pl-3 hover:bg-zinc-300 cursor-pointer">
              <span>Customer</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
};

const SPARKS = [
  { angle: 0, x: 0, y: -38, delay: 0, size: 7 },
  { angle: 22, x: 16, y: -34, delay: 0.05, size: 4 },
  { angle: 45, x: 32, y: -32, delay: 0.08, size: 5 },
  { angle: 67, x: 38, y: -16, delay: 0.02, size: 4 },
  { angle: 90, x: 42, y: 0, delay: 0.04, size: 8 },
  { angle: 112, x: 36, y: 18, delay: 0.1, size: 4 },
  { angle: 135, x: 32, y: 32, delay: 0.12, size: 5 },
  { angle: 157, x: 16, y: 38, delay: 0.06, size: 4 },
  { angle: 180, x: 0, y: 42, delay: 0, size: 7 },
  { angle: 202, x: -18, y: 36, delay: 0.09, size: 4 },
  { angle: 225, x: -32, y: 32, delay: 0.08, size: 6 },
  { angle: 247, x: -38, y: 14, delay: 0.03, size: 4 },
  { angle: 270, x: -42, y: 0, delay: 0.12, size: 5 },
  { angle: 292, x: -36, y: -18, delay: 0.07, size: 4 },
  { angle: 315, x: -32, y: -32, delay: 0, size: 8 },
  { angle: 337, x: -14, y: -38, delay: 0.11, size: 4 },
];

const QrScanButton = () => {
  const [key, setKey] = useState(0);

  const fire = () => setKey((k) => k + 1);

  return (
    <div
      className="relative w-9 h-9 md:w-11 md:h-11 p-1 md:p-2 rounded-full transition-all cursor-pointer hover:bg-orange-400/30"
      onMouseEnter={fire}
      onMouseDown={fire}
      onTouchStart={fire}
    >
      <CartIcon className="w-full h-full text-orange-500" />

      <AnimatePresence>
        {SPARKS.map((s, i) => (
          <motion.div
            key={`${key}-${i}`}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: s.x, y: s.y, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.45, delay: s.delay, ease: "easeOut" }}
            style={{
              rotate: s.angle,
              borderLeftWidth: s.size / 2,
              borderRightWidth: s.size / 2,
              borderBottomWidth: s.size,
            }}
            className="absolute left-1/2 top-1/2 -ml-1 -mt-1 w-0 h-0
          border-l-[4px] border-r-[4px] border-b-[7px]
          border-l-transparent border-r-transparent border-b-orange-400
          pointer-events-none"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Header;
