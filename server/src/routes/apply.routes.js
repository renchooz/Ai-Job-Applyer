import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
  oneClickApply,
  previewApplication
} from "../controllers/apply.controller.js";

const router = express.Router();
router.post("/preview", protect, previewApplication
);
router.post("/one-click", protect, oneClickApply);

export default router;