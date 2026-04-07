import { api } from "@/shared/lib/api";
import type { SiteInfo, AboutSection, AboutSchoolItem } from "../model/types";

export async function getSiteInfo(): Promise<SiteInfo | null> {
  try {
    const { data } = await api.get<any>("/siteinfo");
    const raw = data?.data ?? data;
    if (!raw || typeof raw !== "object" || raw.message) return null;

    const about_sections: AboutSection[] = Array.isArray(raw.about_sections)
      ? raw.about_sections.map((s: any) => ({
        title: s.title ?? null,
        subtitle: s.subtitle ?? null,
        desc: s.desc ?? null,
        images: Array.isArray(s.images) ? s.images : [],
      }))
      : [];

    const about_schools: AboutSchoolItem[] = Array.isArray(raw.about_schools)
      ? raw.about_schools.map((s: any) => ({
        id: s.id,
        title: s.title ?? null,
        subtitle: s.subtitle ?? null,
        content1: s.content_1 ?? null,
        content2: s.content_2 ?? null,
        image: s.image ?? null,
      }))
      : [];

    return {
      id: raw.id,
      phone: raw.phone_number ?? raw.phone ?? null,
      phone2: raw.phone_number_2 ?? raw.phone2 ?? null,
      email: raw.email ?? null,
      address: raw.address ?? null,
      working_hours: raw.work_time ?? raw.working_hours ?? null,
      telegram: raw.telegram ?? null,
      instagram: raw.instagram ?? null,
      facebook: raw.facebook ?? null,
      telegram_channel: raw.telegram_channel ?? null,
      telegram_manager: raw.telegram_manager ?? null,
      youtube: raw.youtube ?? null,
      logo_url: raw.logo ?? null,
      gift_card_image: raw.gift_card_image ?? null,
      map_link: raw.map ?? raw.map_link ?? null,
      map_lat: raw.map_lat ?? null,
      map_lng: raw.map_lng ?? null,
      about_sections,
      about_schools,
    };
  } catch {
    return null;
  }
}
