import "./styles/room.scss";

import { io, Socket } from "socket.io-client";

const socket: Socket = io();
socket.emit("test");

socket.on("bruh", () => {
    console.log("brd");
})

import { SquareWordBoard } from "./models/wordBoards";

const wordBoardDiv: HTMLElement = document.querySelector(".word-board");
const letters = JSON.parse(wordBoardDiv.dataset["initialLetters"]);
const squareWordBoard: SquareWordBoard = new SquareWordBoard(letters, wordBoardDiv);