const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const app = express();
const dotEnv = require("dotenv").config();
// const url = "mongodb://localhost:27017";
const url = process.env.DB;
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    let client = await mongodb.connect(url);
    let db = client.db("b14wd");
    let data = await db.collection("product").find().toArray();
    await client.close();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

app.post("/product", async (req, res) => {
  console.log(req.body);

  try {
    let client = await mongodb.connect(url);
    let db = client.db("b14wd");
    let data = await db.collection("product").insertOne(req.body);
    await client.close();
    res.json({
      message: "Created Successfully!",
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/orders", (req, res) => {
  console.log(req.query.id);
  console.log(req.query.name);
  console.log(req.query.roll);
});

app.get("/film/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    let client = await mongodb.connect(url);
    let db = client.db("b14wd");
    let data = await db
      .collection("product")
      .findOne({ _id: mongodb.ObjectID(req.params.id) });
    await client.close();
    res.json(data);
  } catch (error) {}
  res.json();
});

app.listen(process.env.PORT || 4040, function () {
  console.log("Server Listening!");
});
