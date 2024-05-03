"use client"

import ThemeButton from "@/components/shared/ThemeButton";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";

const TestStats = () => {
    const router = useRouter();
    const { testId } = router.query;
    const [test, setTest]= useState<any>();
    const [testStats, setTestStats] = useState<any>();
    const [userTest, setUserTest] = useState<any>();


    useEffect(() => {
        async function fetchTestStats() {
            try {
                if (!testId) return; // Ensure testId is available before making the request
                const res = await axios.get(`/api/stats/test/${testId}`);
                // console.log(res)
                if (res.data.testStats) {
                    setTestStats(res.data.testStats);
                }
            }
            catch (error) {
                console.error("Error fetching test stats:", error);
            }
        }

        fetchTestStats();
    },[]);

    useEffect(() => {
        async function fetchTest() {
            try {
                if (!testId) return; // Ensure testId is available before making the request
                const res = await axios.get(`/api/test/${testId}`);
                // console.log("TEst", res)
                setTest(res.data)
            }
            catch (error) {
                console.error("Error fetching test stats:", error);
            }
        }
        fetchTest()
    }, [])

    useEffect(() => {
        async function fetchUserTestStats() {
            try {
                if (!testId) return; // Ensure testId is available before making the request
                const userStatsData = []
                for(let userId of test.completeBy) {
                    const res = await axios.get(`/api/user/${userId}`);
                    // console.log(res)
                    userStatsData.push(res.data)
                    // console.log(userId)
                }
                console.log(userStatsData)
                setUserTest(userStatsData);
            }
            catch (error) {
                console.error("Error fetching user test stats:", error);
            }
        }
        console.log(test)
        if(test) fetchUserTestStats();
    }, [test]);

    const handleViewUserTestStats = (userId: string) => {
        if (testId) {   
            localStorage.setItem('testId', testId);
            router.push(`/userTestStats/${userId}`);
        } else {
            console.error('testId is undefined');
        }
    };

    return (<>
        <div className="flex flex-col gap-5 w-screen px-40 items-center justify-center mt-20">
            {test && testStats && userTest &&
            <>
                <div className="text-5xl font-semibold text-rose">{test.name}</div>
                <div className="grid grid-cols-3 gap-5 text-2xl place-items-center">
                    <div>Total Attempts</div>
                    <div>Avg. Time(Given Time: {test.minutes})</div>
                    <div>Avg. Score</div>
                    <div>{testStats.attempts}</div>
                    <div>{testStats.avgTime}</div>
                    <div>{testStats.avgScore}</div>
                </div>
                <div className="grid grid-cols-6 gap-5 text-2xl place-items-center">
                    <div>Question</div>
                    <div>Question Type</div>
                    <div>Avg. Time</div>
                    <div>Avg. Score</div>
                    <div>Attempts</div>
                    <div>Correct Attempts</div>
                    {test && test.questions.map((question: any) => {
                    const stats = testStats && testStats.questions.find((q: any) => q.question === question._id);
                    return (
                        <React.Fragment key={question._id}>
                        <div>{question.question}</div>
                        <div>{question.type}</div>
                        <div>{stats ? stats.avgTime : '-'}</div>
                        <div>{stats ? stats.avgScore : '-'}</div>
                        <div>{stats ? stats.attempts : '-'}</div>
                        <div>{stats ? stats.correctAttempts : '-'}</div>
                        </React.Fragment>
                    );
                    })}
                </div>

                <div className="text-2xl font-semibold">User Tests:</div>
                    <div className="grid grid-cols-2 gap-5 text-xl place-items-center">
                        <div>UserName</div>
                        <div>Show Details</div>
                        {userTest.map((userStat: any) => (
                            <React.Fragment key={userStat._id}>
                                <div>{userStat.username}</div>
                                <div>
                                    <ThemeButton
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        handleClick={() => handleViewUserTestStats(userStat._id)}
                                    >
                                        View Stats
                                    </ThemeButton>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                

                {/* <div className="text-3xl">
                    test:{JSON.stringify(test)}
                    <hr/>
                    <br/>
                    <hr/>
                    testStats:{JSON.stringify(testStats)}
                    <hr/>
                    <br/>
                    <hr/>
                    {JSON.stringify(userTest)}
                </div> */}
            </>
            }
        </div>
    </>);
}

export default TestStats;