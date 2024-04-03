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

  // Setting Player
  let player_1 = p1;
  let player_2 = p2 || "Bot";

  let bot = useBot;

  // MARK WHEN PLAYER (PLAY WITH AI)
  const HUMAN_PLAYER = "X";
  const AI_PLAYER = "O";

  // const [board, setBoard] = useState(Array(size * size).fill(null));
  const [board, setBoard] = useState<any>(
    Array.from(Array(size * size).keys())
  );

  const [xIsNext, setXIsNext] = useState(true);
  const [messageWin, setMessageWin] = useState("");
  const [history, setHistory] = useState<any[]>([]);

  // FUNCTION MARK THE BOX
  const onTurn = (squareId: number, player: any) => {
    const newBoard = board;
    const col = Math.floor(squareId % size),
      row = Math.floor(squareId / size),
      //col and row where the latest click happened
      clickPosition = "( row: " + row + ", col: " + col + " )";

    if (bot) {
      // player === X OR O
      newBoard[squareId] = player;
    } else {
      // player === boolean
      newBoard[squareId] = player ? "X" : "O";
    }

    setHistory((history: any) => [
      ...history,
      {
        player: newBoard[squareId],
        move: squareId,
        position: clickPosition,
        boardHistory: newBoard,
      },
    ]);
    if (newBoard.every((box: any) => typeof box !== "number")) {
      setMessageWin("The game is tied.");
      return;
    }
    setBoard(newBoard);
  };

  // FIND THE BOX DON'T HAVE MARK
  function emptySquares() {
    return board.filter((item: any) => typeof item === "number");
  }

  const handleClick = (index: number) => {
    if (
      (board[index] && typeof board[index] !== "number") ||
      checkWin(board)?.winner
    ) {
      return;
    }
    if (bot) {
      onTurn(index, "X");
      const botMove = emptySquares();
      setXIsNext(false);
      // if (!botMove.length || checkWin(board)?.winner) {
      if (!botMove.length || checkWin(board)?.winner) {
        return;
      } else {
        // let randomBox = botMove[Math.floor(Math.random() * botMove.length)];
        onTurn(minimax(board, AI_PLAYER).index, AI_PLAYER);
        // onTurn(randomBox, AI_PLAYER);
        setTimeout(() => {
          setXIsNext(true);
        }, 200);
      }
    } else {
      onTurn(index, xIsNext);
      setXIsNext(!xIsNext);
    }
  };

  // CHECK WINNER
  const checkWin = (_board: any) => {
    const winnerData = calculateWinner(_board, size);
    return winnerData;
  };

  // credit minimax code https://github.com/adeelibr/tic-tac-toe-ai-vanilla-js/blob/master/simple/smartAi.js#L115
  function minimax(newBoard: any, player: string) {
    let availableSpots = emptySquares();
    if (checkWin(newBoard)?.winner === HUMAN_PLAYER) {
      return { score: -10 };
    } else if (checkWin(newBoard)?.winner === AI_PLAYER) {
      return { score: 10 };
    } else if (availableSpots.length === 0) {
      return { score: 0 };
    }

    let moves: any = [];

    for (let i = 0; i < availableSpots.length; i++) {
      let move: any = {};
      move.index = newBoard[availableSpots[i]];
      newBoard[availableSpots[i]] = player;

      if (player === AI_PLAYER) {
        let result = minimax(newBoard, HUMAN_PLAYER);
        move.score = result.score;
      } else {
        let result = minimax(newBoard, AI_PLAYER);
        move.score = result.score;
      } // end of if/else block

      newBoard[availableSpots[i]] = move.index;
      moves.push(move);
    } // end of for look

    let bestMove: any;

    if (player === AI_PLAYER) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      } // end of for loop
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }

  const renderSquare = (index: number) => (
    <button
      className={` square border-2 cursor-pointer w-10 h-10 ${
        board[index] == "X" ? "X" : board[index] == "O" ? "O" : ""
      }`}
      onClick={() => handleClick(index)}
      key={index}
    >
      {board[index] === "X" || board[index] === "O" ? board[index] : ""}
    </button>
  );

  const handleResetGame = () => {
    setBoard(Array.from(Array(size * size).keys()));
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
      // console.log(winnerData?.line);
      winnerData?.line.forEach((box: any) => {
        squares[box].classList.add("active");
        // console.log(box);
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
