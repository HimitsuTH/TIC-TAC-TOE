"use client";
import { useState, useEffect } from "react";
import { calculateWinner } from "../../libs/untils";
import HistoryBoard from "./History";

const Board = (props: any) => {
  const {
    size,
    player_1: p1,
    player_2: p2,
    useBot,
    setShowBoard,
    setInputSize,
  } = props;
  let player_1 = p1;
  let player_2 = p2 || "Bot";
  let bot = useBot;

  const [board, setBoard] = useState(Array(size * size).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [messageWin, setMessageWin] = useState("");
  const [history, setHistory] = useState<any[]>([]);

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board, size)?.winner) {
      return;
    }
    const newBoard = board;
    const col = Math.floor(index % size),
      row = Math.floor(index / size),
      //col and row where the latest click happened
      clickPosition = "( row: " + row + ", col: " + col + " )";

    if (bot) {
      newBoard[index] = "X";
      setHistory((history: any) => [
        ...history,
        {
          player: newBoard[index],
          move: index,
          position: clickPosition,
          boardHistory: newBoard,
        },
      ]);

      const botMove = newBoard
        .map((item, i) => {
          return {
            item,
            index: i,
          };
        })
        .filter((box) => box.item === null);

      // The bot checks the box.
      if (botMove.length > 0) {
        if (calculateWinner(newBoard, size)?.winner) {
          return;
        }
        let randomBox =
          botMove[Math.floor(Math.random() * botMove.length)].index;
        newBoard[randomBox] = "O";
        const col = Math.floor(randomBox % size),
          row = Math.floor(randomBox / size),
          //col and row where the latest click happened
          clickPosition = "( row: " + row + ", col: " + col + " )";

        setXIsNext(false);
        setHistory((history: any) => [
          ...history,
          {
            player: newBoard[randomBox],
            move: index,
            position: clickPosition,
            boardHistory: newBoard,
          },
        ]);
      }

      setTimeout(() => {
        setXIsNext(true);
      }, 200);
    } else {
      newBoard[index] = xIsNext ? "X" : "O";
      setXIsNext(!xIsNext);
      setHistory((history: any) => [
        ...history,
        {
          player: newBoard[index],
          move: index,
          boardHistory: newBoard,
        },
      ]);
    }

    if (newBoard.every((box) => box !== null)) {
      setMessageWin("The game is tied.");
      return;
    }
    setBoard(newBoard);
  };

  const renderSquare = (index: number) => (
    <button
      className={` square border-2 cursor-pointer w-10 h-10 ${
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
    setXIsNext(true);
    setHistory([]);
  };

  const handleBackToHome = () => {
    handleResetGame();
    setShowBoard(false);
    setInputSize(3);
  };

  //Check if there is a winner yet.
  const winnerData = calculateWinner(board, size);

  useEffect(() => {
    if (winnerData?.winner) {
      winnerData?.winner == "X"
        ? setMessageWin(`Player ${player_1} Win !!!`)
        : winnerData !== undefined
        ? setMessageWin(
            `${player_2 === "Bot" ? player_2 : "Player " + player_2} Win !!!`
          )
        : setMessageWin("");
      const squares = document.querySelectorAll(".square");
      console.log(winnerData?.line);
      winnerData?.line.forEach((box: any) => {
        squares[box].classList.add("active");
        console.log(box);
      });
    }
  }, [winnerData?.winner]);

  return (
    <div className="container flex flex-col justify-center items-center">
      {messageWin && <h1 className=" absolute top-6 text-xl">{messageWin}</h1>}
      <div className=" top-6 left-2 static flex justify-center items-center gap-2 ">
        <h1
          className={`bg-gray-200 p-2 rounded-md select-none transition-all  ${
            xIsNext && "bg-slate-800 text-white"
          }`}
        >
          Player 1 [X] : {player_1}
        </h1>
        <h1
          className={`bg-gray-200 p-2 rounded-md select-none transition-all ${
            !xIsNext && "bg-slate-800 text-white"
          }`}
        >
          Player 2 [O] : {player_2}
        </h1>
      </div>
      <div className="board mt-10">
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
      <div className="flex gap-2 mt-10">
        <button
          className=" border-2 py-1 px-3 rounded-md hover:bg-gray-500 hover:text-white transition-all"
          onClick={() => handleResetGame()}
        >
          Reset
        </button>
        <button
          className=" border-2 py-1 px-3 rounded-md hover:bg-gray-500 hover:text-white transition-all"
          onClick={() => handleBackToHome()}
        >
          Back
        </button>
      </div>
      <HistoryBoard history={history} />
    </div>
  );
};

export default Board;
