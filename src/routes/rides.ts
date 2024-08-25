import express, { Request, Response } from "express";
import { dbConnect } from "../db/dbconnect";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const db = await dbConnect();
  const rides = await db.collection("rides").find({}).toArray();

  if (rides.length === 0) {
    res.status(404).json({ error: "No rides found" });
    return;
  } 

  res.json(rides).status(200);
});

router.post("/", async (req: Request, res: Response) => {
  const db = await dbConnect();
  const ride = req.body;
  let clientId = ride.clientId;
  clientId = new ObjectId(clientId);

  const client = await db.collection("clients").findOne({ _id: clientId });
  if (!client) {
    res.status(400).json({ error: "Client not found" });
    return; 
  }

  await db.collection("rides").insertOne(ride);

  res.json({message: 'ride is requested'}).status(200);
});

export default router;