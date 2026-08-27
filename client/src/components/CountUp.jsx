import { useEffect, useRef, useState } from "react";

export default function CountUp({ value }) {
  const ref = useRef(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = String(value).match(/^(\d+)(.*)$/);
    if (!match) return undefined;

    const target = Number(match[1]);
    const rest = match[2];
    const pad = match[1].length;
    let current = 0;

    let id;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        id = setInterval(() => {
          current += Math.max(1, Math.ceil(target / 18));
          if (current >= target) {
            setText(value);
            clearInterval(id);
          } else {
            setText(String(current).padStart(pad, "0") + rest);
          }
        }, 45);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (id) clearInterval(id);
    };
  }, [value]);

  return <b ref={ref}>{text}</b>;
}
