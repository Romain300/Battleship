import "./styles.css";
import { setUpPage } from "./display.js";
import { gameMode } from "./display.js";
import { onePlayerMode } from "./logic";
import { twoPlayersMode } from "./logic";
import { menu } from "./display.js";

(function() {

    setUpPage();
    gameMode();
    onePlayerMode();
    twoPlayersMode();
    menu();

})();

