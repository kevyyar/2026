import type { APIRoute } from "astro";
import { Resend } from "resend";
import { sanitizeSubmission, validateSubmission } from "../../lib/contact-validation";

export const prerender = false;

const resendApiKey = import.meta.env.RESEND_API_KEY;
const fromEmail = import.meta.env.RESEND_FROM_EMAIL;
const toEmail = import.meta.env.RESEND_TO_EMAIL;

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

  const submission = sanitizeSubmission(payload);
  const errors = validateSubmission(submission);

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
