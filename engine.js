const ChessEngine = {
  sq: (file, rank) => rank * 8 + file,
  fileOf: i => i % 8,
  rankOf: i => Math.floor(i / 8),

  initialState() {
    return {
      board: [
        "bR","bN","bB","bQ","bK","bB","bN","bR",
        "bP","bP","bP","bP","bP","bP","bP","bP",
        null,null,null,null,null,null,null,null,
        null,null,null,null,null,null,null,null,
        null,null,null,null,null,null,null,null,
        null,null,null,null,null,null,null,null,
        "wP","wP","wP","wP","wP","wP","wP","wP",
        "wR","wN","wB","wQ","wK","wB","wN","wR"
      ],
      turn: "w"
    };
  },

  colorOf(p) { return p ? p[0] : null; },
  typeOf(p) { return p ? p[1] : null; },

  applyMove(state, move) {
    const newBoard = [...state.board];
    newBoard[move.to] = newBoard[move.from];
    newBoard[move.from] = null;

    return {
      board: newBoard,
      turn: state.turn === "w" ? "b" : "w"
    };
  },

  generateLegalMoves(state) {
    const moves = [];
    for (let i = 0; i < 64; i++) {
      const piece = state.board[i];
      if (piece && this.colorOf(piece) === state.turn) {
        moves.push({ from: i, to: i + 8 }); // Exemple simplifié - à améliorer
      }
    }
    return moves;
  }
};

window.ChessEngine = ChessEngine;
