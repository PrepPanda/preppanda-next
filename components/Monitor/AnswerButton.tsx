import React from "react";
import ThemeButton from "../shared/ThemeButton";

const AnswerButtons = ({
  handleNextQuestion,
  handleSubmitQuiz,
  handlePrevQuestion
}: any) => {
  return (
    <div className="flex justify-between my-4 px-5">
      <div className="flex gap-5">
      <ThemeButton handleClick={handlePrevQuestion}>
        Previous
      </ThemeButton>
      <ThemeButton handleClick={handleNextQuestion}>
        Next
      </ThemeButton>
      </div>
      <ThemeButton handleClick={handleSubmitQuiz}>
        Submit
      </ThemeButton>
    </div>
  );
};

export default AnswerButtons;

