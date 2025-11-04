//your JS code here. If required.
let currentPlayer = 'X';
let player1 = '';
let player2 = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

document.getElementById('submit').addEventListener('click', () => {
  player1 = document.getElementById('player-1').value.trim();
  player2 = document.getElementById('player-2').value.trim();

  if (player1 === '' || player2 === '') {
    alert('Please enter names for both players!');
    return;
  }

  // Hide input section, show game
  document.getElementById('input-section').classList.add('hidden');
  document.getElementById('game-section').classList.remove('hidden');

  startGame();
});

function startGame() {
  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = ''; // clear any old cells

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = i + 1; // IDs 1 to 9
    cell.addEventListener('click', () => makeMove(i, cell));
    boardDiv.appendChild(cell);
  }

  updateMessage(`${player1}, you're up`);
}

function makeMove(index, cell) {
  if (gameOver || board[index] !== '') return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    const winnerName = currentPlayer === 'X' ? player1 : player2;
    updateMessage(`${winnerName}, congratulations you won!`);
    gameOver = true;
    return;
  }

  if (board.every((b) => b !== '')) {
    updateMessage("It's a draw!");
    gameOver = true;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  const nextPlayer = currentPlayer === 'X' ? player1 : player2;
  updateMessage(`${nextPlayer}, you're up`);
}

function checkWinner() {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winCombos.some(
    (combo) =>
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[1]] === board[combo[2]]
  );
}

function updateMessage(msg) {
  document.querySelector('.message').textContent = msg;
}
