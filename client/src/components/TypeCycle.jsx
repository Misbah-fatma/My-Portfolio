import { useEffect, useState } from "react";

export default function TypeCycle({ words, armed = true }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!armed || reduce || !words.length) {
      setText(words[0] || "");
      return undefined;
    }

    const word = words[index % words.length];
    let timeout;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((current) =>
            deleting
              ? word.slice(0, current.length - 1)
              : word.slice(0, current.length + 1)
          );
        },
        deleting ? 28 : 62
      );
    }

    return () => clearTimeout(timeout);
  }, [armed, deleting, index, reduce, text, words]);

  return <span className="type-cycle">{text}</span>;
}
