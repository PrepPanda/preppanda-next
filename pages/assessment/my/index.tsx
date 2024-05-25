import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import AssessmentCard from "@/components/Assessment/AssessmentCard";

const MyAssessments = () => {
  const session = useSession().data;
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssessments() {
      try {
        const res = await axios.get('/api/assessment/shared/' + session?.user.id);
        if (res.data.success) {
          setAssessments(res.data.data.reverse());
        } else {
          console.log("No assessments found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching assessments:", error);
        setLoading(false);
      }
    }

    if (session) {
      fetchAssessments();
    }
  }, [session]);

  return (
    <>
      <div className="flex flex-col relative items-center text-text mt-40">
        <h1 className="text-4xl text-foam font-bold mb-8">My Assessments</h1>
        {loading ? (
          <p>Loading...</p>
        ) : assessments.length === 0 ? (
          <p>No assessments available</p>
        ) : (
          <div className="flex flex-col items-center text-2xl">
            {assessments.map((assessment: any, index) => (
              <div key={index} className="grid grid-cols-4 auto-rows-max gap-8 text-3xl items-center my-4 place-items-center">
                <AssessmentCard assessment={assessment} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyAssessments


