import HeroSection from "../_sections/HeroSection";
import MessageSection from "../_sections/MessageSection";
import FlavorSection from "../_sections/FlavorSection";

const page = () => {
  return (
    <>
      <HeroSection />

      <MessageSection />

      <FlavorSection />

      <div className="h-dvh border border-red-600"></div>
    </>
  );
};

export default page;
