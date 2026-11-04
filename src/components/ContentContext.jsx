/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { defaultContent } from "../data/defaultContent";
import { fileToBase64, githubGetFile, githubPutFile, textToBase64 } from "../lib/github";

const DRAFT_KEY = "portfolio-content-draft-v1";
export const ADMIN_SESSION_KEY = "portfolio-admin-session";

const clone = (value) => JSON.parse(JSON.stringify(value));

const DATA_URL_RE = /^data:(image\/[a-z0-9.+-]+);base64,/i;

const extensionForMime = (mime) => {
  const map = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
  };
  return map[mime] || "jpg";
};

const shortHash = (value) => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
};

export const mergeContent = (remote) => {
  if (!remote || typeof remote !== "object") return clone(defaultContent);

  return {
    ...clone(defaultContent),
    ...remote,
    profile: { ...clone(defaultContent.profile), ...(remote.profile || {}) },
    experience: Array.isArray(remote.experience)
      ? remote.experience
      : clone(defaultContent.experience),
    projects: Array.isArray(remote.projects) ? remote.projects : clone(defaultContent.projects),
    research: Array.isArray(remote.research) ? remote.research : clone(defaultContent.research),
    certificates: Array.isArray(remote.certificates)
      ? remote.certificates
      : clone(defaultContent.certificates),
    activities: Array.isArray(remote.activities)
      ? remote.activities
      : clone(defaultContent.activities),
  };
};

