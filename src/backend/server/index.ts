import dotenv from "dotenv";
dotenv.config();

import { LobbyService } from "../services/lobbyService.js";
LobbyService.createLobby("12341");


// Set up server
import { app, server } from "./setupServer.js";

// Set up routes
import { setupRoutes } from "./routes/index.js";
setupRoutes(app);

// Initialize network manager
import { NetworkManager } from "../managers/networkManager.js";
NetworkManager.init(server);

