require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;

const fetchallpost = {};

app.get("/posts", (req, res) => {
  res.status(200).send({
    Message: "posts fetched..!",
    result: fetchallpost,
  });
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log("Event Received....! : ", type);

  if (type == "postCreate") {
    const { id, title } = data;
    fetchallpost[id] = { id, title, comments: [] };
  }

  if (type == "commentCreate") {
    const { id, content, postID } = data;
    const post = fetchallpost[postID];
    post.comments.push({ id, content });
  }

  res.status(201).json({
    Message: `${type} and stored successfully`,
  });
});

app.listen(PORT, () => {
  console.log(`listing on port: ${PORT}`);
});
