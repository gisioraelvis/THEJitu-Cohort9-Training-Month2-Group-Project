import Joi from "joi";

// Create new order DTO
export const CreateOrderDTO = Joi.object({
  orderItems: Joi.array().items(
    Joi.object({
      productId: Joi.string().required(),
      qty: Joi.number().required(),
    })
  ),
  shippingAddress: Joi.string().required(),
  paymentMethod: Joi.string().required(),
  totalPrice: Joi.number().required(),
});

// Update order DTO
export const UpdateOrderDTO = Joi.object({
  isPaid: Joi.boolean().required(),
  isDelivered: Joi.boolean().required(),
});
