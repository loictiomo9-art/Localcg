let state = ChessEngine.initialState();
let selected = null;
let moveHistory = [];

const boardEl = document.getElementById('board');

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
        square.innerHTML = `<span class="piece">${getPieceSymbol(piece)}</span>`;
      }

      square.addEventListener('click', () => handleSquareClick(index));
      boardEl.appendChild(square);
    }
  }
}

function getPieceSymbol(piece) {
  const symbols = {'K':'♔','Q':'♕','R':'♖','B':'♗','N':'♘','P':'♙'};
  return piece[0] === 'w' ? symbols[piece[1]] : symbols[piece[1]].toLowerCase().replace(/[a-z]/, c => String.fromCharCode(c.charCodeAt(0) + 0x6));
}

function handleSquareClick(index) {
  // Logique de sélection et coup
  render();
  // Appel IA après coup joueur
}

document.getElementById('newBtn').addEventListener('click', () => {
  state = ChessEngine.initialState();
  render();
});

render();
