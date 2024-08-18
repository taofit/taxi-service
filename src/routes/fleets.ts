import express, { Request, Response } from "express";
import { dbconnect } from "../db/dbconnect";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const db = await dbconnect();
    const rides = await db.collection("fleets").find({}).toArray();
    
    res.json(rides).status(200);
});

router.post("/", async (req: Request, res: Response) => {
    const db = await dbconnect();
    let id: string = '' + (await db.collection("fleets").countDocuments() + 1);
    id = 'fleet' + id.toString();
    const fleet = { id, ...req.body };
    
    const result = await db.collection("fleets").insertOne(fleet);
    
    res.json(result).status(200);
}); 

export default router;