import Joi from "joi";



export const userLogin = Joi.object({
  email: Joi.string().required(),
});

export const userAuthenticate = Joi.object({
  email: Joi.string().required(),
  email_token: Joi.string().required()
});