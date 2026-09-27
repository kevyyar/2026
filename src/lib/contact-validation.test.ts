import { describe, expect, it } from "vitest";
import {
  MAX_MESSAGE,
  isValidEmail,
  sanitizeEmail,
  sanitizeInline,
  sanitizeMultiline,
  sanitizeSubmission,
  validateSubmission,
  type ContactSubmission,
} from "./contact-validation";

const valid: ContactSubmission = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  projectType: "web-app",
  budget: "10k-25k",
  message: "We need a new customer portal built this quarter.",
};

describe("sanitizers", () => {
  it("sanitizeInline strips markup characters, normalizes whitespace and trims", () => {
    expect(sanitizeInline("  <b>Ada</b> \t 'Love`lace\"  ")).toBe("bAda/b Lovelace");
    expect(sanitizeInline(undefined)).toBe("");
    expect(sanitizeInline(null)).toBe("");
    expect(sanitizeInline(42)).toBe("42");
  });

  it("sanitizeEmail sanitizes and lowercases", () => {
    expect(sanitizeEmail("  Ada@Example.COM ")).toBe("ada@example.com");
  });

  it("sanitizeMultiline keeps line breaks but removes CR, tabs, nbsp and repeated spaces", () => {
    expect(sanitizeMultiline("  Hello<>\r\nworld\tand   more text  ")).toBe(
      "Hello\nworld and more text",
    );
    expect(sanitizeMultiline(undefined)).toBe("");
  });

  it("isValidEmail requires local part, domain and a 2+ char TLD", () => {
    expect(isValidEmail("a@b.co")).toBe(true);
    expect(isValidEmail("a@b.c")).toBe(false);
    expect(isValidEmail("a b@c.com")).toBe(false);
    expect(isValidEmail("no-at.com")).toBe(false);
  });
});

describe("sanitizeSubmission", () => {
  it("sanitizes every field and defaults optional fields to empty strings", () => {
    expect(
      sanitizeSubmission({
        name: " Ada ",
        email: " ADA@EXAMPLE.COM ",
        company: " <Acme> ",
        message: "Hello\r\nthere",
      }),
    ).toEqual({
      name: "Ada",
      email: "ada@example.com",
      company: "Acme",
      projectType: "",
      budget: "",
      message: "Hello\nthere",
    });
  });
});

describe("validateSubmission", () => {
  it("accepts a valid submission", () => {
    expect(validateSubmission(valid)).toEqual([]);
  });

  it("requires a name of at least 2 characters", () => {
    expect(validateSubmission({ ...valid, name: "A" })).toEqual([
      "Name is required and must be at least 2 characters.",
    ]);
  });

  it("requires a valid email", () => {
    expect(validateSubmission({ ...valid, email: "nope" })).toEqual(["A valid email is required."]);
  });

  it("requires a company of at least 2 characters", () => {
    expect(validateSubmission({ ...valid, company: "A" })).toEqual([
      "Company is required and must be at least 2 characters.",
    ]);
    expect(validateSubmission({ ...valid, company: "AB" })).toEqual([]);
  });

  it("requires a message between 20 and MAX_MESSAGE characters", () => {
    expect(MAX_MESSAGE).toBe(2000);
    expect(validateSubmission({ ...valid, message: "x".repeat(19) })).toEqual([
      "Message is required and must be at least 20 characters.",
    ]);
    expect(validateSubmission({ ...valid, message: "x".repeat(20) })).toEqual([]);
    expect(validateSubmission({ ...valid, message: "x".repeat(2000) })).toEqual([]);
    expect(validateSubmission({ ...valid, message: "x".repeat(2001) })).toEqual([
      "Message must be 2000 characters or less.",
    ]);
  });

  it("reports every failing field in order", () => {
    expect(
      validateSubmission({ name: "", email: "", company: "", projectType: "", budget: "", message: "" }),
    ).toEqual([
      "Name is required and must be at least 2 characters.",
      "A valid email is required.",
      "Company is required and must be at least 2 characters.",
      "Message is required and must be at least 20 characters.",
    ]);
  });
});
