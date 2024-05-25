import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/utils/connectDB";
import Assessment from "@/models/assessment";
import axios from "axios";
import Question from "@/models/question";

// Purpose: To complete an assessment and calculate the score of the user.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  if (method == "POST") {
    try {
      const data = req.body;
      await connectDB();
      const owner = data.owner;
      const assessmentId = data.assessmentId;
      const assessment = await Assessment.findById(assessmentId);
      const time = data.time;

      if (!assessment) {
        throw new Error("Assessment not found");
      }
      if (!assessment.completeBy) {
        assessment.completeBy = [];
      }

      if (assessment.completedBy.includes(owner)) {
        res.status(400).json({ error: "Assessment already completed" });
        throw new Error("Assessment already completed");
      }

      if (!assessment.completeBy.includes(owner)) {
        assessment.completeBy.push(owner);
        await assessment.save();
      }

      const userQuestionStats = data.userQuestionStats;
      const questionsStats = [];
      let assessmentScore = 0;

      for (let i = 0; i < assessment.questions.length; i++) {
        const question_id = assessment.questions[i]._id;
        const question: any = await Question.findOne({ _id: question_id });

        const userAnswer = userQuestionStats[i].userAnswer;
        const time = userQuestionStats[i].time;
        let attempt = false;
        let right = false;
        let score = 0;
        if (userAnswer != null || userAnswer != "") {
          attempt = true;
        }
        if (userAnswer == question.correctAnswer) {
          score = question.marks;
          assessmentScore += score;
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
        questionsStats.push(questionStat);
      }

      try {
        await axios.post("http://localhost:3000/api/stats/assessment/" + assessmentId, { score: assessmentScore, time, questionsStats });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

      try {
        await axios.post("http://localhost:3000/api/stats/users/" + owner, { assessmentId, score: assessmentScore, time, questionsStats });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ text: "Assessment completed successfully" });

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
