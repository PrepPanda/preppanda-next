import DoghnutChart from "@/components/Charts/DoughnutChart";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AssessmentUserStatsPage = () => {
  const [assessmentStats, setAssessmentStats] = useState<any>();
  const router = useRouter();
  const { userId } = router.query;
  const [questionAttempts, setQuestionAttempts] = useState<questionAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  const [assessmentId, setAssessmentId] = useState<string | null>(null);

  useEffect(() => {
    const storedAssessmentId = localStorage.getItem('assessmentId');
    if (storedAssessmentId) {
      setAssessmentId(storedAssessmentId);
    } else {
      console.error('assessmentId not found in local storage');
    }
  }, []);

  useEffect(() => {
    async function fetchAssessmentStats() {
      try {
        if (!assessmentId || !userId) return;
        const res = await axios.get("/api/stats/users/fetchUserAssessmentStat/", { params: { assessmentId: assessmentId, userId: userId } });
        const questionAttempts: questionAttempt[] = [];

        for (const question of res.data.questions) {
          const attempts = question.attempts;
          const correctAttempts = question.correctAttempts;
          const incorrectAttempts = attempts - correctAttempts;
          questionAttempts.push({ questionId: question._id, attempts, correctAttempts, incorrectAttempts });
        }
        setAssessmentStats(res.data);
        setQuestionAttempts(questionAttempts);
        setLoading(false);
      }
      catch (error) {
        console.error("Error fetching assessment stats:", error);
      }
    }

    fetchAssessmentStats();
  }, [assessmentId, userId]);

  return (
    <>
      {assessmentStats && (
        <div className="flex flex-col gap-5 w-screen px-40 items-center justify-center mt-20 text-2xl">
          <h2 className="text-3xl text-gold">User Assessment Stats:</h2>
          <div className="text-2xl px-40 ">
            <div>Attempts: {assessmentStats.userAssessmentStat.attempts}</div>
            <div>Average Score: {assessmentStats.userAssessmentStat.avgScore}</div>
            <div>Average Time: {assessmentStats.userAssessmentStat.avgTime}</div>
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

export default AssessmentUserStatsPage;
