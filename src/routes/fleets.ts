import express, { Request, Response } from "express";
import { dbConnect } from "../db/dbconnect";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const db = await dbConnect();
    const rides = await db.collection("fleets").find({}).toArray();
    
    if (rides.length === 0) {
        res.status(404).json({ error: "No fleets found" });
        return;
    }

    res.json(rides).status(200);
});

router.post("/", async (req: Request, res: Response) => {
    const db = await dbConnect();
    await db.collection("fleets").insertOne(req.body);
    
    res.json({message: 'fleet added'}).status(200);
}); 

export default router;