// Purpose: Create a new test and save it to the database
// Handler for requests to /api/test

import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/dbconnect";
import Question from "@/models/question";
import Test from "@/models/test";
import User from "@/models/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const method = req.method;
    if (method == "POST") {
        try {
            const data = req.body.testData;
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

            const sharedWith = await Promise.all(
                data.sharedWith.map(async (id: any) => {
                    const newUser = await User.findById(id);
                    return newUser;
                })
            );


            // Create and save test
            const newTest = new Test({
                name: data.testName,
                minutes: data.totalMins,
                owner: user,
                expiresAt: data.expireDate,
                questions: savedQuestions.map(question => question._id),
                sharedWith: sharedWith || [],
            });


            await newTest.save();

            res.status(200).json({ text: "Questions and test created successfully" });
            console.log("Success");
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Internal Server Error" });
        }

    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
