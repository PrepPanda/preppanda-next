import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import TestCard from "@/components/Test/TestCard";

const MyTests = () => {
  const session = useSession().data;
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTests() {
      try {
        const res = await axios.get('/api/test/shared/' + session?.user.id);
        if (res.data.success) {
          setTests(res.data.data.reverse() );
        } else {
          console.log("No tests found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tests:", error);
        setLoading(false);
      }
    }

    if (session) {
      fetchTests();
    }
  }, [session]);



  return (
    <>
      <div className="flex flex-col relative items-center text-text mt-40">
        <h1 className="text-4xl text-foam font-bold mb-8">My Tests</h1>
        {loading ? (
          <p>Loading...</p>
        ) : tests.length === 0 ? (
          <p>No tests available</p>
        ) : (
          <div className="flex flex-col items-center text-2xl">
            {tests.map((test: any, index) => (
              <div key={index} className="grid grid-cols-4 auto-rows-max gap-8 text-3xl items-center my-4 place-items-center">
                <TestCard test={test} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyTests


