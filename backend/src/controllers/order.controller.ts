import { Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { DatabaseUtils } from "../utils/db.util";
import { CreateLog } from "../utils/logger.util";
import { IRequestWithUser } from "../interfaces/request-with-user.interface";
import { CreateOrderDTO, UpdateOrderDTO } from "../dtos/order.dto";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });

const dbUtils = new DatabaseUtils();

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = async (req: IRequestWithUser, res: Response) => {
  const { error } = CreateOrderDTO.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }

  const { id: userId } = req.user as IUser;

  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  try {
    // insert order
    const order = await dbUtils.exec("usp_CreateOrder", {
      userId,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    if (order.recordset.length > 0) {
      const { id: orderId } = order.recordset[0];
      // insert order items
      orderItems.forEach(async (item: any) => {
        await dbUtils.exec("usp_CreateOrderItem", {
          orderId,
          productId: item.productId,
          qty: item.qty,
        });
        // TODO:handle exceptions if any of the order items fail to insert e.g FK constraint fails i.e product id does not exist
      });

      return res.status(201).json({
        message: "Order created successfully",
        order: order.recordset[0],
      });
    }

    return res.status(500).json({ message: "Order creation failed" });
  } catch (error: any) {
    CreateLog.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Private
 */
export const getOrderById = async (req: IRequestWithUser, res: Response) => {
  const { id } = req.params;
  const { isAdmin, id: userId } = req.user as IUser;

  try {
    //check if order belongs to user if not admin
    if (!isAdmin) {
      const order = await dbUtils.query(
        `SELECT * FROM orders WHERE id=${id} AND userId=${userId}`
      );

      if (order.recordset.length > 0) {
        return res.status(200).json(order.recordset[0]);
      } else {
        return res.status(404).json({ message: "Order not found" });
      }
    }

    // if admin return order
    const order = await dbUtils.query(`SELECT * FROM orders WHERE id=${id}`);

    if (order.recordset.length > 0) {
      return res.status(200).json(order.recordset[0]);
    } else {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (error: any) {
    CreateLog.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update order
 * @route   PUT /api/orders/:id
 * @access  Private/Admin
 */
export const updateOrder = async (req: Request, res: Response) => {
  // const { error } = UpdateOrderDTO.validate(req.body);
  // if (error) {
  //   return res.status(422).json({ message: error.details[0].message });
  // }

  const { id } = req.params;
  const { isPaid, isDelivered } = req.body;

  try {
    const order = await dbUtils.query(`SELECT * FROM orders WHERE id=${id}`);

    if (order.recordset.length > 0) {
      /* 
       await dbUtils.query(
        `UPDATE orders SET isPaid=${isPaid ? 1 : 0}, 
         paidAt=${isPaid ? "GETDATE()" : null}, 
         isDelivered=${isDelivered ? 1 : 0}, 
         deliveredAt=${isDelivered ? "GETDATE()" : null} 
         WHERE id=${id}
         SELECT * FROM orders WHERE id=${id}
         `
      );
      */
      const updatedOrder = await dbUtils.exec("usp_UpdateOrder", {
        id,
        isPaid,
        isDelivered,
      });
      return res.status(200).json({
        message: "Order updated successfully",
        updatedOrder: updatedOrder.recordset[0],
      });
    } else {
      return res.status(404).json({ message: "Order not found" });
    }
  } catch (error: any) {
    // CreateLog.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get logged in user orders
 * @route   GET /api/orders/myorders
 * @access  Private
 */
export const getMyOrders = async (req: IRequestWithUser, res: Response) => {
  const { id: userId } = req.user as IUser;

  try {
    const orders = await dbUtils.query(
      `SELECT * FROM orders WHERE userId=${userId}`
    );

    if (orders.recordset.length > 0) {
      return res.status(200).json(orders.recordset);
    } else {
      return res.status(404).json({ message: "Orders not found" });
    }
  } catch (error: any) {
    CreateLog.error(error);
    return res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private/Admin
 */
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await dbUtils.query(`SELECT * FROM orders`);

    if (orders.recordset.length > 0) {
      return res.status(200).json(orders.recordset);
    } else {
      return res.status(404).json({ message: "Orders not found" });
    }
  } catch (error: any) {
    CreateLog.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// TODO: Implement payments
// /**
//  * @desc    Update order to paid
//  * @route   PUT /api/orders/:id/pay
//  * @access  Private
//  */
// export const paymentGatewayUpdateOrderToPaid = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const {
//     id: paymentResultId,
//     status: paymentResultStatus,
//     update_time: paymentResultUpdateTime,
//     payer: { email_address: paymentResultEmailAddress },
//   } = req.body;

//   try {
//     const order = await dbUtils.query(`SELECT * FROM orders WHERE id=${id}`);

//     if (order.recordset.length > 0) {
//       await dbUtils.exec("usp_UpdateOrderToPaid", {
//         id,
//         paymentResultId,
//         paymentResultStatus,
//         paymentResultUpdateTime,
//         paymentResultEmailAddress,
//       });

//       return res.status(200).json({ message: "Order updated successfully" });
//     } else {
//       return res.status(404).json({ message: "Order not found" });
//     }
//   } catch (error: any) {
//     CreateLog.error(error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// /**
//  * @desc    Update order to delivered
//  * @route   PATCH /api/orders/:id
//  * @access  Private/Admin
//  */
// export const updateOrderToDelivered = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const order = await dbUtils.query(`SELECT * FROM orders WHERE id=${id}`);

//     if (order.recordset.length > 0) {
//       await dbUtils.query(
//         `UPDATE orders SET isDelivered=1, deliveredAt=GETDATE() WHERE id=${id}`
//       );

//       return res.status(200).json({ message: "Order updated successfully" });
//     } else {
//       return res.status(404).json({ message: "Order not found" });
//     }
//   } catch (error: any) {
//     CreateLog.error(error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// /**
//  * @desc    Update order to paid
//  * @route   PATCH /api/orders/:id/pay
//  * @access  Private/Admin
//  */
// export const updateOrderToPaidAdmin = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const order = await dbUtils.query(`SELECT * FROM orders WHERE id=${id}`);

//     if (order.recordset.length > 0) {
//       await dbUtils.query(
//         "UPDATE orders SET isPaid=1, paidAt=GETDATE() WHERE id=${id}"
//       );
//       return res.status(200).json({ message: "Order updated successfully" });
//     } else {
//       return res.status(404).json({ message: "Order not found" });
//     }
//   } catch (error: any) {
//     CreateLog.error(error);
//     return res.status(500).json({ message: error.message });
//   }
// };
