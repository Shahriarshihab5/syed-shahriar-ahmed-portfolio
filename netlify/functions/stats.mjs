import { getStore } from "@netlify/blobs";
import { buildAnalytics } from "../lib/aggregate.mjs";

const STORE_NAME = "portfolio-analytics";
const PREFIX = "sessions/";
const MAX_SESSIONS = 1_500;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
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

const chunk = (items, size) => {
  const groups = [];
  for (let index = 0; index < items.length; index += size) {
    groups.push(items.slice(index, index + size));
  }
  return groups;
};

export default async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (request.method !== "GET") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  const url = new URL(request.url);
  const days = Math.min(
    90,
    Math.max(1, Number(url.searchParams.get("days")) || 7)
  );
  const timezone = url.searchParams.get("tz") || "Asia/Dhaka";
  const includeTest = url.searchParams.get("includeTest") === "1";

  try {
    const store = getStore({ name: STORE_NAME, consistency: "strong" });
    const { blobs } = await store.list({ prefix: PREFIX });

    const now = Date.now();
    const since = now - days * 24 * 60 * 60 * 1000 - 60 * 60 * 1000;

    const keys = blobs
      .map((blob) => blob.key)
      .filter((key) => {
        const stamp = Number(key.slice(PREFIX.length).split("-")[0]);
        return Number.isFinite(stamp) && stamp >= since;
      })
      .sort()
      .reverse()
      .slice(0, MAX_SESSIONS);

    const records = [];
    for (const group of chunk(keys, 20)) {
      const entries = await Promise.all(
        group.map((key) =>
          store
            .get(key, { type: "json", consistency: "strong" })
            .catch(() => null)
        )
      );
      for (const entry of entries) {
        if (entry) records.push(entry);
      }
    }

    const analytics = buildAnalytics(records, {
      days,
      timezone,
      now,
      includeTest,
    });

    return json({ ok: true, ...analytics });
  } catch (error) {
    console.error("analytics stats failed", error);
    return json(
      {
        ok: false,
        error: "ANALYTICS_UNAVAILABLE",
        message: String(error?.message || error),
      },
      500
    );
  }
};
