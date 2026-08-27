import InView from "../components/InView.jsx";
import CountUp from "../components/CountUp.jsx";

export default function About({ profile }) {
  return (
    <section className="section" id="about">
      <div className="section-head">
        <div>
          <p className="index">01 — About</p>
          <h2 className="section-title">Full-stack work,<br />from API to UI.</h2>
        </div>
      </div>
      <InView>
        <div className="about-grid">
          <div className="about-bio">
            {profile.bio?.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="stats">
            {profile.stats?.map((s) => (
              <div className="stat" key={s.label}>
                <CountUp value={s.value} />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </InView>
    </section>
  );
}
