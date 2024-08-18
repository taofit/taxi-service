import express, { Request, Response } from "express";
import { dbconnect } from "../db/dbconnect";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const db = await dbconnect();
    const rides = await db.collection("rides").find({}).toArray();
    
    res.json(rides).status(200);
});

router.get("/client/:id", async (req: Request, res: Response) => {
    const db = await dbconnect();
    const { id: clientId } = req.params;
    const rides = await db.collection("rides").find({ clientId }).toArray();
    
    res.json(rides).status(200);
});

router.patch("/:id", async (req: Request, res: Response) => {
    const db = await dbconnect();
    const { fleetId } = req.body;
    const fleet = await db.collection("fleets").findOne({ id: fleetId });
    
    if (!fleet) {
        res.status(400).json({ error: "Fleet not found" }); 
        return; 
    }
    
    const { id } = req.params;
    const query = { _id: new ObjectId(id) };
    const bids = req.body;

    const currBids = await db.collection('rides').aggregate(
        [
            {
                $match: { _id: new ObjectId(id) }
            },
            { 
                $project: {
                    bids: 1, 
                    bidsCount: { $cond: { if: { $isArray: "$bids" }, then: {$size: "$bids" }, else: 0 } }
                } 
            },
        ]
    ).toArray();

    bids.id = 'bid' + (currBids[0].bidsCount + 1);
    const update = { $push: { bids } };
    const result = await db.collection("rides").updateOne(query, update);
    
    res.json(result).status(200);
});

export default router;