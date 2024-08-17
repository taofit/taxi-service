import express, { Request, Response } from "express";
import { dbconnect } from "../db/dbconnect";
import { ObjectId } from "mongodb";
import exp from "constants";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const db = await dbconnect();
  const rides = await db.collection("rides").find({}).toArray();

  res.json(rides).status(200);
});

router.post("/", async (req: Request, res: Response) => {
  const db = await dbconnect();
  const ride = req.body;
  const { clientId } = ride;

  const client = await db.collection("clients").findOne({ id: clientId});
  if (!client) {
    res.status(400).json({ error: "Client not found" });
    return; 
  }
  
  ride.clientId = clientId;
  const result = await db.collection("rides").insertOne(ride);

  res.json(result).status(200);
});

export default router;