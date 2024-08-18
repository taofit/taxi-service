import express, { Request, Response } from "express";
import { dbConnect } from "../db/dbconnect";
import { addIdToDoc } from "../utils/func";
import { ObjectId } from "mongodb";
import e from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const db = await dbConnect();
  const rides = await db.collection("clients").find({}).toArray();

  res.json(rides).status(200);
});

router.post("/", async (req: Request, res: Response) => {
  const db = await dbConnect();

  const client = await addIdToDoc(req.body, db, 'clients', 'client');
  console.log('-----------client: ',client);
  const result = await db.collection("clients").insertOne(client);

  res.json(result).status(200);
});


export default router;