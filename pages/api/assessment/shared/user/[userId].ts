import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/connectDB';
import Assessment from '@/models/assessment';
import Group from '@/models/group';

// Purpose: Fetch all the shared assessment of the user with id userId

async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const method = req.method;
    const { userId }: any = req.query;

    try {
        await connectDB();

        switch (method) {
            case 'GET':
                if (!userId) {
                    res.status(400).json({ success: false, message: 'Missing required query parameter: userId' })
                }
                const groups = await Group.find({ members: userId });
                const assessments = await Assessment.find({ sharedWith: { $in: groups.map(group => group._id) } });
                res.status(200).json({ success: true, data: assessments });
                break;

            default:
                res.status(405).json({
                    success: false,
                    message: 'Unsupported HTTP method'
                })
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

export default handler;

