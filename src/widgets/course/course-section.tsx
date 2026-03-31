"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAboutCourse } from "@/entities/about-course";
import { HtmlContent } from "@/shared/ui/html-content";
import { Button } from "@/shared/ui/button";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";
import { useBookingModal } from "@/shared/lib/booking-modal";
import styles from "./course-section.module.scss";
import Link from "next/link";

function isContentEmpty(html: string | null | undefined): boolean {
  if (!html) return true;
  return html.replace(/<[^>]*>/g, "")?.replace(/&nbsp;/g, "").trim() === "";
}

export function CourseSection() {
  const tMain = useTranslations("main");
  const tForma = useTranslations("forma");
  const tPopup = useTranslations("popup");
  const { data: course } = useAboutCourse();
  const { open: openBooking } = useBookingModal();

  const hasContent = !isContentEmpty(course?.content);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <AnimateOnScroll>
          <div className={styles.card}>
            {course?.image && (
              <div className={styles.imageWrapper}>
                <Image
                  src={course.image}
                  alt={course.title ?? ""}
                  fill
                  sizes="(max-width: 1024px) 100vw, 367px"
                  className={styles.image}
                />
              </div>
            )}

            <div className={styles.content}>
              <p className={styles.eyebrow}>{tMain("course-title")}</p>
              {course?.title && <h2 className={styles.title}>{course.title}</h2>}
              {course?.subtitle && <p className={styles.description}>{course.subtitle}</p>}

              {hasContent && (
                <>
                  <h3 className={styles.featuresHeading}>{tMain("program-includes")}</h3>
                  <HtmlContent html={course!.content!} className={styles.featuresList} />
                </>
              )}

              <div className={styles.buttons}>
                <Link href={'#pricing'} className={styles.costBtn}>
                  <Button variant="red" size="lg" className={styles.btnCost}>
                    {tForma("course-button1")}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className={styles.btnEnroll}
                  onClick={() => openBooking({
                    variant: "course",
                    title: tPopup("title3"),
                    subtitle: tPopup("subtile3"),
                  })}
                >
                  {tForma("course-button2")}
                </Button>
              </div>

              <div className={styles.logoBadge}>
                <Image src="/images/logo.png" alt="Dagcilfer" width={120} height={120} />
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
