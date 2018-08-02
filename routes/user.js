import { Router } from "express";

import authController from "../controllers/authController";
import checkForUser from "../middleware/checkUser";
import isFieldEmpty from "../middleware/isFieldEmptySignup";
import checkEmail from "../middleware/checkEmail";
import checkPassword from "../middleware/checkPassword";
import loginEmpty from "../middleware/isFieldEmptyLogin"

require("dotenv").config();

const router = Router();

router.post(
  "/signup",
  isFieldEmpty,
  checkEmail,
  checkPassword,
  checkForUser,
  authController.signup
);

router.post("/login", loginEmpty, checkEmail, authController.signin);

export default router;
