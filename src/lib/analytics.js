const ANALYTICS_ORIGIN = (
  import.meta.env.VITE_ANALYTICS_ORIGIN ||
  "https://syed-shahriar-ahmed-portfolio.netlify.app"
).replace(/\/+$/, "");

export const ANALYTICS_TRACK_URL = `${ANALYTICS_ORIGIN}/.netlify/functions/track`;
export const ANALYTICS_STATS_URL = `${ANALYTICS_ORIGIN}/.netlify/functions/stats`;

export const ANALYTICS_OPTOUT_KEY = "portfolio-analytics-optout";

const VISITOR_KEY = "portfolio-visitor-id";
const SESSION_KEY = "portfolio-session-id";
const START_KEY = "portfolio-session-start";
const ACTIVE_KEY = "portfolio-session-active";
const PAGEVIEWS_KEY = "portfolio-session-pageviews";

const HEARTBEAT_MS = 20_000;
const MAX_SESSION_MS = 30 * 60 * 1000;
const MAX_SESSION_AGE_MS = 6 * 24 * 60 * 60 * 1000;

export const isAnalyticsOptedOut = () => {
  try {
    return localStorage.getItem(ANALYTICS_OPTOUT_KEY) === "1";
  } catch {
    return false;
  }
};

export const setAnalyticsOptOut = (value) => {
  try {
    if (value) {
      localStorage.setItem(ANALYTICS_OPTOUT_KEY, "1");
    } else {
      localStorage.removeItem(ANALYTICS_OPTOUT_KEY);
    }
  } catch {
    // Storage can be blocked in private browsing; tracking simply continues.
  }
};

const readStore = (store, key) => {
  try {
    return store.getItem(key);
  } catch {
    return null;
  }
};

const writeStore = (store, key, value) => {
  try {
    store.setItem(key, value);
  } catch {
    // Ignore storage failures.
  }
};

const randomId = () => {
  try {
    if (crypto?.randomUUID) return crypto.randomUUID();
  } catch {
    // Fall through to the timestamp-based id.
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
};

const detectDevice = () => {
  const ua = navigator.userAgent;
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return "Tablet";
  if (/Android/i.test(ua) && !/Mobile/i.test(ua)) return "Tablet";
  if (/Mobi|Android|iPhone|iPod|Windows Phone/i.test(ua)) return "Mobile";
  return "Desktop";
};

const detectBrowser = () => {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return "Edge";
  if (/OPR\/|Opera/.test(ua)) return "Opera";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/SamsungBrowser/.test(ua)) return "Samsung";
  if (/Chrome\/|CriOS/.test(ua)) return "Chrome";
  if (/Safari\//.test(ua)) return "Safari";
  return "Other";
};

const detectOS = () => {
  const ua = navigator.userAgent;
  if (/Windows/.test(ua)) return "Windows";
  if (/Android/.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  if (/Mac OS X/.test(ua)) return "macOS";
  if (/Linux/.test(ua)) return "Linux";
  return "Other";
};

const isLocalHost = () => {
  if (typeof window === "undefined") return true;
  return (
    window.location.protocol === "file:" ||
    ["localhost", "127.0.0.1", "0.0.0.0", "::1"].includes(window.location.hostname)
  );
};

let started = false;

export const startAnalytics = () => {
  if (started || typeof window === "undefined") return () => {};

  const params = new URLSearchParams(window.location.search);
  const testMode = params.get("analytics-test") === "1";
  const onAdmin =
    window.location.pathname === "/admin" ||
    window.location.pathname.startsWith("/admin/");
  const doNotTrack =
    navigator.doNotTrack === "1" ||
    window.doNotTrack === "1" ||
    navigator.msDoNotTrack === "1";

  if (
    onAdmin ||
    doNotTrack ||
    isAnalyticsOptedOut() ||
    (isLocalHost() && !testMode)
  ) {
    return () => {};
  }

  started = true;

  let visitorId = readStore(localStorage, VISITOR_KEY);
  if (!visitorId) {
    visitorId = randomId();
    writeStore(localStorage, VISITOR_KEY, visitorId);
  }

  let sessionId = readStore(sessionStorage, SESSION_KEY);
  if (!sessionId) {
    sessionId = randomId();
    writeStore(sessionStorage, SESSION_KEY, sessionId);
  }

  let startedAt = Number(readStore(sessionStorage, START_KEY));
  let activeBase = Number(readStore(sessionStorage, ACTIVE_KEY)) || 0;
  if (!Number.isFinite(startedAt) || Date.now() - startedAt > MAX_SESSION_AGE_MS) {
    startedAt = Date.now();
    activeBase = 0;
    writeStore(sessionStorage, START_KEY, String(startedAt));
    writeStore(sessionStorage, ACTIVE_KEY, "0");
    writeStore(sessionStorage, PAGEVIEWS_KEY, "0");
  }

  const pageviews =
    (Number(readStore(sessionStorage, PAGEVIEWS_KEY)) || 0) + 1;
  writeStore(sessionStorage, PAGEVIEWS_KEY, String(pageviews));

  const sections = new Set();
  let resumedAt =
    document.visibilityState === "visible" ? performance.now() : 0;

  const duration = () =>
    Math.min(
      MAX_SESSION_MS,
      activeBase + (resumedAt ? performance.now() - resumedAt : 0)
    );

  const persist = () => {
    activeBase = duration();
    resumedAt = document.visibilityState === "visible" ? performance.now() : 0;
    writeStore(sessionStorage, ACTIVE_KEY, String(Math.round(activeBase)));
  };

  const buildPayload = (event) =>
    JSON.stringify({
      event,
      sessionId,
      visitorId,
      startedAt,
      durationMs: Math.round(duration()),
      pageviews,
      path: `${window.location.pathname}${window.location.hash}`,
      referrer: document.referrer || "",
      device: detectDevice(),
      browser: detectBrowser(),
      os: detectOS(),
      language: navigator.language || "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
      sections: [...sections],
      test: testMode,
    });

  const send = (event) => {
    const body = buildPayload(event);
    try {
      if (event === "end" && navigator.sendBeacon) {
        navigator.sendBeacon(
          ANALYTICS_TRACK_URL,
          new Blob([body], { type: "text/plain;charset=UTF-8" })
        );
        return;
      }
      fetch(ANALYTICS_TRACK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body,
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Analytics must never break the page.
    }
  };

  const observeSections = () => {
    if (typeof IntersectionObserver === "undefined") return;
    document.querySelectorAll("section[id]").forEach((section) => {
      if (section.dataset.analyticsObserved) return;
      section.dataset.analyticsObserved = "1";
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) sections.add(section.id);
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(section);
    });
  };

  const onVisibility = () => {
    if (document.visibilityState === "hidden") {
      persist();
      send("end");
    } else {
      resumedAt = performance.now();
    }
  };

  const onPageHide = () => {
    persist();
    resumedAt = 0;
    send("end");
  };

  const heartbeat = window.setInterval(() => {
    if (document.visibilityState !== "visible") return;
    persist();
    send("ping");
  }, HEARTBEAT_MS);

  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", onPageHide);
  window.addEventListener("load", observeSections);

  observeSections();
  const scan = window.setInterval(observeSections, 4_000);
  const stopScan = window.setTimeout(() => window.clearInterval(scan), 40_000);

  send("start");

  return () => {
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", onPageHide);
    window.removeEventListener("load", observeSections);
    window.clearInterval(heartbeat);
    window.clearInterval(scan);
    window.clearTimeout(stopScan);
    started = false;
  };
};
