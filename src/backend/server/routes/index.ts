import { HomepageRouter } from "./homepage.js";
import { PlayRouter } from "./play.js";
import { Application } from "express";

export default (app: Application) => {
    app.use("/", HomepageRouter);

    app.use("/play", PlayRouter)
}