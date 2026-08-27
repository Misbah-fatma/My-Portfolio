import InView from "../components/InView.jsx";

export default function Education({ education = [], publications = [] }) {
  return (
    <section className="section" id="education">
      <div className="section-head">
        <div>
          <p className="index">05 — Education & writing</p>
          <h2 className="section-title">School, and<br />published work.</h2>
        </div>
      </div>
      <InView>
        <div className="edu-grid">
          {education.map((item) => (
            <article className="edu-card" key={item.institution}>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                {item.period}
              </p>
              <h3>{item.institution}</h3>
              <p>{item.degree}</p>
              <p className="edu-meta">
                {item.location}
                {item.grade ? ` · ${item.grade}` : ""}
              </p>
            </article>
          ))}
        </div>
        {publications.length > 0 && (
          <div className="pub-list">
            {publications.map((pub) => (
              <article className="pub-item" key={pub.title}>
                <h5>Publication</h5>
                <h3>{pub.title}</h3>
                <p>
                  {pub.venue}
                  {pub.date ? ` · ${pub.date}` : ""}
                </p>
              </article>
            ))}
          </div>
        )}
      </InView>
    </section>
  );
}
