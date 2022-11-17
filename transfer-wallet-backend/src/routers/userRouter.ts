import { Router } from "express";
import { userCreation } from "../controllers/userControllers.js";
import validateSchema from "../middlewares/validateSchema.js";
import { userSchema } from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post("/", validateSchema(userSchema), userCreation);

export default userRouter;
