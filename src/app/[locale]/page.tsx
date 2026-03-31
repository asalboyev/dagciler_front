import { Hero } from "@/widgets/hero";
import { AboutSection } from "@/widgets/about";
import { CourseSection } from "@/widgets/course";
import { PricingSection } from "@/widgets/pricing";
import { TeachersSection } from "@/widgets/teachers";
import { ReviewsSection } from "@/widgets/reviews";
import { ScheduleSection } from "@/widgets/schedule";
import { NewsSection } from "@/widgets/news";
import { ContactSection } from "@/widgets/contact-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div id="about"><AboutSection /></div>
      <div id="course"><CourseSection /></div>
      <div id="pricing"><PricingSection /></div>
      <div id="teachers"><TeachersSection /></div>
      <div id="reviews"><ReviewsSection /></div>
      <div id="news"><NewsSection /></div>
      <div id="schedule"><ScheduleSection /></div>
      <div id="contacts"><ContactSection isHome /></div>
    </>
  );
}
