import * as Joi from "joi";
import { paramsSchema } from "./shared.validator";

const passwordRegex = new RegExp("(?=.*d)(?=.*[a-z])(?=.*[A-Z]).*");

const customPasswordValidation = (value: string, customHelpers: Joi.CustomHelpers) => {
  if (value.length < 8)
    return customHelpers.message({ custom: "password must be at least 8 characters" });

  if (value.length > 255)
    return customHelpers.message({ custom: "password must be less than 255 characters long" });

  if (!value.match(passwordRegex))
    return customHelpers.message({
      custom: "password must contain at least 1 letter and 1 number",
    });
  return value;
};

export const PasswordSchema = Joi.string()
  .required()
  .custom(customPasswordValidation)
  .options({ stripUnknown: true });

export const SignupSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string().email(),
  role: Joi.string().optional(),
})
  .options({ stripUnknown: true })
  .required();

export const LoginSchema = Joi.object({
  username: Joi.string(),
  password: Joi.string(),
})
  .options({ stripUnknown: true })
  .required();

export const SendVerificationEmailSchema = Joi.object({
  params: paramsSchema,
}).options({ stripUnknown: true });

export const VerifyEmailSchema = Joi.object({
  password: PasswordSchema,
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .options({ messages: { "any.only": "Passwords do not match" } }),
}).options({ stripUnknown: true });
