import { useRef, useState } from "react";
import InView from "../components/InView.jsx";
import ProjectArt from "../components/ProjectArt.jsx";
import ProjectShot from "../components/ProjectShot.jsx";

function FeaturedCard({ project, onOpen }) {
  return (
    <article className="feat">
      <button
        className="feat-shot"
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open ${project.title}`}
      >
        <ProjectShot project={project} />
      </button>
      <div className="feat-body">
        <p className="feat-kicker">
          {project.category}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <h3>{project.title}</h3>
        <dl className="feat-facts">
          <div>
            <dt>The problem</dt>
            <dd>{project.problem}</dd>
          </div>
          <div>
            <dt>What I built</dt>
            <dd>{project.outcome}</dd>
          </div>
        </dl>
        <ul className="chips">
          {project.stack?.slice(0, 8).map((t) => (
            <li className="chip" key={t}>
              {t}
            </li>
          ))}
        </ul>
        <div className="feat-actions">
          <button className="btn btn-fill" type="button" onClick={() => onOpen(project)}>
            Case study →
          </button>
          {project.liveUrl && (
            <a className="btn" href={project.liveUrl} target="_blank" rel="noreferrer">
              Live demo ↗
            </a>
          )}
          {project.repoUrl && (
            <a className="btn" href={project.repoUrl} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Work({ projects, onOpen }) {
  const [hover, setHover] = useState(null);
  const preview = useRef(null);

  // Which projects are "featured" comes from the `featured` flag in your database.
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

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
          <h2 className="section-title">
            Featured <em>projects</em>
          </h2>
          <p className="label">{featured.length} case studies</p>
        </div>
      </InView>

      <div className="feat-list">
        {featured.map((project) => (
          <InView key={project.slug}>
            <FeaturedCard project={project} onOpen={onOpen} />
          </InView>
        ))}
      </div>

      {rest.length > 0 && (
        <>
          <InView>
            <p className="subhead">More work</p>
          </InView>
          <div className="work-list" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
            {rest.map((project, i) => (
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
        </>
      )}
    </section>
  );
}
