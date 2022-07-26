import { Player } from "./player.js";

class Lobby {
    private lobbyCode: string;
    private players: Array<Player> = [];

    public constructor(lobbyCode: string) {
        this.lobbyCode = lobbyCode;
    }

    public getLobbyCode(): string {
        return this.lobbyCode;
    }

    public addPlayer(player: Player): void {

    }

    public getPlayers(): Array<Player> {
        return this.players;
    }
}

export { Lobby };