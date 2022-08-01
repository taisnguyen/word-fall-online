import { Room } from "../models/room.js";
import { RoomRepository } from "../repositories/roomRepository.js";

class RoomService {
    public static createRoom(roomCode: string): Room {
        // Check if room already exists
        if (RoomRepository.doesRoomExistByCode(roomCode)) return null;

        // Create room
        const room = new Room(roomCode);
        RoomRepository.addRoom(room);

        return room;
    }

    public static deleteRoom(roomCode: string): boolean {
        // Check if room does not exists
        if (!RoomRepository.doesRoomExistByCode(roomCode)) return false;

        // Delete room
        RoomRepository.removeRoom(roomCode);

        return true;
    }

    public static getRoom(roomCode: string): Room {
        // Check if room does not exists
        if (!RoomRepository.doesRoomExistByCode(roomCode)) return null;

        // Return room
        return RoomRepository.getRoom(roomCode);
    }
}

export { RoomService };