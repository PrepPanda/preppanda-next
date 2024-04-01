import DoghnutChart from "@/components/Charts/DoughnutChart";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserTestStatsPage = () => {
  const session = useSession().data;
  const [testStats, setTestStats] = useState<any>();
  const router = useRouter();
  const { testId } = router.query;
  const [questionAttempts, setQuestionAttempts] = useState<questionAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestStats() {
      try {
        if (!testId) return; // Ensure testId is available before making the request
        console.log("testId:", testId);
        console.log("userId:", session?.user.id);

        const res = await axios.get("/api/stats/users/fetchUserTestStat/", { params: { testId: testId, userId: session?.user.id } });
        const questionAttempts: questionAttempt[] = [];

        for (const question of res.data.questions) {
          const attempts = question.attempts;
          const correctAttempts = question.correctAttempts;
          const incorrectAttempts = attempts - correctAttempts;
          questionAttempts.push({ questionId: question._id, attempts, correctAttempts, incorrectAttempts });
        }

        console.log(res.data);
        setTestStats(res.data);
        setQuestionAttempts(questionAttempts);
        setLoading(false);
      }
      catch (error) {
        console.error("Error fetching test stats:", error);
      }
    }

    if (session) {
      fetchTestStats(); // Call fetchTestStats inside useEffect
    }
  }, [session, testId]); // Add testId as a dependency

  return (
    <>
      <ul className="text-xl px-40 mt-40">
        <li>
          Bar Chart: Compare the average score for each question. Each bar would represent a question, and the height of the bar would represent the average score.
        </li>
        <li>
          Line Chart: Show the average time taken to answer each question. Each line would represent a question, and the points on the line would indicate the average time.
        </li>
        <li>
          Pie Chart: Pie chart to show the distribution of correct and incorrect attempts for each question. Each slice of the pie would represent either a correct or incorrect attempt.
        </li>
        <li>
          Scatter Plot: To visualize the relationship between the average time taken and the average score for each question. Each point on the plot would represent a question, with the x-axis representing the average time and the y-axis representing the average score.
        </li>
      </ul>

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

export default UserTestStatsPage;

