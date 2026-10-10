import { test } from "node:test";
import assert from "node:assert/strict";
import {
  handleContact,
  type ContactDependencies,
} from "../lib/contact-handler";
import { allowContact } from "../lib/rate-limit";
const valid = {
  name: "Portfolio reviewer",
  email: "reviewer@example.com",
  subject: "Research collaboration",
  message: "I would like to discuss a research collaboration.",
  website: "",
};
const origin = "https://portfolio.test";
function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request(`${origin}/api/contact`, {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}
function deps(
  overrides: Partial<ContactDependencies> = {},
): ContactDependencies {
  return {
    origin,
    configured: true,
    allow: () => true,
    send: async () => true,
    ...overrides,
  };
}
test("valid request sends the validated reply details exactly once", async () => {
  let count = 0;
  const response = await handleContact(
    request(valid),
    deps({
      send: async (input) => {
        count++;
        assert.equal(input.email, valid.email);
        assert.equal(input.message, valid.message);
        assert.equal("website" in input, false);
        return true;
      },
    }),
  );
  assert.equal(response.status, 200);
  assert.equal(count, 1);
  assert.deepEqual(await response.json(), { ok: true });
});
test("cross-origin requests cannot trigger mail", async () => {
  const response = await handleContact(
    request(valid, { Origin: "https://unrelated.test" }),
    deps({
      send: async () => {
        assert.fail("must not send");
      },
    }),
  );
  assert.equal(response.status, 403);
});
test("missing origin is rejected", async () => {
  const r = request(valid);
  r.headers.delete("origin");
  assert.equal((await handleContact(r, deps())).status, 403);
});
test("invalid email and short message return validation errors", async () => {
  const response = await handleContact(
    request({ ...valid, email: "invalid", message: "short" }),
    deps(),
  );
  assert.equal(response.status, 400);
  const result = await response.json();
  assert.ok(result.fields.email);
  assert.ok(result.fields.message);
});
test("honeypot reports neutral success without sending", async () => {
  const response = await handleContact(
    request({ ...valid, website: "https://spam.test" }),
    deps({
      send: async () => {
        assert.fail("must not send");
      },
    }),
  );
  assert.equal(response.status, 200);
});
test("unconfigured mail cannot claim successful delivery", async () => {
  const response = await handleContact(
    request(valid),
    deps({ configured: false }),
  );
  assert.equal(response.status, 503);
  assert.ok((await response.json()).error.includes("email"));
});
test("provider failure and exception are honest error responses", async () => {
  assert.equal(
    (await handleContact(request(valid), deps({ send: async () => false })))
      .status,
    502,
  );
  assert.equal(
    (
      await handleContact(
        request(valid),
        deps({
          send: async () => {
            throw new Error("provider unavailable");
          },
        }),
      )
    ).status,
    502,
  );
});
test("request body is bounded even without Content-Length", async () => {
  const response = await handleContact(
    request({ ...valid, message: "a".repeat(17000) }),
    deps(),
  );
  assert.equal(response.status, 413);
});
test("rate-limited request does not send and includes retry timing", async () => {
  const response = await handleContact(
    request(valid),
    deps({ allow: () => false }),
  );
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "600");
});
test("instance rate limiter allows five requests and rejects the sixth", () => {
  for (let i = 0; i < 5; i++) assert.equal(allowContact("test-key"), true);
  assert.equal(allowContact("test-key"), false);
});
