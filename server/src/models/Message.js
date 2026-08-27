import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true },
    project: { type: String, trim: true, maxlength: 80 },
    budget: { type: String, trim: true, maxlength: 40 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    emailed: { type: Boolean, default: false },
    resendId: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
