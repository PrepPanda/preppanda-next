import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "../../../utils/dbconnect";
import Test from '@/models/test';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
      if (req.method == "POST") {
            await connectDB();
            // const questoins = await Test.

      
      }
}
