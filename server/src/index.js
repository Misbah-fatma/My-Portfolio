import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { connectDB } from "./config/db.js";
import Profile from "./models/Profile.js";
import Project from "./models/Project.js";
import Skill from "./models/Skill.js";
import Experience from "./models/Experience.js";
import { seedData } from "./data/seedData.js";
import { createApi, memoryStore } from "./routes/api.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 5001;
const store = memoryStore();
const runtime = { useMemory: true, cache: null, cacheAt: 0 };

async function seedIfEmpty() {
  const count = await Profile.countDocuments().maxTimeMS(4000);
  if (count > 0) return;
  await Profile.create(seedData.profile);
  await Project.insertMany(seedData.projects);
  await Skill.insertMany(seedData.skills);
  await Experience.insertMany(seedData.experience);
  console.log("Mongo collections seeded");
}

async function connectMongo(attempt = 1) {
  if (!process.env.MONGODB_URI) {
    console.warn("No MONGODB_URI — serving in-memory seed data.");
    return;
  }

  try {
    await connectDB(process.env.MONGODB_URI);
    await seedIfEmpty();
    runtime.useMemory = false;
    runtime.cache = null;
    runtime.cacheAt = 0;
    console.log("MongoDB connected");
  } catch (err) {
    runtime.useMemory = true;
    console.warn("MongoDB unavailable — serving in-memory seed data.");
    console.warn(err.message);
    if (attempt < 6) {
      const delay = attempt * 8000;
      console.warn(`Retrying MongoDB in ${delay / 1000}s (attempt ${attempt + 1}/6)`);
      setTimeout(() => connectMongo(attempt + 1), delay);
    }
  }
}

async function boot() {
  const app = express();
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "32kb" }));
  app.use("/api", createApi({ runtime, store }));

  const clientDist = path.resolve(__dirname, "../../client/dist");
  // Hashed build files never change, so let browsers keep them for a year.
  app.use(
    "/assets",
    express.static(path.join(clientDist, "assets"), { maxAge: "1y", immutable: true })
  );
  app.use(express.static(clientDist, { maxAge: 0 }));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(clientDist, "index.html"), (err) => {
      if (err) next();
    });
  });

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: "Something went sideways. Try again." });
  });

  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT} (memory, mongo connecting…)`);
  });

  connectMongo();
}

boot();
