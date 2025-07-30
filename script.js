const board = document.getElementById('board');
const status = document.getElementById('status');

let cells = [];
let currentPlayer = 'X'; // User is X, computer is O
let gameActive = true;

function initializeBoard() {
  board.innerHTML = '';
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handlePlayerMove);
    board.appendChild(cell);
    cells.push('');
  }
}

function handlePlayerMove(e) {
  const index = e.target.dataset.index;

  if (!gameActive || cells[index] !== '') return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    status.textContent = 'You Win!';
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell !== '')) {
    status.textContent = 'Draw!';
    gameActive = false;
    return;
  }

  currentPlayer = 'O';
  status.textContent = "Computer's Turn (O)";
  setTimeout(computerMove, 500);
}

function computerMove() {
  if (!gameActive) return;

  let emptyIndices = cells
    .map((val, idx) => (val === '' ? idx : null))
    .filter(idx => idx !== null);

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  cells[randomIndex] = 'O';
  const cell = document.querySelector(`[data-index='${randomIndex}']`);
  cell.textContent = 'O';

  if (checkWin('O')) {
    status.textContent = 'Computer Wins!';
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell !== '')) {
    status.textContent = 'Draw!';
    gameActive = false;
    return;
  }

  currentPlayer = 'X';
  status.textContent = 'Your Turn (X)';
}

function checkWin(player) {
  const winConditions = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];
  return winConditions.some(combination =>
    combination.every(index => cells[index] === player)
  );
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = 'Your Turn (X)';
  initializeBoard();
}

initializeBoard();
