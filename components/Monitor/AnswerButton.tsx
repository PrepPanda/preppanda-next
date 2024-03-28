import React from "react";
import ThemeButton from "../shared/ThemeButton";

const AnswerButtons = ({
  handleNextQuestion,
  handleSubmitQuiz,
  handlePrevQuestion
}: any) => {
  return (
    <div className="flex justify-between">
      <ThemeButton handleClick={handleNextQuestion}>
        Next
      </ThemeButton>
      <ThemeButton handleClick={handlePrevQuestion}>
        Previous
      </ThemeButton>
      <ThemeButton handleClick={handleSubmitQuiz}>
        Submit
      </ThemeButton>
    </div>
  );
};

export default AnswerButtons;

