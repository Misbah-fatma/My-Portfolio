import { useEffect, useState } from "react";
import Hero3D from "../components/Hero3D.jsx";

const PHOTO = "/profile.jpg"; // drop your photo at client/public/profile.jpg
const RESUME = "/Misbah-Fatma-Resume.pdf";

function usePhoto() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => setOk(true);
    img.src = PHOTO;
  }, []);
  return ok;
}

export default function Hero({ profile, projects = [], armed = true }) {
  const hasPhoto = usePhoto();
  const link = (label) => profile.socials?.find((s) => s.label === label)?.href;
  const socials = [
    ["GitHub", link("GitHub")],
    ["LinkedIn", link("LinkedIn")],
    ["Email", `mailto:${profile.email}`],
  ].filter(([, href]) => href);

  const step = (i) => ({ "--i": i });

  return (
    <section className={`hero ${armed ? "armed" : ""}`} id="top">
      <div className="glow glow-a" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-split">
        <div className="hero-text">
          <p className="hero-hello hero-anim" style={step(0)}>
            Hello, I’m
          </p>

          <h1 className="hero-title hero-anim" style={step(1)} aria-label={profile.name}>
            <span>{profile.firstName}</span>
            <em>{profile.lastName}</em>
          </h1>

          <p className="hero-role hero-anim" style={step(2)}>
            Full-Stack Developer <i>|</i> MERN Stack <i>|</i> AI/ML Enthusiast
          </p>

          <p className="hero-copy hero-anim" style={step(3)}>
            I’m a full-stack developer based in {profile.location?.split(",")[0]}. I build web
            apps with React, Node.js and MongoDB, and I enjoy working on the AI/ML side too.
          </p>

          <div className="hero-actions hero-anim" style={step(4)}>
            <a className="btn btn-fill" href="#work">
              View Projects ↗
            </a>
            <a className="btn" href={RESUME} download>
              Download Resume ↓
            </a>
          </div>

          <p className="hero-links hero-anim" style={step(5)}>
            {socials.map(([label, href], i) => (
              <span key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                >
                  {label}
                </a>
                {i < socials.length - 1 && <b>·</b>}
              </span>
            ))}
          </p>
        </div>

        <div className="hero-visual hero-anim" style={step(3)}>
          {hasPhoto ? (
            <figure className="photo">
              <img src={PHOTO} alt={profile.name} />
              <span className="photo-tag t1">React</span>
              <span className="photo-tag t2">Node.js</span>
              <span className="photo-tag t3">MongoDB</span>
            </figure>
          ) : (
            <Hero3D projects={projects} armed={armed} />
          )}
        </div>
      </div>
    </section>
  );
}
