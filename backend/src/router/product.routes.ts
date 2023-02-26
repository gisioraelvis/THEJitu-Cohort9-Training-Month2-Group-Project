import express from "express";
import {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  // createProductReview,
  // getTopProductsByRating,
} from "../controllers/product.controller";

import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middleware.js";

const productRoutes = express.Router();

productRoutes.route("/").get(getAllProducts);

productRoutes.route("/").post(authenticateUser, authorizeAdmin, createProduct);

productRoutes.route("/:id").get(getProductById);

productRoutes
  .route("/:id")
  .delete(authenticateUser, authorizeAdmin, deleteProduct);

productRoutes
  .route("/:id")
  .put(authenticateUser, authorizeAdmin, updateProduct);

// productRoutes.route("/:id/reviews").post(authenticateUser, createProductReview);

// productRoutes.get("/top-rated", getTopProductsByRating);

export default productRoutes;
