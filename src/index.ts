import { WordBoard, SquareWordBoard } from "./client/models/wordBoards";
import { randNum } from "./client/utility/random";
import "./styles/index.scss";

const squareWordBoard: SquareWordBoard = new SquareWordBoard(4);

squareWordBoard.displayGrid();