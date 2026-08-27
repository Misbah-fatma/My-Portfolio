import { useEffect, useRef } from "react";

export default function InView({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("on");
          io.disconnect();
        }
      },
      { threshold: 0.16 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`inview ${className}`}>
      {children}
    </div>
  );
}
