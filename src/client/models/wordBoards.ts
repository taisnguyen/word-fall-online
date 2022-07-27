import { randNum } from "../utility/random";

export interface WordBoard {

}

export class SquareWordBoard implements WordBoard {
    private letters: Array<string>;
    private selectedletterPositions: Set<number> = new Set<number>();
    private readonly size: number;
    private readonly div: HTMLElement;
    private readonly ctx: CanvasRenderingContext2D;

    private mouseDown: boolean = false;
    private lastTouchEvent: TouchEvent;
    private lastR: number;
    private lastC: number;

    public constructor(letters: Array<string>, boardDiv: HTMLElement) {
        this.letters = letters;
        this.size = letters.length;
        this.div = boardDiv;
        this.ctx = this.div.querySelector("canvas").getContext("2d");
        this.setup();
    }

    private setup(): void {
        window.onload = this.playinitialFallingAnimation.bind(this);

        const onMouseDown = (e: MouseEvent | TouchEvent): void => {
            const mouseX: number = (e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX;
            const mouseY: number = (e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY;
            const letterTile = document.elementFromPoint(mouseX, mouseY);

            if (letterTile.classList[0] !== ("letter-tile")) 
                return;

            this.addLetterAtMousePos(e);
            this.mouseDown = true;
        }

        const onMouseUp = (e: MouseEvent | TouchEvent): void => {
            this.addLetterAtMousePos((e instanceof MouseEvent) ? e : this.lastTouchEvent);

            // Unhighlight all selected letters
            this.selectedletterPositions.forEach((pos: number) => {
                const r: number = Math.floor(pos / 10);
                const c: number = pos % 10;
                const letterTile = this.div.querySelector(`.position-${r}-${c}`);
                letterTile.removeAttribute("selected");
            });

            this.mouseDown = false;
            if (this.selectedletterPositions.size == 0) return;

            this.playWord(Array.from(this.selectedletterPositions).map(pos => [Math.floor(pos / 10), pos % 10]));
            this.selectedletterPositions.clear();
            this.lastR = undefined;
            this.lastC = undefined;
            this.clearSelectionDisplay();
        }

        this.div.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);

        this.div.addEventListener("touchstart", onMouseDown); // Mobile
        document.addEventListener("touchend", onMouseUp); // Mobile

        this.div.addEventListener("mousemove", this.addLetterAtMousePos.bind(this));
        this.div.addEventListener("touchmove", this.addLetterAtMousePos.bind(this));
    }

    private addLetterAtMousePos(e: MouseEvent | TouchEvent): void {
        e.preventDefault();

        if (!this.mouseDown) return;
        if (e instanceof TouchEvent && e.touches.length > 0) this.lastTouchEvent = e; // Mobile
    
        const re = new RegExp(/position-(?<r>\d)-(?<c>\d)/);
        const mouseX: number = (e as MouseEvent).clientX || (e as TouchEvent).touches[0].clientX;
        const mouseY: number = (e as MouseEvent).clientY || (e as TouchEvent).touches[0].clientY;
        const letterTile = document.elementFromPoint(mouseX, mouseY);
        const letterTileClasses = (letterTile !== null) ? letterTile.classList : new Array<string>();

        if (letterTileClasses[0] === "letter-tile") {
            const groups = letterTileClasses[1].match(re).groups;
            const r: number = parseInt(groups.r);
            const c: number = parseInt(groups.c);

            // If the letter is not adjacent to the last selected letter, return
            if (this.selectedletterPositions.size > 0 && ((Math.abs(this.lastR - r) > 1 || Math.abs(this.lastC - c) > 1) || (this.lastR === r && this.lastC === c))) 
                return;

            // Since this.selectedletterPositions is a set, this will only add the letter if it is not already in the set
            const numPrevLetters = this.selectedletterPositions.size;
            this.selectedletterPositions.add(r * 10 + c);

                // If it was a duplicate letter, no new letters added
            if (this.selectedletterPositions.size === numPrevLetters) return;
            
            this.lastR = r;
            this.lastC = c;
            letterTile.setAttribute("selected", "true");

            const letter: string = this.div.querySelector(`.position-${r}-${c}`).innerHTML;
            this.addLetterToSelectionDisplay(letter);
        }
    }

    private playinitialFallingAnimation(): void {
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

<<<<<<< HEAD
    private addLetterToSelectionDisplay(letter: string): void {
        const selectionLetterTileContainer = this.div.querySelector(".selection-letter-tile-container");
        const selectionletterTile = document.createElement("div");
        selectionletterTile.classList.add("selection-letter-tile");
        selectionletterTile.innerHTML = letter;
        selectionLetterTileContainer.appendChild(selectionletterTile);
    }

    private clearSelectionDisplay(): void {
        const selectionLetterTileContainer = this.div.querySelector(".selection-letter-tile-container");
        selectionLetterTileContainer.innerHTML = "";
    }
=======
    private setup(): void {
        window.onload = this.initialFallingAnimation.bind(this);

        let mouseDown = false;
        const letterPositions: Set<number> = new Set();
        const re = new RegExp(/position-(?<r>\d)-(?<c>\d)/);
        let lastR: number, lastC: number;

        const addLetterAtMousePos = (e: MouseEvent) => {
            if (!mouseDown) return;
            //console.clear();
            //console.log(document.elementFromPoint(e.clientX, e.clientY));
            const letterTile = document.elementFromPoint(e.clientX, e.clientY).parentElement;
            const letterTileClasses = letterTile.classList;
            if (letterTileClasses[0] === "letter-tile") {
                const groups = letterTileClasses[1].match(re).groups;
                const r: number = parseInt(groups.r);
                const c: number = parseInt(groups.c);

                if (letterPositions.size > 0 &&
                    ((Math.abs(lastR - r) > 1 || Math.abs(lastC - c) > 1) || (lastR === r && lastC === c))) return;

                const numPrevLetters = letterPositions.size;
                letterPositions.add(r * 10 + c);
                if (letterPositions.size === numPrevLetters) return; // if it was a duplicate letter, no new letters added
                lastR = r;
                lastC = c;
                this.selectLetter(r, c);
                console.log(`Added letter ${r} ${c} with last letter ${lastR} ${lastC}`);
            }
        }

        function onMouseDown(e: MouseEvent) {
            mouseDown = true;
            addLetterAtMousePos(e);
        }


        const onMouseUp = (e: MouseEvent) => {
            addLetterAtMousePos(e);
            mouseDown = false;
            if (letterPositions.size == 0) return;
            this.selectWord(Array.from(letterPositions).map(pos => [Math.floor(pos / 10), pos % 10]));
            letterPositions.clear();
            this.clearLetterSelection();
            lastR = undefined;
            lastC = undefined;
        }

        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("touchstart", onMouseDown);
        document.addEventListener("touchcancel", onMouseUp);
        document.addEventListener("mousemove", addLetterAtMousePos);
        document.addEventListener("touchmove", addLetterAtMousePos);
    }

    private clearLetterSelection() {
        // TODO Clear lines that show selection
        document.dispatchEvent(new CustomEvent("letterSelectionCleared"));
    }

    private selectLetter(r: number, c: number) {
        // TODO Draw lines to show selection
        document.dispatchEvent(new CustomEvent("letterSelectionAdded", {
            detail: {
                position: [r, c],
                r: r,
                c: c,
            }
        }))
    }

    private selectWord(letterPositions: Array<Array<number>>) {
>>>>>>> b3459c3cdc2f77cabfea8d3221b3a2ca66aea10b

    private getCurrentWord(selectedletterPositionMatrix: Array<Array<number>>): string {
        const word: string = selectedletterPositionMatrix.map(coords => {
            const [r, c] = coords;
            return this.div.querySelector(`.position-${r}-${c}`).innerHTML;
        }).join("");

        return word;
    }

    // TODO: Change out the object passed in the CustomEvent to be a user-defined type shared between server/client
    private playWord(selectedletterPositionMatrix: Array<Array<number>>): void {
        const word: string = this.getCurrentWord(selectedletterPositionMatrix);

        console.log(`Selected word ${word}`);
        document.dispatchEvent(new CustomEvent("wordSelected", {
            detail: {
                word: word,
                positions: selectedletterPositionMatrix,
            }
        }));
        
    }
}
