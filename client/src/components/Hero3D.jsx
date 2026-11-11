import { useEffect, useRef } from "react";
import ProjectArt from "./ProjectArt.jsx";

const API_LINES = [
  ["GET", "/api/projects", "200"],
  ["GET", "/api/skills", "200"],
  ["POST", "/api/contact", "201"],
  ["GET", "/api/experience", "200"],
];

const LABELS = [
  { text: "Frontend · React", x: -0.78, y: -0.72, z: 0.5, d: 0 },
  { text: "API · Express", x: 0.42, y: -0.02, z: 0.7, d: 1.3 },
  { text: "Database · MongoDB", x: -0.62, y: 0.4, z: 0.4, d: 2.2 },
  { text: "JWT / RBAC", x: -0.98, y: -0.1, z: 0.9, d: 0.7 },
];

// Deterministic "random" so server/client output never differs.
const DOTS = Array.from({ length: 18 }, (_, i) => ({
  x: ((i * 53) % 100) - 50,
  y: ((i * 31) % 100) - 50,
  z: ((i * 17) % 60) * 6 - 120,
  s: 2 + (i % 3),
  d: (i % 7) * 0.9,
  t: 7 + (i % 5) * 2,
}));

export default function Hero3D({ projects = [], armed = true }) {
  const tilt = useRef(null);

  useEffect(() => {
    const hero = tilt.current?.closest(".hero");
    if (!hero || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        tilt.current?.style.setProperty("--ty", `${nx * 26}deg`);
        tilt.current?.style.setProperty("--tx", `${ny * -18}deg`);
      });
    };
    hero.addEventListener("mousemove", onMove);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`scene ${armed ? "armed" : ""}`} aria-hidden="true">
      <p className="hero-note">
        <svg viewBox="0 0 54 56">
          <path d="M50 52 C 30 54, 8 40, 6 8" />
          <path d="M-2 18 L 6 6 L 16 16" />
        </svg>
        front → API → database.
        <br />
        that's how I think
      </p>
      <div className="scene-tilt" ref={tilt}>
        <div className="iso">
          {/* Database — bottom layer */}
          <div className="slab slab-db" style={{ "--lvl": 0 }}>
            <span className="slab-tag">DB</span>
            <div className="db-grid">
              {Array.from({ length: 36 }, (_, i) => (
                <i key={i} style={{ "--n": (i * 7) % 11 }} />
              ))}
            </div>
          </div>

          {/* API — middle layer */}
          <div className="slab slab-api" style={{ "--lvl": 1 }}>
            <span className="slab-tag">API</span>
            <ul className="api-lines">
              {API_LINES.map(([m, p, c], i) => (
                <li key={p} style={{ "--n": i }}>
                  <b>{m}</b> {p} <em>{c}</em>
                </li>
              ))}
            </ul>
          </div>

          {/* UI — top layer */}
          <div className="slab slab-ui" style={{ "--lvl": 2 }}>
            <span className="slab-tag">UI</span>
            <div className="ui-bar">
              <i />
              <i />
              <i />
            </div>
            <div className="ui-grid">
              {projects.slice(0, 4).map((p) => (
                <div key={p.slug}>
                  <ProjectArt project={p} />
                </div>
              ))}
            </div>
          </div>

          {/* data packets travelling up between layers */}
          {[0, 1].map((lvl) =>
            [18, 50, 82].map((left, k) => (
              <span
                className="beam"
                key={`${lvl}-${left}`}
                style={{ "--lvl": lvl, "--left": `${left}%`, "--top": `${k === 1 ? 70 : 28}%` }}
              >
                <i style={{ "--d": `${(k * 0.8 + lvl * 0.5).toFixed(1)}s` }} />
              </span>
            ))
          )}

          <div className="orbit">
            <span />
          </div>
        </div>

        {LABELS.map((l) => (
          <span
            className="chip3d"
            key={l.text}
            style={{
              "--cx": `calc(var(--s) * ${l.x})`,
              "--cy": `calc(var(--s) * ${l.y})`,
              "--cz": `${Math.round(l.z * 120)}px`,
              "--cd": `${l.d}s`,
            }}
          >
            {l.text}
          </span>
        ))}

        {DOTS.map((d, i) => (
          <span
            className="dust"
            key={i}
            style={{
              "--dx": `calc(var(--s) * ${d.x / 55})`,
              "--dy": `calc(var(--s) * ${d.y / 55})`,
              "--dz": `${d.z}px`,
              "--ds": `${d.s}px`,
              "--dd": `${d.d}s`,
              "--dt": `${d.t}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
