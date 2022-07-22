import { Router } from "express";
import { getLobbyPage } from "../../controllers/lobbyController.js";

const lobbyRouter = Router();

// GET /lobby/:lobbyCode
lobbyRouter.get("/:lobbyCode", getLobbyPage);

export { lobbyRouter };