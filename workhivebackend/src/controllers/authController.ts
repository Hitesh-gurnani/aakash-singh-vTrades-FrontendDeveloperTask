import { Request, Response } from "express";
import {
  createUser,
  findUserByEmail,
  updateUserPassword,
  setOTP,
  verifyOTP,
} from "../services/authService";
import { errorHandler } from "../utils/errorHandler";

export const signup = (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return errorHandler(res, "Missing credentials");
  if (findUserByEmail(email)) return errorHandler(res, "User already exists");
  const user = createUser(email, password);
  res.json({ success: true, message: "Signup successful", user });
};

export const signin = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  if (!user || user.password !== password)
    return errorHandler(res, "Invalid credentials");
  res.json({ success: true, message: "Signin successful" });
};

export const forgotPassword = (req: Request, res: Response) => {
  const { email } = req.body;
  const user = findUserByEmail(email);
  if (!user) return errorHandler(res, "User not found");
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  setOTP(email, otp);
  res.json({ success: true, message: "OTP sent to email (simulated)", otp });
};

export const enterOtp = (req: Request, res: Response) => {
  const { email, otp } = req.body;
  if (!verifyOTP(email, otp)) return errorHandler(res, "Invalid OTP");
  res.json({ success: true, message: "OTP verified" });
};

export const createNewPassword = (req: Request, res: Response) => {
  const { email, newPassword } = req.body;
  if (!updateUserPassword(email, newPassword))
    return errorHandler(res, "User not found or password update failed");
  res.json({ success: true, message: "Password updated successfully" });
};

export const googleSignIn = async (req: Request, res: Response) => {
  try {
    const { email, name, picture } = req.body;
    let user = findUserByEmail(email);
    if (!user) {
      user = createUser(email, "google-auth-user");
    }

    res.json({
      success: true,
      message: "Google sign-in successful",
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
