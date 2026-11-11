const LINKS = [
  ["Top", "#top"],
  ["Work", "#work"],
  ["About", "#about"],
  ["Toolbox", "#skills"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
];

export default function Footer({ name = "Misbah Fatma", email = "", socials = [] }) {
  const items = [0, 1, 2, 3];
  return (
    <footer className="footer">
      <div className="footer-top">
        <p className="footer-cta">
          Got a project in mind?
          <br />
          <a href={`mailto:${email}`}>Let’s <em>talk</em> →</a>
        </p>
        <a className="footer-top-btn" href="#top" aria-label="Back to top">
          ↑
        </a>
      </div>

      <div className="footer-cols">
        <nav>
          <p className="label">Menu</p>
          {LINKS.slice(0, 3).map(([l, h]) => (
            <a key={l} href={h}>
              {l}
            </a>
          ))}
        </nav>
        <nav>
          <p className="label">More</p>
          {LINKS.slice(3).map(([l, h]) => (
            <a key={l} href={h}>
              {l}
            </a>
          ))}
        </nav>
        <nav>
          <p className="label">Elsewhere</p>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label} ↗
            </a>
          ))}
        </nav>
        <p className="footer-note">
          Full-stack engineer based in New Delhi, building MERN, auth and AI/ML
          products with real users.
        </p>
      </div>

      <div className="footer-marquee" aria-hidden="true">
        <div className="footer-track">
          {[...items, ...items].map((n) => (
            <span key={n}>
              {name} <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      <div className="footer-bar">
        <span className="label">
          © {new Date().getFullYear()} {name}
        </span>
        <span className="label">made by hand, in New Delhi</span>
      </div>
    </footer>
  );
}
