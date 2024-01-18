import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "../../../utils/dbconnect";
import Test from "../../../models/test";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
      if (req.method == "POST") {
      //   return res.status(405).json({ error: "Method Not Allowed" });
      
      try {
            const { standard, subjects, totalQuestions } = req.body;
            console.log(standard)
            console.log(subjects)
            console.log(totalQuestions)
            try {
                  await connectDB();
                  await Test.create({
                        standard: standard,
                        subjects: subjects,
                        totalQuestions: totalQuestions,
                  });

            }
            catch(e) {
                  console.log(e);
            }
            res.status(200).json({ message: "Test created successfully", data: { standard, subjects, totalQuestions } });
      } catch (error:any) {
            console.error("Error creating test:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
      }
      }
}
