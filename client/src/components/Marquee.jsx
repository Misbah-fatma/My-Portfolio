const WORDS = ["React", "Node.js", "MongoDB", "Express", "Next.js", "Angular", "Python", "JWT", "Stripe", "NLP"];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
    </div>
  );
}
