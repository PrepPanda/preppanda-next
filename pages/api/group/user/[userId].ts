// Purpose: Get all groups that a user is a member of or owns based on the user ID

import type { NextApiRequest, NextApiResponse } from 'next';
import Group from '@/models/group';
import connectDB from '@/utils/connectDB';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { userId } = req.query;

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
      catch (error) {
        console.log(error)
      }
    }
    case 'POST': {
      const { groupId } = req.body
      if (groupId) {
        try {
          connectDB()
          await Group.updateOne(
            { _id: groupId },
            { $pull: { members: userId } }
          );
          res.status(200).json({ message: 'User removed from the group' });
        }
        catch (error) {
          console.log(error)
        }
      }
    }
    default: {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}
