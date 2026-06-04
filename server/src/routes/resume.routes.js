import express from "express";

import protect from "../middleware/auth.middleware.js";
import upload from "../config/multer.js";

import {
  uploadResume,
  getMyResumes,
  deleteResume,
  renameResume,
  getResumePreview
} from "../controllers/resume.controller.js";

const router = express.Router();

router.post("/upload", protect, upload.single("resume"), uploadResume);
router.get("/my", protect, getMyResumes);
router.delete(
  "/:resumeId",
  protect,
  deleteResume
);

router.patch(
  "/rename/:resumeId",
  protect,
  renameResume
);

router.get(
  "/preview/:resumeId",
  protect,
  getResumePreview
);

export default router;