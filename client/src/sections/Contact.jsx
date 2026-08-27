import { useState } from "react";
import InView from "../components/InView.jsx";
import { sendMessage } from "../api.js";

const empty = { name: "", email: "", project: "", budget: "", message: "" };

const TYPES = [
  "Full-time role",
  "Contract / freelance",
  "Collaboration",
  "Something else",
];

function formatPhone(phone) {
  const digits = String(phone).replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return phone;
}

export default function Contact({ email, phone, socials = [] }) {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [busy, setBusy] = useState(false);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setStatus({ type: "", text: "" });
    try {
      const res = await sendMessage(form);
      setStatus({ type: "ok", text: res.note });
      setForm(empty);
    } catch (err) {
      setStatus({ type: "err", text: err.message });
    } finally {
      setBusy(false);
    }
  };

  const links = [
    { label: "Email", href: `mailto:${email}`, value: email },
    phone && {
      label: "Phone",
      href: `tel:${phone}`,
      value: formatPhone(phone),
    },
    ...socials
      .filter((s) => s.label !== "Email")
      .map((s) => ({
        label: s.label,
        href: s.href,
        value: s.label === "GitHub" ? "Misbah-fatma" : "LinkedIn",
      })),
  ].filter(Boolean);

  return (
    <section className="section contact" id="contact">
      <div className="section-head">
        <div>
          <p className="index">06 — Contact</p>
          <h2 className="section-title">Let’s work together.</h2>
        </div>
      </div>

      <InView>
        <div className="contact-grid">
          <div className="contact-intro">
            <p className="contact-copy">
              Open to full-time roles, contracts, and product work — MERN,
              auth, and AI/ML platforms with real users.
            </p>
            <ul className="contact-ways">
              {links.map((item) => (
                <li key={item.label}>
                  <a className="contact-way" href={item.href}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {status.type === "ok" ? (
            <div className="contact-panel contact-done">
              <p className="index">Sent</p>
              <h3>Thanks — I have it.</h3>
              <p>{status.text || "I’ll reply within two working days."}</p>
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => setStatus({ type: "", text: "" })}
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              className="contact-panel form"
              onSubmit={onSubmit}
              autoComplete="off"
            >
              <div className="form-row">
                <label className="field">
                  <span>Name</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    autoComplete="off"
                    required
                  />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    autoComplete="off"
                    required
                  />
                </label>
              </div>

              <fieldset className="field">
                <span>Inquiry</span>
                <div className="type-pills">
                  {TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`type-pill ${form.project === type ? "on" : ""}`}
                      onClick={() => setForm((f) => ({ ...f, project: type }))}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="field">
                <span>Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={5}
                  required
                />
              </label>

              <div className="form-foot">
                <button className="btn btn-fill" type="submit" disabled={busy}>
                  {busy ? "Sending…" : "Send message"}
                  {!busy && (
                    <span className="btn-arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                </button>
                {status.type === "err" && (
                  <p className="form-note err">{status.text}</p>
                )}
              </div>
            </form>
          )}
        </div>
      </InView>
    </section>
  );
}
