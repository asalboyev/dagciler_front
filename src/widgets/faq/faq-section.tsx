"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useFaqs } from "@/entities/faq";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";
import { Skeleton } from "@/shared/ui/skeleton";
import styles from "./faq-section.module.scss";

function CircleChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 9l3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FaqSection() {
  const t = useTranslations("main");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { data: faqs, isPending } = useFaqs();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (isPending) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <Skeleton height="40px" width="300px" />
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} height="64px" borderRadius="12px" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!faqs?.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <AnimateOnScroll>
          <h2 className={styles.title}>{t("faq-title")}</h2>
        </AnimateOnScroll>

        <div className={styles.list}>
          {faqs.map((faq, i) => (
            <AnimateOnScroll key={faq.id} delay={i * 0.05}>
              <div
                className={`${styles.item} ${openIndex === i ? styles.itemOpen : ""}`}
              >
                <button
                  className={styles.trigger}
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                >
                  <span className={styles.question}>{faq.question}</span>
                  <CircleChevron open={openIndex === i} />
                </button>
                <div
                  className={styles.answerWrapper}
                  style={{ gridTemplateRows: openIndex === i ? "1fr" : "0fr" }}
                >
                  <div className={styles.answerInner}>
                    <p className={styles.answer}>{faq.answer}</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
