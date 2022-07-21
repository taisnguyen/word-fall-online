import { HomepageRouter } from "./homepage.js";
import { PlayRouter } from "./play.js";

export default (app) => {
    app.use("/", HomepageRouter);

    app.use("/play", PlayRouter)
}