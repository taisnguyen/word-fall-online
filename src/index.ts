import { WordBoard, SquareWordBoard } from "./models/wordBoards";
import { randNum } from "./utility/random";
import "./styles/index.scss";

const squareWordBoard: SquareWordBoard = new SquareWordBoard(4);

squareWordBoard.displayGrid();