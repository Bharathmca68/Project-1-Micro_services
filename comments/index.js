require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const short = require("short-uuid");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

app.use(bodyParser.json());
const commentsByPostID = {}; // to store all the resources in the memory

//route for getting the post
app.get("/post/:id/comments", (req, res) => {
  res.status(200).send({
    Message: `comments for the post ${req.params.id}`,
    result: commentsByPostID[req.params.id] || [],
  });
});

//route for creating the post
app.post("/post/:id/comments", async (req, res) => {
  const commentsID = short.generate();
  //   const id = req.params.id;

  const { content } = req.body;

  const comments = commentsByPostID[req.params.id] || [];

  comments.push({ id: commentsID, content, status: "pending" });

  commentsByPostID[req.params.id] = comments;

  //emitting the copy of the data to the event bus
  await axios.post("http://localhost:4005/events", {
    type: "commentCreate",
    data: {
      id: commentsID,
      content,
      postID: req.params.id,
      status: "pending",
    },
  });

  res.status(201).json({
    Message: `comments created successfully for the ID:${req.params.id}`,
    result: comments,
  });
});

//confirmation route that event had received r not
app.post("/events", async (req, res) => {
  console.log("Event Received....! : ", req.body.type);

  //receiving data from the event bus, checking the type and modifying
  const { type, data } = req.body;

  if (type === "commentModerated") {
    const { id, postID, status, content } = data;
    const comments = commentsByPostID[postID];

    const comment = comments.find((com) => {
      return (com.id = id);
    });
    comment.status = status;

    //sending data to the event bus
    await axios.post("http://localhost:4005/events", {
      type: "commentUpdated",
      data: {
        id,
        status,
        postID,
        content,
      },
    });
  }
  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listing on the port number ${PORT}`);
});
