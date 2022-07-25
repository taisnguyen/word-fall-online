import { randNum } from "./utility/random";
import "./styles/homepage.scss";

(() => {

    function menuBoardFallingAnimation() {
        let fallTime: number = 2.6;
        document.querySelectorAll(".letter-tile").forEach((letterTile: HTMLElement) => {
            letterTile.style.transform = "translateY(-" + window.innerHeight*Math.max(window.devicePixelRatio, 1) + "px)";")";
            letterTile.style.pointerEvents = "none";

            setTimeout(() => { 
                fallTime -= 0.24 * (fallTime/5);
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

    
    window.onload = () => {
        menuBoardFallingAnimation();
    }


})();