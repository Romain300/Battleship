export class Ship {
    constructor(length, name) {

        this.length = length;
        this.nbHits = 0;
        this.sunk = false;
        this.name = name;

    };

    hit() {
        this.nbHits++;
        if (this.nbHits === this.length) this.sunk = true;
    };

    isSunk() {
        return this.sunk;
    };
};

class Cell {
    constructor() {
        this.miss = false;
        this.hit = false;
        this.value = null;
    };
}

export class Gameboard {

    constructor() {
        this.size = 10; 
        this.missedAttacks = []; 
        this.board = [];
        this.ships = [
            new Ship(5, "Carrier"),
            new Ship(4, "Battleship"),
            new Ship(3, "Cruiser"),
            new Ship(3, "Submarine"),
            new Ship(2, 'Destroyer')
        ];

        for (let i = 0; i < this.size; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.size; j++) {
                this.board[i].push(new Cell);
            };
        };

    };

    placeShips([i,j], direction, ship) {

        const directions = ["vertical", "horizontal"];
       
        if (!directions.includes(direction)) return "Choose a correct direction";

        if (this.checkLimitsShip([i,j], ship, "vertical") && direction === "vertical") {
            for (let k = 0; k < ship.length; k++ ) {
                if (this.board[i + k][j].value !== null) return "This cell is already taken";
            };
            for (let k = 0; k < ship.length; k++ ) {
                this.board[i + k][j].value = ship
                
            };
            return true;
        }

        if (this.checkLimitsShip([i,j], ship, "horizontal") && direction === "horizontal") {
            for (let k = 0; k < ship.length; k++ ) {
                if (this.board[i][j + k].value !== null) return "This cell is already taken";
            };
            for (let k = 0; k < ship.length; k++ ) {
                this.board[i][j + k].value = ship
                
            };
            return true;
        }


        return false;
    };

    placeShipsAuto() {
        const directions = ["vertical", "horizontal"];
        
        for (let ship of this.ships) {
            const randomDirection = Math.floor(Math.random() * 2);
            const direction = directions[randomDirection];

            let i = Math.floor(Math.random() * 10);
            let j = Math.floor(Math.random() * 10);
            
           let placement = this.placeShips([i,j], direction, ship);

            while (placement !== true) {
                i = Math.floor(Math.random() * 10);
                j = Math.floor(Math.random() * 10);
                placement = this.placeShips([i,j], direction, ship);
            };

        };

        return true;
    };


    receiveAttack(i,j) { 
        if (this.board[i][j].miss === true || this.board[i][j].hit === true) return "you already attacked here";
        if (!this.board[i][j].value) this.board[i][j].miss = true;

        if (this.board[i][j].value) {
            this.board[i][j].hit = true;
            this.board[i][j].value.hit(); // for the boat
        };

        return true;

    }


    
    checkLimitsShip([i,j], ship, direction) {
        const lengthShip = ship.length;

        if (i < 0 || i > this.size - 1|| j < 0 || j > this.size - 1) return false;

        if (direction === "vertical") {

            for (let k = 0; k < lengthShip; k++) {

                if (i + k < 0 || i + k > this.size - 1|| j < 0 || j > this.size - 1) return false;

            };

        };

        if (direction === "horizontal") {

            for (let k = 0; k < lengthShip; k++) {

                if (i  < 0 || i  > this.size - 1|| j + k < 0 || j + k > this.size - 1) return false;
            }

        };

        return true;
    };

    endGame() {
        for (let ship of this.ships) {
            if (!ship.sunk) return false; 
        };

        return true;
    }

    
};

export class Player {
    constructor(name, auto = false) {
        this.name = name;
        this.board = new Gameboard();
        this.auto = auto;
    };
};

