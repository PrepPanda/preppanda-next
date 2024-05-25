import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/connectDB';
import UserAssessmentStats from '@/models/user-assessment-stats';
import QuestionStats from '@/models/question-stats';

// Purpose: Get the stats of the assessment which is given by user

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  const userId = req.query.userId as string;
  const assessmentId = req.body.assessmentId as string;

  try {
    switch (method) {
      case 'GET': {
        const { userId, assessmentId } = req.query;
        if (!userId && !assessmentId) {
          res.status(400).json({ success: false, error: 'User ID and assessment ID are required' });
          return;
        }
        await connectDB();
        const stats = await UserAssessmentStats.findOne({ userId, assessmentId }).populate('questions');
        if (!stats) {
          res.status(404).json({ success: false, error: 'No assessment stats found for this user and assessment' });
          return;
        }
        res.status(200).json({ success: true, data: stats });

        break;
      }

      case 'POST': {
        if (!userId && !assessmentId) {
          res.status(400).json({ success: false, error: 'User ID and assessment ID are required' });
          return;
        }
        const { score, time, questionsStats } = req.body;
        await connectDB();

        let userStats = await UserAssessmentStats.findOne({ userId, assessmentId });
        if (!userStats) {
          userStats = await UserAssessmentStats.create({ userId, assessmentId });
        }

        const updatedUserStats = {
          attempts: userStats.attempts + 1,
          avgScore: (userStats.avgScore * userStats.attempts + score) / (userStats.attempts + 1),
          avgTime: (userStats.avgTime * userStats.attempts + time) / (userStats.attempts + 1)
        };

        for (const questionStat of questionsStats) {
          const { question, time, score, attempt, right } = questionStat;
          let questionStats = await QuestionStats.findOne({ question: question, assessmentOrUser: false });
          if (!questionStats) {
            questionStats = await QuestionStats.create({
              question: question,
              avgTime: time,
              avgScore: score,
              attempts: attempt ? 1 : 0,
              correctAttempts: right ? 1 : 0,
              asked: 1,
              assessmentOrUser: false
            });
          } else {
            questionStats.avgTime = (questionStats.avgTime * questionStats.asked + time) / (questionStats.asked + 1);
            questionStats.avgScore = (questionStats.avgScore * questionStats.asked + score) / (questionStats.asked + 1);
            questionStats.attempts += attempt ? 1 : 0;
            questionStats.correctAttempts += right ? 1 : 0;
            questionStats.asked++;
          }
          await questionStats.save();

          if (!userStats.questions.includes(questionStats._id)) {
            userStats.questions.push(questionStats._id);
          }
        }

        userStats.set(updatedUserStats);
        await userStats.save();
        res.status(200).json({ success: true, data: userStats });

        break;
      }

      default:
        res.status(405).json({ success: false, error: 'Unsupported HTTP method' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
