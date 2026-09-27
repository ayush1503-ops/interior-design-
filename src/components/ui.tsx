import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

/* ── Buttons ───────────────────────────────────────────────── */

type ButtonVariant = "primary" | "outline" | "outlineLight" | "ghost";
type ButtonSize = "md" | "lg" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink-deep border border-ink",
  outline:
    "bg-transparent text-ink border border-ink/30 hover:border-ink hover:bg-ink/5",
  outlineLight:
    "bg-transparent text-paper border border-paper/60 hover:bg-paper hover:text-ink",
  ghost: "bg-transparent text-ink hover:bg-ink/5 border border-transparent",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2.5 text-[13px]",
  md: "px-6 py-3.5 text-sm",
  lg: "px-7 py-4 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-colors duration-300 cursor-pointer",
        buttonStyles[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ── Section label + heading ───────────────────────────────── */

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("label text-clay flex items-center gap-3", className)}>
      <span aria-hidden="true" className="inline-block h-px w-8 bg-clay/60" />
      {children}
    </p>
  );
}

/* ── Form primitives ───────────────────────────────────────── */

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}

export function Field({ label, htmlFor, required, error, hint, children, className }: FieldProps) {
  const errorId = `${htmlFor}-error`;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-[13px] font-medium text-ink">
        {label}
        {required && (
          <span className="text-clay" aria-hidden="true">
            {" "}
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-taupe">{hint}</p>}
      {error && (
        <p id={errorId} role="alert" className="flex items-start gap-1.5 text-[13px] font-medium text-error">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="mt-0.5 h-3.5 w-3.5 shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass = (invalid?: boolean) =>
  cn(
    "w-full border bg-paper px-3.5 py-3 text-[15px] text-ink placeholder:text-taupe/60 transition-colors",
    "focus:border-clay focus:outline-none",
    invalid ? "border-error" : "border-line hover:border-taupe/50"
  );
