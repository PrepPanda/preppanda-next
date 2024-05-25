import { NextApiRequest, NextApiResponse } from 'next';
import UserAssessmentStats from '@/models/user-assessment-stats';
import Assessment from '@/models/assessment';
import connectDB from "@/utils/connectDB";

// Purpose: Find the assessments that are given to a specific user

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { userId },
    method,
  } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        let assessments = [];
        assessments = await Assessment.find({ completeBy: userId });
        res.status(200).json({ success: true, data: assessments });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const userAssessmentStats = await UserAssessmentStats.create(req.body);
        res.status(201).json({ success: true, data: userAssessmentStats });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
