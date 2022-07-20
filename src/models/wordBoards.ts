import { randNum } from "../utility/random";

export interface WordBoard {

}

export class SquareWordBoard implements WordBoard {
    private size: number;
    private letters: Array<string>;

    public constructor(size: number) {
        this.size = size;
        this.setup();
    }

    public setup(): void {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        // n = 4
        // djas jdsa jasd jdsa
        

    }
}