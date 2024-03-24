import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const TestTimer = ({ timer, startTimer, setQuestionTimer }: any) => {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    setRemainingTime(timer);
  }, [timer]);

  useEffect(() => {
    let interval;
    if (startTimer) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [startTimer]);

  useEffect(() => {
    setQuestionTimer(remainingTime);
  }, [remainingTime, setQuestionTimer]);

  return (
    <div className="flex justify-between items-center mx-5">
      <div>{Math.floor(remainingTime / 60)}:{remainingTime % 60}</div>
      <CountdownCircleTimer
        isPlaying={startTimer}
        duration={timer}
        size={60}
        strokeWidth={6}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}
        onComplete={() => {
          return [false, 0]; // Stop the timer
        }}
      >
        {({ remainingTime }) => {
          const minutes = Math.floor(remainingTime / 60);
          const seconds = remainingTime % 60;
          return `${minutes}:${seconds}`;
        }}
      </CountdownCircleTimer>
    </div>
  );
};

export default TestTimer;
