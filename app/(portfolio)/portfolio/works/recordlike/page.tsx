import React from "react";

import ProjectPreviewPage from "@/app/(portfolio)/_components/ProjectPreviewPage";

import img1 from "@/app/(portfolio)/_assets/projects/rlike-site-1.png";
import img2 from "@/app/(portfolio)/_assets/projects/rlike-site-2.png";
import img3 from "@/app/(portfolio)/_assets/projects/rlike-site-3.png";

const Page = () => {
  const project = {
    name: "Record Like",
    year: "2026",
    tools: ["React.Js", "Next.Js", "UI", "UX", "Tailwind css", "Motion.Js"],
    summary:
      "Designed and developed a visually engaging product experience with award-winning style animations showcases, emphasizing key features and brand value.",
    siteUrl: "/stanlybottle",
    imageOne: img1.src,
    imageTwo: img2.src,
    imageThree: img3.src,
    video: "/portfolio/videos/rlike-site-demo.mp4",
  };

  return (
    <>
      <ProjectPreviewPage {...project} />
    </>
  );
};

export default Page;
