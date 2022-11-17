import { Users } from "@prisma/client";
import Joi from "joi";

export type UserData = Omit<Users, "id" | "accountId">;

export const userSchema = Joi.object<UserData>({
  username: Joi.string().min(3).required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*[0-9])/)
    .required(),
});
