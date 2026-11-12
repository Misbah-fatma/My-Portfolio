import { useState } from "react";
import InView from "../components/InView.jsx";

export default function Skills({ skills }) {
  const groups = (skills || []).filter((g) => g.group !== "Other").slice(0, 6);
  const [active, setActive] = useState(0);
  const current = groups[active] || groups[0];
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section className="section" id="skills">
      <InView>
        <div className="section-head">
          <p className="section-label">toolbox</p>
          <h2 className="section-title">Technical <em>skills</em></h2>
          <p className="label">{total} tools</p>
        </div>
        <p className="section-note">
          No percentage bars — just the tools I’m happy to talk about in an interview.
        </p>
      </InView>

      <InView>
        <div className="stack-ui">
          <ul className="stack-tabs" role="tablist" aria-label="Skill groups">
            {groups.map((g, i) => (
              <li key={g.group}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={i === active ? "on" : ""}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                  <strong>{g.group}</strong>
                  <em>{String(g.items.length).padStart(2, "0")}</em>
                </button>
              </li>
            ))}
          </ul>

          <div className="stack-panel" key={current?.group} role="tabpanel">
            <span className="stack-ghost" aria-hidden="true">
              {String(active + 1).padStart(2, "0")}
            </span>
            <p className="label">{current?.group}</p>
            <ul>
              {current?.items.map((item, i) => (
                <li key={item} style={{ "--d": `${i * 45}ms` }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </InView>
    </section>
  );
}
