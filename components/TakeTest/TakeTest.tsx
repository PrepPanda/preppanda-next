import React, { useState, useEffect } from "react";

const TakeTest = () => {
  const [timer, setTimer] = useState(10); // 300 seconds, adjust as needed
  const [isTestOver, setIsTestOver] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, []); 

  useEffect(() => {
    if (timer <= 0) {
      setIsTestOver(true);
    }
  }, [timer]);

  return (
    <div>
      {isTestOver ? (
        <p>Test is over!</p>
      ) : (
        <p>
          Time remaining: {Math.floor(timer / 60)}:{timer % 60}
        </p>
      )}
    </div>
  );
};

export default TakeTest;
