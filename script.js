const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resultScreen = document.getElementById("resultScreen");
const resultMessage = document.getElementById("resultMessage");
const newGameButton = document.getElementById("newGame");
const scoreList = document.getElementById("scoreList");
const startGameButton = document.getElementById("startGame");
const nameInput = document.getElementById("nameInput");
const gameSection = document.getElementById("game");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;
let scores = [];
let playerXName = "Player X";
let playerOName = "Player O";

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    playerXName = document.getElementById("playerX").value || "Player X";
    playerOName = document.getElementById("playerO").value || "Player O";
    nameInput.classList.add("hidden");
    gameSection.classList.remove("hidden");
    resetGame();
    gameActive = true;
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute("data-index");

    if (gameState[index] !== "" || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    checkResult();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (gameActive) {
        statusDisplay.textContent = `${currentPlayer === "X" ? playerXName : playerOName}'s Turn`;
    }
}

function checkResult() {
    let roundWon = false;

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (
            gameState[a] !== "" &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        const winner = currentPlayer === "X" ? playerXName : playerOName;
        updateScores(winner);
        showResult(`${winner} Wins!`);
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        updateScores("Draw");
        showResult("It's a Draw!");
        gameActive = false;
        return;
    }
}

function updateScores(result) {
    scores.unshift(result);
    if (scores.length > 3) scores.pop();

    scoreList.innerHTML = scores
        .map((score, index) => `<li>Game ${index + 1}: ${score}</li>`)
        .join("");
}

function showResult(message) {
    gameSection.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    resultMessage.textContent = message;
}

function resetGame() {
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusDisplay.textContent = `${playerXName}'s Turn`;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
}

function newGame() {
    resultScreen.classList.add("hidden");
    gameSection.classList.remove("hidden");
    resetGame();
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
newGameButton.addEventListener("click", newGame);
startGameButton.addEventListener("click", startGame);
