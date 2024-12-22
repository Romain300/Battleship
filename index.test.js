import { Ship } from "./src/class.js";
import { Gameboard } from "./src/class.js";

test ("Ship method hit", () => {
    const ship = new Ship(1);
    ship.hit();
    expect(ship.nbHits).toBe(1);
});

test ("ship method isSunk", () => {
    const ship = new Ship(1);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

test ("gameboard ships placement", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    expect(gameboard.placeShips([0,11], "vertical", ship)).toBe(false);
    expect(gameboard.placeShips([0,10], "vertical", ship)).toBe(false);
    expect(gameboard.placeShips([0,0], "vertical", ship)).toBe(true);
    expect(gameboard.placeShips([1,0], "vertical", ship)).toBe("This cell is already taken");
});

test ("receiveAttack from gameboard", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    expect(gameboard.receiveAttack(1,2)).toBe(true);
    expect (gameboard.board[1][2].miss).toBe(true);
    gameboard.placeShips([1,3], "horizontal", ship);
    gameboard.receiveAttack(1,3);
    expect(gameboard.board[1][3].value).toBe(ship);
    expect(gameboard.board[1][3].hit).toBe(true);
    expect(gameboard.receiveAttack(1,3)).toBe("you already attacked here");
});

test ("place ships auto", () => {
    const gameboard = new Gameboard;
    expect(gameboard.placeShipsAuto()).toBe(true);
})


