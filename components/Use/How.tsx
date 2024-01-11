"use client";

import ThemeButton from "../shared/ThemeButton";

const How = ({ how, extra, color }: any) => {
  return (
    <>
      <div className="basis-1/3 flex items-center justify-center">
        <img src={how.imageUrl} width={600} height={75}></img>
      </div>
      <div
        className={`basis-2/3 flex flex-col sm:pr-36 gap-5 justify-center items-center `}
      >
        <div>
          <p className="text-3xl font-bold text-center my-2">{how.user}</p>
        </div>
        <div className="my-2 flex flex-col gap-2 sm:text-lg font-medium">
          {how.text.map((t: string, index: number) => (
            <p key={index} className="text-center">
              {t}
            </p>
          ))}
        </div>
        <ThemeButton text={"Know More"} />
      </div>
    </>
  );
};

export default How;
