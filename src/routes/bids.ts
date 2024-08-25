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

router.get("/client/:id", async (req: Request, res: Response) => {
    const db = await dbConnect();
    const { id: clientId } = req.params;
    const rides = await db.collection("rides").find({ clientId }).toArray();
    
    if (rides.length === 0) {
        res.status(404).json({ error: `No ride found for client: ${clientId}` });
        return;
    }

    const bids = rides.filter((ride: any) => ride.bids?.length);
    if (bids.length === 0) {
        res.status(404).json({ error: `No bids found for client: ${clientId}` });
        return; 
    }

    res.json(bids).status(200);
});

router.patch("/:id", async (req: Request, res: Response) => {
    const db = await dbConnect();
    let fleetId = req.body.fleetId;
    fleetId = new ObjectId(fleetId);
    const { id } = req.params;
    const rideId = new ObjectId(id);
    const query = { _id: rideId };

    const ride = await db.collection("rides").findOne(query);
    if (!ride) {    
        res.status(400).json({ error: "Ride not found" });
        return;
    }   

    const fleet = await db.collection("fleets").findOne({ _id: fleetId });
    if (!fleet) {
        res.status(400).json({ error: "Fleet not found" }); 
        return; 
    }
    
    const bids = req.body;
    const currBids = await db.collection('rides').aggregate(
        [
            {
                $match: query
            },
            { 
                $project: {
                    bids: 1, 
                    bidsCount: { $cond: { if: { $isArray: "$bids" }, then: {$size: "$bids" }, else: 0 } }
                } 
            },
        ]
    ).toArray();
    if (!currBids[0]?.bidsCount) {
        bids.id = 'bid1';
    } else {
        bids.id = 'bid' + (currBids[0]?.bidsCount + 1);
    }
    const update = { $push: { bids: bids } };
    await db.collection("rides").updateOne(query, update);
    
    res.json({message: 'bid placed'}).status(200);
});

router.patch("/:id/accept", async (req: Request, res: Response) => {
    const db = await dbConnect();
    const { id } = req.params;
    const rideId = new ObjectId(id);
    const { bidId } = req.body;
    const query = { _id: rideId };
    const rides = await db.collection("rides").findOne(query);
    const acceptedBid = rides?.bids?.find((bid: any) => bid.id === bidId);
    if (!acceptedBid) {
        res.status(400).json({ error: "Bid not found" });
        return;
    }
    const update = { $set: { acceptedBid } };
    await db.collection("rides").updateOne(query, update);
    res.json({message: 'bid accepted'}).status(200);
});

export default router;