import React from "react";
import Question from "@/components/shared/Question/verify/Question";

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
          currentQuestionIndex={currentQuestionIndex}
          questiondata={questions[currentQuestionIndex]}
          uniqueValue={Math.random()}
          disabled={true}
          inTest={true}
          handleAnswerChange={handleAnswerSubmit}
        />
      ) : (
        <p>No more questions</p>
      )}
    </>
  );
};

export default Questions;

