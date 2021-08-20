require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;

const fetchallpost = {};

//function to handle a events

const handleEvent = (type, data) => {
  if (type == "postCreate") {
    const { id, title } = data;
    fetchallpost[id] = { id, title, comments: [] };
  }

  if (type == "commentCreate") {
    const { id, content, postID, status } = data;
    const post = fetchallpost[postID];
    post.comments.push({ id, content, status });
  }

  if (type == "commentUpdated") {
    const { id, content, status, postID } = data;
    const post = fetchallpost[postID];
    const comment = post.comments.find((com) => {
      return com.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.status(200).send({
    Message: "posts fetched..!",
    result: fetchallpost,
  });
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log("Event Received....! : ", type);

  handleEvent(type, data);

  res.status(201).json({
    Message: `${type} and stored successfully`,
  });
});

app.listen(PORT, async () => {
  console.log(`listing on port: ${PORT}`);
  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    console.log("Processing event : ", event.type);
    handleEvent(event.type, event.data);
  }
});
