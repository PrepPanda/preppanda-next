// params: questions
// Method: POST
// Desc: Create questions and test
// Purpose: Handle requests to /api/tests/upload

import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/dbconnect";
import Question from "@/models/question";
import Test from "@/models/test";
import User from "@/models/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "POST") {
        try {
            const data = req.body;
            await connectDB();
            console.log("Connected");

            const questions = data.questions;
            const user_id = data.user.id;

            // find user
            const user = await User.findById(user_id);

            // Create and save questions
            const savedQuestions = await Promise.all(
                questions.map(async (question: any) => {
                    const newQuestion = new Question({
                        question: question.question,
                        correctAnswer: question.answer,
                        options: question.options,
                    });
                    return await newQuestion.save();
                })
            );

            // Create and save test
            const newTest = new Test({
                name: data.testName,
                minutes: data.totalMins,
                owner: user,
                expiresAt: data.expireDate,
                questions: savedQuestions.map(question => question._id),
                sharedWith: data.sharedWith || [],
            });

            await newTest.save();

            res.status(200).json({ text: "Questions and test created successfully" });
            console.log("Success");
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(200).json({ text: "Bye" });
        console.log("Helloa");
    }
}


