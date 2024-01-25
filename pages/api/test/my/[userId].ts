import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/dbconnect';
import Test from '@/models/test';
import Question from '@/models/question';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        const data = req.query;
        const userId = data.userId;
        console.log(data);
        console.log('Debug');
        try {
            await connectDB();
            const tests = await Test.find({ owner: userId }).populate('questions');
            res.status(200).json(tests);
        } catch (e) {
            console.log(e);
            res.status(400).json({ success: false });
        }
    }
}

