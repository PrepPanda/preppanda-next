// Purpose: Create a new test and save it to the database


import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/dbconnect";
import Test from "@/models/test";
import User from "@/models/user";
import Group from "@/models/group";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const method = req.method;
    if (method == "POST") {
        try {
            const data = req.body;
            console.log(data)
            await connectDB();
            console.log("Connected");

            const questions = data.questions;
            const user_id = data.owner;

            // find user
            const user = await User.findById(user_id);

            // Save Questions
            console.log("Saving Questions");
            const saveQuestionsres = await axios.post("http://localhost:3000/api/question/questions", questions,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
            );

            console.log("Saved Questions: ", saveQuestionsres);
            const savedQuestions = saveQuestionsres.data;

            const sharedWith = await Promise.all(
                data.sharedWith.map(async (id: any) => {
                    const fetchGroup = await Group.findById(id);
                    return fetchGroup;
                })
            );


            // Create and save test
            const newTest = new Test({
                name: data.testName,
                minutes: data.totalMins,
                owner: user,
                expiresAt: data.expireDate,
                questions: savedQuestions.map((question:any) => question._id),
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


