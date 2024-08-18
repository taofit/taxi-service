import express, { Request, Response } from "express";
import { dbConnect } from "../db/dbconnect";
import { ObjectId } from "mongodb";
import { addIdToDoc } from "../utils/func";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const db = await dbConnect();
    const rides = await db.collection("fleets").find({}).toArray();
    
    res.json(rides).status(200);
});

router.post("/", async (req: Request, res: Response) => {
    const db = await dbConnect();
    const fleet = await addIdToDoc(req.body, db, 'fleets', 'fleet');
    const result = await db.collection("fleets").insertOne(fleet);
    
    res.json(result).status(200);
}); 

export default router;