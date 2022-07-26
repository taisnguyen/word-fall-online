import "./styles/lobby.scss";

import { io, Socket } from "socket.io-client";

const socket: Socket = io();
socket.emit("test");

socket.on("bruh", () => {
    console.log("brd");
})