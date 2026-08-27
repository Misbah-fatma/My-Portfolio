const WORDS = [
  "React.js",
  "Angular",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "Python",
  "JWT",
  "RBAC",
  "Stripe",
  "Razorpay",
  "NLP",
  "OCR",
];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((word, i) => (
          <span key={`${word}-${i}`}>
            {word} <em>✦</em>
          </span>
        ))}
      </div>
    </div>
  );
}
