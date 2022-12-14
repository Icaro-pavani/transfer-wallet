import express, { json, Express } from "express";
import "express-async-errors";
import cors from "cors";
import { connectDB, disconnectDB } from "./config/database.js";
import handleErrors from "./middlewares/handleErrorsMiddleware.js";
import router from "./routers/index.js";

const app = express();

app
  .use(json())
  .use(cors())
  .get("/health", (_req, res) => res.send("OK!"))
  .use(router)
  .use(handleErrors);

export async function init(): Promise<Express> {
  try {
    await connectDB();
    return Promise.resolve(app);
  } catch (error) {
    console.log(error);
  }
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
