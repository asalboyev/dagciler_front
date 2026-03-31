"use client";

import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useBanners } from "@/entities/banner";
import type { Banner } from "@/entities/banner";
import { useBookingModal } from "@/shared/lib/booking-modal";
import { useFilials } from "@/entities/filial";
import { pickLocale } from "@/shared/lib/i18n/locale-string";
import { useLocale } from "@/shared/lib/i18n/use-locale";
import { getFallbackImage } from "@/shared/lib/responsive-images";
import { Button } from "@/shared/ui/button";
import { LocationIcon } from "@/shared/ui/icons";
import { Skeleton } from "@/shared/ui/skeleton";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./hero.module.scss";
import { HtmlContent } from "@/shared/ui/html-content";
import Link from "next/link";

function getYouTubeEmbedUrl(url: string): string | null {
  let videoId: string | null = null;
  try {
    const u = new URL(url);
    if (u.pathname.startsWith("/embed/")) {
      videoId = u.pathname.split("/embed/")[1]?.split(/[?/]/)[0] ?? null;
    } else if (u.hostname === "youtu.be") {
      videoId = u.pathname.slice(1).split(/[?/]/)[0] ?? null;
    } else if (u.searchParams.has("v")) {
      videoId = u.searchParams.get("v");
    } else if (u.pathname.includes("/shorts/")) {
      videoId = u.pathname.split("/shorts/")[1]?.split(/[?/]/)[0] ?? null;
    }
  } catch {
    return null;
  }
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`;
}

function BannerBackground({ banner }: { banner: Banner }) {
  // Priority: uploaded video → YouTube URL → image
  if (banner.video_url) {
    return (
      <div className={styles.slide}>
        <video
          src={banner.video_url}
          autoPlay
          muted
          loop
          playsInline
          className={styles.heroVideo}
        />
        <div className={styles.overlay} />
      </div>
    );
  }

  const youtubeUrl = banner.link ? getYouTubeEmbedUrl(banner.link) : null;
  if (youtubeUrl) {
    return (
      <div className={styles.slide}>
        <iframe
          src={youtubeUrl}
          className={styles.heroVideo}
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          style={{ border: 0 }}
          title={banner.title}
        />
        <div className={styles.overlay} />
      </div>
    );
  }

  const imgSrc = getFallbackImage(banner.image);
  return (
    <div
      className={styles.slide}
      style={imgSrc ? { backgroundImage: `url(${imgSrc})` } : undefined}
    >
      <div className={styles.overlay} />
    </div>
  );
}

export function Hero() {
  const tMain = useTranslations("main");
  const tBanner = useTranslations("banner");
  const locale = useLocale();
  const { data: banners, isPending: bannersPending } = useBanners();
  const { data: filials } = useFilials();
  const { open: openBooking } = useBookingModal();

  if (bannersPending) {
    return <div className={styles.hero}><Skeleton height="100vh" borderRadius="0" /></div>;
  }

  const hasBanners = banners && banners.length > 0;
  const firstBanner = hasBanners ? banners[0] : null;

  return (
    <section className={styles.hero}>
      {hasBanners ? (
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true, el: `.${styles.pagination}` }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className={styles.swiper}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <BannerBackground banner={banner} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}

      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.textBlock}>
            {firstBanner?.title && <h1 className={styles.title}>{firstBanner.title}</h1>}
            {firstBanner?.description && (
              <p className={styles.subtitle}>
                <HtmlContent html={firstBanner.description} style={{ color: "white" }} />
              </p>
            )}
          </div>

          <div className={styles.buttons}>
            <Button variant="red" size="lg" className={styles.btnPrimary} onClick={() => openBooking()}>
              {tMain("button-course")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={styles.btnOutline}
              onClick={() => {
                const el = document.getElementById("schedule");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {tMain("schedule-button")}
            </Button>
          </div>

          <div className={styles.bottomRow}>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{tBanner("years-num")}</span>
                <span className={styles.statLabel}>{tBanner("years-tex")}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{tBanner("students-num")}</span>
                <span className={styles.statLabel}>{tBanner("students-tex")}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{tBanner("teacher-num")}</span>
                <span className={styles.statLabel}>{tBanner("teacher-tex")}</span>
              </div>
            </div>

            {filials && filials.length > 0 && (
              <div className={styles.branches}>
                {filials.map((filial) => (
                  <Link key={filial.id} href={`${filial.location}`} target="_blank" className={styles.branchItem}>
                    <LocationIcon size={20} />
                    <div className={styles.branchText}>
                      <span className={styles.branchLabel}>{tMain("filial-tex")}</span>
                      <span className={styles.branchName}>
                        {pickLocale(filial.rayon, locale)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.pagination} />
    </section>
  );
}
