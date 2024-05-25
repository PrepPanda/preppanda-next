import CryptoJS from 'crypto-js';
import AssessmentTimer from '@/components/Monitor/AssessmentTimer';
import Questions from '@/components/Monitor/Questions';
import AnswerButtons from '@/components/Monitor/AnswerButton';
import QuestionListButtons from '@/components/Monitor/QuestionListButtons';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import io from 'socket.io-client';
import axios from 'axios';
import { useRouter } from 'next/router';

const socket = io('http://localhost:5000');

const AssessmentMonitor = () => {
  const webcamRef = useRef(null);
  const [faceCount, setFaceCount] = useState(0);
  const [assessmentActive, setAssessmentActive] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      captureFrame();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const captureFrame = () => {
    if (!assessmentActive) return;
    if (!webcamRef.current) return;
    const imageSrc = (webcamRef.current as any).getScreenshot();
    const imageData = imageSrc.split(',')[1];
    const byteCharacters = atob(imageData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    socket.emit('frame', byteArray);
  };

  useEffect(() => {
    socket.on('face_count', count => {
      setFaceCount(count);
    });

    return () => {
      socket.off('face_count');
    };
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      setAssessmentActive(false);
    } else {
      setAssessmentActive(true);
    }
  };

  const session = useSession().data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [assessmentData, setAssessmentData] = useState<any>();
  const [startTime, setStartTime] = useState<Date>();

  useEffect(() => {
    const encryptedData = localStorage.getItem('originalAssessment');
    const startTimestampString = localStorage.getItem('startTimestamp');
    if (encryptedData && startTimestampString) {
      const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_CRYPTO_SECRET || '');
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setAssessmentData(assessmentData);
      const startTimestamp = parseInt(startTimestampString, 10);
      const startTime = new Date(startTimestamp);
      if (startTime) {
        setStartTime(startTime);
      }
      if (decryptedData) {
        setAssessmentData(decryptedData);
      }
    }
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevState: number) => prevState == assessmentData.questions.length - 1 ? prevState : prevState + 1);
  }

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex((prevState: number) => prevState == 0 ? prevState : prevState - 1);
  }

  const prepareDataForSubmission = () => {
    const questionsData = localStorage.getItem('userQuestionData')

    const userQuestionData = questionsData ? JSON.parse(questionsData) : null;

    const userQuestionStats = userQuestionData.map((item: any) => ({
      question_id: item.id,
      userAnswer: item.userAnswer,
      time: item.timestamps.reduce((acc: number, cur: number) => acc + cur, 0), // Calculate total time
    }));

    return userQuestionStats;
  };

  const handleSubmitQuiz = async () => {
    const owner = session?.user.id;
    const assessmentId = assessmentData._id;
    const startedTime = localStorage.getItem('startTimestamp');
    const startDate = startedTime ? new Date(parseInt(startedTime, 10)) : null;

    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - (startDate?.getTime() || 0);

    const timeDiffInMinutes = Math.floor(timeDifference / (1000 * 60));
    const userQuestionStats = prepareDataForSubmission();

    const data = {
      owner: owner,
      assessmentId: assessmentId,
      time: timeDiffInMinutes,
      userQuestionStats: userQuestionStats,
    }

    try {
      const res = await axios.post("api/assessment/complete", data)
      console.log(res)
      router.push('/assessment/given')
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
        width={200}
      />
      <p>Persons: {faceCount}</p>
      {/* Your AssessmentMonitor JSX content */}
      {startTime &&
        <AssessmentTimer startTime={startTime} duration={assessmentData.minutes} handleSubmitQuiz={handleSubmitQuiz}
        />
      }
      {
        assessmentData &&
        <div className="w-screen px-80">
          <Questions questions={assessmentData.questions} currentQuestionIndex={currentQuestionIndex}
            handleAnswerSubmit={() => { }}
          />
          <AnswerButtons handleNextQuestion={handleNextQuestion}
            handlePrevQuestion={handlePrevQuestion}
            handleSubmitQuiz={handleSubmitQuiz}
          />
          <QuestionListButtons questions={assessmentData.questions}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
          />
        </div>
      }
    </>
  );
};

export default AssessmentMonitor;
