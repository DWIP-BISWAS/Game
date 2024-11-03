// script.js

const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const popup = document.getElementById('popup');
const message = document.getElementById('message');
const winningLine = document.getElementById('winning-line');
let currentPlayer = 'X';
let gameOver = false;
let boardState = Array(9).fill('');

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

function handleClick(e) {
  const index = e.target.dataset.index;
  if (gameOver || boardState[index]) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    showPopup(`${currentPlayer} Wins!`);
    displayWinningLine();
    gameOver = true;
  } else if (boardState.every(cell => cell)) {
    showPopup("It's a Draw!");
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      winningLine.dataset.winningCells = condition.join(',');
      return true;
    }
    return false;
  });
}

function showPopup(text) {
  message.textContent = text;
  popup.style.display = 'block';
}

function displayWinningLine() {
  const winningCells = winningLine.dataset.winningCells.split(',').map(Number);
  const firstCell = cells[winningCells[0]].getBoundingClientRect();
  const lastCell = cells[winningCells[2]].getBoundingClientRect();

  winningLine.style.top = `${(firstCell.top + lastCell.top) / 2}px`;
  winningLine.style.left = `${(firstCell.left + lastCell.left) / 2}px`;

  if (winningCells[1] - winningCells[0] === 1) {
    winningLine.style.transform = 'rotate(0deg)';
    winningLine.style.width = '300px';
  } else if (winningCells[1] - winningCells[0] === 3) {
    winningLine.style.transform = 'rotate(90deg)';
    winningLine.style.height = '300px';
  } else if (winningCells[0] === 0 || winningCells[0] === 2) {
    winningLine.style.transform = winningCells[0] === 0 ? 'rotate(45deg)' : 'rotate(-45deg)';
    winningLine.style.width = '424px';
  }
  winningLine.style.display = 'block';
}

function newGame() {
  boardState.fill('');
  cells.forEach(cell => (cell.textContent = ''));
  popup.style.display = 'none';
  winningLine.style.display = 'none';
  gameOver = false;
  currentPlayer = 'X';
}
