"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";
import styles from "./about-content.module.scss";
import { Button } from "@/shared/ui/button";
import { useBookingModal } from "@/shared/lib/booking-modal";
import { useSiteInfo } from "@/entities/siteinfo";
import { useMembers } from "@/entities/member";
import { getFallbackImage } from "@/shared/lib/responsive-images";
import { HtmlContent } from "@/shared/ui/html-content";
import Link from "next/link";
import "swiper/css";

function isHtmlEmpty(html: string | null | undefined): boolean {
  if (!html) return true;
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim() === "";
}

function normalizeSocial(value: string, platform: "telegram" | "instagram"): string {
  if (value.startsWith("http")) return value;
  if (platform === "telegram") return `https://t.me/${value.replace("@", "")}`;
  return `https://instagram.com/${value.replace("@", "")}`;
}

export function AboutContent() {
  const tForma = useTranslations("forma");
  const tMain = useTranslations("main");
  const { open: openBooking } = useBookingModal();
  const { data: siteInfo } = useSiteInfo();
  const { data: members } = useMembers();

  const telegramHref = siteInfo?.telegram ? normalizeSocial(siteInfo.telegram, "telegram") : null;

  const historySection = siteInfo?.about_sections?.[0] ?? null;
  const atmosphereSection = siteInfo?.about_sections?.[1] ?? null;
  const gallerySection = siteInfo?.about_sections?.[2] ?? null;

  const school = siteInfo?.about_schools?.[0] ?? null;

  const hasHistoryContent = !isHtmlEmpty(school?.content1);
  const hasAtmosphereContent = !isHtmlEmpty(atmosphereSection?.desc);
  const hasHistory = hasHistoryContent || !!historySection?.title;
  const atmosphereImages = atmosphereSection?.images ?? [];
  const hasAtmosphere = hasAtmosphereContent || !!atmosphereSection?.title || atmosphereImages.length > 0;

  const galleryImages = gallerySection?.images ?? [];
  const hasGalleryDesc = !isHtmlEmpty(gallerySection?.desc);
  const hasGallery = !!gallerySection?.title || galleryImages.length > 0 || hasGalleryDesc;

  return (
    <div className={styles.wrapper}>

      {hasHistory && (
        <AnimateOnScroll>
          <section className={styles.history}>
            <div className={styles.historyHeader}>
              {/* {historySection?.title && <h2 className={styles.sectionTitle}>{historySection.title}</h2>} */}
              {/* {historySection?.subtitle && <p className={styles.eyebrow}>{historySection.subtitle}</p>} */}
              <HtmlContent html={`${historySection?.desc}`} className={styles.historyHtml} />
            </div>
            {/* {hasHistoryContent && (
              <div className={styles.historyBody}>
                <HtmlContent html={school!.content1!} className={styles.historyHtml} />
              </div>
            )} */}
          </section>
        </AnimateOnScroll>
      )}

      {hasAtmosphere && (
        <AnimateOnScroll>
          <section className={styles.atmosphere}>
            {(atmosphereSection?.title || atmosphereSection?.subtitle) && (
              <div className={styles.atmosphereHeader}>
                {atmosphereSection.title && <h2 className={styles.sectionTitle}>{atmosphereSection.title}</h2>}
                {atmosphereSection.subtitle && <p className={styles.atmosphereSubtitle}>{atmosphereSection.subtitle}</p>}
              </div>
            )}

            {atmosphereImages.length > 0 && (
              <div className={styles.atmosphereImages}>
                {atmosphereImages.map((src, i) => (
                  <div key={i} className={styles.atmosphereImageWrapper}>
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 417px"
                      className={styles.atmosphereImage}
                    />
                  </div>
                ))}
              </div>
            )}

            {hasAtmosphereContent && (
              <div className={styles.atmosphereTexts}>
                <HtmlContent html={atmosphereSection!.desc!} className={styles.atmosphereHtml} />
              </div>
            )}
          </section>
        </AnimateOnScroll>
      )}

      {members && members.length > 0 && (
        <AnimateOnScroll>
          <section className={styles.teachers}>
            <div className={styles.teachersHeader}>
              <h2 className={styles.sectionTitle}>{tMain("our-teacher-title")}</h2>
              <p className={styles.teachersSubtitle}>{tMain("our-teacher-subtitle")}</p>
            </div>
            <Swiper
              modules={[Autoplay]}
              slidesPerView={4}
              spaceBetween={16}
              loop
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              className={styles.teachersCarousel}
              breakpoints={{
                0: { slidesPerView: 1.2 },
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {members.map((member) => {
                const imgSrc = member.photo_url ?? getFallbackImage(member.image);
                return (
                  <SwiperSlide key={member.id} className={styles.teacherSlide}>
                    <div className={styles.teacherCard}>
                      <div className={styles.teacherImageWrapper}>
                        {imgSrc && (
                          <Image
                            src={imgSrc}
                            alt={member.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 308px"
                            className={styles.teacherImage}
                          />
                        )}
                        <div className={styles.teacherBadge}>
                          <Image src="/logo.svg" alt="" width={36} height={36} />
                        </div>
                      </div>
                      <div className={styles.teacherInfo}>
                        <span className={styles.teacherName}>{member.name}</span>
                        <span className={styles.teacherRole}>{member.position}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </section>
        </AnimateOnScroll>
      )}

      {/* <AnimateOnScroll>
        <Link href={'/#schedule'} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button variant="light" size="lg" className={styles.btn}>
            {tMain("schedule-button")}
          </Button>
        </Link>
      </AnimateOnScroll> */}

      {hasGallery && (
        <AnimateOnScroll>
          <section className={styles.gallery}>
            <div className={styles.galleryTop}>
              {(gallerySection?.title || gallerySection?.subtitle) && (
                <div className={styles.galleryHeader}>
                  {gallerySection.title && <h2 className={styles.sectionTitle}>{gallerySection.title}</h2>}
                  {gallerySection.subtitle && <p className={styles.gallerySubtitle}>{gallerySection.subtitle}</p>}
                </div>
              )}
              {hasGalleryDesc && (
                <div className={styles.galleryTexts}>
                  <HtmlContent html={gallerySection!.desc!} className={styles.galleryText} />
                </div>
              )}
            </div>

            {galleryImages.length > 0 && (
              <div className={styles.galleryGrid}>
                {galleryImages.map((src, i) => (
                  <div key={i} className={styles.galleryImageWrapper}>
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 417px"
                      className={styles.galleryImage}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </AnimateOnScroll>
      )}

      <AnimateOnScroll>
        <p className={styles.bannerTitle}>{tMain("scholl-page-text")}</p>
        <div className={styles.ctaBanner}>
          <div className={styles.ctaText}>
            <h3 className={styles.ctaTitle}>{tForma("title")}</h3>
            <p className={styles.ctaSubtitle}>
              {tForma("subtitle")}
            </p>
          </div>
          <div className={styles.ctaButtons}>
            <Button variant="red" size="lg" className={styles.ctaBtnPrimary} onClick={() => openBooking()}>
              {tForma("button1")}
            </Button>
            {telegramHref && (
              <Button
                variant="outline"
                size="lg"
                className={styles.ctaBtnOutline}
                onClick={() => window.open(telegramHref, "_blank", "noopener,noreferrer")}
              >
                {tForma("button2")}
              </Button>
            )}
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  );
}
