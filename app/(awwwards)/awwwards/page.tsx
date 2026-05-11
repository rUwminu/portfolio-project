import HeroSection from "../_sections/HeroSection";
import MessageSection from "../_sections/MessageSection";
import FlavorSection from "../_sections/FlavorSection";
import NutritionSection from "../_sections/NutritionSection";
import BenefitSection from "../_sections/BenefitSection";
import TestimonialSection from "../_sections/TestimonialSection";
import FooterSection from "../_sections/FooterSection";

const page = () => {
  return (
    <>
      <HeroSection />

      <MessageSection />

      <FlavorSection />

      <NutritionSection />

      <div>
        <BenefitSection />

        <TestimonialSection />
      </div>

      <FooterSection />
    </>
  );
};

export default page;
