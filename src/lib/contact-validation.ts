/**
 * Pure sanitization and validation rules for the contact form.
 * Shared by the `/api/contact` endpoint (source of truth) and the client form.
 */
export const MAX_MESSAGE = 2000;
export const MIN_MESSAGE = 20;

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ContactSubmission = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

export function sanitizeInline(value: unknown): string {
  return String(value ?? "")
    .replace(/[<>"'`]/g, "")
    .replace(/ /g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeEmail(value: unknown): string {
  return sanitizeInline(value).toLowerCase();
}

export function sanitizeMultiline(value: unknown): string {
  return String(value ?? "")
    .replace(/[<>"'`]/g, "")
    .replace(/\t/g, " ")
    .replace(/ /g, " ")
    .replace(/\r/g, "")
    .replace(/[ ]{2,}/g, " ")
    .trim();
}

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value);
}

export function sanitizeSubmission(payload: Record<string, unknown>): ContactSubmission {
  return {
    name: sanitizeInline(payload.name),
    email: sanitizeEmail(payload.email),
    company: sanitizeInline(payload.company),
    projectType: sanitizeInline(payload.projectType ?? ""),
    budget: sanitizeInline(payload.budget ?? ""),
    message: sanitizeMultiline(payload.message),
  };
}

/** Returns human-readable errors, in field order. An empty array means valid. */
export function validateSubmission(submission: ContactSubmission): string[] {
  const errors: string[] = [];

  if (!submission.name || submission.name.length < 2) {
    errors.push("Name is required and must be at least 2 characters.");
  }

  if (!submission.email || !isValidEmail(submission.email)) {
    errors.push("A valid email is required.");
  }

  if (!submission.company || submission.company.length < 2) {
    errors.push("Company is required and must be at least 2 characters.");
  }

  if (!submission.message || submission.message.length < MIN_MESSAGE) {
    errors.push("Message is required and must be at least 20 characters.");
  }

  if (submission.message.length > MAX_MESSAGE) {
    errors.push(`Message must be ${MAX_MESSAGE} characters or less.`);
  }

  return errors;
}
