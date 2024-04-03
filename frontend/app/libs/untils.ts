export const calculateWinner = (squares: any, boardSize: number) => {
  const lines: any = [];

  // Generate winning combinations for rows
  for (let row = 0; row < boardSize; row++) {
    const line: any = [];
    for (let col = 0, i = row; col < boardSize; col++) {
      line.push(row * boardSize + col);
    }
    lines.push(line);
  }

  // Generate winning combinations for columns
  for (let col = 0; col < boardSize; col++) {
    const line: any = [];
    for (let row = 0; row < boardSize; row++) {
      line.push(row * boardSize + col);
    }
    lines.push(line);
  }

  // console.log("columns", lines);

  // Generate winning combinations for diagonals (top-left to bottom-right)

  for (let row = 0; row <= boardSize - boardSize; row++) {
    const line: any = [];
    for (let col = 0, i = 0; col < boardSize; col++) {
      line.push((row + i) * boardSize + col);
      i++;
    }
    lines.push(line);
  }
  // console.log("top-left to bottom-right", lines);

  // Generate winning combinations for diagonals (bottom-left to top-right)

  for (let row = boardSize - 1; row < boardSize; row++) {
    const line: any = [];
    for (let col = 0, i = 0; col < boardSize; col++) {
      line.push((row - i) * boardSize + col);
      i++;
    }
    lines.push(line);
  }
  // console.log("bottom-left to top-right", lines);

  // Check for a winner in each line
  let gameWon;
  for (const line of lines) {
    if (
      line.every(
        (index: any) => squares[index] === squares[line[0]] && squares[index]
      )
    ) {
      gameWon = {
        winner: squares[line[0]],
        line,
      };
      break;
    }
  }

  return gameWon;
};
