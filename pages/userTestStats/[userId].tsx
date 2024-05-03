import DoghnutChart from "@/components/Charts/DoughnutChart";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TestUserStatsPage = () => {
    const session = useSession().data;
    const [testStats, setTestStats] = useState<any>();
    const router = useRouter();
    const { userId } = router.query;
    const [questionAttempts, setQuestionAttempts] = useState<questionAttempt[]>([]);
    const [loading, setLoading] = useState(true);
  
    const [testId, setTestId] = useState<string | null>(null);
  
    useEffect(() => {
      const storedTestId = localStorage.getItem('testId');
      if (storedTestId) {
        setTestId(storedTestId);
      } else {
        console.error('testId not found in local storage');
      }
    }, []);
  
    useEffect(() => {
      async function fetchTestStats() {
        try {
          if (!testId || !userId) return; 
  
          const res = await axios.get("/api/stats/users/fetchUserTestStat/", { params: { testId: testId, userId: userId } });
  
          const questionAttempts: questionAttempt[] = [];
  
          for (const question of res.data.questions) {
            const attempts = question.attempts;
            const correctAttempts = question.correctAttempts;
            const incorrectAttempts = attempts - correctAttempts;
            questionAttempts.push({ questionId: question._id, attempts, correctAttempts, incorrectAttempts });
          }
  
          console.log("User Test Stats", res.data);
          setTestStats(res.data);
          setQuestionAttempts(questionAttempts);
          setLoading(false);
        }
        catch (error) {
          console.error("Error fetching test stats:", error);
        }
      }
  
      fetchTestStats(); 
    }, [testId, userId]); 
  
    return (
      <>
        {testStats && (
        <div className="flex flex-col gap-5 w-screen px-40 items-center justify-center mt-20 text-2xl">
            <h2 className="text-3xl text-gold">User Test Stats:</h2>
            <div className="text-2xl px-40 ">
                <div>Attempts: {testStats.userTestStat.attempts}</div>
                <div>Average Score: {testStats.userTestStat.avgScore}</div>
                <div>Average Time: {testStats.userTestStat.avgTime}</div>
                </div>
            
            <h2 className="text-3xl text-gold mt-20">Question Stats:</h2>
          </div>
        )}
  
  
        <div className="w-screen grid grid-cols-3 grid-rows-3  px-40 items-center">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            questionAttempts.map((questionAttempt, index) => (
              <DoghnutChart
                key={index}
                data={{
                  labels: ["Attempted", "Correct", "Incorrect"],
                  data: [questionAttempt.attempts, questionAttempt.correctAttempts, questionAttempt.incorrectAttempts],
                  name: `Question ${index + 1}`
                }}
              />
            ))
          )}
        </div>
      </>
    );
  };
  
interface questionAttempt {
  questionId: string;
  attempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
}

export default TestUserStatsPage;

