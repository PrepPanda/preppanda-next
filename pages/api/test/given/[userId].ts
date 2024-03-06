import { NextApiRequest, NextApiResponse } from 'next';
import UserTestStats from '@/models/user-test-stats';
import Test from '@/models/test';
import { connectDB } from "@/utils/dbconnect";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { userId },
        method,
    } = req;

    await connectDB();

    switch (method) {
        case 'GET':
            try {
                //find all the tests that the user has taken
                let tests = [];
                // find all the tests which have the ownerId in the completeBy array
                tests = await Test.find({ completeBy: userId });
                res.status(200).json({ success: true, data: tests });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const userTestStats = await UserTestStats.create(req.body);
                res.status(201).json({ success: true, data: userTestStats });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}


