import axios from "axios";
import PandaButton from "../panda/PandaButton";
import { useSession } from "next-auth/react";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AssessmentCard = ({ assessment }: any) => {
  const router = useRouter();
  const [expired, setExpired] = useState(false);
  const [given, setGiven] = useState(false);

  const startAssessment = async () => {
    try {
      const res = await axios.get("/api/assessment/" + assessment._id);
      const assessmentData: any = res.data;

      const secretKey = process.env.NEXT_PUBLIC_CRYPTO_SECRET;
      if (!secretKey) {
        throw new Error('Missing encryption secret key');
      }

      const encryptedAssessmentData = CryptoJS.AES.encrypt(
        JSON.stringify(assessmentData),
        secretKey
      ).toString();
      localStorage.setItem("originalAssessment", encryptedAssessmentData);

      const currentTimestamp = new Date().getTime();
      localStorage.setItem("startTimestamp", currentTimestamp.toString());
      let temp_userQuestionData: any[] = [];
      assessmentData.questions.map((que: any, index: number) => {
        const userQuestionObject = {
          "id": que._id,
          "timestamps": [],
          "userAnswer": ""
        }
        temp_userQuestionData.push(userQuestionObject)
      });
      localStorage.setItem("userQuestionData", JSON.stringify(temp_userQuestionData))
      router.push("/assessment_monitor");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const date = new Date().toISOString();
    const expiresAt = assessment.expiresAt;
    if (expiresAt < date) {
      setExpired(true);
    }
  }, []);

  const userId = useSession().data?.user.id;

  useEffect(() => {
    const completedBy = assessment.completeBy;
    if (completedBy.includes(userId)) {
      setGiven(true);
    }
  }, []);

  const handleViewAssessmentStats = () => {
    router.push(`/assessment/my/stats/${assessment._id}`);
  }

  return (
    <>
      <h2>{assessment.name}</h2>
      <p className="text-rose">{assessment.minutes}<span className="text-sm">mins</span></p>
      <PandaButton handleClick={startAssessment}>Start Assessment</PandaButton>
      {!expired && !given && <PandaButton handleClick={startAssessment}>Start Assessment</PandaButton>}
      {given ? <p className='text-gold'>Given</p> : expired && <p className='text-rose'>Expired</p>}
      {userId === assessment.owner && (
        <PandaButton handleClick={handleViewAssessmentStats}>
          View Assessment Stats
        </PandaButton>
      )}

    </>
  );
};

export default AssessmentCard;
