"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useBookingModal } from "@/shared/lib/booking-modal";
import { useSubmitApplication } from "@/entities/contact";
import styles from "./booking-modal.module.scss";
import { useServices } from "@/entities/service";


// Format: +998 XX XXX XX XX
function formatPhone(raw: string): string {
  let digits = raw?.replace(/\D/g, "");
  if (digits.startsWith("998")) digits = digits.slice(3);
  else if (digits.startsWith("8") && digits.length > 9) digits = digits.slice(1);
  digits = digits.slice(0, 9);

  let result = "+998";
  if (digits.length > 0) result += " " + digits.slice(0, 2);
  if (digits.length > 2) result += " " + digits.slice(2, 5);
  if (digits.length > 5) result += " " + digits.slice(5, 7);
  if (digits.length > 7) result += " " + digits.slice(7, 9);
  return result;
}

function formatName(raw: string): string {
  return raw?.replace(/[^a-zA-Zа-яА-ЯёЁ\s'\-\.]/g, "");
}

export function BookingModal() {
  const tPopup = useTranslations("popup");
  const tMain = useTranslations("main");
  const { isOpen, title, subtitle, variant, serviceInfo, serviceId, tariffId, close } = useBookingModal();
  const { mutate, isPending, isSuccess, reset } = useSubmitApplication();

  const validateName = (value: string): string => {
    if (!value.trim()) return tPopup("name-error");
    if (value.trim().length < 2) return tPopup("name-min");
    return "";
  };

  const validatePhone = (value: string): string => {
    const digits = value?.replace(/\D/g, "");
    if (digits.length < 3 || digits === "998") return tPopup("phone-error");
    if (digits.length !== 12) return tPopup("phone-format");
    return "";
  };

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [groupType, setGroupType] = useState("");
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [touched, setTouched] = useState({ name: false, phone: false });

  const showGroupType = variant !== "call" && !serviceInfo;

  const { data: services } = useServices();
  const uniqueGroupTypes = useMemo(() => [...new Set((services ?? []).map((s) => s.group_type).filter(Boolean))], [services]);

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setPhone("+998");
      setGroupType("");
      setGroupDropdownOpen(false);
      setNameError("");
      setPhoneError("");
      setTouched({ name: false, phone: false });
      reset();
    }
  }, [isOpen, reset]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  const handleNameChange = (value: string) => {
    const formatted = formatName(value);
    setName(formatted);
    if (touched.name) setNameError(validateName(formatted));
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setPhone(formatted);
    if (touched.phone) setPhoneError(validatePhone(formatted));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nErr = validateName(name);
    const pErr = validatePhone(phone);
    setNameError(nErr);
    setPhoneError(pErr);
    setTouched({ name: true, phone: true });
    if (nErr || pErr) return;
    const message = serviceInfo
      ? `${serviceInfo.teacher}${serviceInfo.branch ? `, ${serviceInfo.branch}` : ""}${serviceInfo.days ? `, ${serviceInfo.days}` : ""}`
      : groupType;
    const payload = { name, phone_number: phone, message, type: variant, page: "site", service_id: serviceId ?? null, tariff_id: tariffId ?? null };
    mutate(payload, {
      onSuccess: () => {
        const typeLabels: Record<string, string> = {
          call: "📞 Заказать звонок",
          course: "📚 Запись на курс",
          trial: "🎓 Запись на пробное занятие",
          booking: "✍️ Запись на пробное занятие",
        };
        const lines = [
          `${typeLabels[variant] || `📋 ${variant}`}`,
          `━━━━━━━━━━━━━━━`,
          `👤 Имя: ${name}`,
          `📱 Телефон: <code>${phone}</code>`,
        ];
        if (message) lines.push(`💬 Сообщение: ${message}`);
        if (serviceInfo) {
          lines.push(`━━━━━━━━━━━━━━━`);
          if (serviceInfo.teacher) lines.push(`👩‍🏫 Преподаватель: ${serviceInfo.teacher}`);
          if (serviceInfo.branch) lines.push(`📍 Филиал: ${serviceInfo.branch}`);
          if (serviceInfo.days) lines.push(`📅 Дни: ${serviceInfo.days}`);
        }
        lines.push(`━━━━━━━━━━━━━━━`);
        lines.push(`🌐 Источник: dagcilfer.uz`);
        const text = lines.join("\n");
        fetch(`https://api.telegram.org/bot8372109047:AAGnHZsn62zU7mhD0uf6oRcaEuviikQQB5c/sendMessage?chat_id=${encodeURIComponent(process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "")}&text=${encodeURIComponent(text)}&parse_mode=HTML`).catch(() => { });
        setTimeout(close, 1500);
      },
    });
  };

  return (
    <div className={styles.backdrop} onClick={close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {isSuccess ? (
          <div className={styles.success}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="#D41B2C" fillOpacity="0.1" />
              <path d="M14 24l7 7 13-13" stroke="#D41B2C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className={styles.successText}>{tPopup("success")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.fields}>
              {serviceInfo && (
                <div className={styles.teacherCard}>
                  <div className={styles.teacherCardLeft}>
                    {serviceInfo.teacherImage && (
                      <Image
                        src={serviceInfo.teacherImage}
                        alt={serviceInfo.teacher}
                        width={80}
                        height={80}
                        className={styles.teacherCardAvatar}
                      />
                    )}
                    <div className={styles.teacherCardTextStack}>
                      <span className={styles.teacherCardLabel}>{tMain("teachers-tex")}</span>
                      <span className={styles.teacherCardName}>{serviceInfo.teacher}</span>
                    </div>
                  </div>
                  <div className={styles.teacherCardRight}>
                    {serviceInfo.branch && <span className={styles.teacherCardBranch}>{serviceInfo.branch}</span>}
                    {serviceInfo.days && <span className={styles.teacherCardDays}>{serviceInfo.days}</span>}
                  </div>
                </div>
              )}

              <div className={styles.field}>
                <label className={styles.label}>{tPopup("name")}</label>
                <input
                  className={`${styles.input} ${nameError ? styles.inputError : ""}`}
                  placeholder={tPopup("name-tex")}
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onBlur={() => {
                    setTouched((t) => ({ ...t, name: true }));
                    setNameError(validateName(name));
                  }}
                />
                {nameError && <span className={styles.errorText}>{nameError}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>{tPopup("phone")}</label>
                <input
                  className={`${styles.input} ${phoneError ? styles.inputError : ""}`}
                  placeholder="+998"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  onBlur={() => {
                    setTouched((t) => ({ ...t, phone: true }));
                    setPhoneError(validatePhone(phone));
                  }}
                />
                {phoneError && <span className={styles.errorText}>{phoneError}</span>}
              </div>

              {showGroupType && (
                <div className={styles.field}>
                  <label className={styles.label}>{tMain("tarif-group")}</label>
                  <div className={styles.selectWrapper} ref={groupRef}>
                    <input
                      className={styles.input}
                      placeholder={tPopup("group-placeholder")}
                      value={groupType}
                      onChange={(e) => setGroupType(e.target.value)}
                      onFocus={() => setGroupDropdownOpen(true)}
                      onBlur={() => setTimeout(() => setGroupDropdownOpen(false), 150)}
                    />
                    {groupDropdownOpen && uniqueGroupTypes.length > 0 && (
                      <div className={styles.optionsList}>
                        {uniqueGroupTypes
                          .filter((opt) => !groupType || opt.toLowerCase().includes(groupType.toLowerCase()))
                          .map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              className={`${styles.option} ${groupType === opt ? styles.optionActive : ""}`}
                              onMouseDown={(e) => { e.preventDefault(); setGroupType(opt); setGroupDropdownOpen(false); }}
                            >
                              {opt.charAt(0).toUpperCase() + opt.slice(1).toLowerCase()}lar
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.buttons}>
              <button type="button" className={styles.closeBtn} onClick={close} aria-label={tPopup("close")}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5l10 10" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isPending}
              >
                {isPending ? tPopup("sending") : serviceInfo ? tMain("table-button") : tPopup("submit")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
