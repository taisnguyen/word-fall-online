import { WordBoard, SquareWordBoard } from "./models/wordBoards";
import { randNum } from "./utility/random";
import "./styles/homepage.scss";

const wordBoardDiv: HTMLElement = document.querySelector(".word-board");
const letters = JSON.parse(wordBoardDiv.dataset["initialLetters"]);
const squareWordBoard: SquareWordBoard = new SquareWordBoard(letters, wordBoardDiv);

document.addEventListener("wordSelected", (e: CustomEventInit) => {
    const word: string = e["detail"]["word"];
    switch (word) {
        case "JOIN":
            console.log("Join");
    }
});
