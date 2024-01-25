import { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/utils/dbconnect';
import Test from '@/models/test';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        try {
            await connectDB();
            const data = req.query;
            const test = await Test.findById(data.testId).populate('questions');
            const sharedUsers = test.sharedWith.map((user:any) => {
                return {
                    id: user._id,
                    username: user.username,
                }
            });
            res.status(200).json(sharedUsers);
        }
        catch(e) {
            console.log(e);
            res.status(400).json({success: false});
        }
    }
}
