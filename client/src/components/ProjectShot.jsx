import { useState } from "react";
import ProjectArt from "./ProjectArt.jsx";

// Shows a real screenshot when one exists at /projects/<slug>.png
// (put files in client/public/projects/), otherwise falls back to the artwork.
export default function ProjectShot({ project }) {
  const [failed, setFailed] = useState(false);
  const src = project.image || `/projects/${project.slug}.png`;
  if (failed) return <ProjectArt project={project} />;
  return (
    <img
      src={src}
      alt={`${project.title} screenshot`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
