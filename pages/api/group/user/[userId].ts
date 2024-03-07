// Purpose: Get all groups that a user is a member of or owns based on the user ID

import type { NextApiRequest, NextApiResponse } from 'next';
import Group from '@/models/group';
import { connectDB } from '@/utils/dbconnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { userId } = req.query;

    // console.log(method)
    // console.log(userId)

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    switch (method) {
        case 'GET': {
            try {
                connectDB();
                const ownedGroups = await Group.find({ owner: userId });
                const inMemberGroups = await Group.find({ members: userId });
                res.status(200).json({ ownedGroups, inMemberGroups });
            }
            catch(error) {
                console.log(error)
            }
        }
        default: {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    }
}
