import React from "react";

import ProjectPreviewPage from "@/app/(portfolio)/_components/ProjectPreviewPage";

import img1 from "@/app/(portfolio)/_assets/projects/event-social-site-1.png";
import img2 from "@/app/(portfolio)/_assets/projects/event-social-site-2.png";
import img3 from "@/app/(portfolio)/_assets/projects/event-social-site-3.png";

const Page = () => {
  const project = {
    name: "EventSocial",
    year: "2026",
    tools: [
      "React.Js",
      "ReactNative.Js",
      "Next.Js",
      "Expo",
      "Nest.Js",
      "Postgres DB",
      "UI",
      "UX",
      "Tailwind css",
      "Gsap",
    ],
    summary:
      "Crafted a real-time event coordination platform that lets people create, invite, and join events seamlessly, powered by live notification alerts, secure session-based authentication, and role-based access controls for a smooth, collaborative user experience. a visually rich digital experience that highlights the restaurant’s culinary identity, achievements, and subscription offerings through dynamic storytelling, interactive animations, and an engaging user journey.",
    siteUrl: "/eventsocial",
    imageOne: img1.src,
    imageTwo: img2.src,
    imageThree: img3.src,
    video: "/portfolio/videos/event-social-site-demo.mp4",
  };

  return (
    <>
      <ProjectPreviewPage {...project} />
    </>
  );
};

export default Page;
