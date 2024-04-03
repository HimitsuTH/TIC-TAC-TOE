import { useState } from "react";

const HistoryBoard = ({ history }: any) => {
  const [active, setActive] = useState(null);

  return (
    <div className=" xl:fixed xl:right-14 xl:z-20 xl:top-15 mt-4 md:mt-0  p-3">
      <p className=" select-none text-center mb-2">History</p>
      <ul className="history flex flex-col overflow-y-scroll  scroll gap-y-2 w-[18rem] h-[15rem]">
        <ol
          key="start"
          className="flex gap-3   justify-center items-center text-xs md:text-sm border mx-2 p-2  select-none"
        >
          Game start
        </ol>
        {history?.map((h: any, i: any) => (
          <ol
            key={i}
            className={`history_ flex gap-3 cursor-pointer  items-center text-xs md:text-sm border mx-2 p-2  hover:bg-slate-800 hover:text-white ${
              active == i && "active"
            }`}
            onClick={() => {
              setActive(i);
            }}
          >
            <p>Turn : {i + 1}</p>
            <div className="flex gap-x-2">
              <p>{`" ${h?.player} " `}</p>
              <p>{h?.position}</p>
            </div>
          </ol>
        ))}
      </ul>
    </div>
  );
};

export default HistoryBoard;
