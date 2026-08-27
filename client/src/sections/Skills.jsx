import InView from "../components/InView.jsx";

export default function Skills({ skills }) {
  const groups = (skills || [])
    .filter((group) => group.group !== "Other")
    .slice(0, 6);
  const total = groups.reduce((sum, group) => sum + (group.items?.length || 0), 0);

  return (
    <section className="section" id="skills">
      <div className="section-head">
        <div>
          <p className="index">03 — Stack</p>
          <h2 className="section-title">The tools I<br />reach for daily.</h2>
        </div>
        <p className="eyebrow" style={{ margin: 0 }}>
          {String(total).padStart(2, "0")} tools · {String(groups.length).padStart(2, "0")} groups
        </p>
      </div>
      <InView>
        <div className="skills-bento">
          {groups.map((group, i) => (
            <article className="skill-card" key={group.group}>
              <header className="skill-card-head">
                <span className="skill-idx">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{group.group}</h3>
                  <p>{String(group.items.length).padStart(2, "0")} skills</p>
                </div>
              </header>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </InView>
    </section>
  );
}
