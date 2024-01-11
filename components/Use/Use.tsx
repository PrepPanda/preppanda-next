"use client";
import How from "./How";
import uses from "./uses";

const Use = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen px-24 mt-40 mb-20 relative">
        <div>
          <p className="text-xl sm:text-4xl font-bold">Services</p>
        </div>
        <div className="flex flex-col gap-8 my-20">
          {uses.map((use, index) => (
            <div
              className={`flex flex-col ${
                index % 2 == 0 ? "sm:flex-row-reverse" : "sm:flex-row"
              } sm:px-80`}
              key={index}
            >
              <How
                how={use}
                extra={index % 2 == 0 ? "items-end" : "items-start"}
                color={index % 2 == 0 ? "bg-green-500" : "bg-sky-500"}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Use;
