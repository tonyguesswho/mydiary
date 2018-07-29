import { Router } from "express";

import authController from "../controllers/authController";

require("dotenv").config();

const router = Router();

router.post("/signup", authController.signup);

router.post("/login", authController.signin);

export default router;
