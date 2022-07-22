import { Router } from "express";
import { getHomepage } from "../../controllers/homepageController.js"; // might have to be relative

const homepageRouter = Router();

// GET /
homepageRouter.get("/", getHomepage);

export { homepageRouter };
