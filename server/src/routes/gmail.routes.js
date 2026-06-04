import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
  connectGmail,
  gmailCallback
} from "../controllers/gmail.controller.js";

const router = express.Router();

router.get("/auth", protect, connectGmail);
router.get("/callback", gmailCallback);

export default router;