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

    private setup(): void {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";

        // Create the n-by-n grid of letters
        this.letters = new Array<string>();
        for (let i = 0; i < this.size; i++) {
            let row = "";
            for (let j = 0; j < this.size; j++)
                row += alphabet[randNum(0, alphabet.length - 1)];
            
            this.letters.push(row);
        }
    
    }

    public displayGrid(): void {
        for (let i = 0; i < this.size; i++) {
            let row = "";
            for (let j = 0; j < this.size; j++)
                row += this.letters[i][j] + " ";
            console.log(row);
        }
    }

}

    