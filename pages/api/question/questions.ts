import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/connectDB';
import Question from '@/models/question';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  if (method == "POST") {
    try {
      const data = req.body;
      await connectDB();
      const questions = data;

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

      res.status(200).json(savedQuestions);
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


