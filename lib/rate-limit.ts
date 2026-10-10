import { createHash } from "node:crypto";
const attempts = new Map<string, { count: number; expires: number }>();
// Best-effort instance-local limit. See README for serverless limitations.
export function allowContact(ip: string): boolean {
  const now = Date.now();
  for (const [key, value] of attempts)
    if (value.expires <= now) attempts.delete(key);
  const key = createHash("sha256").update(ip).digest("hex");
  const prior = attempts.get(key);
  if (prior && prior.count >= 5) return false;
  if (prior) prior.count += 1;
  else {
    if (attempts.size >= 5000) return false;
    attempts.set(key, { count: 1, expires: now + 600_000 });
  }
  return true;
}