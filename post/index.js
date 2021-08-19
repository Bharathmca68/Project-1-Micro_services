require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const short = require("short-uuid");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
const post = {}; // to store all the resources in the memory

//route for getting the post
app.get("/post", (req, res) => {
  res.status(200).send({
    Message: "posts fetched..!",
    result: post,
  });
});

//route for creating the post
app.post("/post", async (req, res) => {
  const id = short.generate();

  const { title } = req.body;

  post[id] = {
    id,
    title,
  };

  //emitting the copy of data to the event bus
  await axios.post(`http://localhost:4005/events`, {
    type: "postCreate",
    data: {
      id,
      title,
    },
  });

  res.status(201).json({
    Message: "post created successfully",
    result: post[id],
  });
});

//confirmation route that event had received r not
app.post("/events", (req, res) => {
  console.log("Event Received.....! : ", req.body.type);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listing on the port number ${PORT}`);
});
