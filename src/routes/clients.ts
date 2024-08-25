import express, { Request, Response } from "express";
import { dbConnect } from "../db/dbconnect";

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
  await db.collection("clients").insertOne(req.body);

  res.json({message: 'client added'}).status(200);
});


export default router;