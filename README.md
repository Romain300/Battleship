# Battleship Game in JavaScript

## Overview

This is a simple **Battleship game** built using **JavaScript**, **HTML**, and **CSS**. The game allows players to play in **one-player mode** (against the computer) or **two-player mode** (local multiplayer). Players take turns attacking each other's ships, and the first player to sink all of the opponent's ships wins the game.

Key features:
- **One-player mode**: Play against the computer.
- **Two-player mode**: Play with a friend locally.
- **Automatic gameplay**: Computer opponent can play automatically.
- **Ship health tracking**: Real-time visual feedback of ship hits and misses.
- **Dynamic UI**: Ships are placed randomly, and the game board is updated after each attack.

## Demo

You can try the game by cloning the repository and opening the `index.html` file in a browser. The game can be played directly in the browser without any additional setup.

## Technologies Used

- **JavaScript**: For game logic and interactivity.
- **HTML5**: For page structure.
- **CSS3**: For styling and layout.
- **DOM Manipulation**: For dynamic interaction and updating the game board.

### `index.html`

This is the main HTML file that sets up the structure of the Battleship game. It contains:

- A title section with the game name.
- Player selection forms for **one-player** and **two-player** modes.
- Dynamic forms for entering player names.
- The game board where ships are placed and players make attacks.
- Information on game status, including the current player and winner.

### `index.js`

The entry point of the game. This file:
- Initializes the game interface.
- Sets up player modes (one-player or two-player).
- Initializes the game logic by calling the `gameMode()` function.
- Handles user interactions and controls.

### `logic.js`

Contains the core game logic, including:
- Functions for starting a new game (`newGame`).
- Alternating turns between players.
- Handling attacks, including checking for hits and misses.
- Automatically playing for the computer in one-player mode.
- Checking for win conditions and handling the end of the game.

### `display.js`

Responsible for rendering the game interface, such as:
- Setting up the game boards for players.
- Displaying ship health status.
- Updating the UI based on user interactions, such as attacks and wins.
- Handling menus for switching game modes and restarting the game.

### `class.js`

Defines the core classes for the game:
- **Ship**: Represents each ship, tracking its size, health, and if it has been sunk.
- **Cell**: Represents a single cell on the board, which can be hit, missed, or contain a ship.
- **Gameboard**: Manages the game grid, placing ships, receiving attacks, and checking for win conditions.
- **Player**: Represents a player (human or computer), including their gameboard and settings for automatic play (in one-player mode).

### `styles.css`

The CSS file defines the layout and style of the game:
- A **grid layout** for the gameboard.
- **Forms** for player input (name and mode selection).
- **Buttons** and menus for interacting with the game.
- **Visual feedback** for ship health and attack results (hit/miss).


## How to Play

1. **Choose a Game Mode**:
   - Click **1 Player** to play against the computer.
   - Click **2 Players** to play locally with a friend.

2. **Enter Player Names**:
   - In **one-player mode**, you will only need to enter your name.
   - In **two-player mode**, both players need to enter their names.

3. **Place Ships**:
   - Ships are placed automatically in the background, so no manual placement is needed.

4. **Take Turns**:
   - Players will take turns attacking each other's ships by clicking on the cells in the gameboard.
   - Hits are marked in **red**, and misses are marked in **orange**.
   
5. **Win Condition**:
   - The first player to sink all of the opponent's ships wins the game.
   - The winner will be displayed on the screen after the game ends.

6. **Replay and Shuffle Positions**:
   - You can replay the game and shuffle positions by clicking the **Shuffle / Replay** button.

## Game Controls

- **Start New Game**: Choose **1 Player** or **2 Players** to start a new game.
- **Menu**: Returns to the game mode selection screen.
- **Replay**: Click **Shuffle / Replay** to start a new game after the current one ends.

## License

This project is open-source and available under the MIT License.

## Acknowledgements

- Inspired by the classic Battleship board game.
- The project was created by **Romain300** for The Odin Project.