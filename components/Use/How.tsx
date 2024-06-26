"use client";

import PandaButton from "../panda/PandaButton";

const How = ({ how }: any) => {
  return (
    <>
      <div className="basis-1/3 flex">
        <img src={how.imageUrl} className="hue-rotate-0 brightness-90 contrast-150 w-[300px]" alt="howimage"></img>
      </div>
      <div>
        <p className="text-3xl font-bold my-2">{how.user}</p>
      </div>
      <div
        className="basis-2/3 flex flex-col gap-5"
      >
        <div className="my-2 flex flex-col gap-2 mobile:text-lg font-medium">
          {how.text.map((t: string, index: number) => (
            <p key={index} className="text-xl font-bold ">
              {t}
            </p>
          ))}
        </div>
      </div>
      <br className="mt-3" />
      <PandaButton>
        <p>Know More</p>
      </PandaButton>
    </>
  );
};

export default How;
