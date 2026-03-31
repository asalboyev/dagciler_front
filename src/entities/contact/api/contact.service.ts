import { api } from "@/shared/lib/api";

// POST /api/contacts — simple contact form (formdata)
export interface ContactFormData {
  name?: string;
  phone_number?: string;
  message?: string;
}

export async function submitContact(formData: ContactFormData) {
  const fd = new FormData();
  if (formData.name) fd.append("name", formData.name);
  if (formData.phone_number) fd.append("phone_number", formData.phone_number);
  if (formData.message) fd.append("message", formData.message);
  const { data } = await api.post("/contacts", fd);
  return data;
}

// POST /api/zapis — booking / application (JSON body)
export interface BookingFormData {
  name?: string;
  email?: string;
  phone_number?: string;
  message?: string;
  type?: string;       // e.g. "contact", "booking"
  page?: string;       // e.g. "homepage", "course", "schedule"
  company?: string;
  service_id?: number | null;
  tariff_id?: number | null;
}

export async function submitApplication(formData: BookingFormData) {
  const { data } = await api.post("/zapis", { ...formData, message: formData.message || "-" });
  return data;
}
