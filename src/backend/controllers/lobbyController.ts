import { Request, Response } from "express";
import { LobbyService } from "../services/lobbyService.js";
import { Lobby } from "../models/lobby.js";

const getLobbyPage = (req: Request, res: Response) => {
    const lobbyCode: string = req.query["code"] as string;
    const lobby: Lobby = LobbyService.getLobby(lobbyCode);
    
    // Lobby does not exist
    if (lobby === null) {
        res.render("homepage", { "letters": ["jcra", "ioet", "tai-", "snen"] });
    }

    res.render("lobby");
}

export { getLobbyPage };
