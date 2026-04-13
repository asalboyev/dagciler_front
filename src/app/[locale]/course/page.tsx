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
import Link from "next/link";
import { useBookingModal } from "@/shared/lib/booking-modal";

export default function CoursePage() {
  const { data } = useAboutSchool()
  const t = useTranslations('main')
  const { open } = useBookingModal()
  return (
    <div className="pageOffset">
      <div className="container">
        <DynamicPageBanner
          title={`${data?.title}`}
          subtitle={`${data?.subtitle}`}
          bannerImage={`${data?.image ? data?.image : ""}`}
        >
          <Button variant="red" size="lg" className={`${styles.btn}`} onClick={() => open({ variant: "call" })}>
            {t('course-btn')}
          </Button>
          <Link href={"#schedule"}>
            <Button
              variant="outline"
              size="lg"
              className={`${styles.btn} ${styles.outlineBtn}`}
            >
              {t('schedule-button')}
            </Button>
          </Link>
        </DynamicPageBanner>
      </div>
      <CourseDetail />
      <PricingSection isContact />
      <div id="schedule">
        <ScheduleSection />
      </div>
      <FaqSection />
    </div>
  );
}
