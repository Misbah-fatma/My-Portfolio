export default function Footer({ name = "Misbah Fatma", socials = [] }) {
  return (
    <footer className="footer">
      <span>
        © {new Date().getFullYear()} {name}
      </span>
      <span>
        {socials.map((s, i) => (
          <span key={s.label}>
            <a href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
            {i < socials.length - 1 ? " · " : ""}
          </span>
        ))}
      </span>
    </footer>
  );
}
