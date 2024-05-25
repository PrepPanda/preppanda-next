import GivenAssessmentCard from "@/components/Assessment/GivenAssessmentCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const TakenAssessment = () => {
  const session = useSession().data;
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssessments() {
      try {
        const res = await axios.get("/api/assessment/given/" + session?.user.id);
        setAssessments(res.data.data.reverse());
        setLoading(false);
      }
      catch (error) {
        console.error(error);
      }
    }
    if (session) {
      fetchAssessments();
    }

  }, [session]);
  return (
    <div className="flex flex-col mt-40 text-3xl w-screen items-center">
      <p className="text-4xl font-semibold text-foam ">Assessments you have taken:</p>
      {loading ? (
        <p>Loading...</p>
      ) : assessments.length === 0 ? (
        <p>No assessments available</p>
      ) : (
        <div className="flex flex-col items-center mt-10">
          {assessments.map((assessment: any, index) => (
            <div key={index} className="flex gap-5 items-center my-4">
              <GivenAssessmentCard assessment={assessment} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default TakenAssessment


