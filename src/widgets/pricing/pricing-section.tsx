"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTariffs } from "@/entities/tariff";
import { useSiteInfo } from "@/entities/siteinfo";
import type { Tariff } from "@/entities/tariff";
import { GiftIcon, CirclePlusIcon } from "@/shared/ui/icons";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";
import { useBookingModal } from "@/shared/lib/booking-modal";
import styles from "./pricing-section.module.scss";
import { HtmlContent } from "@/shared/ui/html-content";

/* ── Component ────────────────────────────────────────── */

function OffersChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={`${styles.offersChevron} ${open ? styles.offersChevronOpen : ""}`}
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

export function PricingSection({ isContact = false }: { isContact?: boolean } = {}) {
  const tMain = useTranslations("main");
  const [offersOpen, setOffersOpen] = useState(false);
  const [plansOpen, setPlansOpen] = useState(!isContact);
  const { data: allTariffs, isPending } = useTariffs();
  const plans = allTariffs?.filter((t) => t.type === "tariff") ?? [];
  const specialOffers = allTariffs?.filter((t) => t.type === "special_offer") ?? [];

  const offersContent = (
    <>
      <div className={styles.offersGrid}>
        {specialOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
      <div className={styles.bottomRow}>
        <GiftCertificate />
        <PaymentInfo />
      </div>
    </>
  );

  const plansContent = (
    <>
      {isPending ? (
        <div className={styles.plans}>
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} height="380px" borderRadius="16px" />
          ))}
        </div>
      ) : (
        plans.length > 0 && (
          <div className={styles.plans}>
            {plans.map((tariff) => (
              <PlanCard key={tariff.id} tariff={tariff} />
            ))}
          </div>
        )
      )}

      {isContact ? (
        <div className={styles.offersSection}>
          <button
            className={styles.offersToggle}
            onClick={() => setOffersOpen(!offersOpen)}
            aria-expanded={offersOpen}
          >
            <h3 className={styles.offersToggleTitle}>{tMain("tarif-title2")}</h3>
            <span className={styles.offersToggleAction}>
              <span className={styles.offersToggleLabel}>
                {offersOpen ? tMain("hide-tex") : tMain("button-pokazat")}
              </span>
              <OffersChevron open={offersOpen} />
            </span>
          </button>
          <div
            className={styles.offersCollapse}
            style={{ gridTemplateRows: offersOpen ? "1fr" : "0fr" }}
          >
            <div className={styles.offersCollapseInner}>{offersContent}</div>
          </div>
        </div>
      ) : (
        <div className={styles.offersSection}>{offersContent}</div>
      )}
    </>
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <AnimateOnScroll>
          <div className={styles.wrapper}>
            {/* {isContact ? (
              <button
                className={styles.offersToggle}
                onClick={() => setPlansOpen(!plansOpen)}
                aria-expanded={plansOpen}
              >
                <h2 className={styles.offersToggleTitle}>{tMain("tarif-title")}</h2>
                <span className={styles.offersToggleAction}>
                  <span className={styles.offersToggleLabel}>
                    {plansOpen ? tMain("hide-tex") : tMain("button-pokazat")}
                  </span>
                  <OffersChevron open={plansOpen} />
                </span>
              </button>
            ) : ( */}
              <div className={styles.header}>
                <h2 className={styles.headerTitle}>{tMain("tarif-title")}</h2>
                <p className={styles.headerSubtitle}>
                  {tMain("tarif-subtitle")}
                </p>
              </div>
            {/* // )} */}

            {isContact ? (
              <div
                className={styles.offersCollapse}
                style={{ gridTemplateRows: plansOpen ? "1fr" : "1fr" }}
              >
                <div className={styles.offersCollapseInner}>{plansContent}</div>
              </div>
            ) : (
              plansContent
            )}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

/* ── Plan card ────────────────────────────────────────── */

