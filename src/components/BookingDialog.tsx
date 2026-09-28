import { useEffect, useRef, useState, type FormEvent } from "react";
import { CalendarCheck, CheckCircle2, MessageCircle, Phone, X } from "lucide-react";
import { business } from "../config/business";
import { saveEnquiry } from "../lib/enquiries";
import { lockScroll, unlockScroll } from "../lib/scrollLock";
import {
  isValidEmail,
  isValidPhone,
  normalizePhone,
  required,
  todayISO,
  type FieldErrors,
} from "../lib/forms";
import { Button, Field, inputClass } from "./ui";

/*
  ─────────────────────────────────────────────────────────────
  BOOK A CONSULTATION
  Submitting this form creates an appointment REQUEST. Nothing is
  auto-confirmed — the studio calls the customer back to confirm
  the date and time (see src/lib/enquiries.ts for the lifecycle).
  ─────────────────────────────────────────────────────────────
*/

const PROJECT_TYPES = [
  "Home",
  "Apartment",
  "Villa",
  "Bedroom",
  "Living Room",
  "Kitchen",
  "Office",
  "Commercial Space",
  "Other",
];

const TIME_WINDOWS = [
  "Morning (10 AM – 12 PM)",
  "Afternoon (12 PM – 3 PM)",
  "Evening (3 PM – 7 PM)",
  "Flexible / any time",
];

const PROJECT_SIZES = [
  "Single room",
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4+ BHK / Villa",
  "Office / commercial",
  "Not sure yet",
];

interface FormState {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  preferredDate: string;
  preferredTime: string;
  location: string;
  projectSize: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  projectType: "",
  preferredDate: "",
  preferredTime: "",
  location: "",
  projectSize: "",
  message: "",
};

type FormField = keyof FormState;

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
}

