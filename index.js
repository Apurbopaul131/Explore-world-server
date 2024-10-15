const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
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
