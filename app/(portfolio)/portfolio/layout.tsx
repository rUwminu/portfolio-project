import type { Metadata } from "next";
import { PortfolioProvider } from "../_context/PortfolioContext";

import GsapProvider from "../_components/GsapProvider";
import Header from "../_components/Header";
import Navigation from "../_components/Navigation";
import Footer from "../_components/Footer";

export const metadata: Metadata = {
  title: ". Ray",
  description: "Portfolio of Ray, a software engineer",
};

const Portfoliolayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PortfolioProvider>
      <div className="relative w-full h-full bg-neutral-100">
        <Header />

        <Navigation />

        <GsapProvider>
          {children}

          <Footer />
        </GsapProvider>
      </div>
    </PortfolioProvider>
  );
};

export default Portfoliolayout;
