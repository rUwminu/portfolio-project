"use client";

import React from "react";
import Header from "../_components/sections/Header";
import Footer from "../_components/Footer";

const BillionBoardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-x-hidden bg-zinc-900">
      <Header />

      {children}

      <Footer />
    </div>
  );
};

export default BillionBoardlayout;
