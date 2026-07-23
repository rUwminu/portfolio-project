import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ". Ray | Works",
  description: "Portfolio of Ray, all project works",
  keywords: ["Ray Goh Chen Yi", "Resume", "Portfolio", "Projects", "Works"],
};

const WorksLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default WorksLayout;
