import express from "express";
import {
  createOrder,
  getOrderById,
  getMyOrders,
  getOrders,
  updateOrder,
  // updateOrderToDelivered,
  // paymentGatewayUpdateOrderToPaid,
} from "../controllers/order.controller";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middleware";

const orderRoutes = express.Router();

orderRoutes
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizeAdmin, getOrders);

orderRoutes.route("/myorders").get(authenticateUser, getMyOrders);

orderRoutes.route("/:id").get(authenticateUser, getOrderById);

orderRoutes.route("/:id").patch(authenticateUser, authorizeAdmin, updateOrder);

// TODO: Properly implement the following routes
// orderRoutes.route("/:id/pay").put(authenticateUser, paymentGatewayUpdateOrderToPaid);
// orderRoutes
//   .route("/:id/deliver")
//   .put(authenticateUser, authorizeAdmin, updateOrderToDelivered);

export default orderRoutes;
