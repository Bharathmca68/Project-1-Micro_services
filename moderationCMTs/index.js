require("dotenv").config();
const express = require("express");
const bodyParsar = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT;
app.use(bodyParsar.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "commentCreate") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "commentModerated",
      data: {
        id: data.id,
        content: data.content,
        postID: data.postID,
        status,
      },
    });
  }
  res.status(200).json({
    Message: "CommentModerated",
  });
});
app.listen(PORT, () => {
  console.log(`listing in port ${PORT}`);
});
