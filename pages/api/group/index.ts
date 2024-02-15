// Purpose: Handles requests to /api/group
// Description: Handles creating new groups

import type { NextApiRequest, NextApiResponse } from 'next';
import { Group } from '@/models/group';
import { connectDB } from '@/utils/dbconnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const method = req.method;

    switch (method) {
        case 'POST': {
            try {
                const { name, owner, members } = req.body;
                connectDB();

                const group = new Group({ name, owner, members });
                await group.save();

                res.status(200).json({ group });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        }
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

