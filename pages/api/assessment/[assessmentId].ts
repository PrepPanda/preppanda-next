import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/utils/connectDB";
import Question from "@/models/question";
import Assessment from "@/models/assessment";
import User from "@/models/user";

// Purpose: Fetch, Update and Delete an assessment

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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
    const assessment = await Assessment.findById(data.assessmentId).populate("questions");
    res.status(200).json(assessment);
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false });
  }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const assessmentId = req.query.assessmentId;
    const data = req.body.assessmentData;
    await connectDB();
    const assessment = await Assessment.findById(assessmentId);

    assessment.name = data.assessmentName || assessment.name;
    assessment.minutes = data.totalMins || assessment.minutes;
    assessment.expiresAt = data.expireDate || assessment.expiresAt;
    assessment.sharedWith = data.sharedWith || assessment.sharedWith;
    await assessment.save();

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
      assessment.questions = savedQuestions.map((question) => question._id);
    }

    const sharedWith: any[] = data.sharedWith || [];

    if (Array.isArray(sharedWith) && sharedWith.length > 0) {
      const newSharedWith = await Promise.all(
        sharedWith.map(async (id: any) => {
          const newUser = await User.findById(id);
          return newUser;
        })
      );
      assessment.sharedWith = newSharedWith;
    }

    await assessment.save();

    res.status(200).json({ text: "Questions and assessment updated successfully" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false });
  }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const assessmentId = req.query.assessmentId;
    await connectDB();
    await Assessment.findByIdAndDelete(assessmentId);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false });
  }
};
