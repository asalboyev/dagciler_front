import { type ReactNode } from "react";
import styles from "./heading.module.scss";

interface HeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  children?: ReactNode;
}

export function Heading({
  title,
  subtitle,
  align = "left",
  children,
}: HeadingProps) {
  return (
    <div className={`${styles.heading} ${styles[align]}`}>
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {children}
    </div>
  );
}
