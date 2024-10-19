import Joi from "joi";

const changeLanguageSchema = Joi.object().keys({
    lang: Joi.string().valid("pt-BR", "en-US").required()
})

export default changeLanguageSchema;