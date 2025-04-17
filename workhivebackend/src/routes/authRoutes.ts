import { Router } from "express";
import {
  signup,
  signin,
  forgotPassword,
  enterOtp,
  createNewPassword,
} from "../controllers/authController";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/enter-otp", enterOtp);
router.post("/create-new-password", createNewPassword);

export default router;
