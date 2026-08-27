import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    group: { type: String, required: true },
    items: [String],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema);
