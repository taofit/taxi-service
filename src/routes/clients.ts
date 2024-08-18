import express, { Request, Response } from "express";
import { dbconnect } from "../db/dbconnect";
import { ObjectId } from "mongodb";
import e from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const db = await dbconnect();
  const rides = await db.collection("clients").find({}).toArray();

  res.json(rides).status(200);
});

router.post("/", async (req: Request, res: Response) => {
  const db = await dbconnect();
  let id: string = '' + (await db.collection("clients").countDocuments() + 1);
  id = 'client' + id.toString();
  const client = { id, ...req.body };
  
  const result = await db.collection("clients").insertOne(client);

  res.json(result).status(200);
});


export default router;