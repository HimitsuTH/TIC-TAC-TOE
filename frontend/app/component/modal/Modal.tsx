"use client";
import FormPlayer from "./FormPlayer";
import FormBot from "./FormBot";

const Modal = (props: any) => {
  return (
    <div className=" flex flex-col justify-center items-center border-2 p-5 gap-3 rounded-md">
      <h1 className=" font-bold text-2xl  p-3 rounded-md">Tic Tac Toe</h1>
      <div className="flex gap-16 justify-center relative ">
        <FormPlayer setting={props} />
        <p className=" text-gray-300 text-2xl absolute top-1/3 select-none">OR</p>
        <FormBot setting={props} />
      </div>
    </div>
  );
};

export default Modal;
