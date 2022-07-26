import { randNum } from "../utility/random";

export interface WordBoard {

}

export class SquareWordBoard implements WordBoard {
    public letters: Array<string>;
    private readonly size: number;
    private readonly div: HTMLElement;


    public constructor(letters: Array<string>, boardDiv: HTMLElement) {
        this.size = letters.length;
        this.div = boardDiv;
        this.letters = letters;
        this.setup();
    }

    private initialFallingAnimation() {
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

    private setup(): void {
        window.onload = this.initialFallingAnimation.bind(this);

        let mouseDown = false;
        const letterPositions: Set<number> = new Set();
        const re = new RegExp(/position-(?<r>\d)-(?<c>\d)/);

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
                let lastR: number, lastC: number;
                try {
                    let lastPos = Array.from(letterPositions)[letterPositions.size - 1]; // always undefined since it's a set

                    lastR = Math.floor(lastPos / 10);
                    lastC = lastPos % 10;
                    if (letterPositions.size > 0 &&
                        ((Math.abs(lastR - r) > 1 || Math.abs(lastC - c) > 1) || (lastR === r && lastC === c))) return;
                } catch (error) { // first letter in the sequence
                    // nothing.
                }

                letterPositions.add(r * 10 + c);
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
        }

        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
        document.addEventListener("touchstart", onMouseDown);
        document.addEventListener("touchcancel", onMouseUp);
        document.addEventListener("mousemove", addLetterAtMousePos);
        document.addEventListener("touchmove", addLetterAtMousePos);
    }

    private selectWord(letterPositions: Array<Array<number>>) {

        const word: string = letterPositions.map(coords => {
            const [r, c] = coords;
            return this.div.querySelector(`.position-${r}-${c} h1`).textContent;
        }).join("");

        console.log(`Selected word ${word}`);
        document.dispatchEvent(new CustomEvent("wordSelected", {
            detail: {
                word: word,
                positions: letterPositions,
            }
        }));
    }
}
