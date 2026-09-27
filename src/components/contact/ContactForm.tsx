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

const PROJECT_TYPES = [
  { value: "", label: "Not sure yet" },
  { value: "web-app", label: "Web Application" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "website", label: "Website / Landing Page" },
  { value: "redesign", label: "Redesign / Optimization" },
  { value: "maintenance", label: "Maintenance / Support" },
];

const BUDGETS = [
  { value: "", label: "Not sure yet" },
  { value: "5k-10k", label: "$5K - $10K" },
  { value: "10k-25k", label: "$10K - $25K" },
  { value: "25k-50k", label: "$25K - $50K" },
  { value: "50k+", label: "$50K+" },
];

const FALLBACK_ERROR = "Something went wrong. Please try again later.";

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

export default function ContactForm() {
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
        setStatus({ type: "error", message: result?.message || FALLBACK_ERROR });
        return;
      }

      setStatus({
        type: "success",
        message: result.message || "Thank you! I've received your inquiry and will get back to you within 24 hours.",
      });
      setSent(true);
      reset();
      if (submitRef.current) burst(submitRef.current);
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus({ type: "error", message: "Something went wrong. Please check your connection and try again." });
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
          "Name",
          { autoComplete: "name" },
          { setValueAs: sanitizeInline, required: "Required", minLength: { value: 2, message: "Too short" } },
        )}
        {textField(
          "email",
          "Work email",
          { type: "email", autoComplete: "email" },
          {
            setValueAs: sanitizeEmail,
            required: "Required",
            pattern: { value: EMAIL_PATTERN, message: "Invalid email" },
          },
        )}
      </div>

      {textField(
        "company",
        "Company",
        { autoComplete: "organization" },
        { setValueAs: sanitizeInline, required: "Required", minLength: { value: 2, message: "Too short" } },
      )}

      <fieldset className="pills">
        <legend className="pills__legend">
          Project type <span className="pills__optional">(optional)</span>
        </legend>
        <div className="pills__options">
          {PROJECT_TYPES.map((option) => (
            <label key={option.value || "none"} className="pill">
              <input type="radio" value={option.value} className="pill__input" {...register("projectType")} />
              <span className="pill__label">{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="pills">
        <legend className="pills__legend">
          Budget range <span className="pills__optional">(optional)</span>
        </legend>
        <div className="pills__options">
          {BUDGETS.map((option) => (
            <label key={option.value || "none"} className="pill">
              <input type="radio" value={option.value} className="pill__input" {...register("budget")} />
              <span className="pill__label">{option.label}</span>
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
            required: "Required",
            minLength: { value: MIN_MESSAGE, message: `Too short — at least ${MIN_MESSAGE} characters` },
          })}
        />
        <label htmlFor="contact-message" className="field__label">
          Tell me about the project <span aria-hidden="true">*</span>
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
            Clear form
          </button>
          <div className="magnet" ref={magneticRef} onPointerMove={onMagnetMove} onPointerLeave={onMagnetLeave}>
            <button
              ref={submitRef}
              type="submit"
              className={`submit${isSubmitting ? " is-loading" : ""}${sent ? " is-sent" : ""}`}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              <span className="submit__text">{isSubmitting ? "Sending…" : sent ? "Sent" : "Send message"}</span>
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
