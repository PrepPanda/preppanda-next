import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import TestCard from "@/components/Test/TestCard";

const SharedTests = () => {
    const session = useSession().data;
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const res = await axios.get('/api/test/shared/user/' + session?.user.id);
                if (res.data.success) {
                    setTests(res.data.data);
                } else {
                    console.log("No tests found");
                }
            } catch (error) {
                console.error("Error fetching tests:", error);
            }
            setLoading(false);
        }
        if(session){
            fetchTests();
        }
    }, [session]);


    return (
        <>
             <div className="flex flex-col relative items-center text-text mt-40">
                <h1 className="text-4xl font-bold mb-8">My Tests</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : tests.length === 0 ? (
                    <p>No tests available</p>
                ) : (
                    <div className="flex flex-col items-center text-2xl">
                        {tests.map((test: any, index) => (
                            <div key={index} className="flex gap-5 items-center my-4">
                                <TestCard test={test}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default SharedTests;

