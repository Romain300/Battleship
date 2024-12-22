import { Player } from "./class.js";
import { setupGameboard } from "./display.js";
import { shuffle } from "./display.js";
import { checkName } from "./display.js";
import { boatHealthInfo } from "./display.js";

export async function newGame(player1, player2, mode) {
    const player01 = new Player(player1);
    const player02 = new Player(player2, mode);
    

    setupGameboard(player01, "gameboard-player01");
    setupGameboard(player02, "gameboard-player02");

    if (mode === true) visibleBoard(player01);

    let currentAttacker = player01;
    let currentReceiver = player02;

    const turnAttacker= () => {
        currentAttacker  === player01 ? currentAttacker  = player02 : currentAttacker  = player01;
    };

    const turnReceiver= () => {
        currentReceiver === player01 ? currentReceiver = player02 : currentReceiver = player01;
    };

    let player01Win = player02.board.endGame();
    let player02Win = player01.board.endGame();

    while (player01Win === false && player02Win === false) {

        if (mode === false) {

            setTimeout(() => {
                passDevice(currentAttacker, currentReceiver);
            }, 1000)

        };

        await attack(currentAttacker, currentReceiver);

        player01Win = player02.board.endGame();
        player02Win = player01.board.endGame();

        turnAttacker();
        turnReceiver();
    };

    if (player01Win === true) return `${player01.name} win!`;
    if (player02Win === true) return `${player02.name} win!`;

    
}

function passDevice(attacker, receiver) {
    visibleBoard(attacker);
    invisibleBoard(receiver);
}

function visibleBoard(player) {

    const cells = document.querySelectorAll(`.${player.name}`);
    const board = player.board.board;

    cells.forEach((cell) => {

        const i = cell.dataset.firstCoor;
        const j = cell.dataset.secondCoor;
 
        if (board[i][j].value && !board[i][j].hit) cell.style.backgroundColor = "green";  
    });

};

function invisibleBoard(player) {

    const cells = document.querySelectorAll(`.${player.name}`);
    const board = player.board.board;

    cells.forEach((cell) => {

        const i = cell.dataset.firstCoor;
        const j = cell.dataset.secondCoor;
 
        if (board[i][j].value && !board[i][j].hit) cell.style.backgroundColor = "inherit";  
    });

}

function attack(attacker, receiver) {

    return new Promise((resolve) => {

        const cells = document.querySelectorAll(`.${receiver.name}`);

        function handleClick(event) {

            const cell = event.target;

            const i = cell.dataset.firstCoor;
            const j = cell.dataset.secondCoor;

            const newAttack = receiver.board.receiveAttack(i,j);
            
            // chehcking if we already played here
            if(newAttack === true) {

                if (receiver.board.board[i][j].miss) cell.style.backgroundColor = "orange";
                
                if (receiver.board.board[i][j].hit) {

                    const shipName = receiver.board.board[i][j].value.name;
                    boatHealthInfo(receiver, shipName);
                
                    cell.style.backgroundColor = "red";
                }

                cells.forEach((cell) => {
                    cell.removeEventListener("click", handleClick);
                });

                resolve();

            };
    
        }; 
        
        if (attacker.auto === false) {

            cells.forEach((cell) => {
                cell.addEventListener("click", handleClick);
            });

        };

        if (attacker.auto === true) {

            automaticPlay(receiver);
            resolve();

        };
        
    });

};

function automaticPlay(receiver) {

    let i = Math.floor(Math.random() * 10);
    let j = Math.floor(Math.random() * 10);

    let newAttack = receiver.board.receiveAttack(i,j);

    while (newAttack === "you already attacked here") {

        i = Math.floor(Math.random() * 10);
        j = Math.floor(Math.random() * 10);

        newAttack = receiver.board.receiveAttack(i,j)
    };

    if(newAttack === true) {

        setTimeout(() => {

            const query = `.${receiver.name}[data-first-coor='${i}'][data-second-coor='${j}']`;
            const cell = document.querySelector(query);

            if (receiver.board.board[i][j].miss) cell.style.backgroundColor = "orange";
            if (receiver.board.board[i][j].hit) {

                const shipName = receiver.board.board[i][j].value.name;
                boatHealthInfo(receiver, shipName);
            
                cell.style.backgroundColor = "red";
            }

        }, 300)

    };

};


export function onePlayerMode() {
    const form = document.querySelector("#form-name-1-player");
    const input = document.querySelector("#name");
    const infoTab = document.querySelector(".information-tab");
    const playerDiv = document.querySelector("#players-div");
    const winnerDiv = document.querySelector("#winner-div");

    form.addEventListener("submit", (event) => {

        const name = input.value;
        if (!checkName(name)) return alert("Name can't be null!");
        if (name === "Computer") return alert("You name must be different from Computer");

        let game = newGame(name, "Computer", true);

        shuffle(name, "Computer", true);

        form.style.display = "none";
        infoTab.style.display = "flex";
        playerDiv.textContent = `${name} vs Computer`;

        game.then((value) => {
            winnerDiv.textContent = `${value}`;
        });
        

        event.preventDefault();
        
    });

};

export function twoPlayersMode() {
    const form = document.querySelector("#form-name-2-players");
    const input1 = document.querySelector("#name-player-1");
    const input2 = document.querySelector("#name-player-2");
    const infoTab = document.querySelector(".information-tab");
    const playerDiv = document.querySelector("#players-div");
    const winnerDiv = document.querySelector("#winner-div");

    form.addEventListener("submit", (event) => {

        const namePlayer1 = input1.value;
        const namePlayer2 = input2.value;

        if (!checkName(namePlayer1)) return alert("Name can't be null!");
        if (!checkName(namePlayer2)) return alert("Name can't be null!");

        if(namePlayer1 === namePlayer2) return alert("player1's name and player2's name must be different");

        let game = newGame(namePlayer1, namePlayer2, false);

        shuffle(namePlayer1, namePlayer2, false);

        form.style.display = "none";
        infoTab.style.display = "flex";
        playerDiv.textContent = `${namePlayer1} vs ${namePlayer2}`;

        game.then((value) => {
            winnerDiv.textContent = `${value}`;
        });

        event.preventDefault();
        
    });

};




