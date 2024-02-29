"use client";

import { CldUploadButton } from "next-cloudinary";
import { CloudinaryUploadWidgetResults } from "cloudinary";
import { useState } from "react";

const CustomQuestionForm = () => {
    const [question, setQuestion] = useState({
        question: "",
        image: "",
        answer: ""
    });
    const [option, setOption] = useState("");
    const [options, setOptions] = useState<string[]>([]);

    const changeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion({ ...question, [e.target.name]: e.target.value });
    }

    const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption(e.target.value);
    }

    const addOption = () => {
        setOptions([...options, option]);
        setOption("");
    }

    const removeOption = (index: number) => {
        setOptions(options.filter((_, i) => i !== index));
    }

    const submit = () => {
        console.log(question);
        console.log(options);
        // store the question and options in the local storage
        const questions = JSON.parse(localStorage.getItem("questions") || "[]");
        questions.push({ ...question, options });
        localStorage.setItem("questions", JSON.stringify(questions));
        // reset the form
        setQuestion({ question: "", image: "", answer: "" });
        setOptions([]);

    }

    return (
        <>
            <div className="flex flex-col xl:flex-row items-center justify-center w-screen px-24 mt-10">
                <div className="relative z-10 w-screen flex flex-col items-center justify-center bg-base">
                    <h1 className="text-5xl font-bold text-gold">Create Test</h1>
                    <input type="text" name="question" id="question" value={question.question} onChange={changeQuestion} />
                    <CldUploadButton
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
                        options={{
                            multiple: true, folder
                                : "preppanda"
                        }}
                        onSuccess={(results: CloudinaryUploadWidgetResults) => {
                            const publicId = results.info.public_id;
                            setQuestion({ ...question, image: publicId });
                        }}
                        onError={(results: CloudinaryUploadWidgetResults) => {
                        }}
                    />

                    <input type="text" name="answer" id="answer" value={question.answer} onChange={changeQuestion} />

                    <input type="text" value={option} onChange={changeOption} />
                    <button onClick={addOption}>Add Option</button>

                    <ul>
                        {options.map((option, index) => (
                            <li key={index}>
                                {option}
                                <button onClick={() => removeOption(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>

                    <button onClick={submit}>Submit</button>
                </div>
            </div>
        </>
    )
}

export default CustomQuestionForm;
