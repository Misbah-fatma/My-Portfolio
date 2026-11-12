import InView from "../components/InView.jsx";

export default function Research({ publications = [] }) {
  if (!publications.length) return null;

  return (
    <section className="section" id="research">
      <InView>
        <div className="section-head">
          <p className="section-label">papers</p>
          <h2 className="section-title">
            Research &amp; <em>publications</em>
          </h2>
        </div>
      </InView>
      <InView>
        <ul className="news">
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
