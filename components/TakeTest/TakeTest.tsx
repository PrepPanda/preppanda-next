import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Question from "../shared/Question/verify/Question";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}
const TakeTest = () => {
  const [timer, setTimer] = useState(300); // Adjust as needed
  const [isTestOver, setIsTestOver] = useState(false);
  const [msg, setMsg] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [intervals, setIntervals] = useState<number[]>([]); // New state for intervals

  const questionTimersRef = useRef<number[]>([]);

  useEffect(() => {
    try {
      axios
        .post("api/take_test/fetchQuestions")
        .then(function (response) {
          setMsg(response.data.message);
          setQuestions(response.data.questions);
          questionTimersRef.current = Array(
            response.data.questions.length
          ).fill(0);
        })
        .catch(function (error) {
          console.log(error);
        });
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
      console.log(questionTimersRef.current);
    }, 1000);

    setIntervals(
      (prevIntervals) => [...prevIntervals, questionInterval] as number[]
    );

    return () => clearInterval(questionInterval);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (timer <= 0) {
      setIsTestOver(true);
    }
  }, [timer]);

  const handleAnswerSubmit = (index: number, selectedOption: string) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[index] = selectedOption;
    setUserAnswers(updatedUserAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSubmitQuiz = () => {
    setShowCorrectAnswers(true);
    setIsTestOver(true);

    intervals.forEach((interval) => clearInterval(interval));
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md">
      {isTestOver ? (
        <p className="text-2xl font-bold text-center">Test is over!</p>
      ) : (
        <div>
          {Math.floor(questionTimersRef.current[currentQuestionIndex] / 60)}:
          {questionTimersRef.current[currentQuestionIndex] % 60}{" "}
          <p className="text-xl font-bold text-center mb-4">
            Time remaining: {Math.floor(timer / 60)}:{timer % 60}
          </p>
          <form>
            {currentQuestionIndex < questions.length ? (
              <Question
                key={currentQuestionIndex}
                questiondata={questions[currentQuestionIndex]}
                uniqueValue={Math.random()}
                disabled={false}
                inTest={true}
                onAnswerSubmit={handleAnswerSubmit}
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
