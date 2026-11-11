import dns from "node:dns";
import mongoose from "mongoose";

dns.setDefaultResultOrder("ipv4first");
mongoose.set("strictQuery", true);
mongoose.set("bufferCommands", false);

const CONNECT_MS = 6000;

export async function connectDB(uri) {
  await Promise.race([
    mongoose.connect(uri, {
      family: 4,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 15000,
      maxPoolSize: 5,
      maxIdleTimeMS: 30000,
    }),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("MongoDB connection timed out")), CONNECT_MS)
    ),
  ]);
  return mongoose.connection;
}
