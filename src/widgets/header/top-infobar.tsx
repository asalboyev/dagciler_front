"use client";

import { PhoneIcon, EnvelopeIcon, LocationIcon } from "@/shared/ui/icons";
import { useSiteInfo } from "@/entities/siteinfo";
import styles from "./header.module.scss";

export function TopInfoBar() {
  const { data: siteInfo } = useSiteInfo();

  if (!siteInfo) return null;

  return (
    <div className={styles.infobar}>
      <div className={styles.infobarContainer}>
        <div className={styles.infoItem}>
          <PhoneIcon size={14} />
          <a href={`tel:${siteInfo.phone}`}>{siteInfo.phone}</a>
        </div>
        <div className={styles.infoItem}>
          <EnvelopeIcon size={14} />
          <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
        </div>
        <div className={styles.infoItem}>
          <LocationIcon size={14} />
          <span>{siteInfo.address}</span>
        </div>
      </div>
    </div>
  );
}
