import { HomepageRouter } from "./homepage.js";

export default (app) => {
    app.use("/", HomepageRouter);
}