import { Router } from "express";
import { getLobbyPage } from "../../controllers/lobbyController.js";

const lobbyRouter = Router();

// GET /lobby
// ?: code
lobbyRouter.get("/", getLobbyPage);

export { lobbyRouter };