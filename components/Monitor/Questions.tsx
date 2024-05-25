import React from "react";
import Question from "./Question";

const Questions = ({
  questions,
  currentQuestionIndex,
  handleAnswerSubmit,
}: any) => {
  return (
    <>
      {currentQuestionIndex < questions.length ? (
        <Question
          key={currentQuestionIndex}
          questiondata={questions[currentQuestionIndex]}
          uniqueValue={Math.random()}
        />
      ) : (
        <p>No more questions</p>
      )}
    </>
  );
};

export default Questions;


