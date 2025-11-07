class Bot {
  constructor(name, linkedBike) {
    this.name = name;
    this.linkedBike = linkedBike;
    this.targetDir = [0, 0];
  }

  getMove(arena, game) {
    let legalMoves = arena.getLegalMoves(this.linkedBike.x, this.linkedBike.y);
    let safeMoves = [];
    let bestMoves = [];
    let randomMove = [];
    let currentMove = 0;

    let points = 0;
    let bestPoints = -1;

    let matrix = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9,
      9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 9, 8, 8, 8, 8, 8, 8, 8, 8,
      8, 8, 8, 8, 8, 8, 8, 8, 9, 0, 0, 9, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
      7, 7, 7, 9, 0, 0, 9, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 9, 0,
      0, 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9, 0, 0, 9, 4, 4, 4,
      4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9, 0, 0, 9, 3, 3, 3, 3, 3, 3, 3, 3,
      3, 3, 3, 3, 3, 3, 3, 3, 9, 0, 0, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 9, 0, 0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 0,
      0, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 0, 0, 9, 2, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 9, 0, 0, 9, 3, 3, 3, 3, 3, 3, 3, 3,
      3, 3, 3, 3, 3, 3, 3, 3, 9, 0, 0, 9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
      4, 4, 4, 9, 0, 0, 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 9, 0,
      0, 9, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 9, 0, 0, 9, 7, 7, 7,
      7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 9, 0, 0, 9, 8, 8, 8, 8, 8, 8, 8, 8,
      8, 8, 8, 8, 8, 8, 8, 8, 9, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
      9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    for (currentMove; currentMove < legalMoves.length; currentMove++) {
      if (legalMoves[currentMove].collision == false) {
        safeMoves.push(legalMoves[currentMove]);
      }
    }

    for (currentMove = 0; currentMove < safeMoves.length; currentMove++) {
      console.log(
        arena.getAvailableTilesNumber(
          safeMoves[currentMove].xMove,
          safeMoves[currentMove].yMove
        )
      );

      points =
        arena.getAvailableTilesNumber(
          safeMoves[currentMove].xMove,
          safeMoves[currentMove].yMove
        ) +
        matrix[
          safeMoves[currentMove].yMove * arena.gridSize +
            safeMoves[currentMove].xMove
        ];
      if (game.turn == 1) {
        console.log(
          safeMoves[currentMove].yMove * arena.gridSize +
            safeMoves[currentMove].xMove
        );
        console.log(
          matrix[
            safeMoves[currentMove].yMove * arena.gridSize +
              safeMoves[currentMove].xMove
          ]
        );
      }

      if (points > bestPoints) {
        bestPoints = points;
        bestMoves = [safeMoves[currentMove]];
      } else if (points == bestPoints) {
        bestMoves.push(safeMoves[currentMove]);
      }
    }

    if (bestMoves.length == 0) {
      randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    } else {
      randomMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    }

    return [randomMove.xMove, randomMove.yMove];
  }
}
