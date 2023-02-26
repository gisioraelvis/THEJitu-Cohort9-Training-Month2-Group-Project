import express from "express";
import {
  addToCart,
  checkout,
  getCart,
  removeFromCart,
} from "../controllers/cart.controller";

import { authenticateUser } from "../middlewares/auth.middleware";

const cartRoutes = express.Router();

// getCart
cartRoutes.route("/").get(authenticateUser, getCart);

// addToCart
cartRoutes.route("/").post(authenticateUser, addToCart);

// removeFromCart
cartRoutes.route("/:id").delete(authenticateUser, removeFromCart);

// checkoutCart
cartRoutes.route("/checkout").get(authenticateUser, checkout);

export default cartRoutes;
