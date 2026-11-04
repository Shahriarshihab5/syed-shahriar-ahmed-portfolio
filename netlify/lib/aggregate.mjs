const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const LIVE_WINDOW_MS = 2 * 60 * 1000;

const formatterCache = new Map();

const getFormatter = (timezone, granularity) => {
  const key = `${timezone}:${granularity}`;
  if (!formatterCache.has(key)) {
    formatterCache.set(
      key,
      new Intl.DateTimeFormat("en-GB", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        ...(granularity === "hour"
          ? { hour: "2-digit", hourCycle: "h23" }
          : {}),
      })
    );
  }
  return formatterCache.get(key);
};

const bucketKey = (formatter, date, granularity) => {
  const parts = formatter.formatToParts(date);
  const get = (type) => parts.find((part) => part.type === type)?.value || "00";
  const day = `${get("year")}-${get("month")}-${get("day")}`;
  return granularity === "hour" ? `${day}T${get("hour")}` : day;
};

const dayLabel = (timezone, date) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    month: "short",
    day: "numeric",
  }).format(date);

const hourLabel = (timezone, date) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    hour12: true,
  }).format(date);

const topEntries = (map, limit = 8) =>
  [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));

const bump = (map, key) => {
  const name = key || "Unknown";
  map.set(name, (map.get(name) || 0) + 1);
};

const asNumber = (value, fallback = 0) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const referrerLabel = (record) => {
  const host = String(record?.referrerHost || "").trim();
  if (!host) return "Direct";
  return host;
};

export const buildAnalytics = (
  records,
  { days = 7, timezone = "Asia/Dhaka", now = Date.now(), includeTest = false } = {}
) => {
  const safeDays = Math.min(90, Math.max(1, Math.round(asNumber(days, 7))));
  const granularity = safeDays === 1 ? "hour" : "day";
  const bucketCount = granularity === "hour" ? 24 : safeDays;
  const step = granularity === "hour" ? HOUR_MS : DAY_MS;
  const formatter = getFormatter(timezone, granularity);

  const buckets = [];
  const bucketIndex = new Map();
  for (let offset = bucketCount - 1; offset >= 0; offset -= 1) {
    const date = new Date(now - offset * step);
    const key = bucketKey(formatter, date, granularity);
    const label =
      granularity === "hour" ? hourLabel(timezone, date) : dayLabel(timezone, date);
    bucketIndex.set(key, buckets.length);
    buckets.push({ key, label, date: key, visitors: 0, sessions: 0, pageviews: 0 });
  }

  const rows = [];
  for (const record of Array.isArray(records) ? records : []) {
    if (!record || typeof record !== "object") continue;
    if (!includeTest && record.test) continue;

    const startedAt = asNumber(record.startedAt);
    if (!startedAt) continue;

    const key = bucketKey(formatter, new Date(startedAt), granularity);
    const index = bucketIndex.get(key);
    if (index === undefined) continue;

    rows.push({
      record,
      startedAt,
      index,
      visitorId: String(record.visitorId || record.id || ""),
      durationMs: Math.max(0, asNumber(record.durationMs)),
      pageviews: Math.max(1, asNumber(record.pageviews, 1)),
    });
  }

  const visitorSessions = new Map();
  const countries = new Map();
  const devices = new Map();
  const browsers = new Map();
  const systems = new Map();
  const referrers = new Map();
  const sections = new Map();
  const paths = new Map();

  let totalDurationMs = 0;
  let measuredSessions = 0;
  let bounces = 0;
  let pageviews = 0;
  let live = 0;

  for (const row of rows) {
    const { record } = row;

    visitorSessions.set(
      row.visitorId,
      (visitorSessions.get(row.visitorId) || 0) + 1
    );

    bump(countries, record.country);
    bump(devices, record.device);
    bump(browsers, record.browser);
    bump(systems, record.os);
    bump(referrers, referrerLabel(record));
    bump(paths, record.path);

    const viewed = Array.isArray(record.sections) ? record.sections : [];
    for (const section of new Set(viewed)) {
      if (typeof section === "string" && section) bump(sections, section);
    }

    pageviews += row.pageviews;
    totalDurationMs += row.durationMs;
    if (row.durationMs > 0) measuredSessions += 1;
    if (row.durationMs < 10_000 && row.pageviews <= 1) bounces += 1;
    if (now - asNumber(record.lastSeenAt) < LIVE_WINDOW_MS) live += 1;

    const bucket = buckets[row.index];
    bucket.sessions += 1;
    bucket.pageviews += row.pageviews;
  }

  // Unique visitor counts per bucket (and overall) need a set, so do a second pass.
  const bucketVisitors = buckets.map(() => new Set());
  for (const row of rows) {
    bucketVisitors[row.index].add(row.visitorId);
  }
  buckets.forEach((bucket, index) => {
    bucket.visitors = bucketVisitors[index].size;
  });

  const uniqueVisitors = visitorSessions.size;
  const returningVisitors = [...visitorSessions.values()].filter(
    (count) => count > 1
  ).length;

  const recent = [...rows]
    .sort((a, b) => b.startedAt - a.startedAt)
    .slice(0, 20)
    .map(({ record, startedAt, durationMs, pageviews: views }) => ({
      id: String(record.id || "").slice(0, 12),
      startedAt,
      durationMs,
      pageviews: views,
      country: record.country || "Unknown",
      device: record.device || "Unknown",
      browser: record.browser || "Unknown",
      os: record.os || "Unknown",
      referrer: referrerLabel(record),
      path: record.path || "/",
      sections: Array.isArray(record.sections)
        ? record.sections.filter((section) => typeof section === "string").slice(0, 8)
        : [],
    }));

  return {
    range: {
      days: safeDays,
      granularity,
      timezone,
      since: now - safeDays * DAY_MS,
      until: now,
    },
    totals: {
      visitors: uniqueVisitors,
      newVisitors: uniqueVisitors - returningVisitors,
      returningVisitors,
      sessions: rows.length,
      pageviews,
      avgDurationMs: measuredSessions ? totalDurationMs / measuredSessions : 0,
      totalDurationMs,
      bounceRate: rows.length ? bounces / rows.length : 0,
      live,
    },
    series: buckets,
    breakdowns: {
      countries: topEntries(countries),
      devices: topEntries(devices, 5),
      browsers: topEntries(browsers, 5),
      systems: topEntries(systems, 5),
      referrers: topEntries(referrers, 6),
      sections: topEntries(sections, 8),
      pages: topEntries(paths, 6),
    },
    recent,
  };
};
