import Joi from "joi";

const authSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export default authSchema;