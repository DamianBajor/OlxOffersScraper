import { Joi } from "express-validation";

export const olxOffer = {
    body: Joi.object({
        title: Joi.string()
            .required(),
        price: Joi.number()
            .required(),
        location: Joi.string()
            .required(),
        url: Joi.string()
            .required()
            .uri(),
    }),
}
