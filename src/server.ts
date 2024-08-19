import express, { Request, Response } from "express";
import rides from "./routes/rides";
import clients from "./routes/clients";
import fleets from "./routes/fleets";
import bids from "./routes/bids";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json("Welcome to Taxi bidding Service");
});
app.use("/clients", clients);
app.use("/rides", rides);
app.use("/fleets", fleets);
app.use("/bids", bids);

export default app;