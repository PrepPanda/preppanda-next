import GivenTestCard from "@/components/Test/GivenTestCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const TakenTest = () => {
    const session = useSession().data;
    const [tests, setTests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTests() {
            try {
                const res = await axios.get("/api/test/given/" + session?.user.id);
                console.log(res.data.data);
                setTests(res.data.data);
                setLoading(false);
            }
            catch (error) {
                console.error(error);
            }
        }
        if (session) {
            fetchTests();
        }

    }, [session]);
    return (
        <div className="flex flex-col mt-40 text-3xl w-screen items-center">
            <p>Tests you have taken:</p>
            {loading ? (
                <p>Loading...</p>
            ) : tests.length === 0 ? (
                <p>No tests available</p>
            ) : (
                <div className="flex flex-col items-center text-2xl">
                    {tests.map((test: any, index) => (
                        <div key={index} className="flex gap-5 items-center my-4">
                            <GivenTestCard test={test} />
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default TakenTest


