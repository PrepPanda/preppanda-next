import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/connectDB';
import Assessment from '@/models/assessment';

// Purpose: Get all users that an assessment is shared with

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == 'GET') {
    try {
      await connectDB();
      const data = req.query;
      const assessment = await Assessment.findById(data.assessmentId);
      const sharedUsers = assessment.sharedWith.map((user: any) => {
        return {
          id: user._id,
          username: user.username,
        };
      });
      res.status(200).json(sharedUsers);
    } catch (e) {
      console.log(e);
      res.status(400).json({ success: false });
    }
  }
}
