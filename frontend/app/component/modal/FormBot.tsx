import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { GameSetting, GameSettingSchema } from "../../libs/types";

const FormBot = (props: any) => {
  const { setShowBoard, setPlayer1, setUseBot ,setPlayer2 } = props.setting;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GameSetting>({
    resolver: zodResolver(GameSettingSchema),
  });

  const onSubmit = (body: GameSetting) => {
    const { player1 } = body;
    try {
      //set name player.
      setPlayer1(player1);
      setPlayer2("");

      //set play with bot
      setUseBot(true);

      //close input modal
      setShowBoard(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className=" text-center mb-2 font-bold text-gray-500">
        Play with Bot 3X3
      </h1>
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

export default FormBot;
