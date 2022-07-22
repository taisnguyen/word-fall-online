import { Lobby } from "../models/lobby.js";
import { LobbyRepository } from "../repositories/lobbyRepository";

class LobbyService {
    public static createLobby(lobbyCode: string): Lobby {
        // Check if lobby already exists
        if (LobbyRepository.doesLobbyExistByCode(lobbyCode)) return null;

        // Create lobby
        const lobby = new Lobby(lobbyCode);
        LobbyRepository.addLobby(lobby);

        return lobby;
    }

    public static deleteLobby(lobbyCode: string): boolean {
        // Check if lobby does not exists
        if (!LobbyRepository.doesLobbyExistByCode(lobbyCode)) return false;

        // Delete lobby
        LobbyRepository.removeLobby(lobbyCode);

        return true;
    }

    public static getLobby(lobbyCode: string): Lobby {
        // Check if lobby does not exists
        if (!LobbyRepository.doesLobbyExistByCode(lobbyCode)) return null;

        // Return lobby
        return LobbyRepository.getLobby(lobbyCode);
    }
}
