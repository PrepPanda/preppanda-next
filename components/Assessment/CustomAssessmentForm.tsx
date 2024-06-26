"use client"

import React, { useState } from "react";
import { CldUploadButton, CldImage } from "next-cloudinary";
import PandaButton from "../panda/PandaButton";
import { IoRemoveCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const CustomQuestionForm = () => {
  const [question, setQuestion] = useState({
    question: "",
    answer: "",
    question_type: "multiple_choice",
    marks: 0
  });
  const [imageUrl, setImageUrl] = useState("");
  const [option, setOption] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const changeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
  };

  const changeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({ ...question, question_type: e.target.value });
  };

  const addOption = () => {
    setOptions([...options, option]);
    setOption("");
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const submit = () => {
    const questions = JSON.parse(localStorage.getItem("questions") || "[]");
    questions.push({ ...question, options, imageUrl });
    localStorage.setItem("questions", JSON.stringify(questions));
    setQuestion({ question: "", answer: "", marks: 0, question_type: "multiple_choice" });
    toast('Question Created',
      {
        icon: '🎉',
        style: {
          borderRadius: '10px',
          background: '#524f67',
          color: '#e0def4',
          fontWeight: 'bold',
        },
      }
    );
    setImageUrl("");
    setOptions([]);
  };

  return (
    <>
      <div className="flex flex-col xl:flex-row items-center justify-center w-screen px-24">
        <div className="relative w-screen flex flex-col gap-5 items-center justify-center bg-base">
          <h1 className="text-5xl font-bold text-gold">Create Questions</h1>
          <input
            className="bg-muted rounded-full px-4 py-2"
            type="text"
            name="question"
            id="question"
            placeholder="Write Question"
            value={question.question}
            onChange={changeQuestion}
          />
          <CldUploadButton
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
            options={{
              multiple: true,
              folder: "preppanda"
            }}
            onSuccess={(results: any) => {
              const public_id = results.info.public_id;
              setImageUrl(public_id);
            }}
            onError={(results: any) => {
              console.log(results);
            }}
            className="text-text bg-overlay hover:bg-highlight flex gap-2 items-center rounded-full  px-3 py-2 mobile:px-5 mobile:py-2 text-base font-bold text-lg mobile:text-xl z-40"
          >
            Have image for questsion?
          </CldUploadButton>

          {imageUrl !== "" && (
            <CldImage
              width="960"
              height="600"
              src={imageUrl}
              sizes="100vw"
              alt="Description of my image"
            />
          )}

          <input
            className="bg-muted rounded-full px-3 py-2"
            placeholder="Answer"
            type="text"
            name="answer"
            id="answer"
            value={question.answer}
            onChange={changeQuestion}
          />

          <div className="flex gap-3">
            <input
              className="bg-muted rounded-full px-3 py-2"
              placeholder="Option"
              type="text"
              value={option}
              onChange={changeOption}
            />
            <PandaButton handleClick={addOption}>
              <p>Add Option</p>
            </PandaButton>
          </div>
          <ul className="flex gap-3">
            {options.map((option, index) => (
              <li key={index} className="flex items-center gap-5">
                {option}
                <PandaButton handleClick={() => removeOption(index)}>
                  <IoRemoveCircleOutline />
                </PandaButton>
              </li>
            ))}
          </ul>

          <div className="flex gap-3 justify-center items-center">
            <label className="text-foam font-semibold text-2xl">Marks</label>
            <input
              className="bg-muted rounded-full px-3 py-2"
              type="number"
              name="marks"
              id="marks"
              value={question.marks}
              onChange={changeQuestion}
            />
          </div>

          <div className="flex gap-3 justify-center items-center">
            <label className="text-foam font-semibold text-2xl">Type</label>
            <div className="flex gap-2">
              <input
                type="radio"
                id="multiple_choice"
                name="question_type"
                value="multiple_choice"
                checked={question.question_type === "multiple_choice"}
                onChange={changeType}
              />
              <label htmlFor="multiple_choice">Multiple Choice</label>
              <input
                type="radio"
                id="true_false"
                name="question_type"
                value="true_false"
                checked={question.question_type === "true_false"}
                onChange={changeType}
              />
              <label htmlFor="true_false">True/False</label>
              <input
                type="radio"
                id="fill_in_the_blank"
                name="question_type"
                value="fill_in_the_blank"
                checked={question.question_type === "fill_in_the_blank"}
                onChange={changeType}
              />
              <label htmlFor="fill_in_the_blank">Fill in the blank</label>
              <input
                type="radio"
                id="short_answer"
                name="question_type"
                value="short_answer"
                checked={question.question_type === "short_answer"}
                onChange={changeType}
              />
              <label htmlFor="short_answer">Short Answer</label>
              <input
                type="radio"
                id="long_answer"
                name="question_type"
                value="long_answer"
                checked={question.question_type === "long_answer"}
                onChange={changeType}
              />
              <label htmlFor="long_answer">Long Answer</label>
            </div>
          </div>
          <PandaButton handleClick={submit}>
            <p>Add Question</p>
          </PandaButton>
        </div>
      </div>
    </>
  );
};

export default CustomQuestionForm;

