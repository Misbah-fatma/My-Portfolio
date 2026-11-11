import express from "express";
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";
import Message from "../models/Message.js";
import { seedData } from "../data/seedData.js";
import { sendContactEmail } from "../mail.js";

const emailOk = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const QUERY_MS = 4000;
const CACHE_MS = 120_000;

function memoryStore() {
  return {
    profile: { ...seedData.profile },
    projects: seedData.projects.map((p) => ({ ...p })),
    skills: seedData.skills.map((s) => ({ ...s })),
    experience: seedData.experience.map((e) => ({ ...e })),
    messages: [],
  };
}

function memoryPayload(store) {
  return {
    profile: store.profile,
    projects: [...store.projects].sort((a, b) => a.order - b.order),
    skills: [...store.skills].sort((a, b) => a.order - b.order),
    experience: [...store.experience].sort((a, b) => a.order - b.order),
  };
}

async function loadPortfolio(runtime, store) {
  if (runtime.cache && Date.now() - runtime.cacheAt < CACHE_MS) {
    return runtime.cache;
  }

  if (runtime.useMemory) {
    const data = memoryPayload(store);
    runtime.cache = data;
    runtime.cacheAt = Date.now();
    return data;
  }

  try {
    const [profile, projects, skills, experience] = await Promise.all([
      Profile.findOne().lean().maxTimeMS(QUERY_MS),
      Project.find().sort({ order: 1 }).lean().maxTimeMS(QUERY_MS),
      Skill.find().sort({ order: 1 }).lean().maxTimeMS(QUERY_MS),
      Experience.find().sort({ order: 1 }).lean().maxTimeMS(QUERY_MS),
    ]);
    const data = {
      profile: profile || store.profile,
      projects: projects.length ? projects : store.projects,
      skills: skills.length ? skills : store.skills,
      experience: experience.length ? experience : store.experience,
    };
    runtime.cache = data;
    runtime.cacheAt = Date.now();
    return data;
  } catch (err) {
    console.warn("Mongo read failed — serving seed:", err.message);
    return memoryPayload(store);
  }
}

export function createApi({ runtime, store }) {
  const router = express.Router();

  router.get("/health", (_req, res) => {
    res.json({
      ok: true,
      mode: runtime.useMemory ? "memory" : "mongo",
      cached: Boolean(runtime.cache),
      time: new Date().toISOString(),
    });
  });

  router.get("/portfolio", async (_req, res, next) => {
    try {
      res.json(await loadPortfolio(runtime, store));
    } catch (err) {
      next(err);
    }
  });

  router.get("/profile", async (_req, res, next) => {
    try {
      const data = await loadPortfolio(runtime, store);
      res.json(data.profile);
    } catch (err) {
      next(err);
    }
  });

  router.get("/projects", async (_req, res, next) => {
    try {
      const data = await loadPortfolio(runtime, store);
      res.json(data.projects);
    } catch (err) {
      next(err);
    }
  });

  router.get("/projects/:slug", async (req, res, next) => {
    try {
      const data = await loadPortfolio(runtime, store);
      const found = data.projects.find((p) => p.slug === req.params.slug);
      if (!found) return res.status(404).json({ error: "Project not found" });
      res.json(found);
    } catch (err) {
      next(err);
    }
  });

  router.get("/skills", async (_req, res, next) => {
    try {
      const data = await loadPortfolio(runtime, store);
      res.json(data.skills);
    } catch (err) {
      next(err);
    }
  });

  router.get("/experience", async (_req, res, next) => {
    try {
      const data = await loadPortfolio(runtime, store);
      res.json(data.experience);
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

      if (runtime.useMemory) {
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
        if (!runtime.useMemory && saved?._id) {
          await Message.findByIdAndUpdate(saved._id, {
            emailed: true,
            resendId: sent?.id || "",
          });
        } else if (runtime.useMemory) {
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
