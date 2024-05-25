import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/connectDB';
import Assessment from '@/models/assessment';
import UserAssessmentStats from '@/models/user-assessment-stats';

// Purpose: Fetch all assessments of a user or stats of a specific assessment of a user

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  const { id: [userId, assessmentId] }: any = req.query;

  try {
    await connectDB();

    switch (method) {
      case 'GET':
        if (!userId) {
          res.status(400).json({ success: false, error: 'Missing required query parameter: userId' });
          return;
        }
        if (!assessmentId) {
          const assessments = await Assessment.find({ owner: userId });
          if (!assessments) {
            res.status(404).json({ success: false, error: 'No assessments found for this user' });
            return;
          }
          res.status(200).json({ success: true, data: assessments });
        } else {
          const stats = await UserAssessmentStats.findOne({ userId, assessmentId }).populate('questions');
          if (!stats) {
            res.status(404).json({ success: false, error: 'No assessment stats found for this user and assessment' });
            return;
          }
          res.status(200).json({ success: true, data: stats });
        }
        break;

      default:
        res.status(405).json({ success: false, error: 'Unsupported HTTP method' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

export default handler;