function PlanCard({ tariff }: { tariff: Tariff }) {
  const tMain = useTranslations("main");
  const tForma = useTranslations("forma");
  const tPopup = useTranslations("popup");
  const { open: openBooking } = useBookingModal();
  return (
    <div className={styles.plan}>
      <div className={styles.planHeader}>
        <span className={styles.planName}>{tariff.name}</span>
        {tariff.sessions_count && (
          <span className={styles.planCount}>{tariff.sessions_count}</span>
        )}
        {tariff.description && (
          <HtmlContent className={styles.planDesc} html={tariff.description} />
        )}
      </div>

      {tariff.features.length > 0 && (
        <div className={styles.planBenefits}>
          <span className={styles.benefitsLabel}>
            <GiftIcon size={20} color="#D41B2C" />
            {tMain("program-includes")}:
          </span>
          <ul className={styles.benefitsList}>
            {tariff.features.map((feature, idx) => (
              <li key={idx} className={styles.benefitItem}>
                <span className={styles.benefitIcon}>
                  <CirclePlusIcon size={18} color="#D41B2C" />
                </span>
                <span className={styles.benefitText}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.planFooter}>
        <span className={styles.priceLabel}>{tForma("tarif-text")}</span>
        <span className={styles.priceValue}>{tariff.price}</span>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outline"
          size="lg"
          className={styles.planBtn}
          onClick={() => openBooking({
            variant: "course",
            title: tPopup("title3"),
            subtitle: tPopup("subtile3"),
            tariffId: tariff.id,
          })}
        >
          {tForma("tarif-button")}
        </Button>
      </div>
    </div>
  );
}

/* ── Offer card ───────────────────────────────────────── */

function OfferCard({ offer }: { offer: Tariff }) {
  const tMain = useTranslations("main");
  const tForma = useTranslations("forma");
  return (
    <div className={styles.offerCard}>
      <div className={styles.offerHeader}>
        <h4 className={styles.offerName}>{offer.name}</h4>
        <p className={styles.offerDesc} dangerouslySetInnerHTML={{ __html: offer.description }} />
      </div>
      {offer.benefits.length > 0 && (
        <div className={styles.offerBenefitsCard}>
          <span className={styles.offerBenefitsLabel}>
            {tMain("offer-tex")}
            <GiftIcon size={24} color="#D41B2C" />
          </span>
          <div className={styles.offerBenefitsList}>
            {offer.benefits.map((b) => (
              <div key={b} className={styles.offerBenefitItem}>
                <span className={styles.offerBenefitIcon}>
                  <CirclePlusIcon size={20} color="#D41B2C" />
                </span>
                <span className={styles.offerBenefitText}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={styles.offerFooter}>
        <p className={styles.offerPriceLabel}>{tForma("tarif-text")}</p>
        <p className={styles.offerPrice}>{offer.price}</p>
      </div>
    </div>
  );
}

/* ── Gift certificate ─────────────────────────────────── */

function GiftCertificate() {
  const tMain = useTranslations("main");
  const tForma = useTranslations("forma");
  const { data: siteInfo } = useSiteInfo();

  return (
    <div className={styles.giftCard}>
      <div className={styles.giftInner}>
        <div className={styles.giftBowWrapper}>
          <Image
            src="/images/certificate-left.png"
            alt=""
            width={199}
            height={299}
            className={styles.giftBowImage}
          />
        </div>
        <div className={styles.giftContent}>
          <Image
            src={'/images/logo-secondary.png'}
            alt=""
            width={54}
            height={54}
            className={styles.giftLogo}
          />
          <h3 className={styles.giftTitle}>{tMain("gift-title")}</h3>
          <p className={styles.giftSubtitle}>{tMain("gift-subtitle")}</p>
          <p className={styles.giftPrice}>{tMain("gift-price")}</p>
          <p className={styles.giftIncludes}>{tMain("gift-includes")}</p>
          <div className={styles.giftItems}>
            <div className={styles.giftItem}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3133 6.6665H2.64667V11.9998C2.64667 13.9998 3.31333 14.6665 5.31333 14.6665H10.6467C12.6467 14.6665 13.3133 13.9998 13.3133 11.9998V6.6665Z" stroke="#F59E0B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.3334 4.66683V5.3335C14.3334 6.06683 13.98 6.66683 13 6.66683H3.00002C1.98002 6.66683 1.66669 6.06683 1.66669 5.3335V4.66683C1.66669 3.9335 1.98002 3.3335 3.00002 3.3335H13C13.98 3.3335 14.3334 3.9335 14.3334 4.66683Z" stroke="#F59E0B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.76 3.33329H4.08C3.85333 3.08663 3.86 2.70663 4.1 2.46663L5.04667 1.51996C5.29333 1.27329 5.7 1.27329 5.94667 1.51996L7.76 3.33329Z" stroke="#F59E0B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.9133 3.33329H8.23334L10.0467 1.51996C10.2933 1.27329 10.7 1.27329 10.9467 1.51996L11.8933 2.46663C12.1333 2.70663 12.14 3.08663 11.9133 3.33329Z" stroke="#F59E0B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.96002 6.6665V10.0932C5.96002 10.6265 6.54669 10.9398 6.99336 10.6532L7.62002 10.2398C7.84669 10.0932 8.13336 10.0932 8.35336 10.2398L8.94669 10.6398C9.38669 10.9332 9.98002 10.6198 9.98002 10.0865V6.6665H5.96002Z" stroke="#F59E0B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span>{tMain("gift-item1")}</span>
            </div>
            <div className={styles.giftItem}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3133 6.6665H2.64667V11.9998C2.64667 13.9998 3.31333 14.6665 5.31333 14.6665H10.6467C12.6467 14.6665 13.3133 13.9998 13.3133 11.9998V6.6665Z" stroke="#F59E0B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14.3334 4.66683V5.3335C14.3334 6.06683 13.98 6.66683 13 6.66683H3.00002C1.98002 6.66683 1.66669 6.06683 1.66669 5.3335V4.66683C1.66669 3.9335 1.98002 3.3335 3.00002 3.3335H13C13.98 3.3335 14.3334 3.9335 14.3334 4.66683Z" stroke="#F59E0B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M7.76 3.33329H4.08C3.85333 3.08663 3.86 2.70663 4.1 2.46663L5.04667 1.51996C5.29333 1.27329 5.7 1.27329 5.94667 1.51996L7.76 3.33329Z" stroke="#F59E0B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M11.9133 3.33329H8.23334L10.0467 1.51996C10.2933 1.27329 10.7 1.27329 10.9467 1.51996L11.8933 2.46663C12.1333 2.70663 12.14 3.08663 11.9133 3.33329Z" stroke="#F59E0B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.96002 6.6665V10.0932C5.96002 10.6265 6.54669 10.9398 6.99336 10.6532L7.62002 10.2398C7.84669 10.0932 8.13336 10.0932 8.35336 10.2398L8.94669 10.6398C9.38669 10.9332 9.98002 10.6198 9.98002 10.0865V6.6665H5.96002Z" stroke="#F59E0B" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span>{tMain("gift-item2")}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.giftBtnWrapper}>
        <Button variant="red" size="lg" className={styles.giftBtn}>
          {tForma("button3")}
        </Button>
      </div>
    </div>
  );
}

/* ── Payment info ─────────────────────────────────────── */

function PaymentInfo() {
  const tMain = useTranslations("main");
  const { data: siteInfo } = useSiteInfo();
  return (
    <div className={styles.paymentInfo}>
      {/* <div className={styles.paymentBlock}>
        <h4 className={styles.paymentTitle}>{tMain("payment-title")}</h4>
        <p className={styles.paymentText}>
          {tMain("payment-desc")}
        </p>
      </div>
      <div className={styles.paymentBlock}>
        <h4 className={styles.paymentTitle}>{tMain("installment-title")}</h4>
        <p className={styles.paymentText}>
          {tMain("installment-desc")}
          <br />
          &bull; {tMain("installment-step1")}
          <br />
          &bull; {tMain("installment-step2")}
        </p>
      </div>
      <div className={styles.paymentBlock}>
        <h4 className={styles.paymentNote}>{tMain("subscription-title")}</h4>
        <p className={styles.paymentNoteText}>
          {tMain("subscription-desc")}
        </p>
      </div> */}

    </div>
  );
}
