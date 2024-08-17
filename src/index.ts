import express, { Express, Request, Response } from "express";
import { dbconnect } from "./db/dbconnect";
import rides from "./routes/rides";
import clients from "./routes/clients";
import fleets from "./routes/fleets";
import bids from "./routes/bids";

const app: Express = express();
const port = 4000;

app.use(express.json());
(async () => {
    await dbconnect();
})();

app.get("/", (req: Request, res: Response) => {
    res.status(200).json("Welcome to Taxi bidding Service");
});
app.use("/clients", clients);
app.use("/rides", rides);
app.use("/fleets", fleets);
app.use("/bids", bids);

app.listen(port, () => console.log(`Server listening on port ${port}`));
