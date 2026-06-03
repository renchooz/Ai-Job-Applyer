import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import { configDotenv } from "dotenv";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("AI Resume Sender Backend Running");
});

export default app;