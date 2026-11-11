import InView from "../components/InView.jsx";

export default function About({ profile }) {
  const [lead, ...rest] = profile.bio || [];
  return (
    <section className="section" id="about">
      <InView>
        <p className="section-label">a bit about me</p>
        <p className="statement">{lead}</p>
        <div className="about-cols">
          <div className="about-rest">
            {rest.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <span className="aside">(yes, that’s a lot of acronyms)</span>
          </div>
          <ul className="stats">
            {profile.stats?.map((s) => (
              <li key={s.label}>
                <b>{s.value}</b>
                <span className="label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </InView>
    </section>
  );
}
