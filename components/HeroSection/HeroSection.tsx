"use client";
import { FaCheckCircle } from "react-icons/fa";
import ThemeButton from "../shared/ThemeButton";

const HeroSection = () => {
  return (
    <>
      <div className="spacer1 layer1 m-0 t-0"></div>
      <div className="flex flex-col xl:flex-row items-center justify-center w-screen px-24 mt-10">
        <div className="basis-1/2 flex items-center justify-center">
          <img src="/images/hero.svg" width={600} height={100} />
        </div>
        <div className="basis-1/2 flex flex-col items-center justify-center sm:items-start sm:pr-36 gap-5">
          <div>
            <p className="text-xl sm:text-4xl mt-10 sm:my-5 text-center sm:text-left font-bold">
              PrepPanda - Make it Easier
            </p>
          </div>
          <div className="flex flex-col gap-10 my-5 text-lg text-center sm:text-left">
            <p className="flex flex-col sm:flex-row gap-2 items-center">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <b>Students</b>
              </span>{" "}
              Tailored just for you. Make your self ready for competitive world.
            </p>
            <p className="flex flex-col sm:flex-row gap-2 items-center">
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <b>Teachers</b>
              </span>{" "}
              Seamless your work. Leave your burden on us.
            </p>
          </div>
          <ThemeButton text={"Begin your journey"} />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
