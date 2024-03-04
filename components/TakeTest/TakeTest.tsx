import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Question from "../shared/Question/verify/Question";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// interface Question {
//   id: string;
//   question: string;
//   options: string[];
//   correctAnswer: string;
// }

const TakeTest = () => {
  const [timer, setTimer] = useState(0); // Adjust as needed
  const [isTestOver, setIsTestOver] = useState(false);
  const [msg, setMsg] = useState("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [intervals, setIntervals] = useState<number[]>([]); // New state for intervals
  const [startTimer, setStartTimer] = useState(false);
  const questionTimersRef = useRef<number[]>([]);
  const [testData, setTestData] = useState({
    completeBy: [],
    createdAt: "",
    expiresAt: "",
    minutes: 0,
    name: "",
    owner: "",
    questions: [],
    sharedWith: [],
  });
  useEffect(() => {
    const tData = JSON.parse(localStorage.getItem("originalTest")!);
    setTestData(tData);
    console.log(tData);
    try {
      // axios
      //   .post("api/take_test/fetchQuestions")
      //   .then(function (response: any) {
      //     setMsg(response.data.message);
      setQuestions(testData.questions);
      questionTimersRef.current = Array(testData.questions.length).fill(0);
      setTimer(testData.minutes * 60);
      setStartTimer(true);
      setIsTestOver(false);
      //     setUserAnswers(new Array(response.data.questions.length, null));
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    } catch (error: any) {
      console.error("Error fetching test details:", error.message);
    }

    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setIntervals((prevIntervals) => [...prevIntervals, countdown] as number[]);

    return () => {
      intervals.forEach((interval) => clearInterval(interval as number));
    };
  }, []);

  useEffect(() => {
    const questionInterval = setInterval(() => {
      questionTimersRef.current[currentQuestionIndex] += 1;
    }, 1000);

    setIntervals(
      (prevIntervals) => [...prevIntervals, questionInterval] as number[]
    );

    return () => clearInterval(questionInterval);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (timer <= 0) {
      // setIsTestOver(true);
    }
  }, [timer]);

  const handleAnswerSubmit = (index: number, selectedOption: string) => {
    console.log(index, selectedOption);
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[index] = selectedOption;
    setUserAnswers(updatedUserAnswers);
    // console.log(updatedUserAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmitQuiz = () => {
    setShowCorrectAnswers(true);
    setIsTestOver(true);

    intervals.forEach((interval) => clearInterval(interval));

    try {
      const data = { questions, userAnswers, questionTimersRef };
      axios
        .post("api/take_test/evaluate", data)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error: any) {
      console.error("Error fetching test details:", error.message);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-900 rounded-md shadow-md">
      {isTestOver ? (
        <p className="text-2xl font-bold text-center">Test is over!</p>
      ) : (
        <div>
          <div className="flex justify-between items-center mx-5">
            <div>
              {Math.floor(questionTimersRef.current[currentQuestionIndex] / 60)}
              :{questionTimersRef.current[currentQuestionIndex] % 60}
            </div>
            <CountdownCircleTimer
              isPlaying={startTimer}
              duration={testData.minutes * 60}
              size={60}
              strokeWidth={6}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
              onComplete={() => {
                setIsTestOver(true);
                return {};
              }}
            >
              {({ remainingTime }) => {
                const minutes = Math.floor(remainingTime / 60);
                const seconds = remainingTime % 60;

                return `${minutes}:${seconds}`;
              }}
            </CountdownCircleTimer>
          </div>
          <form>
            {currentQuestionIndex < questions.length ? (
              <Question
                key={currentQuestionIndex}
                currentQuestionIndex={currentQuestionIndex}
                questiondata={questions[currentQuestionIndex]}
                uniqueValue={Math.random()}
                disabled={false}
                inTest={true}
                handleAnswerChange={handleAnswerSubmit}
              />
            ) : (
              <p>No more questions</p>
            )}
            <button
              type="button"
              onClick={handleNextQuestion}
              disabled={showCorrectAnswers}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Next Question
            </button>
            <button
              type="button"
              onClick={handleSubmitQuiz}
              disabled={showCorrectAnswers}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit Quiz
            </button>
          </form>
          <div className="grid grid-cols-5">
            {questions.map((question, index) => (
              <button
                key={index + 1}
                className={`m-1 rounded-md ${
                  index === currentQuestionIndex
                    ? "bg-green-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                <p>{index + 1}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeTest;
