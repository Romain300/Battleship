import { newGame } from "./logic";

export function setUpPage() {
    const gameboardPlayer01 = document.querySelector("#gameboard-player01");
    const gameboardPlayer02 = document.querySelector("#gameboard-player02");

    for (let i = 0; i < 10; i ++) {

        for (let j = 0; j < 10; j++) {
            const cell01 =  document.createElement("div");
            cell01.classList.add("grid-item");
            gameboardPlayer01.appendChild(cell01)

            const cell02 =  document.createElement("div");
            cell02.classList.add("grid-item");
            gameboardPlayer02.appendChild(cell02)
            
        };
    };
};

export function setupGameboard(player, gameBoardDiv) {

    const gameBoard = player.board;
    gameBoard.placeShipsAuto();

    const gameboardPlayer = document.querySelector(`#${gameBoardDiv}`);
    
    gameboardPlayer.textContent = "";

    for (let i = 0; i < gameBoard.size; i ++) {

        for (let j = 0; j < gameBoard.size; j ++) {

            const newCell =  document.createElement("div");
            newCell.classList.add("grid-item", `${player.name}`);
            newCell.dataset.firstCoor = i; //store coordinate better to store x and y seperatly ?
            newCell.dataset.secondCoor = j;
            gameboardPlayer.appendChild(newCell)

        };

    };

    boatInformations(player);

};

export function gameMode() {

    const onePlayerForm = document.querySelector("#one-player");
    const twoPlayerForm = document.querySelector("#two-players");
    const playerModeForm = document.querySelector(".player-modes");
    const onePlayerFormName = document.querySelector("#form-name-1-player");
    const twoPlayerFormName = document.querySelector("#form-name-2-players");


    onePlayerForm.addEventListener("submit", (event) => {

        playerModeForm.style.display = "none";
        onePlayerFormName.style.display = "flex";

        event.preventDefault();
        
    });

    twoPlayerForm.addEventListener("submit", (event) => {

        playerModeForm.style.display = "none";
        twoPlayerFormName.style.display = "flex";

        event.preventDefault();
        
    });

};
 
 
 
 
export function shuffle(namePlayer1, namePlayer2, auto) {

    const shuffleButton = document.querySelector("#shuffle");
    const winnerDiv = document.querySelector("#winner-div");
    const shipTab =  document.querySelector("#ships-tab");

    shuffleButton.addEventListener("click", () => {

        shipTab.textContent = "";
        const game = newGame(namePlayer1, namePlayer2, auto);

        winnerDiv.textContent = "";

        game.then((value) => {
            winnerDiv.textContent = `${value}`;
        });

    });
    
};
 
export function checkName(name) {

    if (name.trim() === "") return false;
    return true;

};
 
export function menu() {
    const menuButtons = document.querySelectorAll(".menu");
    const modeButton = document.querySelector(".player-modes");
    const formPlayer1 = document.querySelector("#form-name-1-player");
    const formPlayer2 = document.querySelector("#form-name-2-players");
    const gameboardPlayer01 = document.querySelector("#gameboard-player01");
    const gameboardPlayer02 = document.querySelector("#gameboard-player02");
    const infoDiv = document.querySelector(".information-tab");
    const winnerDiv = document.querySelector("#winner-div");
    const shipTab =  document.querySelector("#ships-tab");

    menuButtons.forEach((button) => {

        button.addEventListener("click", () => {

            modeButton.style.display = "flex";
            infoDiv.style.display = "none";
            formPlayer1.style.display = "none";
            formPlayer2.style.display = "none";
            gameboardPlayer01.textContent = "";
            gameboardPlayer02.textContent = "";
            winnerDiv.textContent = "";
            shipTab.textContent = "";
            

            setUpPage();
            
        });

    });

};

function boatInformations(player) {
    const shipTab =  document.querySelector("#ships-tab");

    const shipsInfoDiv = document.createElement("div");
    shipsInfoDiv.classList.add("ships-information");
    shipsInfoDiv.classList.add(`${player.name}-ships`);

    shipTab.appendChild(shipsInfoDiv);

    for (let ship of player.board.ships) {

        const shipDiv = document.createElement("div");
        shipDiv.classList.add("ship");
        shipDiv.classList.add(`${player.name}-${ship.name}`);
        shipsInfoDiv.appendChild(shipDiv);

        for (let i = 0; i < ship.length; i++) {

            const healthCell = document.createElement("div");
            healthCell.classList.add("grid-item");
            shipDiv.appendChild(healthCell);

        };

    };

};


export function boatHealthInfo(player, shipName) {

    const shipInfo = document.querySelector(`.${player.name}-${shipName}`);
    for (let cellShip of shipInfo.childNodes) {
                        
        if (cellShip.style.backgroundColor !== "red") {
            cellShip.style.backgroundColor = "red";
            break;
        }

    };

};