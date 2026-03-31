'use client'
import { DynamicPageBanner } from "@/shared/ui/page-banner";
import { Button } from "@/shared/ui/button";
import { CourseDetail } from "@/widgets/course-detail";
import { PricingSection } from "@/widgets/pricing";
import { ScheduleSection } from "@/widgets/schedule";
import { FaqSection } from "@/widgets/faq";
import styles from "./page.module.scss";
import { useAboutSchool } from "@/entities/about-school";
import { useTranslations } from "next-intl";

export default function CoursePage() {
  const { data } = useAboutSchool()
  const t = useTranslations('main')
  return (
    <div className="pageOffset">
      <div className="container">
        <DynamicPageBanner
          title={`${data?.title}`}
          subtitle={`${data?.subtitle}`}
          bannerImage={`${data?.image ? data?.image : ""}`}
        >
          <Button variant="red" size="lg" className={`${styles.btn}`}>
            {t('course-btn')}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className={`${styles.btn} ${styles.outlineBtn}`}
          >
            {t('schedule-button')}
          </Button>
        </DynamicPageBanner>
      </div>
      <CourseDetail />
      <PricingSection isContact />
      <ScheduleSection />
      <FaqSection />
    </div>
  );
}
