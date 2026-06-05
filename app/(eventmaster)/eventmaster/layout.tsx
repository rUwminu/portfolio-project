"use client";

import React from "react";
import { authClient } from "@/lib/auth/client";
import { NeonAuthUIProvider } from "@neondatabase/auth/react";

import "./style.css";

import Header from "../_components/Header";

const EventMasterlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full h-dvh text-zinc-900">
      <NeonAuthUIProvider
        authClient={authClient}
        redirectTo="/eventmaster"
        basePath="/eventmaster/auth"
        defaultTheme="light"
        credentials={{ forgotPassword: true }}
        className="w-full h-full"
      >
        <Header />

        <div className="absolute bottom-40 left-1/2 -translate-x-7/8 w-96 lg:w-150 h-96 lg:h-150 rounded-full bg-[#b8d46a] blur-[140px] opacity-25" />

        {/* Red/orange blob — top right */}
        <div className="absolute top-20 left-2/3 -translate-x-1/4 w-44 h-44 lg:w-96 lg:h-96 rounded-full bg-[#f07040] blur-[120px] opacity-35" />

        <div className="relative flex flex-1 w-full max-w-7xl h-full pt-16 pb-4 md:pb-8 px-2 md:px-4 mx-auto z-50">
          {children}
        </div>
      </NeonAuthUIProvider>
    </div>
  );
};

export default EventMasterlayout;
