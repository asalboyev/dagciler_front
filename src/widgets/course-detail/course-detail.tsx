"use client";

import { useAboutCourse } from "@/entities/about-course";
import { HtmlContent } from "@/shared/ui/html-content";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";
import styles from "./course-detail.module.scss";
import { useAboutSchool } from "@/entities/about-school";
import { useSiteInfo } from "@/entities/siteinfo";
import { useTranslations } from "next-intl";

function isContentEmpty(html: string | null | undefined): boolean {
  if (!html) return true;
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim() === "";
}

export function CourseDetail() {
  const { data: course } = useAboutCourse();
  const { data: school } = useAboutSchool()
  const { data: siteInfo } = useSiteInfo()
  const t = useTranslations('main')
  console.log(siteInfo)
  const hasContent = !isContentEmpty(course?.content);

  return (
    <>
      {(course?.title || course?.subtitle) && (
        <section className={styles.about}>
          <div className={styles.container}>
            <AnimateOnScroll>
              <div className={styles.aboutInner}>
                {course.title && <h2 className={styles.aboutTitle}>{t('course-title')}</h2>}
                {/* {course.subtitle && <p className={styles.aboutText}>{course.subtitle}</p>} */}
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {hasContent && (
        <section className={styles.features}>
          <div className={styles.container}>
            <AnimateOnScroll>
              <HtmlContent html={school!?.content1!} className={styles.featuresGrid} />
            </AnimateOnScroll>
          </div>
          <div className={styles.container}>
            <AnimateOnScroll>
              <HtmlContent html={school!.content2!} className={`${styles.featuresGrid} ${styles.stagesGrid}`} />
            </AnimateOnScroll>
          </div>
        </section>
      )}
    </>
  );
}
