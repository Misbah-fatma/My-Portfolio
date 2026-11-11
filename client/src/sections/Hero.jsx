import { useEffect, useState } from "react";
import Hero3D from "../components/Hero3D.jsx";

const ROLES = ["Full-Stack Engineer", "MERN Developer", "API & auth specialist"];
const PILLS = ["React.js", "Node.js", "MongoDB", "Express", "JWT / RBAC", "Python", "NLP"];

function RoleCycle() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="role-cycle" key={i}>
      {ROLES[i]}
    </span>
  );
}

export default function Hero({ profile, projects = [], armed = true }) {
  const names = [profile.firstName, profile.lastName];

  return (
    <section className={`hero ${armed ? "armed" : ""}`} id="top">
      <div className="glow glow-a" />
      <div className="hero-grid" aria-hidden="true" />
      <Hero3D projects={projects} armed={armed} />

      <div className="hero-top">
        <p className="label">
          <span className="dot" />
          {"// "}
          {profile.location} · {profile.availability}
        </p>
      </div>

      <div className="hero-main">
        <h1 className="hero-title" aria-label={profile.name}>
          {names.map((word, i) => (
            <span className="line" key={word}>
              <span style={{ animationDelay: `${0.15 + i * 0.16}s` }}>{word}</span>
            </span>
          ))}
        </h1>

        <p className="hero-role">
          <span className="prompt">❯</span>
          <RoleCycle />
        </p>
      </div>

      <div className="hero-foot">
        <p className="hero-copy">{profile.tagline}</p>
        <div className="hero-side">
          <ul className="hero-pills">
            {PILLS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="hero-actions">
            <a className="btn btn-fill" href="#work">
              View selected work →
            </a>
            <a className="btn" href="#contact">
              Get in touch →
            </a>
          </div>
        </div>
      </div>

      <div className="hero-statusbar label">
        <span>fn engineer()</span>
        <span>{profile.role}</span>
        <span>{profile.location}</span>
        <span>React · Node · Mongo · Python</span>
      </div>
    </section>
  );
}
