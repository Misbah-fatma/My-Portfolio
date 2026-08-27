import ProjectArt from "./ProjectArt.jsx";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-art">
          <ProjectArt project={project} />
        </div>
        <div className="modal-body">
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
          <p className="eyebrow">
            {project.category} — {project.year}
          </p>
          <h2>{project.title}</h2>
          <p className="lead">{project.description}</p>
          <div className="modal-cols">
            <div>
              <h5>The brief</h5>
              <p>{project.problem}</p>
            </div>
            <div>
              <h5>The outcome</h5>
              <p>{project.outcome}</p>
            </div>
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
                Live site
              </a>
            )}
            {project.repoUrl && (
              <a className="btn btn-ghost" href={project.repoUrl} target="_blank" rel="noreferrer">
                Repository
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
