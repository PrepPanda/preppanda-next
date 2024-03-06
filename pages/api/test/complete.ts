// Purpose: To complete a test and calculate the score of the user.

import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/dbconnect";
import Test from "@/models/test";
import axios from "axios";
import Question from "@/models/question";

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

            if (!test) {
                throw new Error("Test not found");
            }
            if (!test.completeBy) {
                test.completeBy = [];
            }
            // find if the user has already completed the test
            // if (test.completedBy.includes(owner)) {
            //    res.status(400).json({ error: "Test already completed" });
            //    throw new Error("Test already completed");
            // }

            if(!test.completeBy.includes(owner)){
                test.completeBy.push(owner);
                await test.save();
            }

            const userQeustionStats = data.userQeustionStats;
            const questionsStats = [];
            let testScore = 0;

            for (let i = 0; i < test.questions.length; i++) {
                const question_id = test.questions[i]._id;
                const question:any = await Question.findOne({ _id: question_id });
                // console.log("question:", question);
                const userAnswer = userQeustionStats[i].userAnswer;
                const time = userQeustionStats[i].time;
                let attempt = false;
                let right = false;
                let score = 0;
                if (userAnswer != null || userAnswer != "") {
                    attempt = true;
                }
                // console.log("userAnswer:", userAnswer);
                // console.log("question.correctAnswer:", question.correctAnswer);
                if (userAnswer == question.correctAnswer) {
                    console.log("right answer");
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
                // console.log(questionStat)
                questionsStats.push(questionStat);
            }

            console.log("in: stats/test/");
            try {
                await axios.post("http://localhost:3000/api/stats/test/" + testId, { score: testScore, time, questionsStats });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log("in: stats/users/");
            try {
                await axios.post("http://localhost:3000/api/stats/users/" + owner, { testId, score: testScore, time, questionsStats });
            } catch (error) {
               // console.error(error);
                console.error("Error in stats/users/");
                res.status(500).json({ error: 'Internal Server Error' });
            }

            res.status(200).json({ text: "Test completed successfully" });
        }
        catch (e) {
            console.log(e)
            res.status(400).json({ success: false });
        }
    }
    else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
