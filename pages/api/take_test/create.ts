import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from "../../../utils/dbconnect";
import Test from "../../../models/test";
import { serialize, CookieSerializeOptions } from 'cookie'; // Import CookieSerializeOptions

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {

    try {
      const { standard, subjects, totalQuestions } = req.body;

      // Log the received data
      console.log(standard); // string
      console.log(subjects); // array of string
      console.log(totalQuestions); // Number

      try {
        // Serialize the data and set it as a cookie
        const cookieOptions: CookieSerializeOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Set to true in production
          maxAge: 3600, // Set the cookie expiration time in seconds (here, it's set to 1 hour)
          sameSite: 'lax',
          path: '/' // Set the path for the cookie
        };

        const serializedData = serialize('testData', JSON.stringify({ standard, subjects, totalQuestions }), cookieOptions);
        res.setHeader('Set-Cookie', `testData=${serializedData};`);

      } catch (e) {
        console.log(e);
      }
      res.status(200).json({ message: "Test created successfully", data: { standard, subjects, totalQuestions } });
    } catch (error: any) {
      console.error("Error creating test:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
