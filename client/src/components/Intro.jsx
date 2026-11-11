import { useEffect, useRef, useState } from "react";
import ProjectArt from "./ProjectArt.jsx";

const REVEAL_MS = 2900; // hero starts animating as the wipe begins
const DONE_MS = 3750; // overlay removed

export default function Intro({ projects, profile, onReveal, onDone }) {
  const [skipping, setSkipping] = useState(false);
  const timers = useRef([]);
  const tiles = projects.slice(0, 8);
  const mid = (tiles.length - 1) / 2;

  const finish = (fast) => {
    timers.current.forEach(clearTimeout);
    onReveal();
    if (fast) setSkipping(true);
    timers.current = [setTimeout(onDone, fast ? 380 : 0)];
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    timers.current = [
      setTimeout(onReveal, REVEAL_MS),
      setTimeout(onDone, DONE_MS),
    ];
    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish(true);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      timers.current.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`intro ${skipping ? "skipping" : ""}`}
      onClick={() => finish(true)}
      role="presentation"
    >
      <div className="intro-words">
        <p className="intro-word intro-word-l">
          <span>Hello, I’m</span>
          <span>{profile.firstName}</span>
        </p>
        <p className="intro-word intro-word-r">
          <span>Full-stack</span>
          <span>engineer</span>
        </p>
      </div>

      <div className="intro-stage" aria-hidden="true">
        <div className="intro-stack">
          {tiles.map((project, i) => (
            <div
              className="intro-tile"
              key={project.slug}
              style={{
                "--i": i,
                "--o": i - mid,
                "--z": Math.round(-Math.abs(i - mid) * 45),
                "--r": `${((i * 37) % 11) - 5}deg`,
              }}
            >
              <ProjectArt project={project} />
            </div>
          ))}
        </div>
      </div>

      <p className="intro-text">
        {profile.name} — {profile.role}
        <br />
        building products from {profile.location?.split(",")[0]}.
      </p>
      <button className="intro-skip" type="button" onClick={() => finish(true)}>
        Skip intro →
      </button>
    </div>
  );
}
