
import React, { useEffect, useState } from "react";

const TestTimer = ({ startTime, duration, handleSubmitQuiz }: any) => {
  const [remainingTime, setRemainingTime] = useState<number>(duration * 60);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentTime = Date.now();
      const timeDifference = endTime - currentTime;
      if (timeDifference > 0) {
        setRemainingTime(Math.floor(timeDifference / 1000));
      } else {
        setRemainingTime(0);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [remainingTime]); // Update the timer every second

  useEffect(() => {
    if (remainingTime === 0) {
      handleSubmitQuiz();
    }
  }, [remainingTime]);

  const endTime = startTime.getTime() + duration * 60 * 1000;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-screen flex items-center justify-center  text-3xl">
      {remainingTime > 0 ? (
        <div>{formatTime(remainingTime)}</div>
      ) : (
        <div>Time's up!</div>
      )}
    </div>
  );
};

export default TestTimer;


