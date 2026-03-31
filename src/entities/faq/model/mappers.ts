import type { Faq } from "./types";

export function toFaq(raw: any): Faq {
  return {
    id: raw.id,
    question: raw.question ?? raw.title ?? raw.name ?? "",
    answer: raw.answer ?? raw.text ?? raw.description ?? "",
  };
}
