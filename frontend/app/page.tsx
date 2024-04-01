"use client";

import Board from "./component/board/Index";
import InputModal from "./component/modal/InputModal";
import { useState } from "react";

export default function Home() {
  const [inputSize, setInputSize] = useState(3);
  const [showBoard, setShowBoard] = useState(false);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");


  console.log(showBoard ? "test" : "no");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {showBoard ? (
        <Board size={Number(inputSize)} player_1={player1} player_2={player2} />
      ) : (
        <InputModal
          setInputSize={setInputSize}
          setShowBoard={setShowBoard}
          setPlayer1={setPlayer1}
          setPlayer2={setPlayer2}
        />
      )}
    </main>
  );
}