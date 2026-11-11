import InView from "../components/InView.jsx";

export default function Education({ education = [], publications = [] }) {
  return (
    <section className="section" id="education">
      <InView>
        <div className="section-head">
          <p className="section-label">school &amp; papers</p>
          <h2 className="section-title">What I <em>studied</em> &amp; wrote</h2>
        </div>
      </InView>
      <InView>
        <ul className="news">
          {education.map((item) => (
            <li className="news-item" key={item.institution}>
              <span className="news-date">{item.period}</span>
              <div>
                <h3>{item.institution}</h3>
                <p>
                  {item.degree} · {item.location}
                  {item.grade ? ` · ${item.grade}` : ""}
                </p>
              </div>
              <span className="label news-tag">Education</span>
            </li>
          ))}
          {publications.map((pub) => (
            <li className="news-item" key={pub.title}>
              <span className="news-date">{pub.date || "—"}</span>
              <div>
                <h3>{pub.title}</h3>
                <p>{pub.venue}</p>
              </div>
              <span className="label news-tag">Publication</span>
            </li>
          ))}
        </ul>
      </InView>
    </section>
  );
}
