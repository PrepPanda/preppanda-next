import DoghnutChart from "@/components/Charts/DoughnutChart";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserAssessmentStatsPage = () => {
  const session = useSession().data;
  const [assessmentStats, setAssessmentStats] = useState<any>();
  const router = useRouter();
  const { assessmentId } = router.query;
  const [questionAttempts, setQuestionAttempts] = useState<questionAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssessmentStats() {
      try {
        if (!assessmentId) return;
        const res = await axios.get("/api/stats/users/fetchUserAssessmentStat/", { params: { assessmentId: assessmentId, userId: session?.user.id } });
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
    if (session) {
      fetchAssessmentStats();
    }
  }, [session, assessmentId]);

  return (
    <>
      <div className="w-screen grid grid-cols-3 grid-rows-3 mt-40 px-40 items-center">
        {
          loading ? <h1>Loading...</h1> :
            questionAttempts.map((questionAttempt, index) => {
              return (
                <DoghnutChart key={index} data={{
                  labels: ["Attempted", "Correct", "Incorrect"],
                  data: [questionAttempt.attempts, questionAttempt.correctAttempts, questionAttempt.incorrectAttempts],
                  name: `Question ${index + 1}`
                }} />
              );
            }
            )
        }
      </div>
    </>
  );
}

interface questionAttempt {
  questionId: string;
  attempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
}

export default UserAssessmentStatsPage;

