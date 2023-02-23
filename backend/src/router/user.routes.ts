import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  upgradeUserToAdmin,
  updateUserProfileByAdmin,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller";
import {
  authenticateUser,
  authorizeAdmin,
  verifyPasswordResetToken,
} from "../middlewares/auth.middleware.js";

const userRoutes = express.Router();

// Fetch all users - admin only
userRoutes.route("/").get(authenticateUser, authorizeAdmin, getAllUsers);

// Register a new user - public
userRoutes.route("/signup").post(registerUser);

// Login user - public
userRoutes.post("/signin", loginUser);

// Forgot password(send passsword reset link to email) - public
userRoutes.post("/forgot-password", forgotPassword);

// Reset password - public
userRoutes
  .route("/reset-password")
  .put(verifyPasswordResetToken, resetPassword);

// Get own user profile - private
userRoutes.route("/profile").get(authenticateUser, getUserProfile);

// Update own user profile - private
userRoutes.route("/profile").put(authenticateUser, updateUserProfile);

// Get user by id - Admin only
userRoutes.route("/:id").get(authenticateUser, authorizeAdmin, getUserById);

// Delete user by id - Admin only
userRoutes.route("/:id").delete(authenticateUser, authorizeAdmin, deleteUser);

// Upgrade user to admin - Admin only
userRoutes
  .route("/:id")
  .patch(authenticateUser, authorizeAdmin, upgradeUserToAdmin);

// Update user profile by admin - Admin only
userRoutes
  .route("/:id")
  .put(authenticateUser, authorizeAdmin, updateUserProfileByAdmin);

export default userRoutes;
