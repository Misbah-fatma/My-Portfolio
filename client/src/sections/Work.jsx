import { useRef, useState } from "react";
import InView from "../components/InView.jsx";
import ProjectArt from "../components/ProjectArt.jsx";

export default function Work({ projects, onOpen }) {
  const [hover, setHover] = useState(null);
  const preview = useRef(null);

  const onMove = (e) => {
    if (preview.current) {
      preview.current.style.transform = `translate3d(${e.clientX + 28}px, ${e.clientY - 110}px, 0)`;
    }
  };

  return (
    <section className="section" id="work">
      <InView>
        <div className="section-head">
          <p className="section-label">the work</p>
          <h2 className="section-title">Stuff I’ve <em>built</em></h2>
          <p className="label">{projects.length} projects · hover to peek</p>
        </div>
      </InView>

      <div className="work-list" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        {projects.map((project, i) => (
          <InView key={project.slug}>
            <article
              className="project"
              onClick={() => onOpen(project)}
              onMouseEnter={() => setHover(project)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpen(project);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <span className="project-no label">{String(i + 1).padStart(2, "0")}</span>
              <span className="project-year">{project.year}</span>
              <div className="project-main">
                <h3>{project.title}</h3>
                <p>{project.category}</p>
              </div>
              <ul className="project-tags">
                {project.stack?.slice(0, 3).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <span className="project-arrow" aria-hidden="true">
                →
              </span>
            </article>
          </InView>
        ))}
        <div className={`preview ${hover ? "show" : ""}`} ref={preview} aria-hidden="true">
          {hover && <ProjectArt project={hover} />}
        </div>
      </div>
    </section>
  );
}
