import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: String,
    year: String,
    summary: String,
    description: String,
    problem: String,
    outcome: String,
    stack: [String],
    accent: String,
    accent2: String,
    liveUrl: String,
    repoUrl: String,
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
