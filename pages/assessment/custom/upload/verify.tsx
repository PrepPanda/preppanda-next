import { useEffect, useState } from "react";
import Question from "@/components/panda/Question/verify/Question";
import PandaButton from "@/components/panda/PandaButton";
import { useRouter } from "next/router";

const VerifyAssessment = () => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const fetched_data = localStorage.getItem('questions');
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

  const handleAnswerChange = (index: number, newAnswer: string) => {
    setData((prevData: any) => {
      const newData = [...prevData];
      newData[index].answer = newAnswer;
      return newData;
    });
  };

  const handleVerified = () => {
    try {
      localStorage.setItem('questions', JSON.stringify({ data: data }));
      router.push('/assessment/custom/save');
    }
    catch (e) {
      console.log("Error: ", e)
    }
  }

  const changeVerified = () => {
    setVerified(prev => !prev);
  }

  return (
    <div className="my-44 px-24 w-screen flex flex-col items-center justify-center">
      <p>You can verify the questions and answer and change it if you want and select the right answer for every question.</p>
      <div className="flex flex-row flex-wrap w-full items-center justify-center my-20 z-20">
        {data && data.map((questiondata: any, index: any) => (
          <Question
            key={`${index}_${questiondata}_${Math.random()}`}
            currentQuestionIndex={index}
            questiondata={questiondata}
            uniqueValue={index}
            deleteQuestion={deleteQuestion}
            handleAnswerChange={handleAnswerChange}

          />
        ))}
      </div>
      <div className="flex gap-2 my-4 z-10">
        <input type="checkbox" name="verified" id="verified" onChange={() => changeVerified()} />
        <label>You totaly agree with all the questions and answer and you verified it.</label>
      </div>
      <PandaButton handleClick={handleVerified} disabled={!verified}>
        <p>Verified</p>
      </PandaButton>
    </div>
  );
};

export default VerifyAssessment;

