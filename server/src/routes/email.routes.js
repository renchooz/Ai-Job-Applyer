import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
  sendEmail,
  getEmailHistory
} from "../controllers/email.controller.js";

const router = express.Router();

router.post("/send", protect, sendEmail);
router.get("/history", protect, getEmailHistory);

export default router;