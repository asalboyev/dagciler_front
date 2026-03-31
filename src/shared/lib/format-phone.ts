export function formatPhoneUz(phone: string): string {
  const digits = phone?.replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("998")) {
    const code = digits.slice(3, 5);
    const p1 = digits.slice(5, 8);
    const p2 = digits.slice(8, 10);
    const p3 = digits.slice(10, 12);
    return `+998 (${code}) ${p1}-${p2}-${p3}`;
  }

  return phone;
}

export function parsePhoneForSubmit(phone: string): string {
  return phone?.replace(/\D/g, "");
}
