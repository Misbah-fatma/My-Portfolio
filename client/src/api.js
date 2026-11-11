const API = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

// Render's free tier sleeps the API; a cold start can take a minute.
// Never block the page on it — callers render bundled data first.
export function warmUp() {
  fetch(`${API}/health`, { cache: "no-store" }).catch(() => {});
}

export async function fetchPortfolio({ timeout = 60000 } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(`${API}/portfolio`, { signal: ctrl.signal });
    if (!res.ok) throw new Error("Request failed: /portfolio");
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

export async function sendMessage(payload) {
  const res = await fetch(`${API}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Could not send message");
  return data;
}
