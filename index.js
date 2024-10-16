const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const bp = require("body-parser");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.port || 5000;

// exploreworld429
// Exploreworld
//Use cors to disable cors policy
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// const uri =
//   "mongodb+srv://exploreworld429:Exploreworld@newmission.cmtjh.mongodb.net/?retryWrites=true&w=majority&appName=Newmission";
// console.log("main uri" + uri);
const uri = `mongodb+srv://${process.env.EXPRESS_USERNAME}:${process.env.EXPRESS_PASSWORD}@newmission.cmtjh.mongodb.net/?retryWrites=true&w=majority&appName=Newmission`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const database = client.db("ExploreWorld");
    const tourismSpot = database.collection("tourismspot");
    app.post("/add-tourist-spot", async (req, res) => {
      const result = await tourismSpot.insertOne(req.body);
      res.send(result);
    });

    app.get("/add-tourist-spot", async (req, res) => {
      const cursor = tourismSpot.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/all-tourist-spots", async (req, res) => {
      const options = {
        // sort returned documents in ascending order
        sort: { averageCost: 1 },
        // Include only the `title` and `imdb` fields in each returned document
        projection: {
          countryName: 0,
          tourisSpotLocation: 0,
          touristSpotDescription: 0,
          userEmail: 0,
          userName: 0,
        },
      };
      const cursor = tourismSpot.find({}, options);
      console.log(cursor);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/tourism-spot/:spotId", async (req, res) => {
      const tourismSpotId = req.params.spotId;
      const query = {
        _id: new ObjectId(tourismSpotId),
      };
      const reslut = await tourismSpot.findOne(query);
      res.send(reslut);
    });
    app.get("/", (req, res) => {
      res.send("Hello Worlddddd!");
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
