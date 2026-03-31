"use client";

import type { ReactNode } from "react";
import { useBanners } from "@/entities/banner";
import { PageBanner } from "./page-banner";

interface DynamicPageBannerProps {
  title: string;
  subtitle: string;
  bannerImage?: string;
  children?: ReactNode;
}

export function DynamicPageBanner({ title, subtitle, children, bannerImage }: DynamicPageBannerProps) {
  const { data: banners } = useBanners();
  const banner = banners?.[0];
  const image = bannerImage ? bannerImage : (banner?.image?.lg ?? banner?.image?.md ?? banner?.image?.sm ?? null);
  return (
    <PageBanner image={image} title={title} subtitle={subtitle}>
      {children}
    </PageBanner>
  );
}
