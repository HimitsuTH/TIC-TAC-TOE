"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { GameSetting, GameSettingSchema } from "../libs/types";

const InputModal = (props: any) => {
  const { setInputSize, setShowBoard, setPlayer1, setPlayer2 } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GameSetting>({
    resolver: zodResolver(GameSettingSchema),
  });

  const onSubmit = (body: GameSetting) => {
    const { size, player1, player2 } = body;
    try {
      //set board size
      setInputSize(size);

      //set name player.
      setPlayer1(player1);
      setPlayer2(player2);

      //close input modal
      setShowBoard(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center border-2 p-4">
      <h1 className=" font-bold text-2xl  p-3 rounded-md">Tic Tac Toe</h1>

      <form
        className=" flex gap-4  flex-col "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            type="text"
            {...register("player1")}
            className=" p-3 border-2 "
            placeholder="Enter player 1 name."
          />
          {errors.player1 && (
            <p className="text-red-500">{`${errors.player1.message}`}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            {...register("player2")}
            className=" p-3 border-2 "
            placeholder="Enter player 2 name."
          />
          {errors.player2 && (
            <p className="text-red-500">{`${errors.player2.message}`}</p>
          )}
        </div>

        <div>
          <input
            {...register("size", { valueAsNumber: true })}
            type="number"
            className=" p-3 border-2 "
            placeholder="Enter size to play."
          />
          {errors.size && (
            <p className="text-red-500">{`${errors.size.message}`}</p>
          )}
        </div>

        <button
          className=" border-2 p-3 flex justify-center items-center"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "loading..." : "Start"}
        </button>
      </form>
    </div>
  );
};

export default InputModal;
