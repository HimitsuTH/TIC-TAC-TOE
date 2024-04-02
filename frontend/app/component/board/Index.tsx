"use client";
import { useState, useEffect } from "react";
import { calculateWinner } from "../../libs/untils";

const Board = (props: any) => {
  const { size, player_1: p1, player_2: p2, useBot, setShowBoard } = props;
  let player_1 = p1;
  let player_2 = p2 || "Bot";
  let bot = useBot;

  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [messageWin, setMessageWin] = useState("");

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board, size)?.winner) {
      return;
    }

    const newBoard = board;

    if (bot) {
      newBoard[index] = "X";
      setBoard(newBoard);

      const botMove = newBoard
        .map((item, i) => {
          return {
            item,
            index: i,
          };
        })
        .filter((box) => box.item === null);

      if (botMove.length > 0 && !calculateWinner(newBoard, size)?.winner) {
        let randomBox =
          botMove[Math.floor(Math.random() * botMove.length)].index;
        newBoard[randomBox] = "O";
        setBoard(newBoard);
      }

      console.log({ botMove });
    } else {
      newBoard[index] = xIsNext ? "X" : "O";
    }

    if (newBoard.every((box) => box !== null)) {
      setMessageWin("The game is tied.");
      return;
    }

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

  const handleResetGame = () => {
    setBoard(Array(size * size).fill(null));
    setMessageWin("");
  };

  const handleBackToHome = () => {
    handleResetGame();
    setShowBoard(false);
  };

  //Check if there is a winner yet.
  const winnerData = calculateWinner(board, size)?.winner;

  useEffect(() => {
    winnerData == "X"
      ? setMessageWin(`Player ${player_1} Win`)
      : winnerData !== undefined
      ? setMessageWin(`Player ${player_2} Win`)
      : setMessageWin("");
  }, [winnerData]);

  return (
    <div className="container flex flex-col justify-center items-center">
      {messageWin && <h1 className=" absolute top-6 text-xl">{messageWin}</h1>}
      <div className=" mb-2 absolute top-6 left-2 ">
        <h1 className=" bg-gray-200 p-2 rounded-md select-none mb-2">
          Player 1 [X] : {player_1}
        </h1>
        <h1 className=" bg-gray-200 p-2 rounded-md select-none">
          Player 2 [O] : {player_2}
        </h1>
      </div>
      <div className="board">
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
      <div className="flex gap-2">
        <button
          className=" border-2 p-1 rounded-md hover:bg-gray-500 hover:text-white transition-all"
          onClick={() => handleResetGame()}
        >
          Reset
        </button>
        <button
          className=" border-2 p-1 rounded-md hover:bg-gray-500 hover:text-white transition-all"
          onClick={() => handleBackToHome()}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Board;
