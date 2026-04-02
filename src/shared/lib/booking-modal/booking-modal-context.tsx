"use client";

import { useTranslations } from "next-intl";
import { createContext, useContext, useState, type ReactNode } from "react";

export interface ServiceInfo {
  teacher: string;
  teacherImage?: string;
  branch?: string;
  days?: string;
}

export type BookingModalVariant = "call" | "course" | "trial";

interface BookingModalOptions {
  title?: string;
  subtitle?: string;
  variant?: BookingModalVariant;
  serviceInfo?: ServiceInfo;
  serviceId?: number | null;
  tariffId?: number | null;
}

interface BookingModalContextValue {
  isOpen: boolean;
  title: string;
  subtitle: string;
  variant: BookingModalVariant;
  serviceInfo: ServiceInfo | null;
  serviceId: number | null;
  tariffId: number | null;
  open: (options?: BookingModalOptions) => void;
  close: () => void;
}

const DEFAULT_TITLE = "title2";
const DEFAULT_SUBTITLE = "subtitle2";

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("popup");
  const [title, setTitle] = useState(t(DEFAULT_TITLE));
  const [subtitle, setSubtitle] = useState(t(DEFAULT_SUBTITLE));
  const [variant, setVariant] = useState<BookingModalVariant>("trial");
  const [serviceInfo, setServiceInfo] = useState<ServiceInfo | null>(null);
  const [serviceId, setServiceId] = useState<number | null>(null);
  const [tariffId, setTariffId] = useState<number | null>(null);

  const open = (options?: BookingModalOptions) => {
    setTitle(options?.title ?? t(DEFAULT_TITLE));
    setSubtitle(options?.subtitle ?? t(DEFAULT_SUBTITLE));
    setVariant(options?.variant ?? "trial");
    setServiceInfo(options?.serviceInfo ?? null);
    setServiceId(options?.serviceId ?? null);
    setTariffId(options?.tariffId ?? null);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setTitle(t(DEFAULT_TITLE));
    setSubtitle(t(DEFAULT_SUBTITLE));
    setVariant("trial");
    setServiceInfo(null);
    setServiceId(null);
    setTariffId(null);
  };

  return (
    <BookingModalContext.Provider value={{ isOpen, title, subtitle, variant, serviceInfo, serviceId, tariffId, open, close }}>
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) throw new Error("useBookingModal must be used inside BookingModalProvider");
  return ctx;
}
