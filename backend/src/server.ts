import express, { json } from "express";
import cors from "cors";
import { notFound, errorHandler } from "./middlewares/global-error.middleware";
import { CreateLog } from "./utils/logger.util";
import userRoutes from "./router/user.routes";
import productRoutes from "./router/product.routes";
import orderRoutes from "./router/order.routes";
import dotenv from "dotenv";
import cartRoutes from "./router/cart.routes";
dotenv.config({ path: __dirname + "/../.env" });

dotenv.config();
const app = express();

//Middlewares
app.use(cors());
app.use(json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Global error handling middlewares
app.use(notFound);
app.use(errorHandler);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  CreateLog.info(`Server running on http://${HOST}:${PORT}`);
});
