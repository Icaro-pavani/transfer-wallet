import { Router } from "express";
import accountRouter from "./accountRouter.js";
import authenticationRouter from "./authenticationRouter.js";
import transactionRouter from "./transactionRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router
  .use("/user", userRouter)
  .use("/auth", authenticationRouter)
  .use("/account", accountRouter)
  .use("/transaction", transactionRouter);

export default router;
