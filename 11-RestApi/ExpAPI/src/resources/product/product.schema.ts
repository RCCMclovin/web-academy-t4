import Joi from "joi"

export const productSchema = Joi.object().keys({
    name: Joi.string().min(2).max(40).required(),
    price: Joi.number().required(),
    stockQuantity: Joi.number().integer().required(),
});
