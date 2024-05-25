import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/connectDB';
import AssessmentStats from '@/models/assessment-stats';
import QuestionStats from '@/models/question-stats';

// Purpose: Find assessment-stats and update it or create if not found

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const assessmentId = req.query.assessmentId as string;

  switch (method) {
    case 'GET': {
      try {
        await connectDB();
        const assessmentStats = await AssessmentStats.findOne({ assessmentId: assessmentId }).populate("questions");
        if (!assessmentStats) {
          return res.status(404).json({ error: 'Assessment Stats not found' });
        }
        res.status(200).json({ assessmentStats });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    }

    case 'POST': {
      try {
        const { score, time, questionsStats } = req.body;
        await connectDB();

        let assessmentStats = await AssessmentStats.findOne({ assessmentId: assessmentId });
        if (!assessmentStats) {
          assessmentStats = await AssessmentStats.create({ assessmentId: assessmentId });
        }

        const updatedAssessmentStats = {
          attempts: assessmentStats.attempts + 1,
          avgScore: (assessmentStats.avgScore * assessmentStats.attempts + score) / (assessmentStats.attempts + 1),
          avgTime: (assessmentStats.avgTime * assessmentStats.attempts + time) / (assessmentStats.attempts + 1)
        };

        for (const questionStat of questionsStats) {
          const { question, time, score, attempt, right } = questionStat;
          let questionStats = await QuestionStats.findOne({ question: question, assessmentOrUser: true });
          if (!questionStats) {
            questionStats = await QuestionStats.create({
              question: question,
              avgTime: time,
              avgScore: score,
              attempts: attempt ? 1 : 0,
              correctAttempts: right ? 1 : 0,
              asked: 1,
              assessmentOrUser: true
            });
          } else {
            questionStats.avgTime = (questionStats.avgTime * questionStats.asked + time) / (questionStats.asked + 1);
            questionStats.avgScore = (questionStats.avgScore * questionStats.asked + score) / (questionStats.asked + 1);
            questionStats.attempts += attempt ? 1 : 0;
            questionStats.correctAttempts += right ? 1 : 0;
            questionStats.asked += 1;
          }
          await questionStats.save();

          if (!assessmentStats.questions.includes(questionStats._id)) {
            assessmentStats.questions.push(questionStats._id);
          }
        }

        assessmentStats.set(updatedAssessmentStats);
        await assessmentStats.save();

        res.status(200).json({ assessmentStats });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    }


    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

