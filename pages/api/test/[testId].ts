// Purpose: Fetch, Update and Delete a test

import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/dbconnect";
import Question from "@/models/question";
import Test from "@/models/test";
import User from "@/models/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const method = req.method;

    switch (method) {
        case "GET":
            await handleGet(req, res);
            break;
        case "PUT":
            await handlePut(req, res);
            break;
        case "DELETE":
            await handleDelete(req, res);
            break;
        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const data = req.query;
        await connectDB();
        const test = await Test.findById(data.testId).populate('questions');
        res.status(200).json(test);
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ success: false });
    }
}

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const testId = req.query.testId;
        const data = req.body.testData;
        await connectDB();
        const test = await Test.findById(testId);

        // Update test properties
        test.name = data.testName || test.name;
        test.minutes = data.totalMins || test.minutes;
        test.expiresAt = data.expireDate || test.expiresAt;
        test.sharedWith = data.sharedWith || test.sharedWith;
        await test.save();

        // Process questions array
        const questions: any[] = data.questions || [];

        if (Array.isArray(questions) && questions.length > 0) {
            const savedQuestions = await Promise.all(
                questions.map(async (question: any) => {
                    const newQuestion = new Question({
                        question: question.question,
                        correctAnswer: question.answer,
                        options: question.options,
                    });
                    if (question.image) {
                        newQuestion.image = question.image;
                    }
                    if (question.type) {
                        newQuestion.type = question.type;
                    }
                    if (question.marks) {
                        newQuestion.marks = question.marks;
                    }
                    return await newQuestion.save();
                })
            );
            test.questions = savedQuestions.map(question => question._id);
        }

        // Process sharedWith array
        const sharedWith: any[] = data.sharedWith || [];

        if (Array.isArray(sharedWith) && sharedWith.length > 0) {
            const newSharedWith = await Promise.all(
                sharedWith.map(async (id:any) => {
                    const newUser = await User.findById(id);
                    return newUser;
                })
            );
            test.sharedWith = newSharedWith;
        }

        await test.save();

        res.status(200).json({ text: "Questions and test updated successfully" });
    }
    catch (e) {
        console.error(e);
        res.status(400).json({ success: false });
    }
}


const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const testId = req.query.testId;
        await connectDB();
        await Test.findByIdAndDelete(testId);
        res.status(200).json({ success: true });
    }
    catch (e) {
        console.log(e);
        res.status(400).json({ success: false });
    }
}


