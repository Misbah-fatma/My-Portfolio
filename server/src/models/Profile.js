import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    firstName: String,
    lastName: String,
    role: String,
    tagline: String,
    location: String,
    email: String,
    phone: String,
    availability: String,
    bio: [String],
    stats: [
      {
        label: String,
        value: String,
      },
    ],
    socials: [
      {
        label: String,
        href: String,
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        period: String,
        location: String,
        grade: String,
      },
    ],
    publications: [
      {
        title: String,
        venue: String,
        date: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
