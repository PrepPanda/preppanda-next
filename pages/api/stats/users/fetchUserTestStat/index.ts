import UserTestStats from '@/models/user-test-stats'
import { connectDB } from '@/utils/dbconnect'
import { NextApiRequest, NextApiResponse } from 'next';
import QuestionStats from '@/models/question-stats';
import Test from '@/models/test';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId, testId } = req.query
    const { method } = req
    if (method !== 'GET') {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
        return
    }

    await connectDB();
    try {
        const userTestStat = await UserTestStats.findOne({ userId, testId })
            .populate({
                path: 'testId',
                model: Test,
            })
        const questionsStats = userTestStat.questions;
        const questions = await QuestionStats.find({ _id: { $in: questionsStats } }).populate({
            path: 'question',
            model: 'QuestionStats',
        });
        if (!userTestStat) {
            res.status(404).json({ success: false, error: 'No test stats found for this user and test' });
            return;
        }

        res.status(200).json({userTestStat, questions});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}


