require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post(`http://localhost:4000/events`, event);
  axios.post(`http://localhost:4001/events`, event);
  axios.post(`http://localhost:4002/events`, event);

  res.status(200).send("ok");
});

app.listen(PORT, () => {
  console.log(`listing on port ${PORT}`);
});
