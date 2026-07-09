let state = null;
let selected = null;

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');

function initGame() {
  state = ChessEngine.initialState();
  selected = null;
  render();
}

function render() {
  boardEl.innerHTML = '';
  for (let rank = 7; rank >= 0; rank--) {
    for (let file = 0; file < 8; file++) {
      const index = ChessEngine.sq(file, rank);
      const square = document.createElement('div');
      square.className = `square ${(file + rank) % 2 === 0 ? 'light' : 'dark'}`;
      square.dataset.index = index;

      const piece = state.board[index];
      if (piece) {
        square.innerHTML = `<span>${getSymbol(piece)}</span>`;
      }

      square.addEventListener('click', () => onSquareClick(index));
      boardEl.appendChild(square);
    }
  }
}

function getSymbol(piece) {
  const symbols = { 'K':'♔','Q':'♕','R':'♖','B':'♗','N':'♘','P':'♙' };
  return piece[0] === 'w' ? symbols[piece[1]] : symbols[piece[1]].toLowerCase();
}

function onSquareClick(index) {
  if (state.turn !== 'w') return;

  const piece = state.board[index];

  if (selected !== null) {
    // Essayer de jouer le coup
    const move = { from: selected, to: index };
    const newState = ChessEngine.applyMove(state, move);
    if (newState) {
      state = newState;
      render();
      setTimeout(aiPlay, 300);
      return;
    }
    selected = null;
  }

  if (piece && piece[0] === 'w') {
    selected = index;
  }

  render();
}

function aiPlay() {
  const move = ChessAI.chooseMove(state);
  if (move) {
    state = ChessEngine.applyMove(state, move);
    render();
  }
}

document.getElementById('newBtn').addEventListener('click', initGame);
document.getElementById('undoBtn').addEventListener('click', () => {
  // Simplifié pour l'instant
  initGame();
});

initGame();
