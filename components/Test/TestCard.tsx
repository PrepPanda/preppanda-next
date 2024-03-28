import axios from "axios";
import ThemeButton from "../shared/ThemeButton";
import { useSession } from "next-auth/react";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";

const TestCard = ({ test }: any) => {
  const router = useRouter();
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

  const userId = useSession().data?.user.id;

  return (
    <>
      <h2>{test.name}</h2>
      <p className="text-rose">{test.minutes}mins</p>
      <ThemeButton handleClick={startTest}>Start Test</ThemeButton>
      {userId === test.owner && (
        <ThemeButton handleClick={() => console.log("clicked")}>
          Edit Test
        </ThemeButton>
      )}
    </>
  );
};

export default TestCard;

