import { connectToDb } from "./connectToDb";

export async function fetchGames() {
  const { db, client } = await connectToDb();
  const gamesCollection = db.collection("games");
  const games = await gamesCollection.find({}).toArray();
  return games;
}
