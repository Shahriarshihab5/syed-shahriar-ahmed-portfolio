const API = "https://api.github.com";

const encodePath = (path) =>
  path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

const authHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
});

async function parseError(response) {
  try {
    const data = await response.json();
    return data.message || `GitHub request failed (${response.status})`;
  } catch {
    return `GitHub request failed (${response.status})`;
  }
}

export async function githubGetFile({ owner, repo, path, branch, token }) {
  const response = await fetch(
    `${API}/repos/${owner}/${repo}/contents/${encodePath(path)}?ref=${encodeURIComponent(
      branch
    )}`,
    { headers: authHeaders(token) }
  );

  if (response.status === 404) return null;
  if (!response.ok) throw new Error(await parseError(response));
  return response.json();
}

export async function githubPutFile({
  owner,
  repo,
  path,
  branch,
  token,
  message,
  contentBase64,
  sha,
}) {
  const response = await fetch(`${API}/repos/${owner}/${repo}/contents/${encodePath(path)}`, {
    method: "PUT",
    headers: {
      ...authHeaders(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!response.ok) throw new Error(await parseError(response));
  return response.json();
}

export function textToBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return btoa(binary);
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.readAsDataURL(file);
  });
}

export async function compressImage(file, { maxWidth = 1600, quality = 0.84 } = {}) {
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read the selected image."));
    reader.readAsDataURL(file);
  });

  const image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not decode the selected image."));
    img.src = dataUrl;
  });

  const scale = Math.min(1, maxWidth / image.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);

  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL("image/jpeg", quality);
}
