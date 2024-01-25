import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/dbconnect';
import Test from '@/models/test';

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if(req.method == 'GET') {
        try {
            const data = req.query;
            await connectDB();
            const test = await Test.findById(data.testId).populate('questions');
            res.status(200).json(test);
        }
        catch(e) {
            console.log(e);
            res.status(400).json({success: false});
        }
    }
}
