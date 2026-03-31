"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useFeedbacks } from "@/entities/feedback";
import type { Feedback } from "@/entities/feedback";
import { useBookingModal } from "@/shared/lib/booking-modal";
import { Button } from "@/shared/ui/button";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";
import { Skeleton } from "@/shared/ui/skeleton";
import "swiper/css";
import styles from "./reviews-section.module.scss";

function extractInstagramPath(url: string): string | null {
  const m = url.match(/instagram\.com\/(reel|p)\/([^/?]+)/);
  return m ? `/${m[1]}/${m[2]}` : null;
}

function ReviewCard({ feedback }: { feedback: Feedback }) {
  const path = extractInstagramPath(feedback.url);
  if (!path) return null;

  return (
    <div className={styles.card}>
      <iframe
        src={`https://www.instagram.com${path}/embed/`}
        className={styles.cardEmbed}
        allowFullScreen
        title="Instagram reel"
        style={{ overflow: "hidden" }}
      />
    </div>
  );
}

export function ReviewsSection() {
  const t = useTranslations("main");
  const swiperRef = useRef<SwiperType | null>(null);
  const { data: feedbacks, isPending } = useFeedbacks();
  const { open: openBooking } = useBookingModal();

  if (isPending) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div style={{ display: "flex", gap: 12 }}>
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} height="480px" width="268px" borderRadius="12px" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!feedbacks?.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <AnimateOnScroll>
          <div className={styles.header}>
            <div className={styles.headerText}>
              <h2 className={styles.title}>{t("comment-title")}</h2>
              <p className={styles.subtitle}>
                {t("reviews-subtitle")}
              </p>
            </div>

            <div className={styles.nav}>
              <button
                className={styles.navBtn}
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label={t("prev-review")}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 12L6 8l4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                className={styles.navBtn}
                onClick={() => swiperRef.current?.slideNext()}
                aria-label={t("next-review")}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </AnimateOnScroll>

        <Swiper
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={11}
          className={styles.carousel}
        >
          {feedbacks.map((feedback, i) => (
            <SwiperSlide key={feedback.id} className={styles.slide}>
              <AnimateOnScroll delay={i * 0.05}>
                <ReviewCard feedback={feedback} />
              </AnimateOnScroll>
            </SwiperSlide>
          ))}
        </Swiper>

        <AnimateOnScroll>
          <Button variant="red" size="lg" className={styles.btn} onClick={() => openBooking()}>
            {t("button-course")}
          </Button>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
