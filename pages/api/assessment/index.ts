import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/utils/connectDB";
import Assessment from "@/models/assessment";
import User from "@/models/user";
import Group from "@/models/group";
import axios from "axios";

// Purpose: Create a new assessment and save it to the database

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method == "POST") {
    try {
      const data = req.body.formData;
      await connectDB();

      const questions = req.body.questions;
      const user_id = data.owner;

      const user = await User.findById(user_id);

      const saveQuestionsres = await axios.post("http://localhost:3000/api/question/questions", questions,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const savedQuestions = saveQuestionsres.data;
      const sharedWith = await Promise.all(
        data.sharedWith.map(async (id: any) => {
          const fetchGroup = await Group.findById(id);
          return fetchGroup;
        })
      );

      const newAssessment = new Assessment({
        name: data.assessmentName,
        minutes: data.totalMins,
        owner: user,
        expiresAt: data.expireDate,
        questions: savedQuestions.map((question: any) => question._id),
        sharedWith: sharedWith || [],
      });

      await newAssessment.save();

      res.status(200).json({ text: "Questions and assessment created successfully" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }

  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
