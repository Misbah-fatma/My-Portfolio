import TypeCycle from "../components/TypeCycle.jsx";
import CodeWindow from "../components/CodeWindow.jsx";

const ROLES = [
  "Full-Stack Engineer",
  "MERN Developer",
  "API & auth specialist",
];

const PILLS = [
  "React.js",
  "Node.js",
  "MongoDB",
  "Express",
  "JWT / RBAC",
  "Python",
  "NLP",
];

const RAIN = [
  "const deploy = async () => {",
  "01001101 01000110",
  "app.use(authMiddleware)",
  "=> res.json(user)",
  "git commit -m 'ship'",
  "{ jwt, rbac, 2fa }",
  "mongoose.connect(uri)",
  "</> map.filter.reduce",
  "npm run build",
  "socket.emit('ready')",
  "SELECT * FROM builders",
  "docker compose up",
];

export default function Hero({ profile, armed }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grid" />
      <div className="code-rain" aria-hidden="true">
        {RAIN.map((row, i) => (
          <span key={row} style={{ animationDelay: `${i * -1.6}s` }}>
            {row}
          </span>
        ))}
      </div>
      <div className="orb orb-a" />
      <div className="orb orb-b" />

      <div className="hero-shell">
        <div className="hero-path">
          <span className="path-dir">~/misbah-fatma</span>
          <span className="path-git">git:(main)</span>
          <span className="path-ok">● compiled</span>
        </div>

        <div className="hero-layout">
          <div className="hero-main">
            <p className="code-comment">
              {"// "}
              {profile.location} · {profile.availability}
            </p>
            <h1 className="display hero-name">
              <span>{profile.firstName}</span>
              <span>{profile.lastName}</span>
            </h1>
            <p className="hero-role">
              <span className="prompt">❯</span>
              <TypeCycle words={ROLES} armed={armed} />
              <span className="caret" />
            </p>
            <p className="hero-copy">{profile.tagline}</p>
            <div className="hero-pills">
              {PILLS.map((pill, i) => (
                <span
                  className="hero-pill"
                  key={pill}
                  style={{ animationDelay: `${0.9 + i * 0.08}s` }}
                >
                  {pill}
                </span>
              ))}
            </div>
            <div className="hero-actions">
              <a className="btn btn-fill" href="#work">
                View selected work
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="btn btn-ghost" href="#contact">
                Get in touch
                <span className="btn-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>

          <CodeWindow armed={armed} />
        </div>

        <div className="hero-statusbar">
          <span>fn engineer()</span>
          <span>{profile.role}</span>
          <span>{profile.location}</span>
          <span>React · Node · Mongo · Python</span>
        </div>
      </div>
    </section>
  );
}
