import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useForm } from "react-hook-form";
import {
  EMAIL_PATTERN,
  MAX_MESSAGE,
  MIN_MESSAGE,
  sanitizeEmail,
  sanitizeInline,
  sanitizeMultiline,
  type ContactSubmission,
} from "../../lib/contact-validation";
import "./contact-form.css";

type Status = { type: "idle" | "success" | "error"; message: string };

/** Option values are part of the API payload and never change; labels are localized. */
const PROJECT_TYPE_VALUES = ["", "web-app", "ecommerce", "website", "redesign", "maintenance"] as const;
const BUDGET_VALUES = ["", "5k-10k", "10k-25k", "25k-50k", "50k+"] as const;

type ProjectTypeValue = (typeof PROJECT_TYPE_VALUES)[number];
type BudgetValue = (typeof BUDGET_VALUES)[number];

/** Every user-facing string, provided by the page in the active locale. */
export type ContactFormStrings = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  optional: string;
  message: string;
  projectTypes: Record<ProjectTypeValue, string>;
  budgets: Record<BudgetValue, string>;
  required: string;
  tooShort: string;
  invalidEmail: string;
  messageTooShort: string;
  clear: string;
  send: string;
  sending: string;
  sent: string;
  /** Shown by outcome; the server's own (English) message is not displayed. */
  status: { success: string; validation: string; server: string; network: string };
};

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Burst of signal particles from the centre of `origin` (skipped for reduced motion). */
function burst(origin: HTMLElement) {
  if (prefersReducedMotion()) return;
  const layer = document.createElement("div");
  layer.className = "burst";
  layer.setAttribute("aria-hidden", "true");
  origin.appendChild(layer);
  const count = 22;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const distance = 60 + Math.random() * 90;
    const size = 4 + Math.random() * 7;
    particle.style.width = particle.style.height = `${size}px`;
    layer.appendChild(particle);
    particle.animate(
      [
        { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0.2)`,
          opacity: 0,
        },
      ],
      { duration: 900 + Math.random() * 500, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" },
    );
  }
  window.setTimeout(() => layer.remove(), 1600);
}

export default function ContactForm({ strings }: { strings: ContactFormStrings }) {
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const [sent, setSent] = useState(false);
  const submitRef = useRef<HTMLButtonElement>(null);
  const magneticRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, dirtyFields, isSubmitted },
  } = useForm<ContactSubmission>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { name: "", email: "", company: "", projectType: "", budget: "", message: "" },
  });

  const messageLength = (watch("message") ?? "").length;

  useEffect(() => {
    if (!sent) return;
    const timer = window.setTimeout(() => setSent(false), 5000);
    return () => window.clearTimeout(timer);
  }, [sent]);

  const onSubmit = async (data: ContactSubmission) => {
    setStatus({ type: "idle", message: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          projectType: data.projectType ?? "",
          budget: data.budget ?? "",
          message: data.message,
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        setStatus({
          type: "error",
          message: response.status === 400 ? strings.status.validation : strings.status.server,
        });
        return;
      }

      setStatus({ type: "success", message: strings.status.success });
      setSent(true);
      reset();
      if (submitRef.current) burst(submitRef.current);
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus({ type: "error", message: strings.status.network });
    }
  };

  const show = (field: keyof ContactSubmission) => (Boolean(dirtyFields[field]) || isSubmitted) && Boolean(errors[field]);

  const onMagnetMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const el = magneticRef.current;
    if (!el || event.pointerType !== "mouse" || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (event.clientY - (rect.top + rect.height / 2)) * 0.35;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onMagnetLeave = () => {
    if (magneticRef.current) magneticRef.current.style.transform = "";
  };

  const textField = (
    name: "name" | "email" | "company",
    label: string,
    options: { type?: string; autoComplete: string },
    rules: Parameters<typeof register>[1],
  ) => {
    const invalid = show(name);
    return (
      <div className="field">
        <input
          id={`contact-${name}`}
          type={options.type ?? "text"}
          autoComplete={options.autoComplete}
          placeholder=" "
          className="field__input"
          aria-invalid={invalid}
          aria-describedby={invalid ? `contact-${name}-error` : undefined}
          {...register(name, rules)}
        />
        <label htmlFor={`contact-${name}`} className="field__label">
          {label} <span aria-hidden="true">*</span>
        </label>
        {invalid && (
          <p id={`contact-${name}-error`} className="field__error" role="alert">
            {errors[name]?.message}
          </p>
        )}
      </div>
    );
  };

  const messageInvalid = show("message");

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="contact-form__row">
        {textField(
          "name",
          strings.name,
          { autoComplete: "name" },
          {
            setValueAs: sanitizeInline,
            required: strings.required,
            minLength: { value: 2, message: strings.tooShort },
          },
        )}
        {textField(
          "email",
          strings.email,
          { type: "email", autoComplete: "email" },
          {
            setValueAs: sanitizeEmail,
            required: strings.required,
            pattern: { value: EMAIL_PATTERN, message: strings.invalidEmail },
          },
        )}
      </div>

      {textField(
        "company",
        strings.company,
        { autoComplete: "organization" },
        {
          setValueAs: sanitizeInline,
          required: strings.required,
          minLength: { value: 2, message: strings.tooShort },
        },
      )}

      <fieldset className="pills">
        <legend className="pills__legend">
          {strings.projectType} <span className="pills__optional">{strings.optional}</span>
        </legend>
        <div className="pills__options">
          {PROJECT_TYPE_VALUES.map((value) => (
            <label key={value || "none"} className="pill">
              <input type="radio" value={value} className="pill__input" {...register("projectType")} />
              <span className="pill__label">{strings.projectTypes[value]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="pills">
        <legend className="pills__legend">
          {strings.budget} <span className="pills__optional">{strings.optional}</span>
        </legend>
        <div className="pills__options">
          {BUDGET_VALUES.map((value) => (
            <label key={value || "none"} className="pill">
              <input type="radio" value={value} className="pill__input" {...register("budget")} />
              <span className="pill__label">{strings.budgets[value]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field field--textarea">
        <textarea
          id="contact-message"
          rows={5}
          placeholder=" "
          maxLength={MAX_MESSAGE}
          className="field__input"
          aria-invalid={messageInvalid}
          aria-describedby={`contact-message-count${messageInvalid ? " contact-message-error" : ""}`}
          {...register("message", {
            setValueAs: sanitizeMultiline,
            required: strings.required,
            minLength: { value: MIN_MESSAGE, message: strings.messageTooShort },
          })}
        />
        <label htmlFor="contact-message" className="field__label">
          {strings.message} <span aria-hidden="true">*</span>
        </label>
        <p id="contact-message-count" className="field__count" aria-live="off">
          {messageLength}/{MAX_MESSAGE}
        </p>
        {messageInvalid && (
          <p id="contact-message-error" className="field__error" role="alert">
            {errors.message?.message}
          </p>
        )}
      </div>

      <div className="contact-form__footer">
        <div role="status" aria-live="polite" className={`contact-form__status is-${status.type}`}>
          {status.type === "success" && status.message}
        </div>
        {status.type === "error" && (
          <p className="contact-form__status is-error" role="alert">
            {status.message}
          </p>
        )}

        <div className="contact-form__actions">
          <button
            type="button"
            className="contact-form__reset"
            onClick={() => {
              reset();
              setStatus({ type: "idle", message: "" });
            }}
          >
            {strings.clear}
          </button>
          <div className="magnet" ref={magneticRef} onPointerMove={onMagnetMove} onPointerLeave={onMagnetLeave}>
            <button
              ref={submitRef}
              type="submit"
              className={`submit${isSubmitting ? " is-loading" : ""}${sent ? " is-sent" : ""}`}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              <span className="submit__text">{isSubmitting ? strings.sending : sent ? strings.sent : strings.send}</span>
              <span className="submit__icon" aria-hidden="true">
                {sent ? (
                  <svg viewBox="0 0 24 24" className="submit__check">
                    <path d="M5 12.5 10 17.5 19 7" fill="none" stroke="currentColor" strokeWidth="2.4" />
                  </svg>
                ) : (
                  "→"
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
