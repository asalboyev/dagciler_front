import type { Feedback } from "./types";

export function toFeedback(raw: any, index: number): Feedback {
  return {
    id: raw.id ?? index,
    url: raw.url ?? "",
  };
}
