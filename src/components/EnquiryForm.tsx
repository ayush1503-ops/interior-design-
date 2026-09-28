import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { business } from "../config/business";
import { saveEnquiry } from "../lib/enquiries";
import {
  isValidEmail,
  isValidPhone,
  normalizePhone,
  required,
  type FieldErrors,
} from "../lib/forms";
import { Button, Field, inputClass } from "./ui";

/* General contact / enquiry form used in the Contact section. */

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

interface EnquiryState {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  message: string;
}

const initialState: EnquiryState = {
  name: "",
  phone: "",
  email: "",
  projectType: "",
  location: "",
  message: "",
};

type EnquiryField = keyof EnquiryState;

export function EnquiryForm() {
  const [form, setForm] = useState<EnquiryState>(initialState);
  const [errors, setErrors] = useState<FieldErrors<EnquiryField>>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const inputId = (f: EnquiryField) => `enquiry-${f}`;
  const errorId = (f: EnquiryField) => `enquiry-${f}-error`;

  function set(field: EnquiryField, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): boolean {
    const next: FieldErrors<EnquiryField> = {};
    if (!required(form.name)) next.name = "Please enter your name.";
    if (!required(form.phone)) next.phone = "Please enter your phone number.";
    else if (!isValidPhone(form.phone))
      next.phone = "Please enter a valid 10-digit Indian mobile number.";
    if (required(form.email) && !isValidEmail(form.email))
      next.email = "Please enter a valid email address, or leave it blank.";
    if (!required(form.message))
      next.message = "Please tell us briefly what you need.";
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
    const record = saveEnquiry({
      kind: "contact",
      name: form.name.trim(),
      phone: normalizePhone(form.phone),
      email: form.email.trim() || undefined,
      projectType: form.projectType || undefined,
      location: form.location.trim() || undefined,
      message: form.message.trim(),
    });
    await new Promise((r) => setTimeout(r, 500));
    setReference(record.id);
    setSubmitting(false);
  }

  if (reference) {
    return (
      <div ref={panelRef} className="flex h-full flex-col items-start justify-center py-6">
        <CheckCircle2 size={30} strokeWidth={1.5} aria-hidden="true" className="text-success" />
        <h3 className="mt-4 font-serif text-2xl font-light leading-snug">
          Thank you{form.name ? `, ${form.name.trim().split(" ")[0]}` : ""}.
        </h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/80">
          Your enquiry has been received. {business.name} will get back to you
          shortly — for anything urgent, call or WhatsApp us directly.
        </p>
        <p className="mt-4 text-sm text-taupe">
          Reference: <span className="font-medium text-ink">{reference}</span>
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            setForm(initialState);
            setReference(null);
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <div ref={panelRef}>
      <h3 className="font-serif text-2xl font-light">Send an enquiry</h3>
      <p className="mt-2 text-[13px] text-taupe">
        Fields marked with an asterisk are required.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor={inputId("name")} required error={errors.name}>
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

        <Field label="Phone" htmlFor={inputId("phone")} required error={errors.phone}>
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

        <Field label="Location / area" htmlFor={inputId("location")} className="sm:col-span-2">
          <input
            id={inputId("location")}
            type="text"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            className={inputClass()}
          />
        </Field>

        <Field
          label="Requirements"
          htmlFor={inputId("message")}
          required
          error={errors.message}
          className="sm:col-span-2"
        >
          <textarea
            id={inputId("message")}
            rows={5}
            placeholder="e.g. We need interiors for a 2BHK in East Delhi — living room, kitchen and wardrobes…"
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? errorId("message") : undefined}
            className={inputClass(!!errors.message)}
          />
        </Field>

        <div className="sm:col-span-2">
          <Button type="submit" size="lg" disabled={submitting}>
            {submitting ? "Sending…" : "Send Enquiry"}
          </Button>
        </div>
      </form>
    </div>
  );
}
