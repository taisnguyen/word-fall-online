import { Room } from "../models/room.js";

class RoomRepository {
    private static rooms = new Map<string, Room>(); 

    public static addRoom(room: Room): void {
        RoomRepository.rooms.set(room.getRoomCode(), room);
    }

    public static removeRoom(roomCode: string): void {
        RoomRepository.rooms.delete(roomCode);
    }

    public static getRoom(roomCode: string): Room {
        return RoomRepository.rooms.get(roomCode);
    }

    public static getAllLobbies(): Map<string, Room> {
        return RoomRepository.rooms;
    }

    public static doesRoomExistByCode(roomCode: string): boolean {
        return RoomRepository.rooms.has(roomCode);
    }
}

export { RoomRepository };