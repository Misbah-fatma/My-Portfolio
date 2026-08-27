const API = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

async function get(path) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${path}`);
  return res.json();
}

export function fetchPortfolio() {
  return Promise.all([
    get("/profile"),
    get("/projects"),
    get("/skills"),
    get("/experience"),
  ]).then(([profile, projects, skills, experience]) => ({
    profile,
    projects,
    skills,
    experience,
  }));
}

export async function sendMessage(payload) {
  const res = await fetch(`${API}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Could not send message");
  return data;
}
