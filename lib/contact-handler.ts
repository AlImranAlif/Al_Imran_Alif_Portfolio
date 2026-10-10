import { contactSchema, type ContactInput } from "./contact-schema";
export type SendInput = Omit<ContactInput, "website">;
export type ContactDependencies = {
  configured: boolean;
  origin: string;
  allow: (key: string) => boolean;
  send: (input: SendInput) => Promise<boolean>;
};
const maxBytes = 16_384;
function json(
  body: object,
  status = 200,
  headers: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}
async function readBoundedBody(request: Request): Promise<string> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0,
    text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new Error("BODY_TOO_LARGE");
      }
      text += decoder.decode(value, { stream: true });
    }
    return text + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}
export async function handleContact(
  request: Request,
  deps: ContactDependencies,
): Promise<Response> {
  const origin = request.headers.get("origin");
  if (!origin || origin !== deps.origin)
    return json({ error: "This request is not allowed." }, 403);
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  )
    return json({ error: "Use a JSON request." }, 415);
  if (Number(request.headers.get("content-length")) > maxBytes)
    return json({ error: "Your message is too large." }, 413);
  let body: unknown;
  try {
    body = JSON.parse(await readBoundedBody(request));
  } catch (error) {
    return json(
      {
        error:
          error instanceof Error && error.message === "BODY_TOO_LARGE"
            ? "Your message is too large."
            : "The message could not be read.",
      },
      error instanceof Error && error.message === "BODY_TOO_LARGE" ? 413 : 400,
    );
  }
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof body.website === "string" &&
    body.website.trim()
  ) {
    // A filled honeypot receives a neutral response; it never sends email.
    return json({ ok: true });
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success)
    return json(
      {
        error: "Please check the highlighted fields.",
        fields: parsed.error.flatten().fieldErrors,
      },
      400,
    );
  if (!deps.configured)
    return json(
      {
        error:
          "The contact form is temporarily unavailable. Please email alimranalif19@gmail.com.",
      },
      503,
    );
  const key =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!deps.allow(key))
    return json(
      {
        error:
          "Too many attempts. Please wait 10 minutes or contact me by email.",
      },
      429,
      { "Retry-After": "600" },
    );
  try {
    const { website: _honeypot, ...input } = parsed.data;
    const sent = await deps.send(input);
    return sent
      ? json({ ok: true })
      : json(
          {
            error:
              "Your message could not be sent. Please try again or use email.",
          },
          502,
        );
  } catch {
    return json(
      {
        error: "Your message could not be sent. Please try again or use email.",
      },
      502,
    );
  }
}