import type { Service } from "./types";

export function toService(raw: any): Service {
  const member = raw.member ?? null;
  const filial = raw.filial ?? null;

  return {
    id: raw.id,
    title: raw.title ?? raw.name ?? "",
    description: raw.desc ?? raw.description ?? "",
    teacher: member?.name ?? raw.teacher ?? raw.teacher_name ?? "",
    teacher_image:
      member
        ? { lg: member.photo_url ?? null, md: member.photo_url ?? null, sm: member.photo_url ?? null }
        : raw.teacher_image ?? raw.images ?? { lg: null, md: null, sm: null },
    days: raw.class_days ?? raw.days ?? raw.schedule_days ?? "",
    time: raw.class_time ?? raw.time ?? raw.schedule_time ?? "",
    group_type: raw.group_type ?? raw.gender ?? raw.type ?? "",
    branch:
      filial?.rayon?.ru ??
      filial?.rayon?.en ??
      filial?.rayon?.uz ??
      filial?.rayon ??
      raw.rayon ??
      "",
    price: String(raw.price ?? ""),
    deadline: raw.application_deadline ?? raw.deadline ?? "",
    kvota: raw.kvota ?? "",
    zayafka: raw.zayafka ?? "",
  };
}
