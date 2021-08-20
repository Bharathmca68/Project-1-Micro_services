require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());

const events = [];
app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event); // sotring all the events in the DB , if Q server goes down

  axios.post(`http://localhost:4000/events`, event);
  axios.post(`http://localhost:4001/events`, event);
  axios.post(`http://localhost:4002/events`, event);
  axios.post(`http://localhost:4003/events`, event);

  res.status(200).send("ok");
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(PORT, () => {
  console.log(`listing on port ${PORT}`);
});
