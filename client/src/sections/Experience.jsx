import InView from "../components/InView.jsx";

export default function Experience({ experience }) {
  return (
    <section className="section" id="experience">
      <div className="section-head">
        <div>
          <p className="index">04 — Experience</p>
          <h2 className="section-title">Roles and<br />the work inside them.</h2>
        </div>
      </div>
      <div className="timeline">
        {experience.map((job) => (
          <InView key={job.company}>
            <article className="job">
              <div className="job-meta">
                {job.period}
                <br />
                {job.location}
              </div>
              <div>
                <h3>{job.company}</h3>
                <h4>{job.role}</h4>
                <ul>
                  {job.highlights?.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </article>
          </InView>
        ))}
      </div>
    </section>
  );
}
