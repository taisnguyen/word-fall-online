import { WordBoard, SquareWordBoard } from "./models/wordBoards";
import { randNum } from "./utility/random";

const squareWordBoard: SquareWordBoard = new SquareWordBoard(4);

squareWordBoard.displayGrid();