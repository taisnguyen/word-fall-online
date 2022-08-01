import { Request, Response } from "express";
import { RoomService } from "../services/roomService.js";
import { Room } from "../models/room.js";

const getRoomPage = (req: Request, res: Response): void => {
    const roomCode: string = req.query["code"] as string;
    const room: Room = RoomService.getRoom(roomCode);
    
    // Room does not exist
    if (room === null) {
        res.redirect("/");
        return;
    }

    res.render("room", {
        "letters": [
            "join",
            "make",
            "word",
            "bruh"
        ]
    });
}

export { getRoomPage };
