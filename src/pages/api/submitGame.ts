import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb } from "../../utils/connectToDb";
import { InsertOneResult, Document } from "mongodb";

export default async function submitGame(req: NextApiRequest, res: NextApiResponse) {
  const { db, client } = await connectToDb();

  if (req.method === "POST") {
    try {
      const games = db.collection("games"); 
      const result: InsertOneResult<Document> = await games.insertOne(req.body);
      res.status(201).json({ success: true, insertedId: result.insertedId }); // Using insertedId
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(400).json({ success: false });
    } finally {
    
    }
  } else {
    res.status(400).json({ success: false });
  }
}
