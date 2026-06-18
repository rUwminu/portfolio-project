import React from "react";

import ProjectPreviewPage from "@/app/(portfolio)/_components/ProjectPreviewPage";

import img1 from "@/app/(portfolio)/_assets/projects/nine-kitchen-site-1.png";
import img2 from "@/app/(portfolio)/_assets/projects/nine-kitchen-site-2.png";
import img3 from "@/app/(portfolio)/_assets/projects/nine-kitchen-site-3.png";

const Page = () => {
  const project = {
    name: "9 Kitchen",
    year: "2026",
    tools: ["React.Js", "Next.Js", "UI", "UX", "Tailwind css", "Gsap"],
    summary:
      "Crafted a visually rich digital experience that highlights the restaurant’s culinary identity, achievements, and subscription offerings through dynamic storytelling, interactive animations, and an engaging user journey.",
    siteUrl: "/ninekitchen",
    imageOne: img1.src,
    imageTwo: img2.src,
    imageThree: img3.src,
    video: "/portfolio/videos/nine-kitchen-site-demo.mp4",
  };

  return (
    <>
      <ProjectPreviewPage {...project} />
    </>
  );
};

export default Page;
