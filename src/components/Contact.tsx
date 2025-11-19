import { useState } from "react";
import { useForm } from "react-hook-form";

type ContactForm = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
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
      company: "",
      projectType: "",
      budget: "",
      message: "",
    },
  });

  const messageValue = watch("message") ?? "";
  const messageLen = messageValue.length;

  const onSubmit = async (data: ContactForm) => {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY,
          ...data,
          subject: "New Submission from Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("Thank you! I've received your inquiry and will get back to you within 24 hours.");
        reset();
      } else {
        setStatus("Something went wrong. Please try again later.");
        // eslint-disable-next-line no-console
        console.error("Web3Forms Error:", result);
      }
    } catch (error) {
      setStatus("Something went wrong. Please check your connection and try again.");
      // eslint-disable-next-line no-console
      console.error("Submission Error:", error);
    }
  };

  const showNameError = !!dirtyFields.name && !!errors.name;
  const showEmailError = !!dirtyFields.email && !!errors.email;
  const showCompanyError = !!dirtyFields.company && !!errors.company;
  const showMessageError = !!dirtyFields.message && !!errors.message;

  return (
    <section id="contact" className="bg-secondary py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <h2 className="heading-display text-3xl sm:text-4xl">Let&apos;s Build Something Great</h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Ready to transform your digital presence? Tell me about your project and
          I&apos;ll get back to you within 24 hours.
        </p>
      </div>

      <div className="mt-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8">
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="text-left">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name <span className="text-primary">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={showNameError}
                  aria-describedby={showNameError ? "name-error" : undefined}
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  placeholder="John Doe"
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
                  Work Email <span className="text-primary">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={showEmailError}
                  aria-describedby={showEmailError ? "email-error" : undefined}
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  placeholder="john@company.com"
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
            </div>

            {/* Company */}
            <div className="text-left">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company / Organization <span className="text-primary">*</span>
              </label>
              <input
                id="company"
                type="text"
                autoComplete="organization"
                aria-invalid={showCompanyError}
                aria-describedby={showCompanyError ? "company-error" : undefined}
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                placeholder="Your company name"
                {...register("company", {
                  setValueAs: sanitizeInline,
                  required: "Please enter your company or organization name.",
                  minLength: {
                    value: 2,
                    message: "Please enter your company name (at least 2 characters).",
                  },
                })}
              />
              {showCompanyError && (
                <p id="company-error" className="mt-2 text-sm text-red-600">
                  {errors.company?.message}
                </p>
              )}
            </div>

            {/* Project Type & Budget Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project Type */}
              <div className="text-left">
                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">
                  Project Type
                </label>
                <select
                  id="projectType"
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  {...register("projectType")}
                >
                  <option value="">Select type</option>
                  <option value="web-app">Web Application</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="website">Website / Landing Page</option>
                  <option value="redesign">Redesign / Optimization</option>
                  <option value="maintenance">Maintenance / Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Budget */}
              <div className="text-left">
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                  Budget Range
                </label>
                <select
                  id="budget"
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  {...register("budget")}
                >
                  <option value="">Select budget</option>
                  <option value="5k-10k">$5K - $10K</option>
                  <option value="10k-25k">$10K - $25K</option>
                  <option value="25k-50k">$25K - $50K</option>
                  <option value="50k+">$50K+</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>
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
                placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                maxLength={MAX_MESSAGE + 200}
                {...register("message", {
                  setValueAs: sanitizeMultiline,
                  required: "Please describe your project (at least 20 characters).",
                  minLength: { value: 20, message: "Please describe your project (at least 20 characters)." },
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
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}