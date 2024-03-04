// Purpose: Handles requests to /api/group/[groupId]
// Description: Handles RUD operations for a specific group identified by groupId

import type { NextApiRequest, NextApiResponse } from 'next';
import Group from '@/models/group';
import { connectDB } from '@/utils/dbconnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { groupId } = req.query;

    if (!groupId) {
        return res.status(400).json({ error: 'Group ID is required' });
    }

    switch (method) {
        case 'GET': {
            try {
                connectDB();
                const group = await Group.findById(groupId);
                if (!group) {
                    return res.status(404).json({ error: 'Group not found' });
                }
                res.status(200).json({ group });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        }
        case 'PUT': {
            try {
                const { name, owner, members } = req.body;
                connectDB();
                const group = await Group.findOneAndUpdate(
                    { _id: groupId },
                    { name, owner, members },
                    { new: true }
                );
                if (!group) {
                    return res.status(404).json({ error: 'Group not found' });
                }
                res.status(200).json({ group });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        }
        case 'DELETE': {
            try {
                connectDB();
                const deletedGroup = await Group.findByIdAndDelete(groupId);
                if (!deletedGroup) {
                    return res.status(404).json({ error: 'Group not found' });
                }
                res.status(200).json({ message: 'Group deleted successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        }
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

