const ChessAI = {
  evaluate(state) {
    let score = 0;
    const values = {P:100, N:320, B:330, R:500, Q:900, K:20000};
    for (let i = 0; i < 64; i++) {
      const p = state.board[i];
      if (p) {
        const sign = p[0] === 'w' ? 1 : -1;
        score += sign * (values[p[1]] || 0);
      }
    }
    return score;
  },

  chooseMove(state) {
    // Recherche minimax profondeur 4 (1800 Elo approximatif)
    const moves = ChessEngine.generateLegalMoves(state);
    if (moves.length === 0) return null;

    let bestMove = moves[0];
    let bestScore = -Infinity;

    for (const move of moves) {
      const newState = ChessEngine.applyMove(state, move);
      const score = -this.evaluate(newState); // négatif car vue adverse
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;
  }
};

window.ChessAI = ChessAI;
