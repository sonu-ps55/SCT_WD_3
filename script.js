const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X"; // Player always starts first
let board = ["", "", "", "", "", "", "", "", ""];
let running = true;

cells.forEach(cell => cell.addEventListener("click", playerMove));
resetBtn.addEventListener("click", resetGame);

function playerMove() {
  const index = this.getAttribute("data-index");

  if (board[index] !== "" || !running || currentPlayer !== "X") return;

  board[index] = currentPlayer;
  this.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    running = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a Draw! 🤝";
    running = false;
    return;
  }

  currentPlayer = "O";
  statusText.textContent = "Computer's turn...";
  setTimeout(computerMove, 500); // Small delay for realism
}

function computerMove() {
  let available = board.map((val, idx) => val === "" ? idx : null).filter(v => v !== null);
  let move = available[Math.floor(Math.random() * available.length)];

  board[move] = currentPlayer;
  cells[move].textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `💻 Computer Wins!`;
    running = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a Draw! 🤝";
    running = false;
    return;
  }

  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern => {
    return pattern.every(index => board[index] === currentPlayer);
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => cell.textContent = "");
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  running = true;
}
