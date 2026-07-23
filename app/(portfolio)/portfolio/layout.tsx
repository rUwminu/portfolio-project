import type { Metadata } from "next";
import { PortfolioProvider } from "../_context/PortfolioContext";

import GsapProvider from "../_components/GsapProvider";
import Header from "../_components/Header";
import Navigation from "../_components/Navigation";
import Footer from "../_components/Footer";

export const metadata: Metadata = {
  title: ". Ray",
  description: "Portfolio of Ray, a software engineer",
  keywords: ["Ray Goh Chen Yi", "Resume", "Portfolio", "Projects", "Works"],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: ". Ray",
    description: "Portfolio of Ray, a software engineer",
    url: "/portfolio",
    siteName: ". Ray",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: ". Ray",
    description: "Portfolio of Ray, a software engineer",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ray Goh Chen Yi",
  jobTitle: "Software Engineer",
  url: "https://portfolio-project-dusky-eight.vercel.app/portfolio",
  sameAs: [
    "https://www.linkedin.com/in/ray-goh-chen-yi-76392b218/",
    "https://github.com/rUwminu",
  ],
};

const Portfoliolayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PortfolioProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

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
