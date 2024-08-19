import express, { Request, Response } from "express";
import { dbConnect } from "../db/dbconnect";
import { addIdToDoc } from "../utils/func";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const db = await dbConnect();
  const rides = await db.collection("clients").find({}).toArray();
  
  if (rides.length === 0) {
    res.status(404).json({ error: "No clients found" });
    return;
  }
  
  res.json(rides).status(200);
});

router.post("/", async (req: Request, res: Response) => {
  const db = await dbConnect();

  const client = await addIdToDoc(req.body, db, 'clients', 'client');
  await db.collection("clients").insertOne(client);

  res.json({message: 'client added'}).status(200);
});


export default router;