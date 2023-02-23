import { Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { DatabaseUtils } from "../utils/db.util";
import { CreateLog } from "../utils/logger.util";
import { IRequestWithUser } from "../interfaces/request-with-user.interface";
import dotenv from "dotenv";
import { AddToCartDTO } from "../dtos/cart.dto";
dotenv.config({ path: __dirname + "/../../.env" });

const dbUtils = new DatabaseUtils();

/**
 * @desc    Add to cart
 * @route   POST /api/cart
 * @access  Private
 */
export const addToCart = async (req: IRequestWithUser, res: Response) => {
  const { error } = AddToCartDTO.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }

  const { productId, qty } = req.body;
  const { id: userId } = req.user as IUser;

  try {
    const product = await dbUtils.query(
      `SELECT * FROM products WHERE id=${productId}`
    );
    if (product.recordset.length > 0) {
      const cartItem = await dbUtils.query(
        `SELECT * FROM cart WHERE productId=${productId} AND userId=${userId}`
      );
      if (cartItem.recordset.length > 0) {
        const updatedQty = cartItem.recordset[0].qty + qty;
        // const updatedCartItem = await dbUtils.query(
        //   `UPDATE cart SET qty=${updatedQty} WHERE productId=${productId} AND userId=${userId} SELECT * FROM cart WHERE productId=${productId} AND userId=${userId}`
        // );

        const updatedCart = await dbUtils.exec("usp_UpdateCartItem", {
          productId,
          userId,
          qty: updatedQty,
        });
        if (updatedCart.recordset.length > 0) {
          return res.status(200).json({
            message: "Cart item updated successfully",
            cart: updatedCart.recordset,
          });
        } else {
          return res.status(500).json({ message: "Cart item update failed" });
        }
      } else {
        // const cartItem = await dbUtils.query(
        //   `INSERT INTO cart (userId, productId, qty) VALUES (${userId}, ${productId}, ${qty}) SELECT * FROM cart WHERE productId=${productId} AND userId=${userId}`
        // );

        const cart = await dbUtils.exec("usp_AddToCart", {
          productId,
          userId,
          qty,
        });
        if (cart.recordset.length > 0) {
          return res.status(201).json({
            message: "Cart item created successfully",
            cart: cart.recordset,
          });
        } else {
          return res.status(500).json({ message: "Cart item creation failed" });
        }
      }
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error: any) {
    CreateLog.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Gets all cart items
 * @route   GET /api/cart
 * @access  Private
 */
export const getCart = async (req: IRequestWithUser, res: Response) => {
  const { id: userId } = req.user as IUser;

  try {
    const cartItems = await dbUtils.query(
      `SELECT * FROM cart WHERE userId=${userId}`
    );
    if (cartItems.recordset.length > 0) {
      return res.status(200).json(cartItems.recordset);
    } else {
      return res.status(200).json({
        message: "There are no items in the cart",
        cart: cartItems.recordset,
      });
    }
  } catch (error: any) {
    CreateLog.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Removes an item from the cart
 * @route   DELETE /api/cart/:id
 * @access  Private
 */
export const removeFromCart = async (req: IRequestWithUser, res: Response) => {
  const { id } = req.params;
  const { id: userId } = req.user as IUser;

  try {
    const cartItem = await dbUtils.query(
      `SELECT * FROM cart WHERE id=${id} AND userId=${userId}`
    );
    if (cartItem.recordset.length > 0) {
      // const deletedCartItem = await dbUtils.query(
      //   `DELETE FROM cart WHERE id=${id} AND userId=${userId} SELECT * FROM cart userId=${userId}`
      // );

      const cart = await dbUtils.exec("usp_RemoveFromCart", {
        id,
        userId,
      });

      if (cart.recordset.length > 0 || cart.recordset.length === 0) {
        return res.status(200).json({
          message: "Cart item removed successfully",
          cart: cart.recordset,
        });
      } else {
        return res.status(500).json({ message: "Cart item remove failed" });
      }
    } else {
      return res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error: any) {
    CreateLog.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Checkout
 * @route   GET /api/cart/checkout
 * @access  Private
 */
export const checkout = async (req: IRequestWithUser, res: Response) => {
  const { id: userId } = req.user as IUser;

  const { totalPrice } = req.query;

  try {
    const cartItems = await dbUtils.query(
      `SELECT * FROM cart WHERE userId=${userId}`
    );
    if (cartItems.recordset.length > 0) {
      const orderItems = cartItems.recordset.map((item: any) => {
        return {
          productId: item.productId,
          qty: item.qty,
        };
      });

      const order = await dbUtils.exec("usp_CreateOrder", {
        userId,
        shippingAddress: "",
        paymentMethod: "",
        totalPrice: totalPrice??599,
      });

      if (order.recordset.length > 0) {
        const { id: orderId } = order.recordset[0];
        // insert order
        orderItems.forEach(async (item: any) => {
          await dbUtils.exec("usp_CreateOrderItem", {
            orderId,
            productId: item.productId,
            qty: item.qty,
          });
        });

        // delete user cart checkout
        await dbUtils.query(
          `DELETE FROM cart WHERE userId=${userId} SELECT * FROM cart WHERE userId=${userId}`
        );

        return res.status(201).json({
          message: "Order created successfully",
          order: order.recordset,
        });
      }

      return res.status(500).json({ message: "Order creation failed" });
    } else {
      return res.status(404).json({ message: "No items in cart" });
    }
  } catch (error: any) {
    CreateLog.error(error);
    return res.status(500).json({ message: error.message });
  }
};
