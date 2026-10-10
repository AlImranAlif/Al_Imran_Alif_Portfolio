import { Resend } from "resend";
import { handleContact } from "@/lib/contact-handler";
import { allowContact } from "@/lib/rate-limit";
import { site } from "@/data/site";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  // Same-origin form requests work on both Vercel previews and the canonical domain.
  const requestOrigin = new URL(request.url).origin;
  const allowedOrigins = new Set([requestOrigin]);
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    allowedOrigins.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).origin);
  }
  if (process.env.VERCEL_URL) {
    allowedOrigins.add(`https://${process.env.VERCEL_URL}`);
  }
  const submittedOrigin = request.headers.get("origin");
  return handleContact(request, {
    configured: Boolean(apiKey && from),
    origin:
      submittedOrigin && allowedOrigins.has(submittedOrigin)
        ? submittedOrigin
        : requestOrigin,
    allow: allowContact,
    async send(input) {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: from!,
        to: process.env.CONTACT_TO_EMAIL || site.email,
        replyTo: input.email,
        subject: `Portfolio: ${input.subject}`,
        // Plain text avoids user-controlled HTML and email-header interpolation.
        text: `Name: ${input.name}\nReply to: ${input.email}\nTopic: ${input.subject}\n\n${input.message}`,
      });
      return !error;
    },
  });
}