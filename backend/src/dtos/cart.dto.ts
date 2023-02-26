import Joi from "joi";

export const AddToCartDTO = Joi.object({
  productId: Joi.number().required(),
  qty: Joi.number().required(),
});
