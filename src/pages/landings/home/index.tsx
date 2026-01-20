import CarouselSection from "./sections/carousel";
import { FeaturesSection } from "./sections/features";
import { AboutSection } from "./sections/about";
import { StatisticsSection } from "./sections/statistic";
import { ServicesExplore } from "./sections/our-service";
import { BookingSection } from "./sections/booking";
import { TestimonialSection } from "./sections/testimonial";
import ContactSection from "./sections/contact";

export default function LandingPage() {
  return (
    <>
      <CarouselSection />
      <div className="mt-36">
        <FeaturesSection />
        <AboutSection />
      </div>
      <StatisticsSection />
      <ServicesExplore />
      <BookingSection />
      <TestimonialSection />
      <ContactSection />
    </>
  );
}
