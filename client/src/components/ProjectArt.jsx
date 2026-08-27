export default function ProjectArt({ project }) {
  const a = project.accent || "#c4a574";
  const b = project.accent2 || "#1a2e0a";
  const slug = project.slug;

  if (slug === "you-are-the-dealer") {
    return (
      <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice">
        <rect width="640" height="420" fill={b} />
        <path d="M40 300 L160 300 L200 240 L420 240 L470 300 L600 300" fill="none" stroke={a} strokeWidth="3" />
        <circle cx="220" cy="300" r="28" fill="none" stroke={a} strokeWidth="3" />
        <circle cx="500" cy="300" r="28" fill="none" stroke={a} strokeWidth="3" />
        <path d="M80 180 L560 180" stroke={a} opacity="0.25" strokeDasharray="10 12" />
        <rect x="250" y="110" width="140" height="18" rx="4" fill={a} />
        <rect x="250" y="140" width="90" height="10" rx="3" fill={a} opacity="0.4" />
      </svg>
    );
  }

  if (slug === "aip-audience-intelligence") {
    return (
      <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice">
        <rect width="640" height="420" fill={b} />
        <path d="M80 260 C140 140, 240 120, 320 200 C400 280, 500 160, 580 210" fill="none" stroke={a} strokeWidth="2" />
        <circle cx="180" cy="168" r="8" fill={a} />
        <circle cx="320" cy="200" r="12" fill={a} />
        <circle cx="480" cy="186" r="8" fill={a} />
        <circle cx="320" cy="200" r="70" fill="none" stroke={a} opacity="0.35" />
        <circle cx="320" cy="200" r="120" fill="none" stroke={a} opacity="0.18" />
      </svg>
    );
  }

  if (slug === "kalamlab") {
    return (
      <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice">
        <rect width="640" height="420" fill={b} />
        {[50, 90, 130].map((r) => (
          <circle key={r} cx="320" cy="210" r={r} fill="none" stroke={a} opacity={0.9 - r / 220} />
        ))}
        <rect x="250" y="170" width="140" height="80" rx="10" fill="none" stroke={a} strokeWidth="2" />
        <circle cx="320" cy="210" r="10" fill={a} />
      </svg>
    );
  }

  if (slug === "training-drivonic-portal") {
    return (
      <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice">
        <rect width="640" height="420" fill={b} />
        <rect x="170" y="70" width="300" height="280" rx="8" fill="none" stroke={a} strokeWidth="2" />
        <path d="M250 160 L300 210 L400 110" fill="none" stroke={a} strokeWidth="4" />
        <rect x="220" y="260" width="200" height="10" rx="4" fill={a} opacity="0.7" />
        <rect x="250" y="284" width="140" height="8" rx="4" fill={a} opacity="0.35" />
      </svg>
    );
  }

  if (slug === "drivonic-platform") {
    return (
      <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice">
        <rect width="640" height="420" fill={b} />
        <rect x="70" y="90" width="180" height="220" rx="12" fill="none" stroke={a} strokeWidth="1.6" />
        <rect x="230" y="70" width="180" height="220" rx="12" fill="none" stroke={a} strokeWidth="1.6" />
        <rect x="390" y="110" width="180" height="220" rx="12" fill="none" stroke={a} strokeWidth="1.6" opacity="0.7" />
        <circle cx="320" cy="180" r="16" fill={a} />
      </svg>
    );
  }

  if (slug === "learning-management-system") {
    return (
      <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice">
        <rect width="640" height="420" fill={b} />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={90 + i * 160}
            y={90 + (i % 2) * 20}
            width="130"
            height="180"
            rx="8"
            fill="none"
            stroke={a}
            strokeWidth="1.8"
          />
        ))}
        <rect x="250" y="300" width="140" height="8" rx="4" fill={a} />
      </svg>
    );
  }

  if (slug === "curalynx") {
    return (
      <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice">
        <rect width="640" height="420" fill={b} />
        <rect x="286" y="90" width="68" height="240" rx="8" fill={a} />
        <rect x="200" y="176" width="240" height="68" rx="8" fill={a} />
        <circle cx="160" cy="120" r="6" fill={a} opacity="0.5" />
        <circle cx="480" cy="300" r="6" fill={a} opacity="0.5" />
      </svg>
    );
  }

  if (slug === "operational-management-system") {
    return (
      <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice">
        <rect width="640" height="420" fill={b} />
        <rect x="70" y="70" width="300" height="190" rx="12" fill="none" stroke={a} strokeWidth="1.6" />
        <rect x="250" y="150" width="280" height="180" rx="12" fill="none" stroke={a} strokeWidth="1.6" opacity="0.7" />
        <rect x="110" y="100" width="90" height="10" rx="5" fill={a} />
        <rect x="110" y="124" width="180" height="6" rx="3" fill={a} opacity="0.4" />
        <rect x="110" y="140" width="140" height="6" rx="3" fill={a} opacity="0.3" />
        <circle cx="500" cy="190" r="28" fill={a} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="420" fill={b} />
      <circle cx="180" cy="220" r="90" fill="none" stroke={a} strokeWidth="1.4" />
      <circle cx="340" cy="180" r="130" fill="none" stroke={a} strokeWidth="1.4" />
      <circle cx="460" cy="250" r="70" fill={a} opacity="0.85" />
    </svg>
  );
}
