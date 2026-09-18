import { AlertCircle, Check } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function StepTitle({
  index,
  title,
  hint,
}: {
  index: string;
  title: string;
  hint?: string;
}) {
  return (
    <div className="mb-7">
      <p className="label text-brand">Step {index}</p>
      <h2 className="display-lg mt-3">{title}</h2>
      {hint ? <p className="mt-3 text-sm text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-3 flex items-center gap-2 text-sm text-destructive">
      <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
      {message}
    </p>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-border px-5 py-12 text-center">
      <p className="font-display text-lg font-bold uppercase">{title}</p>
      <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

export function SelectCard({
  selected,
  onClick,
  children,
  className,
  ariaLabel,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={ariaLabel}
      className={cn(
        "relative w-full border p-5 text-left transition-[border-color,background-color] duration-300",
        selected
          ? "border-brand bg-surface"
          : "border-border bg-transparent hover:border-border-strong",
        className,
      )}
    >
      {selected ? (
        <span className="absolute top-4 right-4 grid h-6 w-6 place-items-center rounded-full bg-brand text-brand-foreground">
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
      ) : null}
      {children}
    </button>
  );
}

export function TextField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  optional,
  placeholder,
  autoComplete,
  inputMode,
  multiline,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  optional?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email";
  multiline?: boolean;
}) {
  const describedBy = error ? `${id}-error` : undefined;
  const shared = {
    id,
    value,
    placeholder,
    autoComplete,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    className: cn(
      "w-full border bg-transparent px-4 py-3.5 text-base text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-brand focus:outline-none",
      error ? "border-destructive" : "border-border",
    ),
  };

  return (
    <div>
      <label htmlFor={id} className="label mb-3 block text-muted-foreground">
        {label}
        {optional ? <span className="ms-2 text-muted-foreground/60">Optional</span> : null}
      </label>
      {multiline ? (
        <textarea {...shared} rows={3} />
      ) : (
        <input {...shared} type={type} inputMode={inputMode} />
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
