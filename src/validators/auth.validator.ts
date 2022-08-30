import * as Joi from "joi";

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

export const emailValidator = Joi.string().required().max(50).email();
export const usernameValidator = Joi.string().min(3).max(25).required();
export const passwordValidator = Joi.string().required().custom(customPasswordValidation);

export const email = Joi.object().keys({ email: emailValidator });

export const password = Joi.object().keys({ password: passwordValidator });

export const signup = Joi.object().keys({
  email: emailValidator,
  username: usernameValidator,
  password: passwordValidator,
});

export const login = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const updateUser = Joi.object().keys({
  username: usernameValidator,
});
