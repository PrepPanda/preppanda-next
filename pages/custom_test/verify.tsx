import { useEffect, useState } from "react";
import Question from "@/components/shared/Question/verify/Question";

const VerifyTest = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetched_data = localStorage.getItem('uploadedData');
        if (fetched_data) {
            const parsedData = JSON.parse(fetched_data).data;
            setData(parsedData);
            console.log(parsedData);

        }

    }, []);

    return (
        <div className="my-44 px-24 w-screen flex flex-col items-center justify-center">
            <p>You can verify the questions and answer and change it if you want and select the right answer for every question.</p>
            <div className="flex flex-row flex-wrap w-full items-center justify-center my-20">
                {data && data.map((questiondata:any, index:any) => (
                    <Question key={index} questiondata={questiondata} />
                ))}
            </div>
        </div>
    );
};

export default VerifyTest;

