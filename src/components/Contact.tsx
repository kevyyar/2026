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
  const [statusType, setStatusType] = useState<"" | "success" | "error">("");

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
      setStatus("");
      setStatusType("");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setStatus(result?.message || "Something went wrong. Please try again later.");
        setStatusType("error");
        return;
      }

      if (result.success) {
        setStatus(result.message || "Thank you! I've received your inquiry and will get back to you within 24 hours.");
        setStatusType("success");
        reset();
      } else {
        setStatus("Something went wrong. Please try again later.");
        setStatusType("error");
        console.error("Contact submission error:", result);
      }
    } catch (error) {
      setStatus("Something went wrong. Please check your connection and try again.");
      setStatusType("error");
      console.error("Submission Error:", error);
    }
  };

  const showNameError = !!dirtyFields.name && !!errors.name;
  const showEmailError = !!dirtyFields.email && !!errors.email;
  const showCompanyError = !!dirtyFields.company && !!errors.company;
  const showMessageError = !!dirtyFields.message && !!errors.message;

  const inputClasses = "mt-2 w-full rounded-lg border border-white/10 bg-white/5 p-4 text-white placeholder-gray-500 outline-none focus:border-blue-500 focus:bg-white/10 focus:ring-1 focus:ring-blue-500 transition-all duration-300";
  const labelClasses = "block text-sm font-medium text-gray-300 uppercase tracking-wide";

  return (
    <section id="contact" className="relative py-32 bg-black overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 bg-grid-dark opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center relative z-10">
        <span className="text-blue-400 font-medium tracking-wider uppercase text-sm mb-4 block">Get In Touch</span>
        <h2 className="heading-display text-4xl sm:text-5xl">Initiate Collaboration</h2>
        <p className="mt-6 text-xl leading-relaxed text-gray-400 font-light">
          Ready to engineer your future? Tell me about your vision, and I'll help you build the roadmap.
        </p>
      </div>

      <div className="mt-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
        <div className="glass-panel p-8 sm:p-12 border border-white/10 backdrop-blur-xl shadow-2xl">
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="text-left">
                <label htmlFor="name" className={labelClasses}>
                  Name <span className="text-blue-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className={inputClasses}
                  placeholder="John Doe"
                  {...register("name", {
                    setValueAs: sanitizeInline,
                    required: "Required",
                    minLength: { value: 2, message: "Too short" },
                  })}
                />
                {showNameError && (
                  <p className="mt-2 text-xs text-red-400 font-medium">{errors.name?.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="text-left">
                <label htmlFor="email" className={labelClasses}>
                  Work Email <span className="text-blue-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={inputClasses}
                  placeholder="john@company.com"
                  {...register("email", {
                    setValueAs: sanitizeEmail,
                    required: "Required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "Invalid email" },
                  })}
                />
                {showEmailError && (
                  <p className="mt-2 text-xs text-red-400 font-medium">{errors.email?.message}</p>
                )}
              </div>
            </div>

            {/* Company */}
            <div className="text-left">
              <label htmlFor="company" className={labelClasses}>
                Company <span className="text-blue-500">*</span>
              </label>
              <input
                id="company"
                type="text"
                autoComplete="organization"
                className={inputClasses}
                placeholder="Your Organization"
                {...register("company", {
                  setValueAs: sanitizeInline,
                  required: "Required",
                })}
              />
              {showCompanyError && (
                <p className="mt-2 text-xs text-red-400 font-medium">{errors.company?.message}</p>
              )}
            </div>

            {/* Project Type & Budget Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Project Type */}
              <div className="text-left">
                <label htmlFor="projectType" className={labelClasses}>
                  Project Type
                </label>
                <select
                  id="projectType"
                  className={`${inputClasses} appearance-none`}
                  {...register("projectType")}
                >
                  <option value="" className="text-gray-500 bg-[#0F172A]">Select type</option>
                  <option value="web-app" className="text-white bg-[#0F172A]">Web Application</option>
                  <option value="ecommerce" className="text-white bg-[#0F172A]">E-commerce</option>
                  <option value="website" className="text-white bg-[#0F172A]">Website / Landing Page</option>
                  <option value="redesign" className="text-white bg-[#0F172A]">Redesign / Optimization</option>
                  <option value="maintenance" className="text-white bg-[#0F172A]">Maintenance / Support</option>
                </select>
              </div>

              {/* Budget */}
              <div className="text-left">
                <label htmlFor="budget" className={labelClasses}>
                  Budget Range
                </label>
                <select
                  id="budget"
                  className={`${inputClasses} appearance-none`}
                  {...register("budget")}
                >
                   <option value="" className="text-gray-500 bg-[#0F172A]">Select budget</option>
                  <option value="5k-10k" className="text-white bg-[#0F172A]">$5K - $10K</option>
                  <option value="10k-25k" className="text-white bg-[#0F172A]">$10K - $25K</option>
                  <option value="25k-50k" className="text-white bg-[#0F172A]">$25K - $50K</option>
                  <option value="50k+" className="text-white bg-[#0F172A]">$50K+</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="text-left">
              <div className="flex items-baseline justify-between mb-2">
                <label htmlFor="message" className={labelClasses}>
                  Message <span className="text-blue-500">*</span>
                </label>
                <span className="text-xs text-gray-500">
                  {messageLen}/{MAX_MESSAGE}
                </span>
              </div>
              <textarea
                id="message"
                rows={6}
                className={inputClasses}
                placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                maxLength={MAX_MESSAGE}
                {...register("message", {
                  setValueAs: sanitizeMultiline,
                  required: "Required",
                  minLength: { value: 20, message: "Too short" },
                })}
              />
              {showMessageError && (
                <p className="mt-2 text-xs text-red-400 font-medium">{errors.message?.message}</p>
              )}
            </div>

            {/* Status */}
            {status && (
              <div
                role="status"
                aria-live="polite"
                className={`rounded-lg px-4 py-3 text-sm border ${
                  statusType === "error"
                    ? "border-red-500/20 bg-red-500/10 text-red-400"
                    : "border-green-500/20 bg-green-500/10 text-green-400"
                }`}
              >
                {status}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
               <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                onClick={() => {
                  reset();
                  setStatus("");
                  setStatusType("");
                }}
              >
                Reset Form
              </button>
              <button 
                type="submit" 
                className="btn px-8 py-4 text-lg w-full sm:w-auto shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Transmitting..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
