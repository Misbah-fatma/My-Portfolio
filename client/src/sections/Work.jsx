import InView from "../components/InView.jsx";
import ProjectArt from "../components/ProjectArt.jsx";

export default function Work({ projects, onOpen }) {
  return (
    <section className="section" id="work">
      <div className="section-head">
        <div>
          <p className="index">02 — Selected work</p>
          <h2 className="section-title">Platforms I’ve<br />shipped.</h2>
        </div>
        <p className="eyebrow" style={{ margin: 0 }}>
          {String(projects.length).padStart(2, "0")} projects
        </p>
      </div>
      <div className="work-list">
        {projects.map((project, i) => (
          <InView key={project.slug}>
            <article
              className="project"
              onClick={() => onOpen(project)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpen(project);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="project-art">
                <ProjectArt project={project} />
              </div>
              <div className="project-body">
                <div>
                  <div className="project-kicker">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      {project.category} · {project.year}
                    </span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <div className="chips">
                  {project.stack?.slice(0, 6).map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </InView>
        ))}
      </div>
    </section>
  );
}
