import { homepageRouter } from "./homepage.js";
import { lobbyRouter } from "./lobby.js";
import { Application, Request, Response } from "express";

const setupRoutes = (app: Application) => {

    // Homepage
    // GET / 
    app.use("/", homepageRouter);

    // Lobby
    // GET /lobby
    app.use("/lobby", lobbyRouter);

    // 404, redirect to homepage
    app.use((req: Request, res: Response) => {
        res.redirect("/");
    });
}

export { setupRoutes };