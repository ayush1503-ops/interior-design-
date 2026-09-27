/* Shared form validation helpers (no external dependencies). */

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

/** Normalise an Indian phone number: strip spaces/dashes, drop +91 or 91/0 prefix. */
export function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) digits = digits.slice(2);
  if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
  return digits;
}

export function isValidPhone(raw: string): boolean {
  return /^[6-9]\d{9}$/.test(normalizePhone(raw));
}

export function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
}

export function required(value: string): boolean {
  return value.trim().length > 0;
}

/** Today's date in YYYY-MM-DD (for date input min attributes). */
export function todayISO(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
