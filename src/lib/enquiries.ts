/*
  ─────────────────────────────────────────────────────────────
  ENQUIRY DATA LAYER
  ─────────────────────────────────────────────────────────────
  A single place where consultation requests and contact-form
  enquiries enter the system.

  Today, submissions are recorded in the browser (localStorage)
  so the flow is fully testable without a backend, and a request
  reference can be shown to the visitor.

  To connect a real backend later, replace `saveEnquiry` with a
  POST to your endpoint (e.g. /api/enquiries). An admin screen
  can then list records and move each one through its status:
  new → confirmed / rescheduled → completed, or cancelled.
  ─────────────────────────────────────────────────────────────
*/

export type EnquiryKind = "consultation" | "contact";

/*
  Appointment lifecycle. A submitted form is only ever a REQUEST —
  the studio confirms appointments with the customer by phone.
*/
export type EnquiryStatus =
  | "new"
  | "confirmed"
  | "rescheduled"
  | "completed"
  | "cancelled";

export interface EnquiryRecord {
  id: string;
  kind: EnquiryKind;
  status: EnquiryStatus;
  createdAt: string; // ISO timestamp
  name: string;
  phone: string;
  email?: string;
  projectType?: string;
  location?: string;
  message?: string;
  /* Consultation-only fields */
  preferredDate?: string;
  preferredTime?: string;
  projectSize?: string;
}

const STORAGE_KEY = "preet-interiors.enquiries.v1";

function makeId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return "PI-" + crypto.randomUUID().slice(0, 8).toUpperCase();
    }
  } catch {
    /* fall through */
  }
  return "PI-" + Math.random().toString(36).slice(2, 10).toUpperCase();
}

export function saveEnquiry(
  data: Omit<EnquiryRecord, "id" | "createdAt" | "status">
): EnquiryRecord {
  const record: EnquiryRecord = {
    ...data,
    id: makeId(),
    status: "new",
    createdAt: new Date().toISOString(),
  };

  try {
    const existing = listEnquiries();
    existing.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    /* Storage may be unavailable (private mode) — the request still
       proceeds and the visitor is always invited to call or WhatsApp. */
  }

  return record;
}

export function listEnquiries(): EnquiryRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as EnquiryRecord[]) : [];
  } catch {
    return [];
  }
}

export function updateEnquiryStatus(id: string, status: EnquiryStatus): void {
  try {
    const all = listEnquiries();
    const next = all.map((e) => (e.id === id ? { ...e, status } : e));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* no-op */
  }
}
