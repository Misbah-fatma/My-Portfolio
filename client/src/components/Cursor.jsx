import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (dot.current) {
        dot.current.style.left = `${x}px`;
        dot.current.style.top = `${y}px`;
      }
      if (ring.current) {
        ring.current.style.left = `${x}px`;
        ring.current.style.top = `${y}px`;
      }
    };

    const onOver = (e) => {
      const target = e.target.closest("a, button, .project, .skill-card");
      dot.current?.classList.toggle("hover", Boolean(target));
      ring.current?.classList.toggle("hover", Boolean(target));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={dot} />
      <div className="cursor-ring" ref={ring} />
    </>
  );
}
