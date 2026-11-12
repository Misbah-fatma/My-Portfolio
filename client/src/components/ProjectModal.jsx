import ProjectShot from "./ProjectShot.jsx";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-art">
          <ProjectShot project={project} />
        </div>
        <div className="modal-body">
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
          <p className="modal-kicker">
            {project.category}
            {project.year ? ` — ${project.year}` : ""}
          </p>
          <h2>{project.title}</h2>
          <p className="lead">{project.summary}</p>
          <div className="modal-cols">
            <div>
              <h4>The problem</h4>
              <p>{project.problem}</p>
            </div>
            <div>
              <h4>What I built</h4>
              <p>{project.outcome}</p>
            </div>
          </div>
          <div className="modal-block">
            <h4>My contribution</h4>
            <p>{project.description}</p>
          </div>
          <div className="chips">
            {project.stack?.map((item) => (
              <span className="chip" key={item}>
                {item}
              </span>
            ))}
          </div>
          <div className="modal-links">
            {project.liveUrl && (
              <a className="btn btn-fill" href={project.liveUrl} target="_blank" rel="noreferrer">
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
      </div>
    </div>
  );
}
