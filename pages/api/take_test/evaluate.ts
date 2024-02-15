import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../utils/dbconnect";
import Question from "@/models/question";

interface questionStat {
  question: String;
  time: number;
  attempt: boolean;
  right: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { questions, userAnswers, questionTimersRef } = req.body;
    const stats = new Array<questionStat>();
    userAnswers.forEach((answer: String, index: number) => {
      const qStat: questionStat = {
        question: questions[index]._id,
        time: questionTimersRef.current[index],
        attempt: answer == null ? false : true,
        right: answer == questions[index].correctAnswer ? true : false,
      };
      stats.push(qStat);
    });
    if (userAnswers.length < questions.length) {
      for (let index = userAnswers.length; index < questions.length; index++) {
        const qStat: questionStat = {
          question: questions[index]._id,
          time: questionTimersRef.current[index],
          attempt: false,
          right: false,
        };
        stats.push(qStat);
      }
    }
  }
}
