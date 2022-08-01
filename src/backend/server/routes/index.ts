import { homepageRouter } from "./homepage.js";
import { roomRouter } from "./room.js";
import { Application, Request, Response } from "express";

const setupRoutes = (app: Application) => {

    // Homepage
    // GET / 
    app.use("/", homepageRouter);

    // Room
    // GET /room
    app.use("/room", roomRouter);

    // 404, redirect to homepage
    app.use((req: Request, res: Response) => {
        res.redirect("/");
    });
}

export { setupRoutes };