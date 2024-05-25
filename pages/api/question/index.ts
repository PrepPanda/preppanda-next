import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/utils/connectDB";
import Question from "@/models/question";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method == "POST") {
    try {
      const data = req.body;
      await connectDB();

      const question = data.question;
      const answer = data.answer;
      const options = data.options;
      const image = data.image;
      const type = data.type;
      const marks = data.marks;

      const newQuestion = new Question({
        question: question,
        correctAnswer: answer,
        options: options,
      });

      if (image) {
        newQuestion.image = image;
      }
      if (type) {
        newQuestion.type = type;
      }
      if (marks) {
        newQuestion.marks = marks;
      }
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


