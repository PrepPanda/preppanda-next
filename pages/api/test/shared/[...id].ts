// Purpose: Fetch all tests of a user or stats of a specific test of a user

import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/dbconnect';
import Test from '@/models/test';
import UserTestStats from '@/models/user-test-stats';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;
    const { id: [userId, testId] } : any= req.query;

    try {
        await connectDB();

        switch (method) {
            case 'GET':
                if (!userId) {
                    res.status(400).json({ success: false, error: 'Missing required query parameter: userId' });
                    return;
                }
                if (!testId) {
                    // Fetch all tests of the user with userId
                    const tests = await Test.find({ owner: userId });
                    if (!tests) {
                        res.status(404).json({ success: false, error: 'No tests found for this user' });
                        return;
                    }
                    res.status(200).json({ success: true, data: tests });
                } else {
                    // Fetch stats for a specific test of the user
                    console.log('userId:', userId);
                    console.log('testId:', testId);
                    const stats = await UserTestStats.findOne({ userId, testId }).populate('questions');
                    if (!stats) {
                        res.status(404).json({ success: false, error: 'No test stats found for this user and test' });
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

