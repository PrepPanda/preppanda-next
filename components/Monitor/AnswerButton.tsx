import React from "react";

const AnswerButtons = ({
  handleNextQuestion,
  handleSubmitQuiz,
  showCorrectAnswers,
}: any) => {
  return (
    <div className="flex justify-between">
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
    </div>
  );
};

export default AnswerButtons;

