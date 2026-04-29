import Image from "next/image";
import { usePathname } from "next/navigation";

// Icons
import SearchIcon from "@/assets/icons/Search.svg";
import PriceIcon from "@/assets/icons/Price.svg";
import UserIcon from "@/assets/icons/User.svg";

// Types
interface NavigationOption {
  name: string;
  route: string;
}

interface IconOptionProps {
  onClick?: () => void;
  icon: React.FC<React.SVGProps<SVGSVGElement>>; // static image src
}

const headerNavigationOption: NavigationOption[] = [
  { name: "Home", route: "/recordlike" },
  { name: "About Us", route: "/recordlike/about" },
  { name: "Our Services", route: "/recordlike/services" },
];

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="relative w-full max-w-7xl mx-auto flex items-center justify-between gap-4 py-12 z-10">
      <div className="text-2xl font-semibold">Record Like</div>

      <div className="flex items-center justify-center gap-6">
        {headerNavigationOption.map((option: NavigationOption) => {
          const { name, route } = option;
          const isActive = pathname === route;

          return (
            <div key={name} className="relative">
              <span className="font-semibold">{name}</span>
              {isActive && (
                <div className="absolute left-1/2 -bottom-2 w-2 h-2 rounded-full bg-orange-500" />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2">
        <IconOption icon={SearchIcon} />

        <IconOption icon={PriceIcon} />

        <IconOption icon={UserIcon} />
      </div>
    </div>
  );
};

const IconOption: React.FC<IconOptionProps> = ({
  onClick = () => null,
  icon: Icon,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 p-2 rounded-full cursor-pointer transition-all ease-in-out duration-500 hover:bg-gray-200"
    >
      <Icon className="w-full h-full" />
    </div>
  );
};

export default Header;
