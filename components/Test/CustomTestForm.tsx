"use client";

import { CldUploadButton } from "next-cloudinary";
import { CloudinaryUploadWidgetResults } from "cloudinary";
import { useState } from "react";
import ThemeButton from "../shared/ThemeButton";
import { IoRemoveCircleOutline } from "react-icons/io5";

const CustomQuestionForm = () => {
  const [question, setQuestion] = useState({
    question: "",
    image: "",
    answer: "",
  });
  const [option, setOption] = useState("");
  const [options, setOptions] = useState<string[]>([]);

  const changeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
  };

  const addOption = () => {
    setOptions([...options, option]);
    setOption("");
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const submit = () => {
    console.log(question);
    console.log(options);
    console.log("Hii");
    // store the question and options in the local storage
    const questions = JSON.parse(localStorage.getItem("questions") || "[]");
    questions.push({ ...question, options });
    localStorage.setItem("questions", JSON.stringify(questions));
    // reset the form
    setQuestion({ question: "", image: "", answer: "" });
    setOptions([]);
  };

  return (
    <>
      <div className="flex flex-col xl:flex-row items-center justify-center w-screen px-24">
        <div className="relative w-screen flex flex-col gap-5 items-center justify-center bg-base">
          <h1 className="text-5xl font-bold text-gold">Create Questions</h1>
          <input
            className="bg-muted"
            type="text"
            name="question"
            id="question"
            value={question.question}
            onChange={changeQuestion}
          />
          <CldUploadButton
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
            options={{
              multiple: true,
              folder: "preppanda",
            }}
            onSuccess={(results: CloudinaryUploadWidgetResults) => {
              const publicId = results.info.public_id;
              setQuestion({ ...question, image: publicId });
            }}
            onError={(results: CloudinaryUploadWidgetResults) => {}}
          />

          <input
            className="bg-muted"
            type="text"
            name="answer"
            id="answer"
            value={question.answer}
            onChange={changeQuestion}
          />

          <input
            className="bg-muted"
            type="text"
            value={option}
            onChange={changeOption}
          />
          <ThemeButton handleClick={addOption}>
            <p>Add Option</p>
          </ThemeButton>

          <ul>
            {options.map((option, index) => (
              <li key={index} className="flex items-center gap-5">
                {option}
                <ThemeButton handleClick={() => removeOption(index)}>
                  <IoRemoveCircleOutline />
                </ThemeButton>
              </li>
            ))}
          </ul>

          <ThemeButton handleClick={submit}>
            <p>Add Question</p>
          </ThemeButton>
        </div>
      </div>
    </>
  );
};

export default CustomQuestionForm;
