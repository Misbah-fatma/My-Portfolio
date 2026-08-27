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
let useMemory = true;

async function seedIfEmpty() {
  const count = await Profile.countDocuments();
  if (count > 0) return;
  await Profile.create(seedData.profile);
  await Project.insertMany(seedData.projects);
  await Skill.insertMany(seedData.skills);
  await Experience.insertMany(seedData.experience);
  console.log("Mongo collections seeded");
}

async function boot() {
  const app = express();
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "32kb" }));

  try {
    await connectDB(process.env.MONGODB_URI);
    useMemory = false;
    await seedIfEmpty();
    console.log("MongoDB connected");
  } catch (err) {
    useMemory = true;
    console.warn("MongoDB unavailable — serving in-memory seed data.");
    console.warn(err.message);
  }

  app.use("/api", createApi({ useMemory, store }));

  const clientDist = path.resolve(__dirname, "../../client/dist");
  app.use(express.static(clientDist));
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
    console.log(`API listening on http://localhost:${PORT} (${useMemory ? "memory" : "mongo"})`);
  });
}

boot();
