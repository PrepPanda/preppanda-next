"use client";

import { CldUploadButton, CldImage } from "next-cloudinary";
import { CloudinaryUploadWidgetResults } from "cloudinary";
import { useState } from "react";
import ThemeButton from "../shared/ThemeButton";
import { IoRemoveCircleOutline } from "react-icons/io5";

const CustomQuestionForm = () => {
    const [question, setQuestion] = useState({
        question: "",
        answer: "",
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
        // store the question and options in the local storage
        const questions = JSON.parse(localStorage.getItem("questions") || "[]");
        questions.push({ ...question, options, imageUrl });
        localStorage.setItem("questions", JSON.stringify(questions));
        // reset the form
        setQuestion({ question: "", answer: "", marks: 0});
        setImageUrl("");
        setOptions([]);
    }

    return (
        <>
            <div className="flex flex-col xl:flex-row items-center justify-center w-screen px-24">
                <div className="relative w-screen flex flex-col gap-5 items-center justify-center bg-base">
                    <h1 className="text-5xl font-bold text-gold">Create Questions</h1>
                    <input className="bg-muted" type="text" name="question" id="question" value={question.question} onChange={changeQuestion} />
                    <CldUploadButton
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                        options={{
                            multiple: true, folder
                                : "preppanda"
                        }}
                        onSuccess={(results: CloudinaryUploadWidgetResults) => {
                            const public_id = results.info.public_id;
                            setImageUrl(public_id)
                        }}
                        onError={(results: CloudinaryUploadWidgetResults) => {
                            console.log(results);
                        }}
                    />

                    {imageUrl != "" &&
                        <CldImage width="960"
                            height="600"
                            src={imageUrl}
                            sizes="100vw"
                            alt="Description of my image" />
                    }

                    <input className="bg-muted" type="text" name="answer" id="answer" value={question.answer} onChange={changeQuestion} />

                    <input className="bg-muted" type="text" value={option} onChange={changeOption} />
                    <ThemeButton handleClick={addOption} >
                        <p>Add Option</p>
                    </ThemeButton>

                    <input className="bg-muted" type="number" name="marks" id="marks" value={question.marks} onChange={changeQuestion}/>

                    <ul>
                        {options.map((option, index) => (
                            <li key={index} className="flex items-center gap-5">
                                {option}
                                <ThemeButton handleClick={() => removeOption(index)} >
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


