import "dotenv/config";
import { connectDB } from "./config/db.js";
import Profile from "./models/Profile.js";
import Project from "./models/Project.js";
import Skill from "./models/Skill.js";
import Experience from "./models/Experience.js";
import { seedData } from "./data/seedData.js";

async function seed() {
  await connectDB(process.env.MONGODB_URI);
  await Promise.all([
    Profile.deleteMany({}),
    Project.deleteMany({}),
    Skill.deleteMany({}),
    Experience.deleteMany({}),
  ]);
  await Profile.create(seedData.profile);
  await Project.insertMany(seedData.projects);
  await Skill.insertMany(seedData.skills);
  await Experience.insertMany(seedData.experience);
  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
