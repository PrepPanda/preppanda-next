// Purpose: To complete a test and calculate the score of the user.

import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/dbconnect";
import Test from "@/models/test";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    if (method == "POST") {
        try {
            const data = req.body;
            await connectDB();
            const owner = data.owner;
            const testId = data.testId;
            const test = await Test.findById(testId);
            const time = data.time;
            test.completedBy.push(owner);
            await test.save();

            const userQeustionStats = data.userQeustionStats;
            const questionsStats = [];
            let testScore = 0;

            for (let i = 0; i < test.questions.length; i++) {
                const question = test.questions[i]._id;
                const userAnswer = userQeustionStats[i].userAnswer;
                const time = userQeustionStats[i].time;
                let attempt = false;
                let right = false;
                let score = 0;
                if(userAnswer != null || userAnswer != "") {
                    attempt = true;
                }
                if(userAnswer == question.correctAnswer) {
                    score = question.marks;
                    testScore += score;
                    right = true;
                }
                const questionStat = {
                    question,
                    userAnswer,
                    attempt,
                    right,
                    time,
                    score,
                }
                questionsStats.push(questionStat);
            }

            await axios.post("http://localhost:3000/api/stats/test/" + testId, { score:testScore, time, questionsStats });
            await axios.post("http://localhost:3000/api/stats/user/" + owner, { testId, score:testScore, time, questionsStats });

            res.status(200).json({ text: "Test completed successfully" });
        }
        catch (e) {
            console.log(e);
            res.status(400).json({ success: false });
        }
    }
    else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
