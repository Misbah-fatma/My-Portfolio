import { useEffect, useState } from "react";
import { fetchPortfolio } from "./api.js";
import { seedData } from "./data/portfolio.js";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import ProjectModal from "./components/ProjectModal.jsx";
import Intro from "./components/Intro.jsx";
import Hero from "./sections/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./sections/About.jsx";
import Work from "./sections/Work.jsx";
import Skills from "./sections/Skills.jsx";
import Experience from "./sections/Experience.jsx";
import Education from "./sections/Education.jsx";
import Contact from "./sections/Contact.jsx";

const sortByOrder = (list = []) => [...list].sort((a, b) => a.order - b.order);

// Bundled data means the page paints immediately; the API just refreshes it.
const initial = {
  ...seedData,
  projects: sortByOrder(seedData.projects),
  skills: sortByOrder(seedData.skills),
  experience: sortByOrder(seedData.experience),
};

const skipIntro = () => {
  try {
    return (
      sessionStorage.getItem("introSeen") === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  } catch {
    return false;
  }
};

export default function App() {
  const [data, setData] = useState(initial);
  const [armed, setArmed] = useState(skipIntro);
  const [showIntro, setShowIntro] = useState(() => !skipIntro());
  const [active, setActive] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchPortfolio()
      .then((payload) => {
        if (!cancelled && payload?.profile) setData(payload);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const { profile } = data;

  const endIntro = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem("introSeen", "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      {showIntro && (
        <Intro
          projects={data.projects}
          profile={profile}
          onReveal={() => setArmed(true)}
          onDone={endIntro}
        />
      )}
      <ScrollProgress />
      <Nav name={profile.firstName} />
      <main>
        <Hero profile={profile} projects={data.projects} armed={armed} />
        <Marquee />
        <About profile={profile} />
        <Work projects={data.projects} onOpen={setActive} />
        <Skills skills={data.skills} />
        <Experience experience={data.experience} />
        <Education
          education={profile.education}
          publications={profile.publications}
        />
        <Contact
          email={profile.email}
          phone={profile.phone}
          socials={profile.socials}
        />
      </main>
      <Footer name={profile.name} email={profile.email} socials={profile.socials} />
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
