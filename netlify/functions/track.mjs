import { getStore } from "@netlify/blobs";

const STORE_NAME = "portfolio-analytics";
const MAX_SESSION_MS = 24 * 60 * 60 * 1000;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

const json = (payload, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...CORS_HEADERS,
    },
  });

const clean = (value, max = 120) =>
  typeof value === "string" ? value.replace(/[\u0000-\u001f]/g, "").slice(0, max) : "";

const validId = (value) =>
  typeof value === "string" && /^[a-zA-Z0-9-]{8,64}$/.test(value);

const hostFromUrl = (value) => {
  if (!value) return "";
  try {
    return new URL(value).hostname.replace(/^www\./, "").slice(0, 100);
  } catch {
    return "";
  }
};

export default async (request, context) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  let body;
  try {
    const text = await request.text();
    if (text.length > 8_000) {
      return json({ ok: false, error: "Payload too large" }, 413);
    }
    body = JSON.parse(text);
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const sessionId = body?.sessionId;
  const visitorId = body?.visitorId;
  if (!validId(sessionId) || !validId(visitorId)) {
    return json({ ok: false, error: "Invalid ids" }, 400);
  }

  const startedAt = Number(body?.startedAt);
  const now = Date.now();
  if (
    !Number.isFinite(startedAt) ||
    startedAt < now - 7 * 24 * 60 * 60 * 1000 ||
    startedAt > now + 60_000
  ) {
    return json({ ok: false, error: "Invalid session time" }, 400);
  }

  const event = ["start", "ping", "end"].includes(body?.event)
    ? body.event
    : "ping";
  const durationMs = Math.min(
    MAX_SESSION_MS,
    Math.max(0, Number(body?.durationMs) || 0)
  );
  const pageviews = Math.min(500, Math.max(1, Number(body?.pageviews) || 1));
  const viewedSections = Array.isArray(body?.sections)
    ? body.sections
        .filter((section) => typeof section === "string" && section.length < 40)
        .slice(0, 20)
    : [];

  const country =
    context?.geo?.country?.name || context?.geo?.country?.code || "Unknown";
  const key = `sessions/${String(startedAt).padStart(13, "0")}-${sessionId}`;

  try {
    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    const existing = await store
      .get(key, { type: "json", consistency: "strong" })
      .catch(() => null);

    const record = {
      id: sessionId,
      visitorId,
      startedAt,
      lastSeenAt: Math.max(Number(existing?.lastSeenAt) || 0, now),
      durationMs: Math.max(Number(existing?.durationMs) || 0, durationMs),
      pageviews: Math.max(Number(existing?.pageviews) || 0, pageviews),
      sections: [
        ...new Set([
          ...(Array.isArray(existing?.sections) ? existing.sections : []),
          ...viewedSections,
        ]),
      ].slice(0, 20),
      path: clean(body?.path, 120) || existing?.path || "/",
      referrer: clean(body?.referrer, 300),
      referrerHost: hostFromUrl(body?.referrer) || existing?.referrerHost || "",
      device: clean(body?.device, 20) || existing?.device || "Unknown",
      browser: clean(body?.browser, 20) || existing?.browser || "Unknown",
      os: clean(body?.os, 20) || existing?.os || "Unknown",
      language: clean(body?.language, 20),
      timezone: clean(body?.timezone, 60),
      screen: clean(body?.screen, 20),
      country: existing?.country || country,
      test: Boolean(existing?.test || body?.test),
      updatedAt: now,
    };

    await store.setJSON(key, record);
    return json({ ok: true, event });
  } catch (error) {
    console.error("analytics track failed", error);
    return json({ ok: false, error: "ANALYTICS_UNAVAILABLE" }, 500);
  }
};
