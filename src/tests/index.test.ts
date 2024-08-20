import app from "../server";
import request from "supertest";
import { dbConnect } from "../db/dbconnect";
import { Db } from "mongodb";

let db: Db;

beforeAll(async () => {  
    jest.resetModules();
    db = await dbConnect();
    await clearCollections();
});

afterAll(async () => {
    await clearCollections();
});

const clearCollections = async () => {
    await db.collection("clients").deleteMany({});
    await db.collection("fleets").deleteMany({});
    await db.collection("rides").deleteMany({});
};

describe("Client", () => {
    it("add a client, should return 200 OK", (done) => {
        request(app)
            .post("/clients")
            .send({
                name: "Ryan Doe",
                email: "ryan.doe@example.com",
                phone: "08012345678",
            })
            .expect(200, done);
    });
    it("get all clients, should return 200 OK", (done) => {
        request(app)
            .get("/clients")
            .expect(200, done);
    });
});

describe("Fleet", () => {
    it("add a fleet, should return 200 OK", (done) => {
        request(app)
            .post("/fleets")
            .send({
                name: "Swift Transits",
                email: "swifttransits@example.com",
                phone: "08012345678",
            })
            .expect(200, done); 
    });

    it("get all fleets, should return 200 OK", (done) => {
        request(app)
            .get("/fleets")
            .expect(200, done);
    });
});

describe("Ride", () => {
    it("add a ride, should return 200 OK", (done) => {
        request(app)
            .post("/rides")
            .send({
                clientId: "client1",
                pickupLocation: "kingston gatan",
                dropoffLocation: "queen gatan",
                proposedPrice: 53,
            })
            .expect(200, done);
    });
    it("get all rides, should return 200 OK", (done) => {
        request(app)
            .get("/rides")
            .expect(200, done);
    });
});

describe("Bid", () => {
    it("place a bid, should return 200 OK", (done) => {
        request(app)
            .patch("/bids/ride1")
            .send({
                fleetId: "fleet1",
                price: 50,
            })
            .expect(200, done);
    });
    it("place a bid, should return Ride not found", (done) => {
        request(app)
            .patch("/bids/ride100")
            .send({
                fleetId: "fleet1",
                price: 50,
            })
            .expect(400, done);
    });
    it("place a bid, should return Fleet not found", (done) => {
        request(app)
            .patch("/bids/ride1")
            .send({
                fleetId: "fleet100",
                price: 50,
            })
            .expect(400, done);
    });
    it("accept a bid, should return 200 OK", (done) => {
        request(app)
            .patch("/bids/ride1/accept")
            .send({ bidId: "bid1" })
            .expect(200, done);
    });
    it("get all bids, should return 200 OK", (done) => {
        request(app)
            .get("/bids")
            .expect(200, done);
    });
    it("get all bids for a client, should return 200 OK", (done) => {
        request(app)
            .get("/bids/client/client1")
            .expect(200, done);
    });
});