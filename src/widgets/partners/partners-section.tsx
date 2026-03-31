"use client";

import { usePartners } from "@/entities/partner";
import { Heading } from "@/shared/ui/heading";
import { LogosCarousel } from "@/shared/ui/logos-carousel";
import { getFallbackImage } from "@/shared/lib/responsive-images";
import styles from "./partners-section.module.scss";

export function PartnersSection() {
  const { data: partners } = usePartners();

  const logos =
    partners?.map((p) => ({
      id: p.id,
      name: p.name,
      image: getFallbackImage(p.image),
    })) ?? [];

  if (!logos.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Heading title="Our Partners" align="center" />
        <LogosCarousel logos={logos} />
      </div>
    </section>
  );
}
