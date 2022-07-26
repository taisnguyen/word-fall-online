import { Request, Response } from "express";
import { LobbyService } from "../services/lobbyService.js";
import { Lobby } from "../models/lobby.js";

const getLobbyPage = (req: Request, res: Response): void => {
    const lobbyCode: string = req.query["code"] as string;
    const lobby: Lobby = LobbyService.getLobby(lobbyCode);
    
    // Lobby does not exist
    if (lobby === null) {
        res.redirect("/");
        return;
    }

    res.render("lobby", {
        "letters": [
            "join",
            "make",
            "word",
            "bruh"
        ]
    });
}

export { getLobbyPage };
