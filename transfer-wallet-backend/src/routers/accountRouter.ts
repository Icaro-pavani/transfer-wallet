import { Router } from "express";
import { obtainAccountInfo } from "../controllers/accountController.js";
import tokenHandler from "../middlewares/tokenHandler.js";

const accountRouter = Router();

accountRouter.all("/*", tokenHandler).get("/", obtainAccountInfo);

export default accountRouter;
