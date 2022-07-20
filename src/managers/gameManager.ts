import { HtmlManagerInterface } from "./htmlManager.js";
import { NetworkManagerInterface } from "./networkManager.js";

export interface GameManagerInterface {

}

export class GameManager implements GameManagerInterface {

    constructor(htmlManager: HtmlManagerInterface, networkManager: NetworkManagerInterface) {
    
    }
}