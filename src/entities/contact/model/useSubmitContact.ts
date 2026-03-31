import { useMutation } from "@tanstack/react-query";
import { submitContact, submitApplication } from "../api/contact.service";
import type { ContactFormData, BookingFormData } from "../api/contact.service";

// For simple contact forms → POST /api/contacts (formdata)
export function useSubmitContact() {
  return useMutation({ mutationFn: (data: ContactFormData) => submitContact(data) });
}

// For booking / applications → POST /api/zapis (JSON)
export function useSubmitApplication() {
  return useMutation({ mutationFn: (data: BookingFormData) => submitApplication(data) });
}
