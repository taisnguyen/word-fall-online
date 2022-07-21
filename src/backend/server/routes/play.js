import { Router } from "express";
import { getPlayPage } from "../../controllers/playController.js";

const PlayRouter = Router();

PlayRouter.get("/play", getPlayPage);

export { PlayRouter };