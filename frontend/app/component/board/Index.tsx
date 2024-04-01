"use client";
import { useState, useEffect } from "react";

function calculateWinner(squares: any, boardSize: number) {
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
  for (const line of lines) {
    if (
      line.every(
        (index: any) => squares[index] === squares[line[0]] && squares[index]
      )
    ) {
      return {
        winner: squares[line[0]],
        lineWin: line.join(" : "),
        lineIndex: line,
      };
    }
  }

  return null;
}

const Board = (props: any) => {
  const { size, player_1: p1, player_2: p2 } = props;
  let player_1 = p1;
  let player_2 = p2;

  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerWin, setPlayerWin] = useState("");

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board, size)?.winner) {
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

  //Check if there is a winner yet. 
  const winnerData = calculateWinner(board, size)?.winner;

  useEffect(() => {
    winnerData == "X"
      ? setPlayerWin(player_1)
      : winnerData !== undefined
      ? setPlayerWin(player_2)
      : setPlayerWin("");
  }, [winnerData]);

  return (
    <div className="board">
      {playerWin && <h1>{playerWin}</h1>}
      <div className=" mb-2">
        <h1>Player 1 [X] : {player_1}</h1>
        <h1>Player 2 [O] : {player_2}</h1>
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
