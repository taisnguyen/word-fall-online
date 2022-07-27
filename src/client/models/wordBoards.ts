import { randNum } from "../utility/random";

export interface WordBoard {

}

export class SquareWordBoard implements WordBoard {
    private letters: Array<string>;
    private selectedLetterPositions: Set<number> = new Set<number>();
    private readonly size: number;
    private readonly div: HTMLElement;
    private readonly ctx: CanvasRenderingContext2D;

    private mouseDown: boolean = false;
    private lastTouchEvent: TouchEvent;
    private currentR: number;
    private currentC: number;
    private posCoefficient: number;

    public constructor(letters: Array<string>, boardDiv: HTMLElement) {
        this.letters = letters;
        this.size = letters.length;
        this.div = boardDiv;
        this.ctx = this.div.querySelector("canvas").getContext("2d");
        this.setup();
    }

    private setup(): void {
        // Play initial falling animation when page loads
        window.onload = this.playInitialFallingAnimation.bind(this);

        const onMouseDown = (e: MouseEvent | TouchEvent): void => {
            const mouseX: number = (e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX;
            const mouseY: number = (e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY;
            const letterTile = document.elementFromPoint(mouseX, mouseY);

            if (letterTile.classList[0] !== ("letter-tile")) 
                return;

            this.mouseDown = true;
            this.updateWordSelection(e);
        }

        const onMouseUp = (e: MouseEvent | TouchEvent): void => {
            this.updateWordSelection((e instanceof MouseEvent) ? e : this.lastTouchEvent);

            // Unhighlight all selected letters
            this.selectedLetterPositions.forEach((pos: number) => {
                const [r, c] = this.getRowColFromPos(pos);
                const letterTile = this.div.querySelector(`.position-${r}-${c}`);
                letterTile.removeAttribute("selected");
            });

            this.mouseDown = false;
            if (this.selectedLetterPositions.size == 0) return;

            this.playWord(Array.from(this.selectedLetterPositions).map(pos => this.getRowColFromPos(pos)));
            this.selectedLetterPositions.clear();
            this.currentR = undefined;
            this.currentC = undefined;
            this.clearSelectionDisplay();
        }

        this.div.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);

        this.div.addEventListener("touchstart", onMouseDown); // Mobile
        document.addEventListener("touchend", onMouseUp); // Mobile

        this.div.addEventListener("mousemove", this.updateWordSelection.bind(this));
        this.div.addEventListener("touchmove", this.updateWordSelection.bind(this));
    }

    private getPosFromRowCol(r: number, c: number): number {
        return r * this.size + c;
    }

    private getRowColFromPos(pos: number): [number, number] {
        const r: number = Math.floor(pos / this.size);
        const c: number = pos % this.size;
        return [r, c];
    }

    private updateWordSelection(e: MouseEvent | TouchEvent): void {
        if (e instanceof TouchEvent)
            e.preventDefault(); // Mobile, prevent scrolling

        if (!this.mouseDown) return;

        // Store last TouchEvent since the "touchend" event doesn't have clientX and clientY properties
        if (e instanceof TouchEvent && e.touches.length > 0) this.lastTouchEvent = e; // Mobile

        const mouseX: number = (e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX;
        const mouseY: number = (e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY;
        const letterTile = document.elementFromPoint(mouseX, mouseY);
        const letterTileClasses = (letterTile !== null) ? letterTile.classList : new Array<string>();

        if (letterTileClasses[0] === "letter-tile") {
            const groups = letterTileClasses[1].match(/position-(?<r>\d)-(?<c>\d)/).groups;
            const r: number = parseInt(groups.r);
            const c: number = parseInt(groups.c);
            const pos: number = this.getPosFromRowCol(r, c);

            // If the letter is not adjacent to the last selected letter, return
            if (this.selectedLetterPositions.size > 0 && ((Math.abs(this.currentR - r) > 1 || Math.abs(this.currentC - c) > 1) || (this.currentR === r && this.currentC === c)))
                return;

            const deleteLetter = (pos: number): void => {
                const [row, col] = this.getRowColFromPos(pos);
                const currentLetterTile = this.div.querySelector(`.position-${row}-${col}`);
                currentLetterTile.removeAttribute("selected");

                this.selectedLetterPositions.delete(this.getPosFromRowCol(row, col));
                this.removeLetterFromSelectionDisplay();
            }

            // If a hovered letter is already selected, delete it and all letters after it
            if (this.selectedLetterPositions.has(pos)) {
                const selectedLetterPositionArray = Array.from(this.selectedLetterPositions);
                const selectedPosIndex = selectedLetterPositionArray.indexOf(pos);
                for (let i=0; i<(selectedLetterPositionArray.length - selectedPosIndex); i++)
                    deleteLetter(selectedLetterPositionArray[selectedPosIndex + i]);

                this.currentR = r;
                this.currentC = c;
            }

            // Since this.selectedLetterPositions is a set, this will only add the letter if it is not already in the set
            const numPrevLetters = this.selectedLetterPositions.size;
            this.selectedLetterPositions.add(pos);

            // If it was a duplicate letter, no new letters added
            if (this.selectedLetterPositions.size === numPrevLetters) return;
            
            this.currentR = r;
            this.currentC = c;
            letterTile.setAttribute("selected", "true");

            const letter: string = this.div.querySelector(`.position-${r}-${c}`).innerHTML;
            this.addLetterToSelectionDisplay(letter);
        }
    }

    private playInitialFallingAnimation(): void {
        let fallTime: number = 2.6;
        this.div.querySelectorAll(".letter-tile").forEach((letterTile: HTMLElement) => {
            letterTile.style.transform = "translateY(-" + window.innerHeight * Math.max(window.devicePixelRatio, 1) + "px)";
            letterTile.style.pointerEvents = "none";

            setTimeout(() => {
                fallTime -= 0.24 * (fallTime / 5);
                letterTile.style.transition = fallTime + "s";
                letterTile.style.transitionTimingFunction = "cubic-bezier(.55,0,.68,.2)";
                letterTile.style.removeProperty("transform");
                setTimeout(() => {
                    letterTile.style.transition = "0.05s";
                    letterTile.style.pointerEvents = "initial";
                }, fallTime * 1000);
            }, 0);

            letterTile.style.display = "flex";
        });
    }

    private addLetterToSelectionDisplay(letter: string): void {
        const selectionLetterTileContainer = this.div.querySelector(".selection-letter-tile-container");
        const selectionLetterTile = document.createElement("div");
        selectionLetterTile.classList.add("selection-letter-tile");
        selectionLetterTile.innerHTML = letter;
        selectionLetterTileContainer.appendChild(selectionLetterTile);
    }

    private removeLetterFromSelectionDisplay(): void {
        const selectionLetterTileContainer = this.div.querySelector(".selection-letter-tile-container");
        if (selectionLetterTileContainer.lastElementChild !== null) 
            selectionLetterTileContainer.removeChild(selectionLetterTileContainer.lastElementChild);
    }

    private clearSelectionDisplay(): void {
        const selectionLetterTileContainer = this.div.querySelector(".selection-letter-tile-container");
        selectionLetterTileContainer.innerHTML = "";
    }

    private getCurrentWord(selectedLetterPositionMatrix: Array<Array<number>>): string {
        const word: string = selectedLetterPositionMatrix.map(coords => {
            const [r, c] = coords;
            return this.div.querySelector(`.position-${r}-${c}`).innerHTML;
        }).join("");

        return word;
    }

    // TODO: Change out the object passed in the CustomEvent to be a user-defined type shared between server/client
    private playWord(selectedLetterPositionMatrix: Array<Array<number>>): void {
        const word: string = this.getCurrentWord(selectedLetterPositionMatrix);

        console.log(`Selected word ${word}`);
        document.dispatchEvent(new CustomEvent("wordSelected", {
            detail: {
                word: word,
                positions: selectedLetterPositionMatrix,
            }
        }));
        
    }
}
