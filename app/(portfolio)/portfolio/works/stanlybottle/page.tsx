import React from "react";

import ProjectPreviewPage from "@/app/(portfolio)/_components/ProjectPreviewPage";

import img1 from "@/app/(portfolio)/_assets/projects/stanly-bottle-site-1.png";
import img2 from "@/app/(portfolio)/_assets/projects/stanly-bottle-site-2.png";
import img3 from "@/app/(portfolio)/_assets/projects/stanly-bottle-site-3.png";

const Page = () => {
  const project = {
    name: "Stanly Bottle",
    year: "2026",
    tools: [
      "React.Js",
      "Next.Js",
      "UI",
      "UX",
      "Tailwind css",
      "Gsap",
      "Three.Js",
      "3D Model",
    ],
    summary:
      "Designed and developed a visually engaging product experience with award-winning style animations and 3D product showcases, emphasizing key features and brand value.",
    siteUrl: "/stanlybottle",
    imageOne: img1.src,
    imageTwo: img2.src,
    imageThree: img3.src,
    video: "/portfolio/videos/stanly-bottle-site-demo.mp4",
  };

  return (
    <>
      <ProjectPreviewPage {...project} />
    </>
  );
};

export default Page;
