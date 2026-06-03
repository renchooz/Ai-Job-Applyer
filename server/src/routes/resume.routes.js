import express from "express";

import protect from "../middleware/auth.middleware.js";
import upload from "../config/multer.js";

import {
  uploadResume,
  getMyResumes
} from "../controllers/resume.controller.js";

const router = express.Router();

router.post("/upload", protect, upload.single("resume"), uploadResume);
router.get("/my", protect, getMyResumes);

export default router;