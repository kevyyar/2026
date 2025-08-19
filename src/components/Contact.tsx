import { useState } from "react";
import { useForm } from "react-hook-form";

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

const MAX_MESSAGE = 2000;

// Sanitizers used via setValueAs (run before validation)
function sanitizeInline(value: string) {
  return String(value ?? "")
    .replace(/[<>"'`]/g, "")
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeEmail(value: string) {
  return sanitizeInline(value).toLowerCase();
}

function sanitizeMultiline(value: string) {
  return String(value ?? "")
    .replace(/[<>"'`]/g, "")
    .replace(/\t/g, " ")
    .replace(/\u00A0/g, " ")
    .replace(/\r/g, "")
    .replace(/[ ]{2,}/g, " ")
    .trim();
}

export default function Contact() {
  const [status, setStatus] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, dirtyFields },
    watch,
  } = useForm<ContactForm>({
    mode: "onChange", // validate on change for real-time feedback
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const messageValue = watch("message") ?? "";
  const messageLen = messageValue.length;

  const onSubmit = async (data: ContactForm) => {
    // simulate async submit, replace with your API call
    await new Promise((r) => setTimeout(r, 400));
    // eslint-disable-next-line no-console
    console.log("Contact form submitted:", data);
    setStatus("Thanks! Your message has been sent.");
    reset();
  };

  const showNameError = !!dirtyFields.name && !!errors.name;
  const showEmailError = !!dirtyFields.email && !!errors.email;
  const showMessageError = !!dirtyFields.message && !!errors.message;

  return (
    <section id="contact" className="bg-secondary py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <h2 className="heading-display text-3xl">Contact</h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Have a project in mind or just want to say hi? Send a message and
          I&apos;ll get back to you.
        </p>
      </div>

      <div className="mt-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div className="text-left">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name <span className="text-primary">*</span>
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                aria-invalid={showNameError}
                aria-describedby={showNameError ? "name-error" : undefined}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                placeholder="Your name"
                {...register("name", {
                  setValueAs: sanitizeInline,
                  required: "Please enter your name (at least 2 characters).",
                  minLength: {
                    value: 2,
                    message: "Please enter your name (at least 2 characters).",
                  },
                  pattern: {
                    value: /^[\p{L}\d .,'-]{2,}$/u,
                    message: "Name contains invalid characters.",
                  },
                })}
              />
              {showNameError && (
                <p id="name-error" className="mt-2 text-sm text-red-600">
                  {errors.name?.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="text-left">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email <span className="text-primary">*</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={showEmailError}
                aria-describedby={showEmailError ? "email-error" : undefined}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                placeholder="you@example.com"
                {...register("email", {
                  setValueAs: sanitizeEmail,
                  required: "Please enter your email.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                    message: "Please enter a valid email address.",
                  },
                })}
              />
              {showEmailError && (
                <p id="email-error" className="mt-2 text-sm text-red-600">
                  {errors.email?.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="text-left">
              <div className="flex items-baseline justify-between">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message <span className="text-primary">*</span>
                </label>
                <span className="text-xs text-gray-500">
                  {messageLen}/{MAX_MESSAGE}
                </span>
              </div>
              <textarea
                id="message"
                rows={6}
                aria-invalid={showMessageError}
                aria-describedby={showMessageError ? "message-error" : undefined}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 resize-y"
                placeholder="How can I help?"
                maxLength={MAX_MESSAGE + 200}
                {...register("message", {
                  setValueAs: sanitizeMultiline,
                  required: "Please write a message (at least 10 characters).",
                  minLength: { value: 10, message: "Please write a message (at least 10 characters)." },
                  maxLength: { value: MAX_MESSAGE, message: `Message is too long (max ${MAX_MESSAGE} characters).` },
                })}
              />
              {showMessageError && (
                <p id="message-error" className="mt-2 text-sm text-red-600">
                  {errors.message?.message}
                </p>
              )}
            </div>

            {/* Status */}
            {status && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
              >
                {status}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  reset();
                  setStatus("");
                }}
              >
                Clear
              </button>
              <button type="submit" className="btn disabled:opacity-50" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}