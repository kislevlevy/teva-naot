import express, { Router } from "express";
import {
  login,
  logOut,
  signUp,
  forgotPassword,
  resetPassword,
  protect,
  restrictByRole,
  changePassword,
} from "../controllers/authController.js";

const router = Router();

router.route("/login").post(login);
router.route("/logOut").get(logOut);
router.route("/signup").post(signUp);
router.route("/protect").post(protect);
router.route("/forgotPassword").post(protect, forgotPassword);
router.route("/resetPassword/:resetToken").patch(resetPassword);
router.route("/restrictByRole").post(restrictByRole);
router.route("/changePassword").patch(protect, changePassword);

export default router;
