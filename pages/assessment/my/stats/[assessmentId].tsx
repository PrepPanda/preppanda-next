"use client"

import PandaButton from "@/components/panda/PandaButton";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";

const AssessmentStats = () => {
  const router = useRouter();
  const { assessmentId } = router.query;
  const [assessment, setAssessment] = useState<any>();
  const [assessmentStats, setAssessmentStats] = useState<any>();
  const [userAssessment, setUserAssessment] = useState<any>();


  useEffect(() => {
    async function fetchAssessmentStats() {
      try {
        if (!assessmentId) return;
        const res = await axios.get(`/api/stats/assessment/${assessmentId}`);
        if (res.data.assessmentStats) {
          setAssessmentStats(res.data.assessmentStats);
        }
      }
      catch (error) {
        console.error("Error fetching assessment stats:", error);
      }
    }

    fetchAssessmentStats();
  }, [assessmentId]);

  useEffect(() => {
    async function fetchAssessment() {
      try {
        if (!assessmentId) return;
        const res = await axios.get(`/api/assessment/${assessmentId}`);
        setAssessment(res.data)
      }
      catch (error) {
        console.error("Error fetching assessment stats:", error);
      }
    }
    fetchAssessment()
  }, [assessmentId])

  useEffect(() => {
    async function fetchUserAssessmentStats() {
      try {
        if (!assessmentId) return;
        const userStatsData = []
        for (let userId of assessment.completeBy) {
          const res = await axios.get(`/api/user/${userId}`);
          userStatsData.push(res.data)
        }
        setUserAssessment(userStatsData);
      }
      catch (error) {
        console.error("Error fetching user assessment stats:", error);
      }
    }
    if (assessment) fetchUserAssessmentStats();
  }, [assessment]);

  const handleViewUserAssessmentStats = (userId: string) => {
    if (assessmentId) {
      localStorage.setItem('assessmentId', assessmentId.toString());
      router.push(`/userAssessmentStats/${userId}`);
    } else {
      console.error('assessmentId is undefined');
    }
  };

  return (<>
    <div className="flex flex-col gap-5 w-screen px-40 items-center justify-center mt-20">
      {assessment && assessmentStats && userAssessment &&
        <>
          <div className="text-5xl font-semibold text-rose">{assessment.name}</div>
          <div className="grid grid-cols-3 gap-5 text-2xl place-items-center">
            <div>Total Attempts</div>
            <div>Avg. Time(Given Time: {assessment.minutes})</div>
            <div>Avg. Score</div>
            <div>{assessmentStats.attempts}</div>
            <div>{assessmentStats.avgTime}</div>
            <div>{assessmentStats.avgScore}</div>
          </div>
          <div className="grid grid-cols-6 gap-5 text-2xl place-items-center">
            <div>Question</div>
            <div>Question Type</div>
            <div>Avg. Time</div>
            <div>Avg. Score</div>
            <div>Attempts</div>
            <div>Correct Attempts</div>
            {assessment && assessment.questions.map((question: any) => {
              const stats = assessmentStats && assessmentStats.questions.find((q: any) => q.question === question._id);
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

          <div className="text-2xl font-semibold">User Assessments:</div>
          <div className="grid grid-cols-2 gap-5 text-xl place-items-center">
            <div>UserName</div>
            <div>Show Details</div>
            {userAssessment.map((userStat: any) => (
              <React.Fragment key={userStat._id}>
                <div>{userStat.username}</div>
                <div>
                  <PandaButton
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    handleClick={() => handleViewUserAssessmentStats(userStat._id)}
                  >
                    View Stats
                  </PandaButton>
                </div>
              </React.Fragment>
            ))}
          </div>
        </>
      }
    </div>
  </>);
}

export default AssessmentStats;
