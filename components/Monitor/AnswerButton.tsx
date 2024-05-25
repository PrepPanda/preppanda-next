import React from "react";
import PandaButton from "../panda/PandaButton";

const AnswerButtons = ({
  handleNextQuestion,
  handleSubmitQuiz,
  handlePrevQuestion
}: any) => {
  return (
    <div className="flex justify-between my-4 px-5">
      <div className="flex gap-5">
        <PandaButton handleClick={handlePrevQuestion}>
          Previous
        </PandaButton>
        <PandaButton handleClick={handleNextQuestion}>
          Next
        </PandaButton>
      </div>
      <PandaButton handleClick={handleSubmitQuiz}>
        Submit
      </PandaButton>
    </div>
  );
};

export default AnswerButtons;

