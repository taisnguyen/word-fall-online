export interface HtmlManagerInterface {

}

export class HtmlManager implements HtmlManagerInterface {
    private gameBoardHTML: HTMLElement;

    constructor(gameBoardHTML: HTMLElement) {
        this.gameBoardHTML = gameBoardHTML;
    }

    public clearGameBoard(): void {

    }

    private addLetterTile(letter: string): void {
        
    }

}