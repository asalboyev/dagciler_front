"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useVideos } from "@/entities/video";
import type { Video } from "@/entities/video";
import { useBookingModal } from "@/shared/lib/booking-modal";
import { useSiteInfo } from "@/entities/siteinfo";
import { TelegramIcon, InstagramIcon } from "@/shared/ui/icons";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";
import styles from "./about-section.module.scss";

function normalizeSocial(value: string, platform: "telegram" | "instagram"): string {
  if (value.startsWith("http")) return value;
  if (platform === "telegram") return `https://t.me/${value?.replace("@", "")}`;
  return `https://instagram.com/${value?.replace("@", "")}`;
}

/* ── Helpers ──────────────────────────────────────────── */

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/shorts\/([^?&/]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?&/]+)/,
    /youtube\.com\/embed\/([^?&/]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function getYouTubeEmbedUrl(url: string): string | null {
  const id = extractYouTubeId(url);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=${id}&playsinline=1&showinfo=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0`;
}

/* ── Component ────────────────────────────────────────── */

export function AboutSection() {
  const tMain = useTranslations("main");
  const tForma = useTranslations("forma");
  const { data: videos, isPending } = useVideos();
  const { open: openBooking } = useBookingModal();
  const { data: siteInfo } = useSiteInfo();

  const telegramHref = tMain("telegram-username")
  const instagramHref = siteInfo?.instagram
    ? normalizeSocial(siteInfo.instagram, "instagram")
    : null;

  const socials = [
    ...(telegramHref ? [{ name: tMain("telegram"), label: tMain("telegram-tex"), icon: TelegramIcon, href: `https://t.me/${telegramHref.split("@")?.[1]}`, color: "#D41B2C" }] : []),
    ...(instagramHref ? [{ name: tMain("instagarm"), label: tMain("instagarm-tex"), icon: InstagramIcon, href: instagramHref, color: "#D41B2C" }] : []),
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header row */}
        <AnimateOnScroll>
          <div className={styles.header}>
            <div className={styles.headerText}>
              <p className={styles.eyebrow}>{tMain("blok-title1")}</p>
              <h2 className={styles.title}>
                {tMain("blcok-subtile2")}
              </h2>
            </div>

            <div className={styles.socials}>
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialItem}
                >
                  <social.icon size={20} />
                  <div className={styles.socialTop}>
                    <span
                      className={styles.socialName}
                      style={{ color: social.color }}
                    >
                      {social.name}
                    </span>
                    <span className={styles.socialLabel}>{social.label}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Cards grid */}
        <div className={styles.cards}>
          {isPending
            ? [0, 1, 2, 3].map((i) => (
                <Skeleton key={i} height="520px" borderRadius="8px" />
              ))
            : videos?.map((video, i) => (
                <AnimateOnScroll
                  key={video.id}
                  delay={i * 0.1}
                  className={styles.animateWrapper}
                >
                  <VideoCard video={video} telegramHref={telegramHref} />
                </AnimateOnScroll>
              ))}
        </div>

        {/* CTA banner */}
        <AnimateOnScroll>
          <div className={styles.ctaBanner}>
            <div className={styles.ctaText}>
              <h3 className={styles.ctaTitle}>
                {tForma("title")}
              </h3>
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
    </section>
  );
}

/* ── Video Card ───────────────────────────────────────── */

function VideoCard({ video, telegramHref }: { video: Video; telegramHref: string | null }) {
  const tMain = useTranslations("main");

  const hasServerVideo = !!video.videoUrl;
  const youtubeEmbedUrl = video.url ? getYouTubeEmbedUrl(video.url) : null;

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        {/* Server-uploaded video */}
        {hasServerVideo && (
          <video
            src={video.videoUrl!}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            className={`${styles.cardVideo} ${styles.cardVideoActive}`}
          />
        )}

        {/* YouTube video */}
        {!hasServerVideo && youtubeEmbedUrl && (
          <iframe
            src={youtubeEmbedUrl}
            className={styles.cardIframe}
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            title={video.title}
          />
        )}

        <div className={styles.cardOverlay} />
        <span className={styles.cardTitle}>{video.title}</span>

        {telegramHref && (
          <a
            href={telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.telegramButton}
          >
            {tMain("telegram-button")} <TelegramIcon size={20} fill="#fff" />
          </a>
        )}
      </div>
      <AboutCardDescription text={`${video.subtitle}`} />
    </div>
  );
}

/* ── Card Description with show more/less ─────────────── */

function AboutCardDescription({ text }: { text: string }) {
  const tMain = useTranslations("main");
  const [expanded, setExpanded] = useState(false);
  const [truncatedText, setTruncatedText] = useState<string | null>(null);
  const measureRef = useRef<HTMLParagraphElement>(null);
  const fullRef = useRef<HTMLParagraphElement>(null);
  const moreTex = tMain("more-tex");

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    if (el.scrollHeight <= el.clientHeight) {
      setTruncatedText(null);
      return;
    }

    const btnText = moreTex;
    let lo = 0;
    let hi = text.length;

    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      el.textContent = text.slice(0, mid) + btnText;
      if (el.scrollHeight > el.clientHeight) {
        hi = mid - 1;
      } else {
        lo = mid;
      }
    }

    el.textContent = text;
    setTruncatedText(text.slice(0, lo));
  }, [text]);

  const isClamped = truncatedText !== null;

  return (
    <div className={styles.cardDescriptionWrap}>
      <p
        ref={measureRef}
        className={`${styles.cardDescription} ${styles.cardDescriptionClamped} ${styles.measureHidden}`}
      >
        {text}
      </p>

      <p ref={fullRef} className={styles.cardDescription}>
        {!expanded && isClamped ? truncatedText : text}
        {isClamped && (
          <button
            className={styles.showMoreBtn}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? tMain("hide-tex") : moreTex}
          </button>
        )}
      </p>
    </div>
  );
}
