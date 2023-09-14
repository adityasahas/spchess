import { fetchGames } from "../../utils/fetchGames";
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    externalResolver: true,
  },
};

export const runtime = 'edge'; // 'nodejs' is the default
export const preferredRegion = 'iad1'; // only execute this function on iad1
export const dynamic = 'force-dynamic'; // no caching

export default async function fetchGamesEdge(_: NextApiRequest, res: NextApiResponse) {
  // Your MongoDB fetching logic here
  const games = await fetchGames(); // Assume fetchGames is your MongoDB fetching function

  res.status(200).json(games);
}
