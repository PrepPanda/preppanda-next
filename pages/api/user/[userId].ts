import User from "@/models/user";
import connectDB from "@/utils/connectDB";
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
    const assessment = await User.findById(data.userId);
    res.status(200).json(assessment);
  } catch (e) {
    console.log(e);
    res.status(400).json({ success: false });
  }
};
