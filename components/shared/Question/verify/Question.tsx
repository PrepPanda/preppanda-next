import React, { useState, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";

const Question = ({
  currentQuestionIndex,
  questiondata,
  uniqueValue,
  deleteQuestion,
  handleAnswerChange = () => { },
  disabled = false,
  inTest = false,
}: any) => {
  const [editedQuestion, setEditedQuestion] = useState(questiondata.question);
  const [editedAnswer, setEditedAnswer] = useState(questiondata.answer);
  const [editedOptions, setEditedOptions] = useState([...questiondata.options]);

  const onAnswerChange: Function = (newAnswer: String) => {
    console.log(currentQuestionIndex, newAnswer);
    setEditedAnswer(newAnswer);
    handleAnswerChange(currentQuestionIndex, newAnswer);
  };

  return (
    <div className="relative border-gray-300 flex flex-col rounded-md p-4 px-10 border-2 m-4 basis-1/4">
      {!disabled && (
        <RxCrossCircled
          onClick={() => deleteQuestion(uniqueValue)}
          className="absolute -top-3 -right-3 text-red-500 text-2xl"
        />
      )}
      {editedQuestion}
      <hr className="my-4" />
      <div className="flex flex-col">
        {editedOptions.map((option: string, index: number) => {
          const uniqueName = `${uniqueValue}_${index}`;
          return (
            <div className="flex flex-row items-center" key={index}>
              <input
                type="radio"
                name={uniqueName}
                value={option}
                className="mr-2"
                checked={option === editedAnswer}
                onChange={() => onAnswerChange(option)}
                disabled={inTest == true ? false : disabled}
              />
              <label>{option}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Question;


