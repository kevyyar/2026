import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const MAX_MESSAGE = 2000;

const resendApiKey = import.meta.env.RESEND_API_KEY;
const fromEmail = import.meta.env.RESEND_FROM_EMAIL;
const toEmail = import.meta.env.RESEND_TO_EMAIL;

function sanitizeInline(value: unknown) {
  return String(value ?? "")
    .replace(/[<>"'`]/g, "")
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeEmail(value: unknown) {
  return sanitizeInline(value).toLowerCase();
}

function sanitizeMultiline(value: unknown) {
  return String(value ?? "")
    .replace(/[<>"'`]/g, "")
    .replace(/\t/g, " ")
    .replace(/\u00A0/g, " ")
    .replace(/\r/g, "")
    .replace(/[ ]{2,}/g, " ")
    .trim();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return jsonResponse({ success: false, message: "Unsupported content type" }, 415);
  }

  if (!resendApiKey || !fromEmail || !toEmail) {
    return jsonResponse(
      { success: false, message: "Email service is not configured on the server." },
      500
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ success: false, message: "Invalid JSON payload" }, 400);
  }

  const submission = {
    name: sanitizeInline(payload.name),
    email: sanitizeEmail(payload.email),
    company: sanitizeInline(payload.company),
    projectType: sanitizeInline(payload.projectType ?? ""),
    budget: sanitizeInline(payload.budget ?? ""),
    message: sanitizeMultiline(payload.message),
  };

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

  if (!submission.message || submission.message.length < 20) {
    errors.push("Message is required and must be at least 20 characters.");
  }

  if (submission.message.length > MAX_MESSAGE) {
    errors.push(`Message must be ${MAX_MESSAGE} characters or less.`);
  }

  if (errors.length > 0) {
    return jsonResponse({ success: false, message: "Validation failed.", errors }, 400);
  }

  const resend = new Resend(resendApiKey);

  const subject = `New inquiry from ${submission.name}`;
  const text = [
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Company: ${submission.company}`,
    `Project Type: ${submission.projectType || "Not provided"}`,
    `Budget: ${submission.budget || "Not provided"}`,
    "",
    "Message:",
    submission.message,
  ].join("\n");

  try {
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: submission.email,
      subject,
      text,
    });

    return jsonResponse({
      success: true,
      message: "Thank you! I've received your inquiry and will get back to you within 24 hours.",
    });
  } catch (error) {
    console.error("Resend send error:", error);
    return jsonResponse(
      { success: false, message: "Unable to send your message right now. Please try again later." },
      500
    );
  }
};
