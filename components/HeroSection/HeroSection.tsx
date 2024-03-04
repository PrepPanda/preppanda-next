"use client";
import ThemeButton from "@/components/shared/ThemeButton";
import { IoIosArrowRoundForward } from "react-icons/io";
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded';

const HeroSection = () => {
  return (
    <>
      <div className="flex flex-col xl:flex-row items-center justify-center w-screen px-24 my-20 z-10">
        <div className="basis-1/2 flex items-center justify-center">
          <img src="/images/hero.svg" width={600} height={100} />
        </div>
        <div className="basis-1/2 flex flex-col items-center justify-center sm:items-start sm:pr-36 gap-5">
          <div>
            <p className="text-xl sm:text-4xl mt-10 sm:my-5 text-center sm:text-left font-bold">
              <span className="font-logo font-bold text-xl mobile:text-7xl">PrepPanda</span> - Make it Easier
            </p>
          </div>
          <div className="flex flex-col gap-10 my-5 text-lg text-center sm:text-left">
            <div className="flex flex-col gap-2 items-center mobile:items-start text-xl">
              <p className="flex items-center gap-2 mobile:text-2xl">
                <SentimentVerySatisfiedRoundedIcon className="text-foam mobile:text-4xl" />
                <b className="text-3xl">Students</b>
              </p>{" "}
              <p>
                Tailored just for you. Make your self ready for competitive world.
              </p>
            </div>
            <div className="flex flex-col gap-2 items-center mobile:items-start text-xl">
              <p className="flex items-center gap-2 mobile:text-2xl">
                <SentimentVerySatisfiedRoundedIcon className="text-foam mobile:text-4xl" />
                <b className="text-3xl">Teachers</b>
              </p>{" "}
              <p>
                Seamless your work. Leave your burden on us.
              </p>
            </div>
          </div>
          <ThemeButton>
            <p>Begin your journey</p>
            <IoIosArrowRoundForward className="text-2xl" />
          </ThemeButton>
        </div>
      </div>
    </>
  );
};

export default HeroSection;


