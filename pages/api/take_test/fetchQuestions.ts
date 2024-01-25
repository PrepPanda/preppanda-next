import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "../../../utils/dbconnect";
import Question from '@/models/question';
import { parse } from 'cookie'; // Import parse from the 'cookie' module

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await connectDB();

      // Parse cookies from the request
      const cookies = parse(req.headers.cookie || '');

      let testData = cookies.testData;
      const startIndex = testData.indexOf('{"');
      const endIndex = testData.lastIndexOf('"}');
      
      testData = testData.substring(startIndex, endIndex + 2);
      const testDataObject = JSON.parse(testData);

      // Log the cookies
      console.log(testDataObject);

      const questions = await Question.find();
      res.status(200).json({ message: "Questions fetched successfully", questions: questions });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
