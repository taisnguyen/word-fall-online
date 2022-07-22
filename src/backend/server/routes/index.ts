import { homepageRouter } from "./homepage.js";
import { lobbyRouter } from "./lobby.js";
import { Application } from "express";

const setupRoutes = (app: Application) => {

    // Homepage
    // GET / 
    app.use("/", homepageRouter);

    // Lobby
    // GET /lobby
    app.use("/lobby", lobbyRouter);
}

export { setupRoutes };