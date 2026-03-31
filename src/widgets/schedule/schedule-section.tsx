"use client";

import Image from "next/image";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { useServices } from "@/entities/service";
import { getFallbackImage } from "@/shared/lib/responsive-images";
import { useBookingModal } from "@/shared/lib/booking-modal";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";
import styles from "./schedule-section.module.scss";
import { HtmlContent } from "@/shared/ui/html-content";

function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  allLabel: string;
  onChange: (v: string) => void;
}

function FilterDropdown({ label, value, options, allLabel, onChange }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  const updatePos = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 8 + window.scrollY, left: rect.left + window.scrollX, width: rect.width });
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePos();
    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [open, updatePos]);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const displayValue = value || allLabel;

  return (
    <div className={styles.filterGroup}>
      <span className={styles.filterLabel}>{label}</span>
      <div className={styles.filterDropdown}>
        <button
          ref={triggerRef}
          className={`${styles.filterTrigger} ${open ? styles.open : ""}`}
          onClick={() => setOpen((o) => !o)}
          type="button"
        >
          <span>{displayValue}</span>
          <ChevronDownIcon />
        </button>
        {open && createPortal(
          <div
            ref={menuRef}
            className={styles.filterMenu}
            style={{ position: "absolute", top: pos.top, left: pos.left, width: pos.width }}
          >
            <button
              className={`${styles.filterOption} ${!value ? styles.selected : ""}`}
              onClick={() => { onChange(""); setOpen(false); }}
              type="button"
            >
              {allLabel}
            </button>
            {options.map((opt) => (
              <button
                key={opt}
                className={`${styles.filterOption} ${value === opt ? styles.selected : ""}`}
                onClick={() => { onChange(opt); setOpen(false); }}
                type="button"
              >
                {opt}
              </button>
            ))}
          </div>,
          document.body,
        )}
      </div>
    </div>
  );
}

export function ScheduleSection() {
  const tMain = useTranslations("main");
  const tPopup = useTranslations("popup");
  const { data: services, isPending } = useServices();
  const { open: openBooking } = useBookingModal();

  const [filterTeacher, setFilterTeacher] = useState("");
  const [filterGroupType, setFilterGroupType] = useState("");
  const [filterDays, setFilterDays] = useState("");
  const [filterBranch, setFilterBranch] = useState("");

  const uniqueTeachers = useMemo(() => [...new Set((services ?? []).map((s) => s.teacher).filter(Boolean))], [services]);
  const uniqueGroupTypes = useMemo(() => [...new Set((services ?? []).map((s) => s.group_type).filter(Boolean))], [services]);
  const uniqueDays = useMemo(() => [...new Set((services ?? []).map((s) => s.days).filter(Boolean))], [services]);
  const uniqueBranches = useMemo(() => [...new Set((services ?? []).map((s) => s.branch).filter(Boolean))], [services]);

  const filtered = useMemo(() => (services ?? []).filter((s) => {
    if (filterTeacher && s.teacher !== filterTeacher) return false;
    if (filterGroupType && s.group_type !== filterGroupType) return false;
    if (filterDays && s.days !== filterDays) return false;
    if (filterBranch && s.branch !== filterBranch) return false;
    return true;
  }), [services, filterTeacher, filterGroupType, filterDays, filterBranch]);

  if (isPending) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <Skeleton height="40px" width="280px" />
          <div className={styles.grid} style={{ marginTop: 24 }}>
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} height="420px" borderRadius="16px" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!services?.length) return null;

  const allLabel = tMain("all-tex");

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <AnimateOnScroll>
          <div className={styles.header}>
            <h2 className={styles.title}>{tMain("table-title")}</h2>
            <p className={styles.subtitle}>
              {tMain("table-subtile")}
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className={styles.filters}>
            <FilterDropdown
              label={tMain("teachers-tex")}
              value={filterTeacher}
              options={uniqueTeachers as string[]}
              allLabel={allLabel}
              onChange={setFilterTeacher}
            />
            <FilterDropdown
              label={tMain("tarif-group")}
              value={filterGroupType}
              options={uniqueGroupTypes as string[]}
              allLabel={allLabel}
              onChange={setFilterGroupType}
            />
            <FilterDropdown
              label={tMain("day-table")}
              value={filterDays}
              options={uniqueDays as string[]}
              allLabel={allLabel}
              onChange={setFilterDays}
            />
            <FilterDropdown
              label={tMain("filial-tex")}
              value={filterBranch}
              options={uniqueBranches as string[]}
              allLabel={allLabel}
              onChange={setFilterBranch}
            />
          </div>
        </AnimateOnScroll>

        <div className={styles.grid}>
          {filtered.map((item, i) => {
            const teacherImg = getFallbackImage(item.teacher_image);
            return (
              <AnimateOnScroll
                key={item.id}
                delay={i * 0.1}
                className={styles.animateWrapper}
              >
                <article className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.teacherInfo}>
                      {teacherImg && (
                        <Image
                          src={teacherImg}
                          alt={item.teacher}
                          width={80}
                          height={80}
                          className={styles.teacherAvatar}
                        />
                      )}
                      <div className={styles.teacherText}>
                        <span className={styles.teacherLabel}>{tMain("teachers-tex")}</span>
                        <span className={styles.teacherName}>{item.teacher}</span>
                      </div>
                    </div>
                    {item.deadline && (
                      <div className={styles.deadlineInfo}>
                        <span className={styles.deadlineLabel}>{tMain("course-day")}</span>
                        <span className={styles.deadlineValue}>{item.deadline}</span>
                      </div>
                    )}
                  </div>

                  <hr className={styles.divider} />

                  <div className={styles.details}>
                    {item.days && (
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>{tMain("day-table")}</span>
                        <span className={styles.detailValue}>{item.days}</span>
                      </div>
                    )}
                    {item.time && (
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>{tMain("time-tex")}</span>
                        <span className={styles.detailValue}>{item.time}</span>
                      </div>
                    )}
                    {item.group_type && (
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>{tMain("tarif-group")}</span>
                        <span className={styles.detailValue}>{item.group_type}</span>
                      </div>
                    )}
                    {item.branch && (
                      <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>{tMain("filial-tex")}</span>
                        <span className={styles.detailValue}>{item.branch}</span>
                      </div>
                    )}
                  </div>

                  {item.description && (
                    <>
                      <hr className={styles.divider} />
                      {/* <p className={styles.description}>{item.description}</p> */}
                      <HtmlContent className={styles.description} html={item.description} />
                    </>
                  )}

                  <hr className={styles.divider} />

                  <div className={styles.cardFooter}>
                    <div className={styles.priceBlock}>
                      <span className={styles.priceLabel}>{tMain("price-tex")}</span>
                      <span className={styles.priceValue}>{item.price}</span>
                    </div>
                    <Button
                      variant="red"
                      size="sm"
                      className={styles.cardBtn}
                      onClick={() => openBooking({
                        title: tPopup("title4"),
                        subtitle: tPopup("subtile4"),
                        serviceId: item.id,
                        serviceInfo: {
                          teacher: item.teacher,
                          teacherImage: getFallbackImage(item.teacher_image) || undefined,
                          branch: item.branch || undefined,
                          days: item.days || undefined,
                        },
                      })}
                    >
                      {tMain("table-button")}
                    </Button>
                  </div>
                </article>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
