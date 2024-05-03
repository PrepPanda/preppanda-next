import axios from "axios";
import ThemeButton from "../shared/ThemeButton";
import { useSession } from "next-auth/react";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TestCard = ({ test }: any) => {
  const router = useRouter();
  const [expired, setExpired] = useState(false);
  const [given, setGiven] = useState(false);

  const startTest = async () => {
    try {
      const res = await axios.get("/api/test/" + test._id);
      const testData: any = res.data;

      const encryptedTestData = CryptoJS.AES.encrypt(JSON.stringify(testData),
        process.env.NEXT_PUBLIC_CRYPTO_SECRET
      ).toString();
      localStorage.setItem("originalTest", encryptedTestData);

      const currentTimestamp = new Date().getTime();
      localStorage.setItem("startTimestamp", currentTimestamp.toString());
      let temp_userQuestionData = [];
      testData.questions.map((que: any, index: number) => {
        const userQuestionObject = {
          "id": que._id,
          "timestamps": [],
          "userAnswer": ""
        }
        temp_userQuestionData.push(userQuestionObject)
      });
      // store the userQuestionData in the localStorage
      localStorage.setItem("userQuestionData", JSON.stringify(temp_userQuestionData))

      router.push("/test_monitor");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const date = new Date().toISOString();
    const expiresAt = test.expiresAt;
    if (expiresAt < date) {
      setExpired(true);
    }
  }, []);

  const userId = useSession().data?.user.id;

  useEffect(() => {
    const completedBy = test.completeBy;
    if (completedBy.includes(userId)) {
      setGiven(true);
    }
  }, []);

  const handleViewTestStats = () => {
    router.push(`/test/my/stats/${test._id}`);
  }

  return (
    <>
      <h2>{test.name}</h2>
      <p className="text-rose">{test.minutes}<span className="text-sm">mins</span></p>
      {!expired && !given && <ThemeButton handleClick={startTest}>Start Test</ThemeButton>}
      {given ? <p className='text-gold'>Given</p> : expired && <p className='text-rose'>Expired</p>}
      {userId === test.owner && (
        <ThemeButton handleClick={handleViewTestStats}>
          View Test Stats
        </ThemeButton>
      )}
      
    </>
  );
};

export default TestCard;

