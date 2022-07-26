import { Lobby } from "../models/lobby.js";

class LobbyRepository {
    private static lobbies = new Map<string, Lobby>(); 

    public static addLobby(lobby: Lobby): void {
        LobbyRepository.lobbies.set(lobby.getLobbyCode(), lobby);
    }

    public static removeLobby(lobbyCode: string): void {
        LobbyRepository.lobbies.delete(lobbyCode);
    }

    public static getLobby(lobbyCode: string): Lobby {
        return LobbyRepository.lobbies.get(lobbyCode);
    }

    public static getAllLobbies(): Map<string, Lobby> {
        return LobbyRepository.lobbies;
    }

    public static doesLobbyExistByCode(lobbyCode: string): boolean {
        return LobbyRepository.lobbies.has(lobbyCode);
    }
}

export { LobbyRepository };