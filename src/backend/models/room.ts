import { Player } from "./player.js";

class Room {
    private roomCode: string;
    private players: Array<Player> = [];

    public constructor(roomCode: string) {
        this.roomCode = roomCode;
    }

    public getRoomCode(): string {
        return this.roomCode;
    }

    public addPlayer(player: Player): void {

    }

    public getPlayers(): Array<Player> {
        return this.players;
    }
}

export { Room };