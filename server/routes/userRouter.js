import express from "express";
import {
  register,
  verifyOTP,
  login,
  logout,
  getUser,
  forgotPassword,
  resetPassword,
  getAllUsers,
  deleteOneUser,
  updateRole
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js"; // Import authorizeRoles

const router = express.Router();

router.post("/register", register);
router.post("/otp-verification", verifyOTP);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

// Route to get all users (only accessible by admin)
router.get("/users", isAuthenticated, getAllUsers);

router.delete("/deleteone/:id", isAuthenticated, deleteOneUser);
router.put("/updateRole/:id", isAuthenticated, updateRole);

export default router;