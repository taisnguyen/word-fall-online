import { Router } from "express";
import { getHomepage } from "../../controllers/homepageController.js"; // might have to be relative

const HomepageRouter = Router();

HomepageRouter.get("/", getHomepage);

export { HomepageRouter };
