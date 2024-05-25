import UserAssessmentStats from '@/models/user-assessment-stats'
import connectDB from '@/utils/connectDB'
import { NextApiRequest, NextApiResponse } from 'next';
import QuestionStats from '@/models/question-stats';
import Assessment from '@/models/assessment';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, assessmentId } = req.query
  const { method } = req
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${method} Not Allowed`)
    return
  }

  await connectDB();
  try {
    const userAssessmentStat = await UserAssessmentStats.findOne({ userId, assessmentId })
      .populate({
        path: 'assessmentId',
        model: Assessment,
      })
    const questionsStats = userAssessmentStat.questions;
    const questions = await QuestionStats.find({ _id: { $in: questionsStats } }).populate({
      path: 'question',
      model: 'QuestionStats',
    });
    if (!userAssessmentStat) {
      res.status(404).json({ success: false, error: 'No assessment stats found for this user and assessment' });
      return;
    }

    res.status(200).json({ userAssessmentStat, questions });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
