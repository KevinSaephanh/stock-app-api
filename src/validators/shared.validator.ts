import Joi from "joi";
import { Enum } from "../utils/enumToArray";

export const Id = Joi.number().id();

export const paramsSchema = Joi.object({
  id: Id.required(),
});

export const enumValidator = <T extends Enum<unknown>>(enumObj: T) => {
  return Joi.string().valid(...Object.values(enumObj));
};
