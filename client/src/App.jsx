import { useEffect, useState } from "react";
import { fetchPortfolio } from "./api.js";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Cursor from "./components/Cursor.jsx";
import Loader from "./components/Loader.jsx";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import ProjectModal from "./components/ProjectModal.jsx";
import Hero from "./sections/Hero.jsx";
import Marquee from "./sections/Marquee.jsx";
import About from "./sections/About.jsx";
import Work from "./sections/Work.jsx";
import Skills from "./sections/Skills.jsx";
import Experience from "./sections/Experience.jsx";
import Education from "./sections/Education.jsx";
import Contact from "./sections/Contact.jsx";

export default function App() {
  const [data, setData] = useState(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const start = Date.now();
    fetchPortfolio()
      .then((payload) => {
        setData(payload);
        const wait = Math.max(0, 1500 - (Date.now() - start));
        setTimeout(() => setReady(true), wait);
      })
      .catch(() => {
        setTimeout(() => setReady(true), 1200);
      });
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

  const profile = data?.profile || {
    firstName: "Misbah",
    lastName: "Fatma",
    name: "Misbah Fatma",
    role: "Full-Stack Engineer",
    tagline:
      "I build scalable full-stack applications, data-driven platforms, and seamless digital experiences.",
    location: "New Delhi, India",
    email: "misbah7370@gmail.com",
    phone: "+919169849066",
    availability: "Open to new opportunities",
    bio: [],
    stats: [],
    socials: [],
    education: [],
    publications: [],
  };

  return (
    <>
      <div className="grain" />
      <ScrollProgress />
      <Cursor />
      <Loader done={ready} />
      <Nav location={profile.location} />
      <main>
        <Hero profile={profile} armed={ready} />
        <Marquee />
        <About profile={profile} />
        <Work projects={data?.projects || []} onOpen={setActive} />
        <Skills skills={data?.skills || []} />
        <Experience experience={data?.experience || []} />
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
      <Footer name={profile.name} socials={profile.socials} />
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
