"use client";
import How from "./How";
import uses from "./uses";

const Use = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen px-24 my-20">
        <div>
          <p className="text-3xl font-bold">Who gain what?</p>
        </div>
        <div className="flex flex-col gap-8 my-20">
          {uses.map((use, index) => (
            <div
              className={`flex ${
                index % 2 == 0 ? "flex-row-reverse" : "flex-row"
              } px-80`}
              key={index}
            >
              <How
                how={use}
                extra={index % 2 == 0 ? "items-end" : "items-start"}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Use;
