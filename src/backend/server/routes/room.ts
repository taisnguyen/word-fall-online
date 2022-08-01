import { Router } from "express";
import { getRoomPage } from "../../controllers/roomController.js";

const roomRouter = Router();

// GET /room
// ?: code
roomRouter.get("/", getRoomPage);

export { roomRouter };