import InView from "../components/InView.jsx";

export default function Education({ education = [] }) {
  return (
    <section className="section" id="education">
      <InView>
        <div className="section-head">
          <p className="section-label">school</p>
          <h2 className="section-title">
            Where I <em>studied</em>
          </h2>
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
        </ul>
      </InView>
    </section>
  );
}
