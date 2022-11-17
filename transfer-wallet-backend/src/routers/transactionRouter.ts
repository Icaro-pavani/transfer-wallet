import { Router } from "express";
import {
  addTransaction,
  viewTransactions,
} from "../controllers/transactionController.js";
import tokenHandler from "../middlewares/tokenHandler.js";
import validateSchema from "../middlewares/validateSchema.js";
import { transactionSchema } from "../schemas/transcationSchema.js";

const transactionRouter = Router();

transactionRouter
  .all("/*", tokenHandler)
  .post("/", validateSchema(transactionSchema), addTransaction)
  .get("/", viewTransactions);

export default transactionRouter;
