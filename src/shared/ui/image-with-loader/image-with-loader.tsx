"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import styles from "./image-with-loader.module.scss";

interface ImageWithLoaderProps extends Omit<ImageProps, "onLoad"> {
  fallbackSrc?: string;
}

export function ImageWithLoader({
  fallbackSrc = "/images/placeholder.png",
  className = "",
  ...props
}: ImageWithLoaderProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {!loaded && <div className={styles.loader} />}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        {...props}
        src={error ? fallbackSrc : props.src}
        className={`${styles.image} ${loaded ? styles.visible : ""}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}
