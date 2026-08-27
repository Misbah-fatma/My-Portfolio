import express from "express";
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";
import Message from "../models/Message.js";
import { seedData } from "../data/seedData.js";
import { sendContactEmail } from "../mail.js";

const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function memoryStore() {
  return {
    profile: { ...seedData.profile },
    projects: seedData.projects.map((p) => ({ ...p })),
    skills: seedData.skills.map((s) => ({ ...s })),
    experience: seedData.experience.map((e) => ({ ...e })),
    messages: [],
  };
}

export function createApi({ useMemory, store }) {
  const router = express.Router();

  router.get("/health", (_req, res) => {
    res.json({
      ok: true,
      mode: useMemory ? "memory" : "mongo",
      time: new Date().toISOString(),
    });
  });

  router.get("/profile", async (_req, res, next) => {
    try {
      if (useMemory) return res.json(store.profile);
      const doc = await Profile.findOne().lean();
      res.json(doc || store.profile);
    } catch (err) {
      next(err);
    }
  });

  router.get("/projects", async (_req, res, next) => {
    try {
      if (useMemory) {
        return res.json([...store.projects].sort((a, b) => a.order - b.order));
      }
      const docs = await Project.find().sort({ order: 1 }).lean();
      res.json(docs.length ? docs : store.projects);
    } catch (err) {
      next(err);
    }
  });

  router.get("/projects/:slug", async (req, res, next) => {
    try {
      if (useMemory) {
        const found = store.projects.find((p) => p.slug === req.params.slug);
        if (!found) return res.status(404).json({ error: "Project not found" });
        return res.json(found);
      }
      const doc = await Project.findOne({ slug: req.params.slug }).lean();
      if (!doc) return res.status(404).json({ error: "Project not found" });
      res.json(doc);
    } catch (err) {
      next(err);
    }
  });

  router.get("/skills", async (_req, res, next) => {
    try {
      if (useMemory) {
        return res.json([...store.skills].sort((a, b) => a.order - b.order));
      }
      const docs = await Skill.find().sort({ order: 1 }).lean();
      res.json(docs.length ? docs : store.skills);
    } catch (err) {
      next(err);
    }
  });

  router.get("/experience", async (_req, res, next) => {
    try {
      if (useMemory) {
        return res.json([...store.experience].sort((a, b) => a.order - b.order));
      }
      const docs = await Experience.find().sort({ order: 1 }).lean();
      res.json(docs.length ? docs : store.experience);
    } catch (err) {
      next(err);
    }
  });

  router.post("/contact", async (req, res, next) => {
    try {
      const name = String(req.body?.name || "").trim();
      const email = String(req.body?.email || "").trim().toLowerCase();
      const project = String(req.body?.project || "").trim();
      const budget = String(req.body?.budget || "").trim();
      const message = String(req.body?.message || "").trim();

      if (name.length < 2) {
        return res.status(400).json({ error: "Please add your name." });
      }
      if (!emailOk(email)) {
        return res.status(400).json({ error: "That email doesn’t look right." });
      }
      if (message.length < 12) {
        return res.status(400).json({ error: "Tell me a little more about the work." });
      }

      const payload = { name, email, project, budget, message };
      let saved = null;

      if (useMemory) {
        saved = { ...payload, createdAt: new Date().toISOString(), emailed: false };
        store.messages.push(saved);
      } else {
        saved = await Message.create(payload);
      }

      let emailed = false;
      let emailError = "";
      try {
        const sent = await sendContactEmail(payload);
        emailed = true;
        if (!useMemory && saved?._id) {
          await Message.findByIdAndUpdate(saved._id, {
            emailed: true,
            resendId: sent?.id || "",
          });
        } else if (useMemory) {
          saved.emailed = true;
        }
      } catch (mailErr) {
        emailError = mailErr.message;
        console.error("Resend error:", mailErr.message);
      }

      res.status(201).json({
        ok: true,
        stored: true,
        emailed,
        note: emailed
          ? "Message received. I’ll reply within two working days."
          : emailError.includes("RESEND_API_KEY")
            ? "Message saved. Add RESEND_API_KEY in server/.env to send email."
            : "Message saved, but email didn’t send. Check the server terminal for the Resend error.",
      });
    } catch (err) {
      next(err);
    }
  });

  return router;
}

export { memoryStore };
