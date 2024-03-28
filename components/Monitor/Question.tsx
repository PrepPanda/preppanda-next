import React, { useState, useEffect } from "react";

const Question = ({ questiondata, uniqueValue }: any) => {
  const questionId = questiondata._id
  const [index, setIndex] = useState<number>(-1);
  const [userAnswer, setUserAnswer] = useState<string>("");

  const savingTimeSpents = (timeSpent) => {
    const userQuestionDataStr = localStorage.getItem('userQuestionData');
    if (userQuestionDataStr) {
      let userQuestionData = JSON.parse(userQuestionDataStr);
      userQuestionData[index].timestamps.push(timeSpent);
      localStorage.setItem('userQuestionData', JSON.stringify(userQuestionData));
    }
  }

  useEffect(() => {
    if (index != -1) {
      const mountedTimeStamp = new Date();
      console.log("Mounted TimeStamp: " + index + " ", mountedTimeStamp);
      return () => {
        const unmountedTimeStamp = new Date();
        const timeSpent: number = (unmountedTimeStamp - mountedTimeStamp) / 1_000;
        savingTimeSpents(timeSpent)
        console.log("Unmounted TimeStamp: " + index + " ", unmountedTimeStamp);
      }
    }
  }, [index]);

  useEffect(() => {
    const userQuestionDataStr = localStorage.getItem('userQuestionData');
    if (userQuestionDataStr) {
      const userQuestionData = JSON.parse(userQuestionDataStr);
      const index = userQuestionData.findIndex((obj: any) => obj.id === questionId);
      setIndex(index);
      setUserAnswer(userQuestionData[index].userAnswer)
      console.log("Index of current question:", index);
    }
  }, []);

  const handleAnswerChange = (option: any) => {
    const userQuestionDataStr = localStorage.getItem('userQuestionData');
    if (userQuestionDataStr) {
      let userQuestionData = JSON.parse(userQuestionDataStr);
      userQuestionData[index].userAnswer = option;
      localStorage.setItem('userQuestionData', JSON.stringify(userQuestionData));
    }
    setUserAnswer(option);
  }

  return (
    <div className="relative border-gray-300 flex flex-col rounded-md p-4 px-10 border-2 m-4 basis-1/4">
      {questiondata.question}
      <hr className="my-4" />
      <div className="flex flex-col">
        {questiondata.options.map((option: string, index: number) => {
          const uniqueName = `${uniqueValue}`;
          return (
            <div className="flex flex-row items-center" key={index}>
              <input
                type="radio"
                name={uniqueName}
                value={option}
                className="mr-2"
                checked={option == userAnswer}
                onChange={() => handleAnswerChange(option)}
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


