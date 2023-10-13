
import { connectToDb } from "../../utils/connectToDb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { db } = await connectToDb();
    const challenges = await db.collection("matches").find({ visibility: "public" }).toArray();
    res.status(200).json(challenges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
