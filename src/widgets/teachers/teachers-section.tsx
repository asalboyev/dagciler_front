"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useMembers } from "@/entities/member";
import { getFallbackImage } from "@/shared/lib/responsive-images";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";
import styles from "./teachers-section.module.scss";
import Link from "next/link";
import "swiper/css";

export function TeachersSection() {
  const t = useTranslations("main");
  const { data: members, isPending } = useMembers();

  if (isPending) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div style={{ display: "flex", gap: 12 }}>
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} height="380px" width="308px" borderRadius="12px" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!members?.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <AnimateOnScroll>
          <div className={styles.header}>
            <h2 className={styles.title}>{t("our-teacher-title")}</h2>
            <p className={styles.subtitle}>
              {t("our-teacher-subtitle")}
            </p>
          </div>
        </AnimateOnScroll>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={4}
          spaceBetween={16}
          loop
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className={styles.carousel}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {members.map((member, i) => {
            const imgSrc = member.photo_url ?? getFallbackImage(member.image);
            return (
              <SwiperSlide key={member.id} className={styles.slide}>
                <AnimateOnScroll delay={i * 0.1}>
                  <div className={styles.card}>
                    <div className={styles.imageWrapper}>
                      {imgSrc && (
                        <Image
                          src={imgSrc}
                          alt={member.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 308px"
                          className={styles.image}
                        />
                      )}
                      <div className={styles.badge}>
                        <Image src="/logo.svg" alt="" width={36} height={36} />
                      </div>
                    </div>
                    <div className={styles.info}>
                      <span className={styles.name}>{member.name}</span>
                      <span className={styles.role}>{member.position}</span>
                    </div>
                  </div>
                </AnimateOnScroll>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <AnimateOnScroll>
          <Link href={'#schedule'}>
            <Button variant="light" size="lg" className={styles.btn}>
              {t("schedule-button")}
            </Button>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
