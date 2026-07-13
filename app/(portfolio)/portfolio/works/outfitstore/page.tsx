import React from "react";

import ProjectPreviewPage from "@/app/(portfolio)/_components/ProjectPreviewPage";

import img1 from "@/app/(portfolio)/_assets/projects/outfit-store-site-1.png";
import img2 from "@/app/(portfolio)/_assets/projects/outfit-store-site-2.png";
import img3 from "@/app/(portfolio)/_assets/projects/outfit-store-site-3.png";

const Page = () => {
  const project = {
    name: "Outfit",
    year: "2026",
    tools: ["React.Js", "Next.Js", "Redux", "UI", "UX", "Tailwind css", "Gsap"],
    summary:
      "Designed and developed a minimalist streetwear ecommerce storefront with GSAP-driven micro-interactions — slot-reveal typography, scroll-triggered product grids, and odometer-style animated pricing — backed by a Redux-managed cart and a Next.js App Router architecture built for a future headless commerce API.",
    siteUrl: "https://outfit-store-nu.vercel.app/",
    imageOne: img1.src,
    imageTwo: img2.src,
    imageThree: img3.src,
    video: "/portfolio/videos/outfit-store-site-demo.mp4",
  };

  return (
    <>
      <ProjectPreviewPage {...project} />
    </>
  );
};

export default Page;
