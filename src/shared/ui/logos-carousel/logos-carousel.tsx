"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styles from "./logos-carousel.module.scss";

interface Logo {
  id: number;
  name: string;
  image: string;
}

interface LogosCarouselProps {
  logos: Logo[];
}

export function LogosCarousel({ logos }: LogosCarouselProps) {
  if (!logos.length) return null;

  return (
    <div className={styles.carousel}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={24}
        loop
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
      >
        {logos.map((logo) => (
          <SwiperSlide key={logo.id}>
            <div className={styles.logoItem}>
              <Image
                src={logo.image}
                alt={logo.name}
                width={140}
                height={60}
                className={styles.logoImage}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
