// Set up server
import { app, server } from "./setupServer.js";

// Set up routes
import setupRoutes from "./routes/index.js";
setupRoutes(app);