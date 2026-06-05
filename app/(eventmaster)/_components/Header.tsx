"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserButton } from "@neondatabase/auth/react";

const Header = () => {
  const router = useRouter();

  return (
    <header
      className="absolute top-0 left-0 w-full  z-100"
      // style={{ borderColor: "blue" }}
    >
      <div className="flex items-center justify-between h-16 w-full max-w-7xl px-4 mx-auto">
        <Link
          href={"/eventmaster"}
          className="text-base text-zinc-900 font-semibold tracking-wide"
        >
          Event Master
        </Link>

        <nav className="flex items-center gap-2 md:gap-4">
          <Link
            href={"/eventmaster/dashboard"}
            className="text-sm text-zinc-900 font-medium"
          >
            Dashboard
          </Link>

          <div
            onClick={(e) => {
              // Intercept clicks on account-related links
              const target = e.target as HTMLElement;
              const link = target.closest("a");

              if (link) {
                const href = link.getAttribute("href");
                if (href?.startsWith("/account")) {
                  e.preventDefault();
                  router.push(`/eventmaster${href}`);
                }
              }
            }}
          >
            <UserButton size={"icon"} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
