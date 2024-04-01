"use client";
import { useState } from "react";

function calculateWinner(squares: any, boardSize: number) {
  const lines: any = [];

  // Generate winning combinations for rows
  //   for (let row = 0; row < boardSize; row++) {
  //     const line: any = [];
  //     for (let col = 0, i = row; col < boardSize; col++) {
  //       line.push(row * boardSize + col);
  //     }
  //     lines.push(line);
  //   }

  // Generate winning combinations for columns
  //   for (let col = 0; col < boardSize; col++) {
  //     const line: any = [];
  //     for (let row = 0; row < boardSize; row++) {
  //       line.push(row * boardSize + col);
  //     }
  //     lines.push(line);
  //   }

  //   console.log("columns", lines);

  // Generate winning combinations for diagonals (top-left to bottom-right)


    for (let row = 0; row <= boardSize - boardSize; row++) {
      const line: any = [];
      for (let col = 0, i = 0; col < boardSize; col++) {
        line.push((row + i) * boardSize + col);
        i++
      }
      lines.push(line);
    }
    console.log("top-left to bottom-right", lines);

  // Generate winning combinations for diagonals (bottom-left to top-right)

  for (let row = boardSize - 1; row < boardSize; row++) {
    const line: any = [];
    for (let col = 0, i = 0; col < boardSize; col++) {
      line.push((row - i) * boardSize + col);
      i++
    }
    lines.push(line);
  }
    console.log("bottom-left to top-right", lines);

  // Check for a winner in each line
  // for (const line of lines) {
  //   const [a, b, c] = line.sort((a, b) => a - b);
  //   if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
  //     return {
  //       winner: squares[a],
  //       lineWin: `${a} : ${b} : ${c}`,
  //       lineIndex: [a, b, c],
  //     };
  //   }
  // }

  return null;
}

const Board = (props: any) => {
  const { size, player_1: p1, player_2: p2 } = props;
  let player_1 = p1;
  let player_2 = p2;

  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index: number) => {
    console.log(index);
    if (board[index] || calculateWinner(board, size)) {
      return;
    }
    const newBoard = board;
    newBoard[index] = xIsNext ? "X" : "O";

    setBoard(newBoard);
    setXIsNext((prev) => !prev);
  };

  const renderSquare = (index: number) => (
    <button
      className={` border-2 cursor-pointer w-10 h-10 ${
        board[index] == "X" ? "X" : board[index] == "O" ? "O" : ""
      }`}
      onClick={() => handleClick(index)}
      key={index}
    >
      {board[index] ? board[index] : ""}
    </button>
  );

  return (
    <div className="board">
      <div className=" mb-2">
        <h1>Player 1 : {player_1}</h1>
        <h1>Player 2 : {player_2}</h1>
      </div>
      {Array(size)
        .fill(null)
        .map((_, row) => (
          <div className="row flex flex-row gap-3 mb-3" key={row}>
            {Array(size)
              .fill(null)
              .map((_, col) => renderSquare(row * size + col))}
          </div>
        ))}
    </div>
  );
};

export default Board;
