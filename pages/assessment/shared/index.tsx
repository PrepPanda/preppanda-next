import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import AssessmentCard from "@/components/Assessment/AssessmentCard";

const SharedAssessments = () => {
    const session = useSession().data;
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const res = await axios.get('/api/assessment/shared/user/' + session?.user.id);
                if (res.data.success) {
                    setAssessments(res.data.data);
                } else {
                    console.log("No assessments found");
                }
            } catch (error) {
                console.error("Error fetching assessments:", error);
            }
            setLoading(false);
        }
        if(session){
            fetchAssessments();
        }
    }, [session]);


    return (
        <>
             <div className="flex flex-col relative items-center text-text mt-40">
                <h1 className="text-4xl font-bold mb-8">My Assessments</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : assessments.length === 0 ? (
                    <p>No assessments available</p>
                ) : (
                    <div className="flex flex-col items-center text-2xl">
                        {assessments.map((assessment: any, index) => (
                            <div key={index} className="flex gap-5 items-center my-4">
                                <AssessmentCard assessment={assessment}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default SharedAssessments;

