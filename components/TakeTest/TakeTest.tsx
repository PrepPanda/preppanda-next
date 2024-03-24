import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import AnswerButtons from "../Monitor/AnswerButton";
import Questions from "../Monitor/Questions";
import TestTimer from "../Monitor/TestTimer";
import QuestionListButtons from "../Monitor/QuestionListButtons";

const TakeTest = () => {
  const [timer, setTimer] = useState(0); // Adjust as needed
  const [isTestOver, setIsTestOver] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionTimers, setQuestionTimers] = useState([]);

  useEffect(() => {
    const tData = JSON.parse(localStorage.getItem("originalTest")!);
    setTestData(tData);
    console.log(tData);
    try {
      const encryptedTestData = localStorage.getItem("originalTest");
      const bytes = CryptoJS.AES.decrypt(
        encryptedTestData,
        process.env.NEXT_PUBLIC_CRYPTO_SECRET
      );
      const testData = JSON.parse(
        bytes.toString(CryptoJS.enc.Utf8)
      );
      const { questions, minutes } = testData;
      const time = 60 * minutes;
      setQuestions(questions);
      setTimer(time);
    } catch (error) {
      console.error("Error fetching test details:", error.message);
    }
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  const handleAnswerSubmit = (index, selectedOption) => {
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
    clearInterval(questionTimersRef.current[currentQuestionIndex]);

    try {
      const data = { questions, userAnswers, questionTimersRef };
      axios
        .post("api/take_test/evaluate", data)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    } catch (error) {
      console.error("Error fetching test details:", error.message);
    }
  };

  const handleQuestionTimer = (timeSpent) => {
    const updatedTimers = [...questionTimers];
    updatedTimers[currentQuestionIndex] = timeSpent;
    setQuestionTimers(updatedTimers);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 rounded-md shadow-md">
      {isTestOver ? (
        <p className="text-2xl font-bold text-center">Test is over!</p>
      ) : (
        <div>
          <TestTimer
            timer={timer}
            startTimer={true}
            setQuestionTimer={handleQuestionTimer}
          />
          <form>
            <Questions
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              handleAnswerSubmit={handleAnswerSubmit}
            />
            <AnswerButtons
              handleNextQuestion={handleNextQuestion}
              handleSubmitQuiz={handleSubmitQuiz}
              showCorrectAnswers={showCorrectAnswers}
            />
            <QuestionListButtons
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default TakeTest;
