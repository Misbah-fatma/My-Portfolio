import { useEffect, useState } from "react";

const LINKS = [
  { href: "#work", id: "work", file: "work", ext: "jsx" },
  { href: "#about", id: "about", file: "about", ext: "md" },
  { href: "#skills", id: "skills", file: "stack", ext: "ts" },
  { href: "#experience", id: "experience", file: "experience", ext: "md" },
  { href: "#contact", id: "contact", file: "contact", ext: "sh" },
];

export default function Nav({ location }) {
  const [open, setOpen] = useState(false);
  const [clock, setClock] = useState("");
  const [active, setActive] = useState("top");

  useEffect(() => {
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }).format(new Date())
      );
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ids = ["top", ...LINKS.map((l) => l.id)];
    const onScroll = () => {
      let current = "top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 96) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${open ? "open" : ""}`}>
      <a className="nav-status" href="#top" onClick={() => setOpen(false)}>
        <span className="dot" />
        <span className="nav-cmd">available</span>
      </a>

      <nav className="nav-tabs-wrap" aria-label="Primary">
        <ul className="nav-tabs">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                className={`nav-tab ${active === link.id ? "is-active" : ""}`}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                <span className="nav-file">{link.file}</span>
                <span className="nav-ext">.{link.ext}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="nav-meta">
        <span className="nav-chip">{location || "New Delhi"}</span>
        <span className="nav-chip">{clock} IST</span>
      </div>

      <button
        className="menu-btn"
        aria-label="Menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
      </button>
    </header>
  );
}
