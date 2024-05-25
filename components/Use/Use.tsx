"use client";
import How from "./How";
import uses from "./uses";

const Use = () => {
  return (
    <>
      <div className="flex flex-col z-20 items-center justify-center w-screen px-24 my-40 relative">
        <div className="mb-40">
          <p className="text-xl mobile:text-5xl font-black">Services</p>
        </div>
        <div className="flex flex-row gap-8 px-44">
          {uses.map((use, index) => (
            <div
              key={index}
            >
              <How
                how={use}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Use;
