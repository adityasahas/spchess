import { connectToDb } from "../../utils/connectToDb";
import { NextApiRequest, NextApiResponse } from 'next';

const authenticateUser = async (password: string) => {
  return password === process.env.NEXT_PUBLIC_PASSWORD;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { db } = await connectToDb();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
    const time = new Date();

    const log = {
      ip,
      time,
    };

    try {
      const isAuthenticated = await authenticateUser(req.body.password); 

      if (isAuthenticated) {
        await db.collection('logs').insertOne(log);
        res.status(200).send('Login successful and logged.');
      } else {
        res.status(401).send('Authentication failed.');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error.');
    }
  } else {
    res.status(405).end();  
  }
}