const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const [content, setContentState] = useState(() => {
    try {
      const draft = localStorage.getItem(DRAFT_KEY);
      if (draft) return mergeContent(JSON.parse(draft));
    } catch {
      // Corrupt draft: fall back to defaults.
    }
    return mergeContent(defaultContent);
  });

  const [hasDraft, setHasDraft] = useState(() => {
    try {
      return Boolean(localStorage.getItem(DRAFT_KEY));
    } catch {
      return false;
    }
  });
  const [loading, setLoading] = useState(true);
  const [pendingCv, setPendingCv] = useState(null);
  const [storageWarning, setStorageWarning] = useState("");
  const [publishState, setPublishState] = useState({
    status: "idle",
    message: "",
    url: "",
  });

  // Load the live content.json, unless a local draft should take priority.
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch("/content.json", { cache: "no-cache" });
        if (!response.ok) return;

        const remote = await response.json();
        if (cancelled) return;

        let draft = null;
        try {
          const raw = localStorage.getItem(DRAFT_KEY);
          if (raw) draft = JSON.parse(raw);
        } catch {
          draft = null;
        }

        if (draft) {
          setHasDraft(true);
          return;
        }

        setContentState(mergeContent(remote));
      } catch {
        // Offline or content.json not deployed yet: defaults stay visible.
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const persistDraft = useCallback((next) => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
      setHasDraft(true);
      setStorageWarning("");
    } catch {
      setStorageWarning(
        "This draft is too large for browser storage. Export a backup before closing the tab."
      );
    }
  }, []);

  const setContent = useCallback(
    (updater) => {
      setContentState((previous) => {
        const next = typeof updater === "function" ? updater(previous) : updater;
        persistDraft(next);
        return next;
      });
    },
    [persistDraft]
  );

  const saveDraft = useCallback(() => {
    persistDraft(content);
  }, [content, persistDraft]);

  const discardDraft = useCallback(async () => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
    setHasDraft(false);

    try {
      const response = await fetch("/content.json", { cache: "no-cache" });
      if (response.ok) {
        setContentState(mergeContent(await response.json()));
        return;
      }
    } catch {
      // ignore
    }
    setContentState(mergeContent(defaultContent));
  }, []);

  const resetContent = useCallback(() => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
    setHasDraft(false);
    setContentState(mergeContent(defaultContent));
  }, []);

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "content.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }, [content]);

  const importJson = useCallback(
    async (file) => {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const merged = mergeContent(parsed);
      setContentState(merged);
      persistDraft(merged);
      return merged;
    },
    [persistDraft]
  );

  const uploadCv = useCallback(async (file) => {
    if (!file) return;
    const base64 = await fileToBase64(file);
    setPendingCv({
      name: file.name,
      base64,
      size: file.size,
      previewUrl: URL.createObjectURL(file),
    });
  }, []);

  const clearPendingCv = useCallback(() => {
    setPendingCv((previous) => {
      if (previous?.previewUrl) URL.revokeObjectURL(previous.previewUrl);
      return null;
    });
  }, []);

  const publish = useCallback(
    async (config) => {
      if (!config?.owner || !config?.repo || !config?.branch || !config?.token) {
        throw new Error("Repository owner, name, branch and a GitHub token are required.");
      }

      setPublishState({
        status: "publishing",
        message: "Preparing your changes…",
        url: "",
      });

      try {
        let nextContent = clone(content);
        const contentPath = config.path || "public/content.json";

        // 1. Upload a newly selected CV, if any.
        if (pendingCv) {
          setPublishState({
            status: "publishing",
            message: "Uploading CV to GitHub…",
            url: "",
          });

          const safeName = pendingCv.name.split(/[\\/]/).pop().replace(/[^\w.\- ]+/g, "-");
          const cvPath = `public/${safeName}`;
          const existingCv = await githubGetFile({ ...config, path: cvPath });

          await githubPutFile({
            ...config,
            path: cvPath,
            contentBase64: pendingCv.base64,
            sha: existingCv?.sha,
            message: `Update CV: ${safeName}`,
          });

          nextContent.profile.cvUrl = `/${encodeURIComponent(safeName)}?v=${Date.now()}`;
          nextContent.profile.cvFileName = safeName;
        }

        // 2. Commit any newly uploaded images as real files, then rewrite their URLs.
        const publicDir = contentPath.includes("/")
          ? contentPath.slice(0, contentPath.lastIndexOf("/") + 1)
          : "";
        const servedDir = publicDir.replace(/^public\//, "");
        const imageCache = new Map();
        let uploadedImages = 0;

        const processImages = async (value) => {
          if (typeof value === "string") {
            const match = value.match(DATA_URL_RE);
            if (!match) return value;
            if (imageCache.has(value)) return imageCache.get(value);

            const mime = match[1].toLowerCase();
            const extension = extensionForMime(mime);
            const fileName = `img-${shortHash(value)}.${extension}`;
            const repoPath = `${publicDir}uploads/${fileName}`;
            const publicPath = `/${servedDir}uploads/${fileName}`;

            const existing = await githubGetFile({ ...config, path: repoPath });
            if (!existing) {
              setPublishState({
                status: "publishing",
                message: `Uploading image ${uploadedImages + 1}…`,
                url: "",
              });
              await githubPutFile({
                ...config,
                path: repoPath,
                contentBase64: value.slice(match[0].length),
                message: `Upload portfolio image ${fileName}`,
              });
              uploadedImages += 1;
            }

            imageCache.set(value, publicPath);
            return publicPath;
          }

          if (Array.isArray(value)) {
            const output = [];
            for (const item of value) {
              output.push(await processImages(item));
            }
            return output;
          }

          if (value && typeof value === "object") {
            const output = {};
            for (const [key, item] of Object.entries(value)) {
              output[key] = await processImages(item);
            }
            return output;
          }

          return value;
        };

        if (JSON.stringify(nextContent).includes("data:image/")) {
          setPublishState({
            status: "publishing",
            message: "Uploading images to GitHub…",
            url: "",
          });
          nextContent = await processImages(nextContent);
        }

        // 3. Publish the structured content.
        nextContent.updatedAt = new Date().toISOString();
        setPublishState({
          status: "publishing",
          message: "Committing content.json…",
          url: "",
        });

        const existingContent = await githubGetFile({ ...config, path: contentPath });
        const result = await githubPutFile({
          ...config,
          path: contentPath,
          contentBase64: textToBase64(JSON.stringify(nextContent, null, 2)),
          sha: existingContent?.sha,
          message: `Update portfolio content (${new Date().toISOString()})`,
        });

        setContentState(nextContent);
        // The commit is now the source of truth, so the local draft is no longer needed.
        try {
          localStorage.removeItem(DRAFT_KEY);
        } catch {
          // ignore
        }
        setHasDraft(false);
        setPendingCv(null);

        setPublishState({
          status: "success",
          message:
            "Published to GitHub. Your hosting provider should redeploy automatically in a minute.",
          url: result?.commit?.html_url || "",
        });

        return result;
      } catch (error) {
        setPublishState({
          status: "error",
          message: error.message || "Publish failed.",
          url: "",
        });
        throw error;
      }
    },
    [content, pendingCv]
  );

  return (
    <ContentContext.Provider
      value={{
        content,
        setContent,
        loading,
        hasDraft,
        saveDraft,
        discardDraft,
        resetContent,
        exportJson,
        importJson,
        pendingCv,
        uploadCv,
        clearPendingCv,
        publish,
        publishState,
        storageWarning,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used inside a ContentProvider");
  return context;
};
