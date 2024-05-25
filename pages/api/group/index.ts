// Purpose: Create and Join the group 

import type { NextApiRequest, NextApiResponse } from 'next';
import Group from '@/models/group';
import connectDB from '@/utils/connectDB';
import generateSHAKey from '@/utils/generateSHAKey';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  switch (method) {
    case 'POST': {
      try {
        const { name, owner } = req.body;
        connectDB();

        const code = generateSHAKey(name);
        const group = new Group({ name, owner, code });
        await group.save();

        res.status(200).json({ group });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      break;
    }
    case 'PUT': {
      try {
        const { code, member } = req.body;
        connectDB();
        // find group with the code id
        const group = await Group.findOne({ code: code });
        if (!group) {
          return res.status(404).json({ error: 'Group not found' });
        }
        if (group.members.includes(member)) {
          return res.status(400).json({ error: 'User already in group' });
        }
        group.members.push(member);
        await group.save();
        res.status(200).json({ group });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
    default:
      res.setHeader('Allow', ['POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

