import React from "react";

const QuestionListButtons = ({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
}: any) => {
  const handleQuestionChange = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="grid grid-cols-10 gap-2">
      {questions.map((question: any, index: number) => (
        <button
          key={index + 1}
          className={`rounded-full ${index === currentQuestionIndex
            ? "bg-green-500 text-white"
            : "bg-gray-500 text-white"
            }`}
          onClick={() => handleQuestionChange(index)}
        >
          <p>{index + 1}</p>
        </button>
      ))}
    </div>
  );
};

export default QuestionListButtons;


