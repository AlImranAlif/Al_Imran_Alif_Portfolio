"use client";
import { useRef, useState, type FormEvent } from "react";
import { contactSchema } from "@/lib/contact-schema";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "./icons";
type Errors = Partial<Record<"name" | "email" | "message", string>>;
export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const form = useRef<HTMLFormElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const fields = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fields.name?.[0],
        email: fields.email?.[0],
        message: fields.message?.[0],
      });
      const first = parsed.error.issues[0]?.path[0];
      if (typeof first === "string")
        form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    setStatus("sending");
    setMessage("Sending your message…");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: controller.signal,
      });
      const result: { ok?: boolean; error?: string } = await response.json();
      if (!response.ok || !result.ok)
        throw new Error(
          result.error || "The message could not be sent. Please use email.",
        );
      setStatus("success");
      setMessage("Message sent. Thank you for reaching out.");
      form.current?.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.name === "AbortError"
          ? "The request timed out; delivery is unconfirmed. Please wait before retrying, or contact me by email."
          : error instanceof Error
            ? error.message
            : "Something went wrong. Please contact me by email.",
      );
    } finally {
      clearTimeout(timeout);
    }
  }
  return (
    <form
      ref={form}
      method="post"
      action="/api/contact"
      onSubmit={submit}
      className="contact-form"
      aria-label="Contact Al Imran Alif"
    >
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">
            Name <span>(required)</span>
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={80}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="field-error">
              {errors.name}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">
            Email <span>(required)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="field-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>
      <div className="field">
        <label htmlFor="subject">What would you like to discuss?</label>
        <select
          id="subject"
          name="subject"
          defaultValue="Research collaboration"
        >
          <option>Internship opportunity</option>
          <option>Research collaboration</option>
          <option>Software project</option>
          <option>Other</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">
          Message <span>(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={20}
          maxLength={4000}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "message-error message-hint" : "message-hint"
          }
        />
        {errors.message && (
          <p id="message-error" className="field-error">
            {errors.message}
          </p>
        )}
        <p id="message-hint" className="field-hint">
          20–4,000 characters. Your details are used only to respond to your
          message.
        </p>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="form-bottom">
        <button
          type="submit"
          className="button button-primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <>
              Sending
              <LoaderCircle size={16} className="spin" aria-hidden="true" />
            </>
          ) : (
            <>
              Send message
              <ArrowUpRight size={16} aria-hidden="true" />
            </>
          )}
        </button>
        <span className="mono">EMAIL / DIRECT CHANNEL</span>
      </div>
      <p
        className={`form-status ${status}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status === "success" && <CheckCircle2 size={17} aria-hidden="true" />}
        {message}
      </p>
    </form>
  );
}