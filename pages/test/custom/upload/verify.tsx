import { useEffect, useState } from "react";
import Question from "@/components/shared/Question/verify/Question";
import ThemeButton from "@/components/shared/ThemeButton";
import {useRouter} from "next/router";

const VerifyTest = () => {
    const router = useRouter();
    const [data, setData] = useState<any>(null);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const fetched_data = localStorage.getItem('uploadedData');
        if (fetched_data) {
            const parsedData = JSON.parse(fetched_data).data;
            setData(parsedData);
        }
    }, []);

    const deleteQuestion = (index: number) => {
        setData((prevData: any) => {
            const newData = JSON.parse(JSON.stringify(prevData));
            newData.splice(index, 1);
            return newData;
        });
    };

    const handleAnswerChange = (index:number, newAnswer: String) => {
        setData((prevData: any) => {
            const newData = JSON.parse(JSON.stringify(prevData));
            newData[index].answer = newAnswer;
            return newData;
        });
    }

    const handleVerified = () => {
        try {
            localStorage.setItem('uploadedData', JSON.stringify({data: data}));
            router.push('/test/custom/upload/save');
        }
        catch(e) {
            console.log("Error: ", e)
        }
        console.log("In verified");
    }

    const changeVerified = () => {
        setVerified(prev => !prev);
        console.log("In change" + verified);
    }

    return (
        <div className="my-44 px-24 w-screen flex flex-col items-center justify-center">
            <p>You can verify the questions and answer and change it if you want and select the right answer for every question.</p>
            <div className="flex flex-row flex-wrap w-full items-center justify-center my-20 z-20">
                {data && data.map((questiondata: any, index: any) => (
                    <Question
                        key={`${index}_${questiondata}_${Math.random()}`}
                        questiondata={questiondata}
                        uniqueValue={index}
                        deleteQuestion={deleteQuestion}
                        handleAnswerChange={(newAnswer: String) => handleAnswerChange(index, newAnswer)}
                    />
                ))}
            </div>
            <div className="flex gap-2 my-4">
                <input type="checkbox" name="verified" id="verified" onChange={() => changeVerified()}/>
                <label>You totaly agree with all the questions and answer and you verified it.</label>
            </div>
            <ThemeButton text="verified" handleClick={handleVerified} disabled={!verified}/>
        </div>
    );
};

export default VerifyTest;

