import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
  connectGmail,
  getGmailStatus,
  gmailCallback
} from "../controllers/gmail.controller.js";

const router = express.Router();

router.get("/auth", protect, connectGmail);
router.get("/callback", gmailCallback);
router.get("/status", protect, getGmailStatus);

export default router;