import { useEffect, useState } from "react";

const LINES = [
  [
    { k: "cm", t: "// src/engineer.js" },
  ],
  [
    { k: "kw", t: "const " },
    { k: "id", t: "misbah" },
    { k: "pn", t: " = {" },
  ],
  [
    { k: "ky", t: "  name" },
    { k: "pn", t: ": " },
    { k: "st", t: '"Misbah Fatma"' },
    { k: "pn", t: "," },
  ],
  [
    { k: "ky", t: "  role" },
    { k: "pn", t: ": " },
    { k: "st", t: '"Full-Stack Engineer"' },
    { k: "pn", t: "," },
  ],
  [
    { k: "ky", t: "  stack" },
    { k: "pn", t: ": [" },
    { k: "st", t: '"React"' },
    { k: "pn", t: ", " },
    { k: "st", t: '"Node"' },
    { k: "pn", t: ", " },
    { k: "st", t: '"MongoDB"' },
    { k: "pn", t: "]," },
  ],
  [
    { k: "ky", t: "  now" },
    { k: "pn", t: ": " },
    { k: "st", t: '"ESS · production apps"' },
    { k: "pn", t: "," },
  ],
  [
    { k: "ky", t: "  skills" },
    { k: "pn", t: ": [" },
    { k: "st", t: '"JWT"' },
    { k: "pn", t: ", " },
    { k: "st", t: '"RBAC"' },
    { k: "pn", t: ", " },
    { k: "st", t: '"NLP"' },
    { k: "pn", t: "]," },
  ],
  [
    { k: "ky", t: "  available" },
    { k: "pn", t: ": " },
    { k: "kw", t: "true" },
  ],
  [{ k: "pn", t: "};" }],
  [{ k: "cm", t: "" }],
  [
    { k: "kw", t: "export default " },
    { k: "id", t: "misbah" },
    { k: "pn", t: ";" },
  ],
];

export default function CodeWindow({ armed = true }) {
  const [visible, setVisible] = useState(0);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!armed) return undefined;
    if (reduce) {
      setVisible(LINES.length);
      return undefined;
    }
    setVisible(0);
    const id = setInterval(() => {
      setVisible((n) => {
        if (n >= LINES.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 160);
    return () => clearInterval(id);
  }, [armed, reduce]);

  return (
    <aside className="code-window" aria-hidden="true">
      <div className="code-chrome">
        <span className="traffic red" />
        <span className="traffic yellow" />
        <span className="traffic green" />
        <span className="code-file">engineer.js</span>
      </div>
      <div className="code-body">
        {LINES.map((line, i) => (
          <div
            className={`code-line ${i < visible ? "show" : ""}`}
            key={i}
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            <span className="ln">{String(i + 1).padStart(2, "0")}</span>
            <span>
              {line.map((bit, j) => (
                <span className={bit.k} key={j}>
                  {bit.t}
                </span>
              ))}
              {i === visible - 1 && i < LINES.length && (
                <span className="caret" />
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="code-status">
        <span>main*</span>
        <span>JavaScript</span>
        <span>UTF-8</span>
        <span>Ln {Math.max(visible, 1)}, Col 1</span>
      </div>
    </aside>
  );
}
