const ChessAI = {
  chooseMove(state) {
    const moves = ChessEngine.generateLegalMoves(state);
    if (moves.length === 0) return null;

    // Choisit un coup aléatoire parmi les légaux
    return moves[Math.floor(Math.random() * moves.length)];
  }
};

window.ChessAI = ChessAI;
