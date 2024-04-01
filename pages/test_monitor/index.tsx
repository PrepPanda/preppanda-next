import CryptoJS from 'crypto-js';
import TestTimer from '@/components/TestMonitor/TestTimer';
import Questions from '@/components/Monitor/Questions';
import AnswerButtons from '@/components/Monitor/AnswerButton';
import QuestionListButtons from '@/components/Monitor/QuestionListButtons';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const TestMonitor = () => {
  const webcamRef = useRef(null);
  const [faceCount, setFaceCount] = useState(0);

  useEffect(() => {
    // Set up a timer to capture frames periodically
    const timer = setInterval(() => {
      captureFrame();
    }, 1000); // Adjust the interval (in milliseconds) as needed

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  const captureFrame = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageData = imageSrc.split(',')[1]; // Extract base64 data from data URL
    const byteCharacters = atob(imageData); // Decode base64 to byte characters
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers); // Convert to Uint8Array (bytes)
    socket.emit('frame', byteArray); // Send bytes data to backend
  };

  useEffect(() => {
    // Listen for face count updates from the server
    socket.on('face_count', count => {
      setFaceCount(count);
    });

    // Clean up socket listener when the component unmounts
    return () => {
      socket.off('face_count');
    };
  }, []);


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

  const prepareDataForSubmission = () => {
    const questionsData = localStorage.getItem('userQuestionData')

    const userQuestionData = JSON.parse(questionsData);

    // Extract required information from userQuestionData
    const userQuestionStats = userQuestionData.map((item) => ({
      question_id: item.id,
      userAnswer: item.userAnswer,
      time: item.timestamps.reduce((acc, cur) => acc + cur, 0), // Calculate total time
    }));

    return userQuestionStats;
  };

  const handleSubmitQuiz = async () => {
    const owner = session?.user.id;
    const testId = testData._id;
    const startedTime = localStorage.getItem('startTimestamp')
    const startDate = new Date(parseInt(startedTime, 10));

    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - startDate.getTime();

    const timeDiffInMinutes = Math.floor(timeDifference / (1000 * 60));
    const userQuestionStats = prepareDataForSubmission();

    const data = {
      owner: owner,
      testId: testId,
      time: timeDiffInMinutes,
      userQuestionStats: userQuestionStats,
    }

    try {
      const res = await axios.post("api/test/complete", data)
      console.log(res)
    }
    catch (e) {
      console.log("There is error in the request")
    }

  }

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <p>Number of Faces: {faceCount}</p>
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


