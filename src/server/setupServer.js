import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Setup server
const port = process.env.port || 3000;
const app = express();
const server = app.listen(port, () => console.log(`listening on port ${port}`));
app.use(express.static(path.join(__dirname, "../../dist")));
app.use(express.json());
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

export { app, server };