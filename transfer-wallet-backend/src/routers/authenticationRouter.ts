import { Router } from "express";
import { loginUser } from "../controllers/authController.js";

const authenticationRouter = Router();

authenticationRouter.post("/", loginUser);

export default authenticationRouter;
