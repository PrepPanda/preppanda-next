import User from "@/models/user";
import { connectDB } from "@/utils/dbconnect";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const method = req.method;
  
    switch (method) {
      case "GET":
        await handleGet(req, res);
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }

  const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const data = req.query;
      await connectDB();
      const test = await User.findById(data.userId);
      console.log(test);
      res.status(200).json(test);
    } catch (e) {
      console.log(e);
      res.status(400).json({ success: false });
    }
  };