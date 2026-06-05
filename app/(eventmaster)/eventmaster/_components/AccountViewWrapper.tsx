// app/(currentSite)/eventmaster/account/_components/AccountViewWrapper.tsx
"use client";

import { useRouter } from "next/navigation";
import { AccountView } from "@neondatabase/auth/react";

export function AccountViewWrapper({ pathname }: { pathname: string }) {
  const router = useRouter();

  return (
    <div
      onClick={(e) => {
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
      <AccountView pathname={pathname} />
    </div>
  );
}
