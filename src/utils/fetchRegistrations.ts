import { connectToDb } from "./connectToDb";


export async function fetchRegs() {
    const { db, client } = await connectToDb();
    const registrationCollection = db.collection("tournament_registrations");
    const regs = await registrationCollection.find({}).toArray();
    return regs;
  }
  