export function BookingDialog({ open, onClose }: BookingDialogProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FieldErrors<FormField>>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<Element | null>(null);

  /* Open/close lifecycle: focus, scroll-lock, Escape, focus trap */
  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement;
    lockScroll();
    document.body.dataset.dialogOpen = "true";

    const frame = requestAnimationFrame(() => {
      const firstInput = panelRef.current?.querySelector<HTMLElement>("input");
      firstInput?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      // Simple focus trap
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKey);
      unlockScroll();
      delete document.body.dataset.dialogOpen;
      const el = restoreFocusRef.current;
      if (el instanceof HTMLElement) el.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handleClose() {
    onClose();
  }

  function set(field: FormField, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): boolean {
    const next: FieldErrors<FormField> = {};
    if (!required(form.name)) next.name = "Please enter your full name.";
    if (!required(form.phone)) next.phone = "Please enter your phone number.";
    else if (!isValidPhone(form.phone))
      next.phone = "Please enter a valid 10-digit Indian mobile number.";
    if (required(form.email) && !isValidEmail(form.email))
      next.email = "Please enter a valid email address, or leave it blank.";
    setErrors(next);

    if (Object.keys(next).length > 0) {
      const firstInvalid = panelRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstInvalid?.focus();
      return false;
    }
    return true;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;

    setSubmitting(true);
    // Record the consultation request (swap for an API call when a backend exists)
    const record = saveEnquiry({
      kind: "consultation",
      name: form.name.trim(),
      phone: normalizePhone(form.phone),
      email: form.email.trim() || undefined,
      projectType: form.projectType || undefined,
      preferredDate: form.preferredDate || undefined,
      preferredTime: form.preferredTime || undefined,
      location: form.location.trim() || undefined,
      projectSize: form.projectSize || undefined,
      message: form.message.trim() || undefined,
    });
    await new Promise((r) => setTimeout(r, 500));
    setReference(record.id);
    setSubmitting(false);
    panelRef.current?.querySelector<HTMLElement>("#booking-success-title")?.focus();
  }

  if (!open) return null;

  const inputId = (f: FormField) => `booking-${f}`;
  const errorId = (f: FormField) => `booking-${f}-error`;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="max-h-[94svh] w-full max-w-2xl overflow-y-auto bg-paper shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-line bg-paper/95 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-4 px-6 py-5 sm:px-8">
            <div>
              <p className="label text-clay">Book a Consultation</p>
              <h2
                id="booking-title"
                className="mt-2 font-serif text-2xl font-light leading-tight"
              >
                {reference ? "Request received" : "Tell us about your space"}
              </h2>
              {!reference && (
                <p className="mt-1.5 text-[13px] text-taupe">
                  Share a few details — we'll call you back to confirm a time.
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="cursor-pointer p-2 text-ink transition-colors hover:text-clay"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        {reference ? (
          /* ── Confirmation state ── */
          <div className="px-6 py-10 sm:px-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 size={30} strokeWidth={1.5} aria-hidden="true" className="mt-1 shrink-0 text-success" />
              <div>
                <h3
                  id="booking-success-title"
                  tabIndex={-1}
                  className="font-serif text-xl font-normal leading-snug outline-none"
                >
                  Thank you{form.name ? `, ${form.name.trim().split(" ")[0]}` : ""}.
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
                  Your consultation request has been received. {business.name}{" "}
                  will contact you
                  {form.phone ? ` on ${normalizePhone(form.phone)}` : ""} to
                  confirm the appointment.
                </p>
                <p className="mt-4 text-sm text-taupe">
                  Reference: <span className="font-medium text-ink">{reference}</span>
                </p>
                <p className="mt-6 border-l-2 border-clay/50 pl-4 text-sm leading-relaxed text-taupe">
                  This is a request, not yet a confirmed booking — an
                  appointment is confirmed once we've spoken with you. For a
                  quicker response, call or WhatsApp us directly.
                </p>
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-ink bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-ink-deep"
              >
                <Phone size={15} aria-hidden="true" /> Call {business.phoneDisplay}
              </a>
              <a
                href={business.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-ink/30 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink"
              >
                <MessageCircle size={15} aria-hidden="true" /> WhatsApp
              </a>
              <Button variant="outline" onClick={handleClose} className="sm:ml-auto">
                Close
              </Button>
            </div>
          </div>
        ) : (
          /* ── Form state ── */
          <form onSubmit={handleSubmit} noValidate className="px-6 py-8 sm:px-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" htmlFor={inputId("name")} required error={errors.name}>
                <input
                  id={inputId("name")}
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? errorId("name") : undefined}
                  className={inputClass(!!errors.name)}
                />
              </Field>

              <Field
                label="Phone number"
                htmlFor={inputId("phone")}
                required
                error={errors.phone}
              >
                <input
                  id={inputId("phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? errorId("phone") : undefined}
                  className={inputClass(!!errors.phone)}
                />
              </Field>

              <Field label="Email" htmlFor={inputId("email")} error={errors.email}>
                <input
                  id={inputId("email")}
                  type="email"
                  autoComplete="email"
                  placeholder="Optional"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? errorId("email") : undefined}
                  className={inputClass(!!errors.email)}
                />
              </Field>

              <Field label="Project type" htmlFor={inputId("projectType")}>
                <select
                  id={inputId("projectType")}
                  value={form.projectType}
                  onChange={(e) => set("projectType", e.target.value)}
                  className={inputClass()}
                >
                  <option value="">Select…</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Preferred date" htmlFor={inputId("preferredDate")}>
                <input
                  id={inputId("preferredDate")}
                  type="date"
                  min={todayISO()}
                  value={form.preferredDate}
                  onChange={(e) => set("preferredDate", e.target.value)}
                  className={inputClass()}
                />
              </Field>

              <Field label="Preferred time" htmlFor={inputId("preferredTime")}>
                <select
                  id={inputId("preferredTime")}
                  value={form.preferredTime}
                  onChange={(e) => set("preferredTime", e.target.value)}
                  className={inputClass()}
                >
                  <option value="">Select…</option>
                  {TIME_WINDOWS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Location / area"
                htmlFor={inputId("location")}
                hint="e.g. Greenview Enclave, Sector 21, South Extension"
              >
                <input
                  id={inputId("location")}
                  type="text"
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  className={inputClass()}
                />
              </Field>

              <Field label="Approximate project size" htmlFor={inputId("projectSize")}>
                <select
                  id={inputId("projectSize")}
                  value={form.projectSize}
                  onChange={(e) => set("projectSize", e.target.value)}
                  className={inputClass()}
                >
                  <option value="">Select…</option>
                  {PROJECT_SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Message / requirements"
                htmlFor={inputId("message")}
                className="sm:col-span-2"
              >
                <textarea
                  id={inputId("message")}
                  rows={4}
                  placeholder="Tell us briefly about your space and what you have in mind…"
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  className={inputClass()}
                />
              </Field>
            </div>

            <p className="mt-5 border-l-2 border-clay/50 pl-4 text-[13px] leading-relaxed text-taupe">
              Submitting this form sends a consultation request — your
              appointment is confirmed once we've spoken with you on call or
              WhatsApp.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
                <CalendarCheck size={16} aria-hidden="true" />
                {submitting ? "Sending…" : "Request Consultation"}
              </Button>
              <p className="text-[13px] text-taupe">
                Prefer to talk?{" "}
                <a href={business.phoneHref} className="font-medium text-ink underline-offset-2 hover:text-clay hover:underline">
                  {business.phoneDisplay}
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
