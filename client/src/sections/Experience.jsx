import InView from "../components/InView.jsx";

export default function Experience({ experience }) {
  return (
    <section className="section" id="experience">
      <InView>
        <div className="section-head">
          <p className="section-label">where I’ve worked</p>
          <h2 className="section-title">Work <em>experience</em></h2>
        </div>
      </InView>
      <div className="timeline">
        {experience.map((job) => (
          <InView key={job.company}>
            <article className="job">
              <div className="job-meta label">
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
