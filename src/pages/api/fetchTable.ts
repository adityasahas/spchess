import { connectToDb } from "../../utils/connectToDb";
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db, client } = await connectToDb();
  const gamesCollection = db.collection("games");

  // Fetch all games
  if (req.method === "GET" && !req.query.id) {
    try {
      const games = await gamesCollection.find({}).toArray();
      res.status(200).json(games);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch games" });
    }
  }

  // Fetch a single game by ID
  if (req.method === "GET" && req.query.id) {
    try {
      const game = await gamesCollection.findOne({ _id: new ObjectId(req.query.id as string) });
      if (!game) {
        res.status(404).json({ error: "Game not found" });
        return;
      }
      res.status(200).json(game);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch game with ID ${req.query.id}` });
    }
  }

  // Delete a single game by ID
  if (req.method === "DELETE" && req.query.id) {
    try {
      const result = await gamesCollection.deleteOne({ _id: new ObjectId(req.query.id as string) });
      if (result.deletedCount === 0) {
        res.status(404).json({ error: "Game not found" });
        return;
      }
      res.status(200).json({ message: `Successfully deleted game with ID ${req.query.id}` });
    } catch (error) {
      res.status(500).json({ error: `Failed to delete game with ID ${req.query.id}` });
    }
  }

  // Modify/Update a game by ID
  if (req.method === "PUT" && req.query.id) {
    try {
      const newData = req.body;
      const result = await gamesCollection.updateOne(
        { _id: new ObjectId(req.query.id as string) },
        { $set: newData }
      );

      if (result.matchedCount === 0) {
        res.status(404).json({ error: "Game not found" });
        return;
      }

      res.status(200).json({ message: `Successfully updated game with ID ${req.query.id}` });
    } catch (error) {
      res.status(500).json({ error: `Failed to update game with ID ${req.query.id}` });
    }
  }
}
