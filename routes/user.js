import { Router } from "express";

import authController from "../controllers/authController";
import checkForUser from "../middleware/checkUser";
import isFieldEmpty from "../middleware/isFieldEmptySignup";
import checkEmail from "../middleware/checkEmail";
import checkPassword from "../middleware/checkPassword";
import loginEmpty from "../middleware/isFieldEmptyLogin";
import unedfinedSignup from "../middleware/undefinedSignup";
import undefinedLogin from "../middleware/undefinedLogin";

require("dotenv").config();

const router = Router();

router.post(
  "/signup",
  unedfinedSignup,
  isFieldEmpty,
  checkEmail,
  checkPassword,
  checkForUser,
  authController.signup
);

router.post(
  "/login",
  undefinedLogin,
  loginEmpty,
  checkEmail,
  authController.signin
);

export default router;
