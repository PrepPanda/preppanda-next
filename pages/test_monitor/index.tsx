import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import TestTimer from '@/components/TestMonitor/TestTimer';
import Questions from '@/components/Monitor/Questions';
import AnswerButtons from '@/components/Monitor/AnswerButton';
import QuestionListButtons from '@/components/Monitor/QuestionListButtons';
import { useSession } from 'next-auth/react';

const TestMonitor = () => {
  const session = useSession().data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [testData, setTestData] = useState<any>();
  const [startTime, setStartTime] = useState<Date>();

  // fetch the originalTest data and starting timeStamp from the localstorage
  useEffect(() => {
    console.log("Session: ", session)
    const encryptedData = localStorage.getItem('originalTest');
    const startTimestampString = localStorage.getItem('startTimestamp');
    if (encryptedData && startTimestampString) {
      const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_CRYPTO_SECRET);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setTestData(testData);
      const startTimestamp = parseInt(startTimestampString, 10);
      const startTime = new Date(startTimestamp);
      if (startTime) {
        setStartTime(startTime);
      }
      if (decryptedData) {
        setTestData(decryptedData);
      }
      console.log('Decrypted Test Data:', decryptedData);
      console.log('Start Time:', startTime);
    }
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevState: number) => prevState == testData.questions.length - 1 ? prevState : prevState + 1);
  }

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevState: number) => prevState == 0 ? prevState : prevState - 1);
  }

  const handleSubmitQuiz = () => {
    const testId = session?.user.id;

  }

  return (
    <>
      {/* Your TestMonitor JSX content */}
      {startTime &&
        <TestTimer startTime={startTime} duration={testData.minutes} />
      }
      {
        testData &&
        <div className="w-screen px-80">
          <Questions questions={testData.questions} currentQuestionIndex={currentQuestionIndex}
            handleAnswerSubmit={() => { }}
          />
          <AnswerButtons handleNextQuestion={handleNextQuestion}
            handlePrevQuestion={handlePrevQuestion}
            handleSubmitQuiz={handleSubmitQuiz}
          />
          <QuestionListButtons questions={testData.questions}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
          />
        </div>
      }
    </>
  );
};

export default TestMonitor;


